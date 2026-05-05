const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  const d = await pool.query("SELECT COUNT(*)::int AS c FROM indicadores WHERE trim(lower(pessoa::text)) = 'david'");
  const t = await pool.query("SELECT COUNT(*)::int AS c FROM indicadores WHERE trim(lower(pessoa::text)) = 'thiago'");

  console.log({
    total_david: d.rows[0].c,
    total_thiago: t.rows[0].c
  });

  await pool.end();
})().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
