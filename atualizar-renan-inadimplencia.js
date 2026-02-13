// Script para ATUALIZAR (ou criar) os valores de Inadimplência do agente "Renan"
// Uso no PowerShell:
//   cd "c:\Users\estagiarioti\Downloads\sistema ceape"
//   $env:DATABASE_URL = "SUA_URL_DO_POSTGRES_AQUI"
//   node atualizar-renan-inadimplencia.js

import pkg from 'pg';

const { Pool } = pkg;

const pessoa = 'Renan';
const categoria = 'Inadimplência';

function mesParaOrdem(mes) {
  const mapa = {
    janeiro: 1,
    fevereiro: 2,
    'março': 3,
    marco: 3,
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12
  };
  return mapa[mes.toLowerCase()] ?? 0;
}

// [ano, mes, valor]
const dadosRenan = [
  [2023, 'Janeiro', '6,13'],
  [2023, 'Fevereiro', '8,26'],
  [2023, 'Março', '11,95'],
  [2023, 'Abril', '13,90'],
  [2023, 'Maio', '14,53'],
  [2023, 'Junho', '11,57'],
  [2023, 'Julho', '15,05'],
  [2023, 'Agosto', '19,35'],
  [2023, 'Setembro', '18,97'],
  [2023, 'Outubro', '20,22'],
  [2023, 'Novembro', '18,26'],
  [2023, 'Dezembro', '15,85'],

  [2024, 'Janeiro', '14,47'],
  [2024, 'Fevereiro', '13,56'],
  [2024, 'Março', '13,57'],
  [2024, 'Abril', '13,97'],
  [2024, 'Maio', '12,31'],
  [2024, 'Junho', '10,46'],
  [2024, 'Julho', '10,12'],
  [2024, 'Agosto', '9,33'],
  [2024, 'Setembro', '7,92'],
  [2024, 'Outubro', '6,97'],
  [2024, 'Novembro', '5,84'],
  [2024, 'Dezembro', '4,85'],

  [2025, 'Janeiro', '2,23'],
  [2025, 'Fevereiro', '0,81'],
  [2025, 'Março', '1,00'],
  [2025, 'Abril', '1,00'],
  [2025, 'Maio', '0,68'],
  [2025, 'Junho', '1,08'],
  [2025, 'Julho', '1,42'],
  [2025, 'Agosto', '1,20'],
  [2025, 'Setembro', '1,44'],
  [2025, 'Outubro', '2,29'],
  [2025, 'Novembro', '2,55'],
  [2025, 'Dezembro', '2,01'],

  [2026, 'Janeiro', '2,07']
];

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Erro: defina a variável de ambiente DATABASE_URL com a URL do PostgreSQL.');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log(`Atualizando Inadimplência de ${pessoa}...`);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const selectText = `
        SELECT id
        FROM indicadores
        WHERE pessoa = $1 AND categoria = $2 AND ano = $3 AND mes = $4
        LIMIT 1
      `;

      const updateText = `
        UPDATE indicadores
        SET valor = $1, mes_ordem = $2
        WHERE id = $3
      `;

      const insertText = `
        INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      for (const [ano, mes, valorBruto] of dadosRenan) {
        let v = String(valorBruto).trim();
        if (v.includes(',')) {
          v = v.replace(/\./g, '').replace(',', '.');
        } else {
          v = v.replace(/\./g, '');
        }
        const valorNum = Number(v);
        if (Number.isNaN(valorNum)) {
          console.warn('Valor inválido, pulando registro:', categoria, ano, mes, valorBruto);
          continue;
        }

        const mesOrd = mesParaOrdem(mes);

        const existing = await client.query(selectText, [pessoa, categoria, ano, mes]);
        if (existing.rowCount > 0) {
          const id = existing.rows[0].id;
          await client.query(updateText, [valorNum, mesOrd, id]);
          console.log('Atualizado:', pessoa, categoria, ano, mes, '=>', valorNum);
        } else {
          await client.query(insertText, [mes, ano, mesOrd, categoria, pessoa, valorNum]);
          console.log('Inserido novo:', pessoa, categoria, ano, mes, '=>', valorNum);
        }
      }

      await client.query('COMMIT');
      console.log(`Atualização concluída para ${pessoa}.`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Erro ao atualizar registros de Renan:', e);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('Erro geral no script atualizar-renan-inadimplencia:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

