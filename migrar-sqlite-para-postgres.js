import Database from 'better-sqlite3';
import pkg from 'pg';

const { Pool } = pkg;

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Erro: defina a variável de ambiente DATABASE_URL com a URL do PostgreSQL.');
    process.exit(1);
  }

  console.log('Conectando ao SQLite (dados.db)...');
  const sqliteDb = new Database('dados.db');

  console.log('Conectando ao PostgreSQL...');
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Garante que a tabela exista no Postgres (mesma definição do server.js)
    await pool.query(`
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

    console.log('Lendo registros do SQLite...');
    const rows = sqliteDb
      .prepare(
        'SELECT mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores ORDER BY ano, mes_ordem'
      )
      .all();

    console.log(`Encontrados ${rows.length} registros em dados.db.`);

    if (!rows.length) {
      console.log('Nenhum registro para migrar. Encerrando.');
      await pool.end();
      sqliteDb.close();
      return;
    }

    console.log('Iniciando migração para PostgreSQL...');

    // Usa transação para performance e atomicidade
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const insertText = `
        INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      for (const row of rows) {
        await client.query(insertText, [
          row.mes,
          row.ano,
          row.mes_ordem,
          row.categoria,
          row.pessoa,
          row.valor
        ]);
      }

      await client.query('COMMIT');
      console.log('Migração concluída com sucesso!');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Erro durante a migração, transação revertida:', e);
    } finally {
      client.release();
    }

    await pool.end();
    sqliteDb.close();
  } catch (e) {
    console.error('Erro geral na migração:', e);
    process.exit(1);
  }
}

main();

