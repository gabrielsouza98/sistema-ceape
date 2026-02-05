import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Se existir DATABASE_URL, usamos PostgreSQL (produção).
// Caso contrário, usamos SQLite local (desenvolvimento).
const USE_POSTGRES = !!process.env.DATABASE_URL;

let pgPool = null;
let sqliteDb = null;

// Categorias fixas disponíveis no sistema
const CATEGORIAS = [
  'Carteira Ativa',
  'Castigado',
  'Clientes Ativos',
  'Inadimplência',
  'Inativos',
  'Liberações',
  'Mora',
  'Novos',
  'Renovações'
];

function mesParaOrdem(mes) {
  const mapa = {
    'janeiro': 1,
    'fevereiro': 2,
    'março': 3,
    'marco': 3,
    'abril': 4,
    'maio': 5,
    'junho': 6,
    'julho': 7,
    'agosto': 8,
    'setembro': 9,
    'outubro': 10,
    'novembro': 11,
    'dezembro': 12
  };
  return mapa[mes.toLowerCase()] ?? 0;
}

// Helpers para acessar o banco de forma unificada (Postgres ou SQLite)
async function dbQueryAll(sql, params = []) {
  if (USE_POSTGRES) {
    const result = await pgPool.query(sql, params);
    return result.rows;
  }
  return sqliteDb.prepare(sql).all(...params);
}

async function dbRun(sql, params = []) {
  if (USE_POSTGRES) {
    const result = await pgPool.query(sql, params);
    return result;
  }
  return sqliteDb.prepare(sql).run(...params);
}

async function initDb() {
  if (USE_POSTGRES) {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    // Criar tabela em Postgres
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS indicadores (
        id SERIAL PRIMARY KEY,
        mes TEXT NOT NULL,
        ano INTEGER NOT NULL,
        mes_ordem INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        pessoa TEXT,
        valor DOUBLE PRECISION NOT NULL
      )
    `);
  } else {
    // Caminho do banco SQLite local
    const dbPath = process.env.DB_PATH || path.join(__dirname, 'dados.db');
    sqliteDb = new Database(dbPath);

    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS indicadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mes TEXT NOT NULL,
        ano INTEGER NOT NULL,
        mes_ordem INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        pessoa TEXT,
        valor REAL NOT NULL
      );
    `);
  }
}

app.use(cors());
app.use(express.json());

// Buscar indicadores
app.get('/api/indicadores', async (req, res) => {
  try {
    const { categoria, pessoa, ano, mes } = req.query;

    let sql = `
      SELECT id, mes, ano, mes_ordem, categoria, pessoa, valor
      FROM indicadores
      WHERE 1=1
    `;
    const params = [];

    if (categoria) {
      sql += ` AND categoria = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(categoria);
    }
    if (pessoa) {
      sql += ` AND pessoa = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(pessoa);
    }
    if (ano) {
      sql += ` AND ano = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(parseInt(ano, 10));
    }
    if (mes) {
      sql += ` AND mes = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(mes);
    }

    sql += ' ORDER BY ano, mes_ordem';

    const rows = await dbQueryAll(sql, params);
    res.json(rows);
  } catch (e) {
    console.error('Erro em /api/indicadores:', e);
    res.status(500).json({ error: e.message });
  }
});

// Criar novo registro de indicador (cadastro manual)
app.post('/api/indicadores', async (req, res) => {
  try {
    const { pessoa, categoria, ano, mes, valor } = req.body || {};

    if (!pessoa || !categoria || !ano || !mes || valor === undefined || valor === null) {
      return res.status(400).json({ error: 'pessoa, categoria, ano, mes e valor são obrigatórios.' });
    }

    if (!CATEGORIAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria inválida.' });
    }

    const anoNum = Number(ano);
    if (!Number.isInteger(anoNum)) {
      return res.status(400).json({ error: 'Ano inválido.' });
    }

    const mesOrdem = mesParaOrdem(mes);
    if (!mesOrdem) {
      return res.status(400).json({ error: 'Mês inválido.' });
    }

    let v = String(valor).trim();
    // aceitar tanto 1234,56 quanto 1.234,56 etc
    if (v.includes(',')) {
      v = v.replace(/\./g, '').replace(',', '.');
    } else {
      v = v.replace(/\./g, '');
    }
    const valorNum = Number(v);
    if (Number.isNaN(valorNum)) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    if (USE_POSTGRES) {
      const result = await dbRun(
        `
        INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `,
        [mes, anoNum, mesOrdem, categoria, pessoa, valorNum]
      );

      const id = result.rows[0].id;

      return res.status(201).json({
        id,
        mes,
        ano: anoNum,
        mes_ordem: mesOrdem,
        categoria,
        pessoa,
        valor: valorNum
      });
    } else {
      const info = await dbRun(
        `
        INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [mes, anoNum, mesOrdem, categoria, pessoa, valorNum]
      );

      return res.status(201).json({
        id: info.lastInsertRowid,
        mes,
        ano: anoNum,
        mes_ordem: mesOrdem,
        categoria,
        pessoa,
        valor: valorNum
      });
    }
  } catch (e) {
    console.error('Erro em POST /api/indicadores:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Atualizar registro de indicador (edição)
app.put('/api/indicadores/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const { pessoa, categoria, ano, mes, valor } = req.body || {};

    if (!pessoa || !categoria || !ano || !mes || valor === undefined || valor === null) {
      return res.status(400).json({ error: 'pessoa, categoria, ano, mes e valor são obrigatórios.' });
    }

    if (!CATEGORIAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria inválida.' });
    }

    const anoNum = Number(ano);
    if (!Number.isInteger(anoNum)) {
      return res.status(400).json({ error: 'Ano inválido.' });
    }

    const mesOrdem = mesParaOrdem(mes);
    if (!mesOrdem) {
      return res.status(400).json({ error: 'Mês inválido.' });
    }

    let v = String(valor).trim();
    if (v.includes(',')) {
      v = v.replace(/\./g, '').replace(',', '.');
    } else {
      v = v.replace(/\./g, '');
    }
    const valorNum = Number(v);
    if (Number.isNaN(valorNum)) {
      return res.status(400).json({ error: 'Valor inválido.' });
    }

    let result;
    if (USE_POSTGRES) {
      result = await dbRun(
        `
        UPDATE indicadores
        SET mes = $1, ano = $2, mes_ordem = $3, categoria = $4, pessoa = $5, valor = $6
        WHERE id = $7
        `,
        [mes, anoNum, mesOrdem, categoria, pessoa, valorNum, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    } else {
      const info = await dbRun(
        `
        UPDATE indicadores
        SET mes = ?, ano = ?, mes_ordem = ?, categoria = ?, pessoa = ?, valor = ?
        WHERE id = ?
        `,
        [mes, anoNum, mesOrdem, categoria, pessoa, valorNum, id]
      );

      if (info.changes === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    }

    return res.json({
      id,
      mes,
      ano: anoNum,
      mes_ordem: mesOrdem,
      categoria,
      pessoa,
      valor: valorNum
    });
  } catch (e) {
    console.error('Erro em PUT /api/indicadores/:id:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Remover um registro específico
app.delete('/api/indicadores/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    if (USE_POSTGRES) {
      const result = await dbRun('DELETE FROM indicadores WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    } else {
      const info = await dbRun('DELETE FROM indicadores WHERE id = ?', [id]);
      if (info.changes === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    }

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/indicadores/:id:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Comparação de séries
app.get('/api/comparar', async (req, res) => {
  try {
    const { categoria, pessoa1, pessoa2, ano1, ano2, mes } = req.query;

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria é obrigatória para comparação' });
    }

    const buildQuery = (pessoa, ano) => {
      let sql = `
        SELECT mes, ano, mes_ordem, categoria, pessoa, valor
        FROM indicadores
        WHERE categoria = ${USE_POSTGRES ? '$1' : '?'}
      `;
      const params = [categoria];

      if (pessoa) {
        sql += ` AND pessoa = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
        params.push(pessoa);
      }
      if (ano) {
        sql += ` AND ano = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
        params.push(parseInt(ano, 10));
      }
      if (mes) {
        sql += ` AND mes = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
        params.push(mes);
      }

      sql += ' ORDER BY ano, mes_ordem';
      return { sql, params };
    };

    const q1 = buildQuery(pessoa1, ano1);
    const q2 = buildQuery(pessoa2, ano2);

    const [dados1, dados2] = await Promise.all([
      dbQueryAll(q1.sql, q1.params),
      dbQueryAll(q2.sql, q2.params)
    ]);

    res.json({
      serie1: dados1,
      serie2: dados2,
      labels: {
        serie1: pessoa1 ? `${pessoa1} ${ano1 ? `(${ano1})` : ''}` : `Ano ${ano1 || 'Todos'}`,
        serie2: pessoa2 ? `${pessoa2} ${ano2 ? `(${ano2})` : ''}` : `Ano ${ano2 || 'Todos'}`
      }
    });
  } catch (e) {
    console.error('Erro em /api/comparar:', e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/categorias', (_req, res) => {
  res.json(CATEGORIAS);
});

// Lista de pessoas distintas
app.get('/api/pessoas', async (_req, res) => {
  try {
    const sql = `
      SELECT DISTINCT pessoa
      FROM indicadores
      WHERE pessoa IS NOT NULL AND pessoa <> ''
      ORDER BY pessoa
    `;
    const rows = await dbQueryAll(sql);
    res.json(rows.map((r) => r.pessoa));
  } catch (e) {
    console.error('Erro em /api/pessoas:', e);
    res.json([]);
  }
});

// Remover todos os dados de uma pessoa
app.delete('/api/pessoas/:pessoa', async (req, res) => {
  try {
    const pessoa = decodeURIComponent(req.params.pessoa);
    if (!pessoa) {
      return res.status(400).json({ error: 'Pessoa inválida.' });
    }

    let result;
    if (USE_POSTGRES) {
      result = await dbRun('DELETE FROM indicadores WHERE pessoa = $1', [pessoa]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para essa pessoa.' });
      }
    } else {
      const info = await dbRun('DELETE FROM indicadores WHERE pessoa = ?', [pessoa]);
      if (info.changes === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para essa pessoa.' });
      }
    }

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/pessoas/:pessoa:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Anos distintos
app.get('/api/anos', async (_req, res) => {
  try {
    const sql = `
      SELECT DISTINCT ano
      FROM indicadores
      ORDER BY ano
    `;
    const rows = await dbQueryAll(sql);
    res.json(rows.map((r) => r.ano));
  } catch (e) {
    console.error('Erro em /api/anos:', e);
    res.status(500).json({ error: e.message });
  }
});

// Meses distintos (ordenados por mes_ordem)
app.get('/api/meses', async (_req, res) => {
  try {
    const sql = `
      SELECT DISTINCT mes, mes_ordem
      FROM indicadores
      ORDER BY mes_ordem
    `;
    const rows = await dbQueryAll(sql);
    res.json(rows.map((r) => r.mes));
  } catch (e) {
    console.error('Erro em /api/meses:', e);
    res.status(500).json({ error: e.message });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// Inicializar banco e só então subir o servidor
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Servidor rodando em http://localhost:${PORT} usando ${USE_POSTGRES ? 'PostgreSQL' : 'SQLite'}`
      );
    });
  })
  .catch((err) => {
    console.error('Erro ao inicializar o banco de dados:', err);
    process.exit(1);
  });

