// Script para ATUALIZAR (ou criar) os valores de Clientes Ativos 2024 do agente "Helio"
// Uso no PowerShell:
//   cd "c:\\Users\\estagiarioti\\Downloads\\sistema ceape"
//   $env:DATABASE_URL = "SUA_URL_DO_POSTGRES_AQUI"
//   node atualizar-helio-clientes-2024.js

import pkg from 'pg';

const { Pool } = pkg;

const pessoa = 'Helio';
const categoria = 'Clientes Ativos';

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
const dadosHelioClientes = [
  [2024, 'Janeiro', '146'],
  [2024, 'Fevereiro', '145'],
  [2024, 'Março', '151'],
  [2024, 'Abril', '141'],
  [2024, 'Maio', '140'],
  [2024, 'Junho', '126'],
  [2024, 'Julho', '123'],
  [2024, 'Agosto', '126'],
  [2024, 'Setembro', '129'],
  [2024, 'Outubro', '133'],
  [2024, 'Novembro', '134'],
  [2024, 'Dezembro', '148']
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
    console.log(`Atualizando Clientes Ativos 2024 de ${pessoa}...`);

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

      for (const [ano, mes, valorBruto] of dadosHelioClientes) {
        let v = String(valorBruto).trim();
        v = v.replace(/\./g, '');
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
      console.log(`Atualização concluída para ${pessoa} (Clientes Ativos 2024).`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Erro ao atualizar registros de Helio (Clientes Ativos):', e);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('Erro geral no script atualizar-helio-clientes-2024:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

