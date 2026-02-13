// Script para adicionar dados complementares do agente "Carlos" no PostgreSQL
// - Insere apenas se ainda não existir registro com mesma (pessoa, categoria, ano, mes)
//
// Uso no PowerShell:
//   cd "c:\\Users\\estagiarioti\\Downloads\\sistema ceape"
//   $env:DATABASE_URL = "SUA_URL_DO_POSTGRES_AQUI"
//   node adicionar-carlos-complemento.js

import pkg from 'pg';

const { Pool } = pkg;

const pessoa = 'Carlos';

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

// [categoria, ano, mes, valor]
const dadosCarlosComplemento = [
  ['Inadimplência', 2025, 'Outubro', '17,96'],
  ['Liberações', 2025, 'Outubro', '84400'],
  ['Clientes Ativos', 2025, 'Novembro', '91'],
  ['Clientes Ativos', 2025, 'Dezembro', '70'],

  ['Clientes Ativos', 2026, 'Janeiro', '143'],
  ['Carteira Ativa', 2026, 'Janeiro', '208.999'],
  ['Inadimplência', 2026, 'Janeiro', '20,00'],
  ['Liberações', 2026, 'Janeiro', '59.700']
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
    console.log(`Inserindo registros complementares para o agente ${pessoa} (ignorando duplicados)...`);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const existsText = `
        SELECT 1
        FROM indicadores
        WHERE pessoa = $1 AND categoria = $2 AND ano = $3 AND mes = $4
        LIMIT 1
      `;

      const insertText = `
        INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      for (const [categoria, ano, mes, valorBruto] of dadosCarlosComplemento) {
        if (valorBruto === undefined || valorBruto === null || valorBruto === '') {
          console.warn('Valor vazio, pulando registro:', categoria, ano, mes);
          continue;
        }

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

        const jaExiste = await client.query(existsText, [pessoa, categoria, ano, mes]);
        if (jaExiste.rowCount > 0) {
          console.log('Já existe, ignorando:', pessoa, categoria, ano, mes);
        } else {
          await client.query(insertText, [mes, ano, mesOrd, categoria, pessoa, valorNum]);
          console.log('Inserido:', pessoa, categoria, ano, mes, '=>', valorNum);
        }
      }

      await client.query('COMMIT');
      console.log(`Dados complementares inseridos para ${pessoa} (sem duplicar registros já existentes).`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Erro ao inserir registros para Carlos:', e);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('Erro geral no script adicionar-carlos-complemento:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

