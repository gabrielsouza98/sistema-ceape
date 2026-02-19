// Migra TODOS os dados do Postgres do Render para o Postgres do Supabase.
//
// Uso no PowerShell:
//   cd "c:\\Users\\estagiarioti\\Downloads\\sistema ceape"
//   $env:RENDER_DATABASE_URL = "postgresql://...render.com/..."
//   $env:DATABASE_URL       = "postgresql://...supabase.com/..."
//   node migrar-render-para-supabase.js
//
// IMPORTANTE:
// - Rode isso ANTES do banco do Render ser apagado.
// - Idealmente o banco do Supabase deve estar vazio (sem indicadores/logs)
//   para evitar duplicações.

import pkg from 'pg';

const { Pool } = pkg;

const sourceUrl = process.env.RENDER_DATABASE_URL; // Render
const targetUrl = process.env.DATABASE_URL;        // Supabase

if (!sourceUrl || !targetUrl) {
  console.error('Defina RENDER_DATABASE_URL (Render) e DATABASE_URL (Supabase) antes de rodar.');
  process.exit(1);
}

const sourcePool = new Pool({
  connectionString: sourceUrl,
  ssl: { rejectUnauthorized: false }
});

const targetPool = new Pool({
  connectionString: targetUrl,
  ssl: { rejectUnauthorized: false }
});

async function copiarIndicadores() {
  console.log('Lendo todos os indicadores do banco do Render...');
  const { rows } = await sourcePool.query(
    'SELECT id, mes, ano, mes_ordem, categoria, pessoa, valor FROM indicadores ORDER BY id'
  );
  console.log(`Encontrados ${rows.length} registros em indicadores.`);

  if (!rows.length) return;

  console.log('Copiando indicadores para o Supabase...');
  const client = await targetPool.connect();
  try {
    await client.query('BEGIN');

    // Opcional: se quiser garantir limpeza total antes de importar, descomente:
    // await client.query('TRUNCATE TABLE indicadores RESTART IDENTITY CASCADE');

    const insertText = `
      INSERT INTO indicadores (id, mes, ano, mes_ordem, categoria, pessoa, valor)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING
    `;

    for (const r of rows) {
      await client.query(insertText, [
        r.id,
        r.mes,
        r.ano,
        r.mes_ordem,
        r.categoria,
        r.pessoa,
        r.valor
      ]);
    }

    await client.query('COMMIT');
    console.log('Cópia de indicadores concluída.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Erro ao copiar indicadores:', e);
    throw e;
  } finally {
    client.release();
  }
}

async function copiarLogs() {
  console.log('Lendo todos os logs do banco do Render...');
  let rows = [];
  try {
    const result = await sourcePool.query(
      'SELECT id, criado_em, acao, entidade, indicador_id, pessoa, categoria, ano, mes, valor_antigo, valor_novo, origem FROM logs ORDER BY id'
    );
    rows = result.rows;
  } catch (e) {
    console.warn('Tabela logs não encontrada ou erro ao ler logs. Pulando logs.', e.message);
    return;
  }

  console.log(`Encontrados ${rows.length} registros em logs.`);
  if (!rows.length) return;

  console.log('Copiando logs para o Supabase...');
  const client = await targetPool.connect();
  try {
    await client.query('BEGIN');

    const insertText = `
      INSERT INTO logs (
        id, criado_em, acao, entidade, indicador_id,
        pessoa, categoria, ano, mes, valor_antigo, valor_novo, origem
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO NOTHING
    `;

    for (const r of rows) {
      await client.query(insertText, [
        r.id,
        r.criado_em,
        r.acao,
        r.entidade,
        r.indicador_id,
        r.pessoa,
        r.categoria,
        r.ano,
        r.mes,
        r.valor_antigo,
        r.valor_novo,
        r.origem
      ]);
    }

    await client.query('COMMIT');
    console.log('Cópia de logs concluída.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Erro ao copiar logs:', e);
    throw e;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    await copiarIndicadores();
    await copiarLogs();
    console.log('Migração Render → Supabase concluída com sucesso.');
  } catch (e) {
    console.error('Erro geral na migração:', e);
    process.exit(1);
  } finally {
    await sourcePool.end();
    await targetPool.end();
  }
}

main();

