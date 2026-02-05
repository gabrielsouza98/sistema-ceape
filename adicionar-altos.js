// Script para adicionar em lote os dados da agente "Altos" (Coordenador Glenyo)
// Uso:
// 1) No PowerShell, definir DATABASE_URL igual ao do Render:
//    $env:DATABASE_URL = "sua_url_do_postgres_aqui"
// 2) Rodar:
//    node adicionar-altos.js

import pkg from 'pg';

const { Pool } = pkg;

const pessoa = 'Altos';

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
const dadosAltos = [
  ['Carteira Ativa', 2024, 'Janeiro', '46290'],
  ['Carteira Ativa', 2024, 'Fevereiro', '56238'],
  ['Carteira Ativa', 2024, 'Março', '51622'],
  ['Carteira Ativa', 2024, 'Abril', '56509'],
  ['Carteira Ativa', 2024, 'Maio', '51741'],
  ['Carteira Ativa', 2024, 'Junho', '31433'],
  ['Carteira Ativa', 2024, 'Julho', '45417'],
  ['Carteira Ativa', 2024, 'Agosto', '50578'],
  ['Carteira Ativa', 2024, 'Setembro', '49000'],
  ['Carteira Ativa', 2024, 'Outubro', '33915'],
  ['Carteira Ativa', 2024, 'Novembro', '30930'],

  ['Carteira Ativa', 2025, 'Janeiro', '52950'],
  ['Carteira Ativa', 2025, 'Fevereiro', '43075'],
  ['Carteira Ativa', 2025, 'Março', '38200'],
  ['Carteira Ativa', 2025, 'Abril', '30075'],
  ['Carteira Ativa', 2025, 'Maio', '47750'],
  ['Carteira Ativa', 2025, 'Junho', '48325'],
  ['Carteira Ativa', 2025, 'Julho', '46000'],
  ['Carteira Ativa', 2025, 'Agosto', '42050'],
  ['Carteira Ativa', 2025, 'Setembro', '40550'],
  ['Carteira Ativa', 2025, 'Outubro', '52025'],
  ['Carteira Ativa', 2025, 'Novembro', '47665'],
  ['Carteira Ativa', 2025, 'Dezembro', '67011'],

  ['Liberações', 2024, 'Janeiro', '8500'],
  ['Liberações', 2024, 'Fevereiro', '23000'],
  ['Liberações', 2024, 'Março', '24800'],
  ['Liberações', 2024, 'Abril', '3900'],
  ['Liberações', 2024, 'Maio', '9300'],
  ['Liberações', 2024, 'Junho', '1500'],
  ['Liberações', 2024, 'Julho', '28400'],
  ['Liberações', 2024, 'Agosto', '18800'],
  ['Liberações', 2024, 'Setembro', '13000'],
  ['Liberações', 2024, 'Outubro', '0'],
  ['Liberações', 2024, 'Novembro', '10500'],
  ['Liberações', 2024, 'Dezembro', '21000'],

  ['Liberações', 2025, 'Janeiro', '30900'],
  ['Liberações', 2025, 'Fevereiro', '5000'],
  ['Liberações', 2025, 'Março', '7500'],
  ['Liberações', 2025, 'Abril', '6000'],
  ['Liberações', 2025, 'Maio', '33300'],
  ['Liberações', 2025, 'Junho', '16000'],
  ['Liberações', 2025, 'Julho', '13600'],
  ['Liberações', 2025, 'Agosto', '11000'],
  ['Liberações', 2025, 'Setembro', '14100'],
  ['Liberações', 2025, 'Outubro', '26000'],
  ['Liberações', 2025, 'Novembro', '0'],
  ['Liberações', 2025, 'Dezembro', '16000'],

  ['Novos', 2024, 'Janeiro', '0'],
  ['Novos', 2024, 'Fevereiro', '3'],
  ['Novos', 2024, 'Março', '0'],
  ['Novos', 2024, 'Abril', '0'],
  ['Novos', 2024, 'Maio', '0'],
  ['Novos', 2024, 'Junho', '0'],
  ['Novos', 2024, 'Julho', '3'],
  ['Novos', 2024, 'Agosto', '0'],
  ['Novos', 2024, 'Setembro', '0'],
  ['Novos', 2024, 'Outubro', '0'],
  ['Novos', 2024, 'Novembro', '1'],
  ['Novos', 2024, 'Dezembro', '0'],

  ['Novos', 2025, 'Janeiro', '0'],
  ['Novos', 2025, 'Fevereiro', '0'],
  ['Novos', 2025, 'Março', '0'],
  ['Novos', 2025, 'Abril', '2'],
  ['Novos', 2025, 'Maio', '0'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '0'],
  ['Novos', 2025, 'Agosto', '0'],
  ['Novos', 2025, 'Setembro', '1'],
  ['Novos', 2025, 'Outubro', '1'],
  ['Novos', 2025, 'Novembro', '0'],
  ['Novos', 2025, 'Dezembro', '0'],

  ['Renovações', 2024, 'Janeiro', '4'],
  ['Renovações', 2024, 'Fevereiro', '6'],
  ['Renovações', 2024, 'Março', '10'],
  ['Renovações', 2024, 'Abril', '3'],
  ['Renovações', 2024, 'Maio', '4'],
  ['Renovações', 2024, 'Junho', '1'],
  ['Renovações', 2024, 'Julho', '7'],
  ['Renovações', 2024, 'Agosto', '7'],
  ['Renovações', 2024, 'Setembro', '7'],
  ['Renovações', 2024, 'Outubro', '0'],
  ['Renovações', 2024, 'Novembro', '5'],
  ['Renovações', 2024, 'Dezembro', '4'],

  ['Renovações', 2025, 'Janeiro', '12'],
  ['Renovações', 2025, 'Fevereiro', '3'],
  ['Renovações', 2025, 'Março', '3'],
  ['Renovações', 2025, 'Abril', '1'],
  ['Renovações', 2025, 'Maio', '10'],
  ['Renovações', 2025, 'Junho', '4'],
  ['Renovações', 2025, 'Julho', '6'],
  ['Renovações', 2025, 'Agosto', '4'],
  ['Renovações', 2025, 'Setembro', '6'],
  ['Renovações', 2025, 'Outubro', '4'],
  ['Renovações', 2025, 'Novembro', '4'],
  ['Renovações', 2025, 'Dezembro', '4'],

  ['Clientes Ativos', 2024, 'Janeiro', '48'],
  ['Clientes Ativos', 2024, 'Fevereiro', '48'],
  ['Clientes Ativos', 2024, 'Março', '44'],
  ['Clientes Ativos', 2024, 'Abril', '48'],
  ['Clientes Ativos', 2024, 'Maio', '45'],
  ['Clientes Ativos', 2024, 'Junho', '37'],
  ['Clientes Ativos', 2024, 'Julho', '36'],
  ['Clientes Ativos', 2024, 'Agosto', '36'],
  ['Clientes Ativos', 2024, 'Setembro', '36'],
  ['Clientes Ativos', 2024, 'Outubro', '33'],
  ['Clientes Ativos', 2024, 'Novembro', '30'],

  ['Clientes Ativos', 2025, 'Janeiro', '22'],
  ['Clientes Ativos', 2025, 'Fevereiro', '22'],
  ['Clientes Ativos', 2025, 'Março', '22'],
  ['Clientes Ativos', 2025, 'Abril', '25'],
  ['Clientes Ativos', 2025, 'Maio', '24'],
  ['Clientes Ativos', 2025, 'Junho', '24'],
  ['Clientes Ativos', 2025, 'Julho', '23'],
  ['Clientes Ativos', 2025, 'Agosto', '24'],
  ['Clientes Ativos', 2025, 'Setembro', '24'],
  ['Clientes Ativos', 2025, 'Outubro', '26'],
  ['Clientes Ativos', 2025, 'Novembro', '22'],
  ['Clientes Ativos', 2025, 'Dezembro', '27'],

  ['Inadimplência', 2024, 'Janeiro', '36.93'],
  ['Inadimplência', 2024, 'Fevereiro', '31.47'],
  ['Inadimplência', 2024, 'Março', '34.24'],
  ['Inadimplência', 2024, 'Abril', '29.56'],
  ['Inadimplência', 2024, 'Maio', '32.07'],
  ['Inadimplência', 2024, 'Junho', '19.97'],
  ['Inadimplência', 2024, 'Julho', '12.76'],
  ['Inadimplência', 2024, 'Agosto', '10.67'],
  ['Inadimplência', 2024, 'Setembro', '8.29'],
  ['Inadimplência', 2024, 'Outubro', '6.96'],
  ['Inadimplência', 2024, 'Novembro', '7.31'],

  ['Inadimplência', 2025, 'Janeiro', '0'],
  ['Inadimplência', 2025, 'Fevereiro', '0'],
  ['Inadimplência', 2025, 'Março', '0'],
  ['Inadimplência', 2025, 'Abril', '0'],
  ['Inadimplência', 2025, 'Maio', '0'],
  ['Inadimplência', 2025, 'Junho', '0'],
  ['Inadimplência', 2025, 'Julho', '0'],
  ['Inadimplência', 2025, 'Agosto', '0'],
  ['Inadimplência', 2025, 'Setembro', '0'],
  ['Inadimplência', 2025, 'Outubro', '0'],
  ['Inadimplência', 2025, 'Novembro', '0'],
  ['Inadimplência', 2025, 'Dezembro', '0.32'],

  ['Mora', 2024, 'Janeiro', '17095'],
  ['Mora', 2024, 'Fevereiro', '17695'],
  ['Mora', 2024, 'Março', '17676'],
  ['Mora', 2024, 'Abril', '16702'],
  ['Mora', 2024, 'Maio', '16591'],
  ['Mora', 2024, 'Junho', '6098'],
  ['Mora', 2024, 'Julho', '5797'],
  ['Mora', 2024, 'Agosto', '5398'],
  ['Mora', 2024, 'Setembro', '4060'],
  ['Mora', 2024, 'Outubro', '2360'],
  ['Mora', 2024, 'Novembro', '2260'],

  ['Mora', 2025, 'Janeiro', '0'],
  ['Mora', 2025, 'Fevereiro', '0'],
  ['Mora', 2025, 'Março', '0'],
  ['Mora', 2025, 'Abril', '0'],
  ['Mora', 2025, 'Maio', '0'],
  ['Mora', 2025, 'Junho', '0'],
  ['Mora', 2025, 'Julho', '0'],
  ['Mora', 2025, 'Agosto', '0'],
  ['Mora', 2025, 'Setembro', '0'],
  ['Mora', 2025, 'Outubro', '0'],
  ['Mora', 2025, 'Dezembro', '211.57'],

  ['Castigado', 2024, 'Maio', '89'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],

  ['Castigado', 2025, 'Janeiro', '380'],
  ['Castigado', 2025, 'Fevereiro', '100'],
  ['Castigado', 2025, 'Março', '300'],
  ['Castigado', 2025, 'Abril', '200'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Outubro', '1']
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

  console.log('Removendo registros antigos da pessoa Altos (se existirem)...');
  await pool.query('DELETE FROM indicadores WHERE pessoa = $1', [pessoa]);

  console.log('Inserindo novos registros para Altos...');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertText = `
      INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const [categoria, ano, mes, valorBruto] of dadosAltos) {
      if (valorBruto === undefined || valorBruto === null || valorBruto === '') continue;

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

      await client.query(insertText, [
        mes,
        ano,
        mesParaOrdem(mes),
        categoria,
        pessoa,
        valorNum
      ]);
    }

    await client.query('COMMIT');
    console.log('Registros inseridos para a agente Altos.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Erro ao inserir registros para Altos:', e);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error('Erro geral no script adicionar-altos:', e);
  process.exit(1);
});

