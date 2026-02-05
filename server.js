import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Caminho do banco:
// - Em produção (Render), use a variável de ambiente DB_PATH apontando para o Disk
// - Em desenvolvimento local, cai no arquivo dados.db na raiz do projeto
const dbPath = process.env.DB_PATH || path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS indicadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mes TEXT NOT NULL,
    ano INTEGER NOT NULL,
    mes_ordem INTEGER NOT NULL,
    categoria TEXT NOT NULL,
    pessoa TEXT,
    valor REAL NOT NULL
  );
  
  -- Adicionar coluna pessoa se não existir (migração)
  -- SQLite não suporta ALTER COLUMN, então verificamos e criamos nova tabela se necessário
`);

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

// Migração: adicionar coluna pessoa se não existir
try {
  // Verificar se a coluna já existe
  const tableInfo = db.prepare("PRAGMA table_info(indicadores)").all();
  const temColunaPessoa = tableInfo.some(col => col.name === 'pessoa');
  
  if (!temColunaPessoa) {
    db.exec(`ALTER TABLE indicadores ADD COLUMN pessoa TEXT`);
  }
} catch (e) {
  console.log('Migração de coluna pessoa:', e.message);
}

// Se não tiver dados com pessoa, atualizar para valor padrão
try {
  const tableInfo = db.prepare("PRAGMA table_info(indicadores)").all();
  const temColunaPessoa = tableInfo.some(col => col.name === 'pessoa');
  
  if (temColunaPessoa) {
    const checkPessoa = db.prepare('SELECT COUNT(*) as total FROM indicadores WHERE pessoa IS NULL OR pessoa = \'\'');
    const { total: semPessoa } = checkPessoa.get();
    if (semPessoa > 0) {
      db.exec(`UPDATE indicadores SET pessoa = 'Geral' WHERE pessoa IS NULL OR pessoa = ''`);
    }
  }
} catch (e) {
  // Ignorar se der erro
  console.log('Erro ao atualizar pessoa padrão:', e.message);
}

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

app.use(cors());
app.use(express.json());

app.get('/api/indicadores', (req, res) => {
  try {
    const { categoria, pessoa, ano, mes } = req.query;
    
    // Verificar se a coluna pessoa existe
    const tableInfo = db.prepare("PRAGMA table_info(indicadores)").all();
    const temColunaPessoa = tableInfo.some(col => col.name === 'pessoa');
    
    let sql = `
      SELECT id, mes, ano, mes_ordem, categoria${temColunaPessoa ? ', pessoa' : ''}, valor
      FROM indicadores
      WHERE 1=1
    `;
    const params = [];
    
    if (categoria) {
      sql += ' AND categoria = ?';
      params.push(categoria);
    }
    if (pessoa && temColunaPessoa) {
      sql += ' AND pessoa = ?';
      params.push(pessoa);
    }
    if (ano) {
      sql += ' AND ano = ?';
      params.push(parseInt(ano));
    }
    if (mes) {
      sql += ' AND mes = ?';
      params.push(mes);
    }
    
    sql += ' ORDER BY ano, mes_ordem';
    const rows = db.prepare(sql).all(...params);
    
    // Se não tiver coluna pessoa, adicionar null
    if (!temColunaPessoa) {
      rows.forEach(row => row.pessoa = null);
    }
    
    res.json(rows);
  } catch (e) {
    console.error('Erro em /api/indicadores:', e);
    res.status(500).json({ error: e.message });
  }
});

// Criar novo registro de indicador (cadastro manual)
app.post('/api/indicadores', (req, res) => {
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

    const insert = db.prepare(`
      INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const info = insert.run(mes, anoNum, mesOrdem, categoria, pessoa, valorNum);

    return res.status(201).json({
      id: info.lastInsertRowid,
      mes,
      ano: anoNum,
      mes_ordem: mesOrdem,
      categoria,
      pessoa,
      valor: valorNum
    });
  } catch (e) {
    console.error('Erro em POST /api/indicadores:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Atualizar registro de indicador (edição)
app.put('/api/indicadores/:id', (req, res) => {
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

    const update = db.prepare(`
      UPDATE indicadores
      SET mes = ?, ano = ?, mes_ordem = ?, categoria = ?, pessoa = ?, valor = ?
      WHERE id = ?
    `);

    const info = update.run(mes, anoNum, mesOrdem, categoria, pessoa, valorNum, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
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
app.delete('/api/indicadores/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const del = db.prepare('DELETE FROM indicadores WHERE id = ?');
    const info = del.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Registro não encontrado.' });
    }

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/indicadores/:id:', e);
    return res.status(500).json({ error: e.message });
  }
});

app.get('/api/comparar', (req, res) => {
  try {
    const { categoria, pessoa1, pessoa2, ano1, ano2, mes } = req.query;
    
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria é obrigatória para comparação' });
    }
    
    // Verificar se a coluna pessoa existe
    const tableInfo = db.prepare("PRAGMA table_info(indicadores)").all();
    const temColunaPessoa = tableInfo.some(col => col.name === 'pessoa');
    
    let sql1 = `
      SELECT mes, ano, mes_ordem, categoria${temColunaPessoa ? ', pessoa' : ''}, valor
      FROM indicadores
      WHERE categoria = ?
    `;
    let params1 = [categoria];
    
    let sql2 = sql1;
    let params2 = [categoria];
    
    if (pessoa1 && temColunaPessoa) {
      sql1 += ' AND pessoa = ?';
      params1.push(pessoa1);
    }
    if (pessoa2 && temColunaPessoa) {
      sql2 += ' AND pessoa = ?';
      params2.push(pessoa2);
    }
    if (ano1) {
      sql1 += ' AND ano = ?';
      params1.push(parseInt(ano1));
    }
    if (ano2) {
      sql2 += ' AND ano = ?';
      params2.push(parseInt(ano2));
    }
    if (mes) {
      sql1 += ' AND mes = ?';
      params1.push(mes);
      sql2 += ' AND mes = ?';
      params2.push(mes);
    }
    
    sql1 += ' ORDER BY ano, mes_ordem';
    sql2 += ' ORDER BY ano, mes_ordem';
    
    const dados1 = db.prepare(sql1).all(...params1);
    const dados2 = db.prepare(sql2).all(...params2);
    
    // Se não tiver coluna pessoa, adicionar null
    if (!temColunaPessoa) {
      dados1.forEach(row => row.pessoa = null);
      dados2.forEach(row => row.pessoa = null);
    }
    
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

app.get('/api/pessoas', (_req, res) => {
  try {
    const rows = db.prepare('SELECT DISTINCT pessoa FROM indicadores WHERE pessoa IS NOT NULL AND pessoa != \'\' ORDER BY pessoa').all();
    res.json(rows.map(r => r.pessoa));
  } catch (e) {
    // Se a coluna pessoa não existir ainda, retornar array vazio
    res.json([]);
  }
});

// Remover todos os dados de uma pessoa
app.delete('/api/pessoas/:pessoa', (req, res) => {
  try {
    const pessoa = decodeURIComponent(req.params.pessoa);
    if (!pessoa) {
      return res.status(400).json({ error: 'Pessoa inválida.' });
    }

    const del = db.prepare('DELETE FROM indicadores WHERE pessoa = ?');
    const info = del.run(pessoa);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Nenhum registro encontrado para essa pessoa.' });
    }

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/pessoas/:pessoa:', e);
    return res.status(500).json({ error: e.message });
  }
});

app.get('/api/anos', (_req, res) => {
  const rows = db.prepare('SELECT DISTINCT ano FROM indicadores ORDER BY ano').all();
  res.json(rows.map(r => r.ano));
});

app.get('/api/meses', (_req, res) => {
  const rows = db.prepare('SELECT DISTINCT mes FROM indicadores ORDER BY mes_ordem').all();
  res.json(rows.map(r => r.mes));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

