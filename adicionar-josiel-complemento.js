// Script para adicionar dados complementares do agente "Josiel" no PostgreSQL
// - Garante que NÃO duplica registros com mesma (pessoa, categoria, ano, mes)
//
// Uso no PowerShell:
// 1) Defina a DATABASE_URL (mesma do Render):
//    $env:DATABASE_URL = "SUA_URL_DO_POSTGRES_AQUI"
// 2) Rode:
//    node adicionar-josiel-complemento.js

import pkg from 'pg';

const { Pool } = pkg;

const pessoa = 'Josiel';

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
const dadosJosiel = [
  ['Carteira Ativa', 2025, 'Outubro', '380456'],
  ['Clientes Ativos', 2025, 'Outubro', '211'],
  ['Inadimplência', 2025, 'Outubro', '6,66'],
  ['Liberações', 2025, 'Outubro', '124100'],
  ['Novos', 2025, 'Outubro', '6'],

  ['Carteira Ativa', 2025, 'Novembro', '360683'],
  ['Clientes Ativos', 2025, 'Novembro', '200'],
  ['Inadimplência', 2025, 'Novembro', '6,72'],
  ['Liberações', 2025, 'Novembro', '81500'],

  ['Liberações', 2025, 'Dezembro', '109700'],
  ['Carteira Ativa', 2025, 'Dezembro', '333165'],
  ['Clientes Ativos', 2025, 'Dezembro', '193'],
  ['Inadimplência', 2025, 'Dezembro', '5,98'],

  ['Carteira Ativa', 2026, 'Janeiro', '368690'],
  ['Clientes Ativos', 2026, 'Janeiro', '206'],
  ['Inadimplência', 2026, 'Janeiro', '5,34'],
  ['Liberações', 2026, 'Janeiro', '154600']
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
    console.log(`Inserindo registros para o agente ${pessoa} (ignorando duplicados existentes)...`);

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

      for (const [categoria, ano, mes, valorBruto] of dadosJosiel) {
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

        // Verificar se já existe registro para essa combinação
        const jaExiste = await client.query(existsText, [pessoa, categoria, ano, mes]);
        if (jaExiste.rowCount > 0) {
          console.log('Já existe, ignorando:', pessoa, categoria, ano, mes);
        } else {
          await client.query(insertText, [
            mes,
            ano,
            mesParaOrdem(mes),
            categoria,
            pessoa,
            valorNum
          ]);
          console.log('Inserido:', pessoa, categoria, ano, mes);
        }
      }

      await client.query('COMMIT');
      console.log(`Dados complementares inseridos para ${pessoa} (sem duplicar registros já existentes).`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Erro ao inserir registros para Josiel:', e);
    } finally {
      client.release();
    }
  } catch (e) {
    console.error('Erro geral no script adicionar-josiel-complemento:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

