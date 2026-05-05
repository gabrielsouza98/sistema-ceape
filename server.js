import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import crypto from 'crypto';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_LOGS_LIMIT = 1000;
const MAX_TEXT_LENGTH = 120;

// Se existir DATABASE_URL, usamos PostgreSQL (produção).
// Caso contrário, usamos SQLite local (desenvolvimento).
const USE_POSTGRES = !!process.env.DATABASE_URL;
const LOGS_PASSWORD = normalizarTexto(process.env.LOGS_PASSWORD);
const ADMIN_PASSWORD = normalizarTexto(process.env.ADMIN_PASSWORD) || 'admin123';
const ADMIN_USERNAME = normalizarTexto(process.env.ADMIN_USERNAME) || 'admin';

// Armazenamento simples de tokens ativos (em produção, usar Redis ou banco)
const activeTokens = new Map();

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

function normalizarTexto(valor) {
  if (valor === undefined || valor === null) return '';
  return String(valor).trim();
}

function hashSenha(senha) {
  return crypto.createHash('sha256').update(senha).digest('hex');
}

function gerarToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verificarToken(token) {
  if (!token) return false;
  const tokenData = activeTokens.get(token);
  if (!tokenData) return false;
  
  // Token expira após 24 horas
  const agora = Date.now();
  if (agora - tokenData.criadoEm > 24 * 60 * 60 * 1000) {
    activeTokens.delete(token);
    return false;
  }
  
  return true;
}

function usuarioEhAdmin(username) {
  return normalizarTexto(username).toLowerCase() === ADMIN_USERNAME.toLowerCase();
}

function validarTextoCurto(valor, nomeCampo) {
  if (!valor) {
    return `${nomeCampo} é obrigatório.`;
  }
  if (valor.length > MAX_TEXT_LENGTH) {
    return `${nomeCampo} excede o limite de ${MAX_TEXT_LENGTH} caracteres.`;
  }
  return null;
}

function parseAnoParam(valor, obrigatorio = false) {
  const txt = normalizarTexto(valor);
  if (!txt) {
    return { ok: !obrigatorio, value: null };
  }
  const anoNum = Number(txt);
  if (!Number.isInteger(anoNum)) {
    return { ok: false, error: 'Ano inválido.' };
  }
  return { ok: true, value: anoNum };
}

function parseValorInformado(rawValor) {
  const original = normalizarTexto(rawValor).replace(/\s+/g, '');
  if (!original) return { ok: false, error: 'Valor inválido.' };

  let normalizado = original;
  const temVirgula = original.includes(',');
  const temPonto = original.includes('.');

  if (temVirgula && temPonto) {
    if (original.lastIndexOf(',') > original.lastIndexOf('.')) {
      normalizado = original.replace(/\./g, '').replace(',', '.');
    } else {
      normalizado = original.replace(/,/g, '');
    }
  } else if (temVirgula) {
    normalizado = original.replace(',', '.');
  } else if (temPonto && /^\d{1,3}(\.\d{3})+$/.test(original)) {
    normalizado = original.replace(/\./g, '');
  }

  if (!/^[+-]?\d+(\.\d+)?$/.test(normalizado)) {
    return { ok: false, error: 'Valor inválido.' };
  }

  const numero = Number(normalizado);
  if (!Number.isFinite(numero) || numero < 0) {
    return { ok: false, error: 'Valor inválido.' };
  }
  return { ok: true, value: numero };
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
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Criar tabelas em Postgres
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS indicadores (
        id SERIAL PRIMARY KEY,
        mes TEXT NOT NULL,
        ano INTEGER NOT NULL,
        mes_ordem INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        pessoa TEXT,
        valor DOUBLE PRECISION NOT NULL
      );

      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        criado_em TIMESTAMPTZ DEFAULT NOW(),
        acao TEXT NOT NULL,
        entidade TEXT NOT NULL,
        indicador_id INTEGER,
        pessoa TEXT,
        categoria TEXT,
        ano INTEGER,
        mes TEXT,
        valor_antigo DOUBLE PRECISION,
        valor_novo DOUBLE PRECISION,
        origem TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_indicadores_categoria_ano_mes
        ON indicadores (categoria, ano, mes_ordem);
      CREATE INDEX IF NOT EXISTS idx_indicadores_pessoa
        ON indicadores (pessoa);
      CREATE INDEX IF NOT EXISTS idx_logs_criado_em
        ON logs (criado_em DESC);

      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        senha_hash TEXT NOT NULL,
        criado_em TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Criar usuário admin padrão se não existir
    const adminHash = hashSenha(ADMIN_PASSWORD);
    await pgPool.query(`
      INSERT INTO usuarios (username, senha_hash)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
    `, [ADMIN_USERNAME, adminHash]);
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

      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
        acao TEXT NOT NULL,
        entidade TEXT NOT NULL,
        indicador_id INTEGER,
        pessoa TEXT,
        categoria TEXT,
        ano INTEGER,
        mes TEXT,
        valor_antigo REAL,
        valor_novo REAL,
        origem TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_indicadores_categoria_ano_mes
        ON indicadores (categoria, ano, mes_ordem);
      CREATE INDEX IF NOT EXISTS idx_indicadores_pessoa
        ON indicadores (pessoa);
      CREATE INDEX IF NOT EXISTS idx_logs_criado_em
        ON logs (criado_em DESC);

      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        senha_hash TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar usuário admin padrão se não existir
    const adminHash = hashSenha(ADMIN_PASSWORD);
    const stmt = sqliteDb.prepare('INSERT OR IGNORE INTO usuarios (username, senha_hash) VALUES (?, ?)');
    stmt.run(ADMIN_USERNAME, adminHash);
  }
}

async function registrarLog({
  acao,
  entidade = 'indicador',
  indicadorId = null,
  pessoa = null,
  categoria = null,
  ano = null,
  mes = null,
  valorAntigo = null,
  valorNovo = null,
  origem = 'app'
}) {
  const sql = USE_POSTGRES
    ? `
        INSERT INTO logs (acao, entidade, indicador_id, pessoa, categoria, ano, mes, valor_antigo, valor_novo, origem)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `
    : `
        INSERT INTO logs (acao, entidade, indicador_id, pessoa, categoria, ano, mes, valor_antigo, valor_novo, origem)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

  const params = [
    acao,
    entidade,
    indicadorId,
    pessoa,
    categoria,
    ano,
    mes,
    valorAntigo,
    valorNovo,
    origem
  ];

  try {
    await dbRun(sql, params);
  } catch (e) {
    console.error('Erro ao registrar log:', e);
  }
}

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.use((req, _res, next) => {
  req.requestStartAt = Date.now();
  next();
});
app.use((req, res, next) => {
  res.on('finish', () => {
    const ms = Date.now() - req.requestStartAt;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Middleware de autenticação
async function requireAuth(req, res, next) {
  const token = req.headers['x-auth-token'] || req.query.token;
  
  if (!token || !verificarToken(token)) {
    return res.status(401).json({ error: 'Não autenticado. Faça login novamente.' });
  }
  
  const tokenData = activeTokens.get(token);
  req.user = tokenData || null;
  req.token = token;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || !usuarioEhAdmin(req.user.username)) {
    return res.status(403).json({ error: 'Apenas admin pode executar esta ação.' });
  }
  next();
}

app.get('/api/health', async (_req, res) => {
  try {
    if (USE_POSTGRES) {
      await pgPool.query('SELECT 1');
    } else {
      sqliteDb.prepare('SELECT 1').get();
    }
    res.json({
      status: 'ok',
      database: USE_POSTGRES ? 'postgres' : 'sqlite',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({
      status: 'error',
      error: e.message
    });
  }
});

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, senha } = req.body;
    
    if (!username || !senha) {
      return res.status(400).json({ error: 'Username e senha são obrigatórios.' });
    }

    const senhaHash = hashSenha(senha);
    let usuario = null;

    if (USE_POSTGRES) {
      const rows = await dbQueryAll(
        'SELECT id, username, senha_hash FROM usuarios WHERE username = $1',
        [normalizarTexto(username)]
      );
      usuario = rows[0] || null;
    } else {
      const rows = await dbQueryAll(
        'SELECT id, username, senha_hash FROM usuarios WHERE username = ?',
        [normalizarTexto(username)]
      );
      usuario = rows[0] || null;
    }

    if (!usuario || usuario.senha_hash !== senhaHash) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = gerarToken();
    activeTokens.set(token, {
      userId: usuario.id,
      username: usuario.username,
      criadoEm: Date.now()
    });

    res.json({
      token,
      username: usuario.username,
      isAdmin: usuarioEhAdmin(usuario.username)
    });
  } catch (e) {
    console.error('Erro em POST /api/auth/login:', e);
    res.status(500).json({ error: e.message });
  }
});

// Endpoint para verificar token
app.get('/api/auth/verify', requireAuth, async (req, res) => {
  res.json({
    valid: true,
    username: req.user.username,
    isAdmin: usuarioEhAdmin(req.user.username)
  });
});

// Endpoint para logout
app.post('/api/auth/logout', requireAuth, async (req, res) => {
  activeTokens.delete(req.token);
  res.json({ message: 'Logout realizado com sucesso.' });
});


// Buscar indicadores
app.get('/api/indicadores', requireAuth, async (req, res) => {
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
      params.push(normalizarTexto(categoria));
    }
    if (pessoa) {
      sql += ` AND pessoa = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(normalizarTexto(pessoa));
    }
    if (ano) {
      const parsedAno = parseAnoParam(ano);
      if (!parsedAno.ok) {
        return res.status(400).json({ error: parsedAno.error });
      }
      sql += ` AND ano = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(parsedAno.value);
    }
    if (mes) {
      sql += ` AND mes = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
      params.push(normalizarTexto(mes));
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
app.post('/api/indicadores', requireAuth, async (req, res) => {
  try {
    const pessoa = normalizarTexto(req.body?.pessoa);
    const categoria = normalizarTexto(req.body?.categoria);
    const mes = normalizarTexto(req.body?.mes);
    const { valor } = req.body || {};

    const erroPessoa = validarTextoCurto(pessoa, 'Pessoa');
    if (erroPessoa) {
      return res.status(400).json({ error: erroPessoa });
    }
    const erroCategoria = validarTextoCurto(categoria, 'Categoria');
    if (erroCategoria) {
      return res.status(400).json({ error: erroCategoria });
    }
    const erroMes = validarTextoCurto(mes, 'Mês');
    if (erroMes) {
      return res.status(400).json({ error: erroMes });
    }
    if (valor === undefined || valor === null) {
      return res.status(400).json({ error: 'pessoa, categoria, ano, mes e valor são obrigatórios.' });
    }

    if (!CATEGORIAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria inválida.' });
    }

    const parsedAno = parseAnoParam(req.body?.ano, true);
    if (!parsedAno.ok) {
      return res.status(400).json({ error: parsedAno.error });
    }
    const anoNum = parsedAno.value;

    const mesOrdem = mesParaOrdem(mes);
    if (!mesOrdem) {
      return res.status(400).json({ error: 'Mês inválido.' });
    }

    const parsedValor = parseValorInformado(valor);
    if (!parsedValor.ok) {
      return res.status(400).json({ error: parsedValor.error });
    }
    const valorNum = parsedValor.value;

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

      await registrarLog({
        acao: 'create',
        indicadorId: id,
        pessoa,
        categoria,
        ano: anoNum,
        mes,
        valorNovo: valorNum
      });

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
      const id = info.lastInsertRowid;

      await registrarLog({
        acao: 'create',
        indicadorId: id,
        pessoa,
        categoria,
        ano: anoNum,
        mes,
        valorNovo: valorNum
      });

      return res.status(201).json({
        id,
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
app.put('/api/indicadores/:id', requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    const pessoa = normalizarTexto(req.body?.pessoa);
    const categoria = normalizarTexto(req.body?.categoria);
    const mes = normalizarTexto(req.body?.mes);
    const { valor } = req.body || {};

    const erroPessoa = validarTextoCurto(pessoa, 'Pessoa');
    if (erroPessoa) {
      return res.status(400).json({ error: erroPessoa });
    }
    const erroCategoria = validarTextoCurto(categoria, 'Categoria');
    if (erroCategoria) {
      return res.status(400).json({ error: erroCategoria });
    }
    const erroMes = validarTextoCurto(mes, 'Mês');
    if (erroMes) {
      return res.status(400).json({ error: erroMes });
    }
    if (valor === undefined || valor === null) {
      return res.status(400).json({ error: 'pessoa, categoria, ano, mes e valor são obrigatórios.' });
    }

    if (!CATEGORIAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria inválida.' });
    }

    const parsedAno = parseAnoParam(req.body?.ano, true);
    if (!parsedAno.ok) {
      return res.status(400).json({ error: parsedAno.error });
    }
    const anoNum = parsedAno.value;

    const mesOrdem = mesParaOrdem(mes);
    if (!mesOrdem) {
      return res.status(400).json({ error: 'Mês inválido.' });
    }

    const parsedValor = parseValorInformado(valor);
    if (!parsedValor.ok) {
      return res.status(400).json({ error: parsedValor.error });
    }
    const valorNum = parsedValor.value;

    // Buscar valor antigo para log
    let antigo = null;
    if (USE_POSTGRES) {
      const rows = await dbQueryAll(
        'SELECT mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE id = $1',
        [id]
      );
      antigo = rows[0] || null;
    } else {
      const rows = await dbQueryAll(
        'SELECT mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE id = ?',
        [id]
      );
      antigo = rows[0] || null;
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

    await registrarLog({
      acao: 'update',
      indicadorId: id,
      pessoa,
      categoria,
      ano: anoNum,
      mes,
      valorAntigo: antigo ? antigo.valor : null,
      valorNovo: valorNum
    });

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
app.delete('/api/indicadores/:id', requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    // Buscar registro para log
    let antigo = null;
    if (USE_POSTGRES) {
      const rows = await dbQueryAll(
        'SELECT mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE id = $1',
        [id]
      );
      antigo = rows[0] || null;
      const result = await dbRun('DELETE FROM indicadores WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    } else {
      const rows = await dbQueryAll(
        'SELECT mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE id = ?',
        [id]
      );
      antigo = rows[0] || null;
      const info = await dbRun('DELETE FROM indicadores WHERE id = ?', [id]);
      if (info.changes === 0) {
        return res.status(404).json({ error: 'Registro não encontrado.' });
      }
    }

    await registrarLog({
      acao: 'delete',
      indicadorId: id,
      pessoa: antigo ? antigo.pessoa : null,
      categoria: antigo ? antigo.categoria : null,
      ano: antigo ? antigo.ano : null,
      mes: antigo ? antigo.mes : null,
      valorAntigo: antigo ? antigo.valor : null
    });

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/indicadores/:id:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Comparação de séries
app.get('/api/comparar', requireAuth, async (req, res) => {
  try {
    const categoria = normalizarTexto(req.query.categoria);
    const pessoa1 = normalizarTexto(req.query.pessoa1);
    const pessoa2 = normalizarTexto(req.query.pessoa2);
    const mes = normalizarTexto(req.query.mes);
    const parsedAno1 = parseAnoParam(req.query.ano1);
    const parsedAno2 = parseAnoParam(req.query.ano2);

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria é obrigatória para comparação' });
    }
    if (!CATEGORIAS.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria inválida para comparação.' });
    }
    if (!parsedAno1.ok || !parsedAno2.ok) {
      return res.status(400).json({ error: 'Ano inválido para comparação.' });
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
        params.push(ano);
      }
      if (mes) {
        sql += ` AND mes = ${USE_POSTGRES ? '$' + (params.length + 1) : '?'}`;
        params.push(mes);
      }

      sql += ' ORDER BY ano, mes_ordem';
      return { sql, params };
    };

    const q1 = buildQuery(pessoa1, parsedAno1.value);
    const q2 = buildQuery(pessoa2, parsedAno2.value);

    const [dados1, dados2] = await Promise.all([
      dbQueryAll(q1.sql, q1.params),
      dbQueryAll(q2.sql, q2.params)
    ]);

    res.json({
      serie1: dados1,
      serie2: dados2,
      labels: {
        serie1: pessoa1 ? `${pessoa1} ${parsedAno1.value ? `(${parsedAno1.value})` : ''}` : `Ano ${parsedAno1.value || 'Todos'}`,
        serie2: pessoa2 ? `${pessoa2} ${parsedAno2.value ? `(${parsedAno2.value})` : ''}` : `Ano ${parsedAno2.value || 'Todos'}`
      }
    });
  } catch (e) {
    console.error('Erro em /api/comparar:', e);
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/categorias', requireAuth, (_req, res) => {
  res.json(CATEGORIAS);
});

// Lista de pessoas distintas
app.get('/api/pessoas', requireAuth, async (_req, res) => {
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
app.delete('/api/pessoas/:pessoa', requireAuth, async (req, res) => {
  try {
    const pessoa = decodeURIComponent(req.params.pessoa);
    if (!pessoa) {
      return res.status(400).json({ error: 'Pessoa inválida.' });
    }

    // Buscar registros para log
    let registros = [];
    if (USE_POSTGRES) {
      registros = await dbQueryAll(
        'SELECT id, mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE pessoa = $1',
        [pessoa]
      );
      const result = await dbRun('DELETE FROM indicadores WHERE pessoa = $1', [pessoa]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para essa pessoa.' });
      }
    } else {
      registros = await dbQueryAll(
        'SELECT id, mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores WHERE pessoa = ?',
        [pessoa]
      );
      const info = await dbRun('DELETE FROM indicadores WHERE pessoa = ?', [pessoa]);
      if (info.changes === 0) {
        return res.status(404).json({ error: 'Nenhum registro encontrado para essa pessoa.' });
      }
    }

    for (const r of registros) {
      await registrarLog({
        acao: 'delete',
        indicadorId: r.id,
        pessoa: r.pessoa,
        categoria: r.categoria,
        ano: r.ano,
        mes: r.mes,
        valorAntigo: r.valor,
        origem: 'delete-pessoa'
      });
    }

    return res.status(204).end();
  } catch (e) {
    console.error('Erro em DELETE /api/pessoas/:pessoa:', e);
    return res.status(500).json({ error: e.message });
  }
});

app.put('/api/pessoas/renomear', requireAuth, requireAdmin, async (req, res) => {
  try {
    const nomeAtual = normalizarTexto(req.body?.nomeAtual);
    const novoNome = normalizarTexto(req.body?.novoNome);

    const erroNomeAtual = validarTextoCurto(nomeAtual, 'Nome atual');
    if (erroNomeAtual) {
      return res.status(400).json({ error: erroNomeAtual });
    }
    const erroNovoNome = validarTextoCurto(novoNome, 'Novo nome');
    if (erroNovoNome) {
      return res.status(400).json({ error: erroNovoNome });
    }
    if (nomeAtual.toLowerCase() === novoNome.toLowerCase()) {
      return res.status(400).json({ error: 'O novo nome deve ser diferente do nome atual.' });
    }

    let atualizados = 0;
    if (USE_POSTGRES) {
      const result = await dbRun(
        `
          UPDATE indicadores
          SET pessoa = $1
          WHERE lower(trim(pessoa)) = lower(trim($2))
        `,
        [novoNome, nomeAtual]
      );
      atualizados = result.rowCount || 0;
    } else {
      const info = await dbRun(
        `
          UPDATE indicadores
          SET pessoa = ?
          WHERE lower(trim(pessoa)) = lower(trim(?))
        `,
        [novoNome, nomeAtual]
      );
      atualizados = info.changes || 0;
    }

    if (atualizados === 0) {
      return res.status(404).json({ error: 'Nenhum registro encontrado para o nome informado.' });
    }

    await registrarLog({
      acao: 'update',
      entidade: 'agente',
      pessoa: novoNome,
      origem: 'rename-pessoa'
    });

    return res.json({
      message: 'Nome do agente atualizado com sucesso.',
      atualizados
    });
  } catch (e) {
    console.error('Erro em PUT /api/pessoas/renomear:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Anos distintos
app.get('/api/anos', requireAuth, async (_req, res) => {
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
app.get('/api/meses', requireAuth, async (_req, res) => {
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

// Logs (histórico de alterações)
app.get('/api/logs', requireAuth, async (req, res) => {
  try {
    if (LOGS_PASSWORD) {
      const provided =
        req.headers['x-logs-password'] ||
        req.query.password;
      if (!provided || String(provided) !== String(LOGS_PASSWORD)) {
        return res.status(401).json({ error: 'Senha inválida para visualizar logs.' });
      }
    }

    const parsedLimit = Number(req.query.limit);
    const limit = Number.isFinite(parsedLimit)
      ? Math.max(1, Math.min(Math.trunc(parsedLimit), MAX_LOGS_LIMIT))
      : 200;

    const sql = USE_POSTGRES
      ? `
          SELECT id, criado_em, acao, entidade, indicador_id, pessoa, categoria, ano, mes,
                 valor_antigo, valor_novo, origem
          FROM logs
          ORDER BY criado_em DESC
          LIMIT $1
        `
      : `
          SELECT id, criado_em, acao, entidade, indicador_id, pessoa, categoria, ano, mes,
                 valor_antigo, valor_novo, origem
          FROM logs
          ORDER BY criado_em DESC
          LIMIT ?
        `;

    const rows = await dbQueryAll(sql, [limit]);
    res.json(rows);
  } catch (e) {
    console.error('Erro em /api/logs:', e);
    res.status(500).json({ error: e.message });
  }
});

// Servir arquivos estáticos (exceto index.html que será protegido pelo frontend)
app.use(express.static(path.join(__dirname, 'public'), {
  index: false // Não servir index.html automaticamente
}));

// Servir index.html apenas se autenticado (verificação no frontend)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let server;

async function shutdown() {
  console.log('Encerrando aplicação...');
  const tasks = [];

  if (server) {
    tasks.push(
      new Promise((resolve) => {
        server.close(() => resolve());
      })
    );
  }

  if (pgPool) {
    tasks.push(pgPool.end().catch((e) => console.error('Erro ao fechar pool Postgres:', e)));
  }

  await Promise.all(tasks);
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (error) => {
  console.error('Erro não tratado (Promise):', error);
});
process.on('uncaughtException', (error) => {
  console.error('Exceção não tratada:', error);
  process.exit(1);
});

// Inicializar banco e só então subir o servidor
initDb()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(
        `Servidor rodando em http://localhost:${PORT} usando ${USE_POSTGRES ? 'PostgreSQL' : 'SQLite'}`
      );
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${PORT} já está em uso.`);
      } else {
        console.error('Erro no servidor HTTP:', err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Erro ao inicializar o banco de dados:', err);
    process.exit(1);
  });

