import Database from 'better-sqlite3';
import pkg from 'pg';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function hashSenha(senha) {
  return crypto.createHash('sha256').update(senha).digest('hex');
}

// Verificar se está usando PostgreSQL ou SQLite
const USE_POSTGRES = !!process.env.DATABASE_URL;

async function criarUsuario(username, senha) {
  if (!username || !senha) {
    console.error('Erro: Username e senha são obrigatórios.');
    process.exit(1);
  }

  if (username.length < 3) {
    console.error('Erro: Username deve ter pelo menos 3 caracteres.');
    process.exit(1);
  }

  if (senha.length < 4) {
    console.error('Erro: Senha deve ter pelo menos 4 caracteres.');
    process.exit(1);
  }

  const senhaHash = hashSenha(senha);
  const usernameNormalizado = username.trim();

  try {
    if (USE_POSTGRES) {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });

      // Criar tabela se não existir
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          senha_hash TEXT NOT NULL,
          criado_em TIMESTAMPTZ DEFAULT NOW()
        )
      `);

      // Verificar se usuário já existe
      const existe = await pool.query(
        'SELECT id FROM usuarios WHERE username = $1',
        [usernameNormalizado]
      );

      if (existe.rows.length > 0) {
        console.error(`Erro: Usuário "${usernameNormalizado}" já existe.`);
        await pool.end();
        process.exit(1);
      }

      // Criar usuário
      const result = await pool.query(
        'INSERT INTO usuarios (username, senha_hash) VALUES ($1, $2) RETURNING id, username, criado_em',
        [usernameNormalizado, senhaHash]
      );

      console.log('✓ Usuário criado com sucesso!');
      console.log(`  ID: ${result.rows[0].id}`);
      console.log(`  Username: ${result.rows[0].username}`);
      console.log(`  Criado em: ${result.rows[0].criado_em}`);

      await pool.end();
    } else {
      // SQLite
      const dbPath = process.env.DB_PATH || path.join(__dirname, 'dados.db');
      const db = new Database(dbPath);

      // Criar tabela se não existir
      db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          senha_hash TEXT NOT NULL,
          criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Verificar se usuário já existe
      const existe = db.prepare('SELECT id FROM usuarios WHERE username = ?').get(usernameNormalizado);

      if (existe) {
        console.error(`Erro: Usuário "${usernameNormalizado}" já existe.`);
        db.close();
        process.exit(1);
      }

      // Criar usuário
      const info = db.prepare('INSERT INTO usuarios (username, senha_hash) VALUES (?, ?)').run(
        usernameNormalizado,
        senhaHash
      );

      const usuario = db.prepare('SELECT id, username, criado_em FROM usuarios WHERE id = ?').get(info.lastInsertRowid);

      console.log('✓ Usuário criado com sucesso!');
      console.log(`  ID: ${usuario.id}`);
      console.log(`  Username: ${usuario.username}`);
      console.log(`  Criado em: ${usuario.criado_em}`);

      db.close();
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    process.exit(1);
  }
}

// Obter argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Uso: node criar-usuario.js <username> <senha>');
  console.log('');
  console.log('Exemplo:');
  console.log('  node criar-usuario.js joao senha123');
  console.log('');
  console.log('Para PostgreSQL (produção):');
  console.log('  $env:DATABASE_URL="postgresql://..." node criar-usuario.js joao senha123');
  console.log('');
  console.log('Para SQLite (local):');
  console.log('  node criar-usuario.js joao senha123');
  process.exit(1);
}

const [username, senha] = args;

criarUsuario(username, senha);
