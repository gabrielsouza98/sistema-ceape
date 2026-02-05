// Script para adicionar em lote os dados do agente "Josiel"
// Uso (na pasta do projeto):
//   node adicionar-josiel.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

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
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '230794'],
  ['Carteira Ativa', 2023, 'Julho', '285577'],
  ['Carteira Ativa', 2023, 'Agosto', '317852'],
  ['Carteira Ativa', 2023, 'Setembro', '346861'],
  ['Carteira Ativa', 2023, 'Outubro', '326506'],
  ['Carteira Ativa', 2023, 'Novembro', '295394'],
  ['Carteira Ativa', 2023, 'Dezembro', '335788'],
  ['Carteira Ativa', 2024, 'Janeiro', '303399'],
  ['Carteira Ativa', 2024, 'Fevereiro', '307141'],
  ['Carteira Ativa', 2024, 'Março', '282564'],
  ['Carteira Ativa', 2024, 'Abril', '315568'],
  ['Carteira Ativa', 2024, 'Maio', '287909'],
  ['Carteira Ativa', 2024, 'Junho', '305543'],
  ['Carteira Ativa', 2024, 'Julho', '292015'],
  ['Carteira Ativa', 2024, 'Agosto', '310625'],
  ['Carteira Ativa', 2024, 'Setembro', '256014'],
  ['Carteira Ativa', 2024, 'Outubro', '301910'],
  ['Carteira Ativa', 2024, 'Novembro', '308756'],
  ['Carteira Ativa', 2024, 'Dezembro', '314784'],
  ['Carteira Ativa', 2025, 'Janeiro', '297421'],
  ['Carteira Ativa', 2025, 'Fevereiro', '316835'],
  ['Carteira Ativa', 2025, 'Março', '293041'],
  ['Carteira Ativa', 2025, 'Abril', '337275'],
  ['Carteira Ativa', 2025, 'Maio', '324680'],
  ['Carteira Ativa', 2025, 'Junho', '301920'],
  ['Carteira Ativa', 2025, 'Julho', '315509'],
  ['Carteira Ativa', 2025, 'Agosto', '309484'],
  ['Carteira Ativa', 2025, 'Setembro', '364953'],
  ['Carteira Ativa', 2025, 'Outubro', '380456'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '43000'],
  ['Liberações', 2023, 'Julho', '135100'],
  ['Liberações', 2023, 'Agosto', '133400'],
  ['Liberações', 2023, 'Setembro', '117300'],
  ['Liberações', 2023, 'Outubro', '80300'],
  ['Liberações', 2023, 'Novembro', '91600'],
  ['Liberações', 2023, 'Dezembro', '153500'],
  ['Liberações', 2024, 'Janeiro', '72200'],
  ['Liberações', 2024, 'Fevereiro', '101000'],
  ['Liberações', 2024, 'Março', '69000'],
  ['Liberações', 2024, 'Abril', '126800'],
  ['Liberações', 2024, 'Maio', '68100'],
  ['Liberações', 2024, 'Junho', '103300'],
  ['Liberações', 2024, 'Julho', '83200'],
  ['Liberações', 2024, 'Agosto', '107100'],
  ['Liberações', 2024, 'Setembro', '33600'],
  ['Liberações', 2024, 'Outubro', '141400'],
  ['Liberações', 2024, 'Novembro', '79900'],
  ['Liberações', 2024, 'Dezembro', '119100'],
  ['Liberações', 2025, 'Janeiro', '71700'],
  ['Liberações', 2025, 'Fevereiro', '105800'],
  ['Liberações', 2025, 'Março', '80200'],
  ['Liberações', 2025, 'Abril', '143500'],
  ['Liberações', 2025, 'Maio', '91300'],
  ['Liberações', 2025, 'Junho', '75400'],
  ['Liberações', 2025, 'Julho', '115400'],
  ['Liberações', 2025, 'Agosto', '95600'],
  ['Liberações', 2025, 'Setembro', '176300'],
  ['Liberações', 2025, 'Outubro', '124100'],

  // Novos
  ['Novos', 2023, 'Janeiro', '4'],
  ['Novos', 2023, 'Julho', '14'],
  ['Novos', 2023, 'Agosto', '7'],
  ['Novos', 2023, 'Setembro', '11'],
  ['Novos', 2023, 'Outubro', '7'],
  ['Novos', 2023, 'Novembro', '13'],
  ['Novos', 2023, 'Dezembro', '8'],
  ['Novos', 2024, 'Janeiro', '4'],
  ['Novos', 2024, 'Fevereiro', '9'],
  ['Novos', 2024, 'Março', '8'],
  ['Novos', 2024, 'Abril', '5'],
  ['Novos', 2024, 'Maio', '14'],
  ['Novos', 2024, 'Junho', '4'],
  ['Novos', 2024, 'Julho', '9'],
  ['Novos', 2024, 'Agosto', '0'],
  ['Novos', 2024, 'Setembro', '2'],
  ['Novos', 2024, 'Outubro', '10'],
  ['Novos', 2024, 'Novembro', '10'],
  ['Novos', 2024, 'Dezembro', '4'],
  ['Novos', 2025, 'Janeiro', '4'],
  ['Novos', 2025, 'Fevereiro', '9'],
  ['Novos', 2025, 'Março', '0'],
  ['Novos', 2025, 'Abril', '11'],
  ['Novos', 2025, 'Maio', '4'],
  ['Novos', 2025, 'Junho', '6'],
  ['Novos', 2025, 'Julho', '11'],
  ['Novos', 2025, 'Agosto', '10'],
  ['Novos', 2025, 'Setembro', '1'],
  ['Novos', 2025, 'Outubro', '6'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '14'],
  ['Renovações', 2023, 'Julho', '44'],
  ['Renovações', 2023, 'Agosto', '41'],
  ['Renovações', 2023, 'Setembro', '36'],
  ['Renovações', 2023, 'Outubro', '29'],
  ['Renovações', 2023, 'Novembro', '24'],
  ['Renovações', 2023, 'Dezembro', '48'],
  ['Renovações', 2024, 'Janeiro', '38'],
  ['Renovações', 2024, 'Fevereiro', '21'],
  ['Renovações', 2024, 'Março', '33'],
  ['Renovações', 2024, 'Abril', '30'],
  ['Renovações', 2024, 'Maio', '29'],
  ['Renovações', 2024, 'Junho', '44'],
  ['Renovações', 2024, 'Julho', '30'],
  ['Renovações', 2024, 'Agosto', '33'],
  ['Renovações', 2024, 'Setembro', '10'],
  ['Renovações', 2024, 'Outubro', '46'],
  ['Renovações', 2024, 'Novembro', '28'],
  ['Renovações', 2024, 'Dezembro', '39'],
  ['Renovações', 2025, 'Janeiro', '28'],
  ['Renovações', 2025, 'Fevereiro', '37'],
  ['Renovações', 2025, 'Março', '22'],
  ['Renovações', 2025, 'Abril', '41'],
  ['Renovações', 2025, 'Maio', '30'],
  ['Renovações', 2025, 'Junho', '30'],
  ['Renovações', 2025, 'Julho', '36'],
  ['Renovações', 2025, 'Agosto', '38'],
  ['Renovações', 2025, 'Setembro', '43'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '172'],
  ['Clientes Ativos', 2023, 'Julho', '201'],
  ['Clientes Ativos', 2023, 'Agosto', '202'],
  ['Clientes Ativos', 2023, 'Setembro', '213'],
  ['Clientes Ativos', 2023, 'Outubro', '220'],
  ['Clientes Ativos', 2023, 'Novembro', '213'],
  ['Clientes Ativos', 2023, 'Dezembro', '200'],
  ['Clientes Ativos', 2024, 'Janeiro', '199'],
  ['Clientes Ativos', 2024, 'Fevereiro', '203'],
  ['Clientes Ativos', 2024, 'Março', '204'],
  ['Clientes Ativos', 2024, 'Abril', '207'],
  ['Clientes Ativos', 2024, 'Maio', '205'],
  ['Clientes Ativos', 2024, 'Junho', '205'],
  ['Clientes Ativos', 2024, 'Julho', '202'],
  ['Clientes Ativos', 2024, 'Agosto', '203'],
  ['Clientes Ativos', 2024, 'Setembro', '184'],
  ['Clientes Ativos', 2024, 'Outubro', '185'],
  ['Clientes Ativos', 2024, 'Novembro', '182'],
  ['Clientes Ativos', 2024, 'Dezembro', '192'],
  ['Clientes Ativos', 2025, 'Janeiro', '194'],
  ['Clientes Ativos', 2025, 'Fevereiro', '207'],
  ['Clientes Ativos', 2025, 'Março', '203'],
  ['Clientes Ativos', 2025, 'Abril', '206'],
  ['Clientes Ativos', 2025, 'Maio', '191'],
  ['Clientes Ativos', 2025, 'Junho', '198'],
  ['Clientes Ativos', 2025, 'Julho', '209'],
  ['Clientes Ativos', 2025, 'Agosto', '220'],
  ['Clientes Ativos', 2025, 'Setembro', '209'],
  ['Clientes Ativos', 2025, 'Outubro', '211'],
  ['Clientes Ativos', 2025, 'Novembro', '200'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '7,58'],
  ['Inadimplência', 2023, 'Julho', '5,66'],
  ['Inadimplência', 2023, 'Agosto', '4,18'],
  ['Inadimplência', 2023, 'Setembro', '4,58'],
  ['Inadimplência', 2023, 'Outubro', '6,55'],
  ['Inadimplência', 2023, 'Novembro', '4,7'],
  ['Inadimplência', 2023, 'Dezembro', '4,99'],
  ['Inadimplência', 2024, 'Janeiro', '5,72'],
  ['Inadimplência', 2024, 'Fevereiro', '7,84'],
  ['Inadimplência', 2024, 'Março', '9,52'],
  ['Inadimplência', 2024, 'Abril', '9,55'],
  ['Inadimplência', 2024, 'Maio', '10,51'],
  ['Inadimplência', 2024, 'Junho', '10,12'],
  ['Inadimplência', 2024, 'Julho', '12,07'],
  ['Inadimplência', 2024, 'Agosto', '11,69'],
  ['Inadimplência', 2024, 'Setembro', '14,04'],
  ['Inadimplência', 2024, 'Outubro', '12,29'],
  ['Inadimplência', 2024, 'Novembro', '12,69'],
  ['Inadimplência', 2024, 'Dezembro', '9,42'],
  ['Inadimplência', 2025, 'Janeiro', '10,36'],
  ['Inadimplência', 2025, 'Fevereiro', '10,45'],
  ['Inadimplência', 2025, 'Março', '12,08'],
  ['Inadimplência', 2025, 'Abril', '10,45'],
  ['Inadimplência', 2025, 'Maio', '9,18'],
  ['Inadimplência', 2025, 'Junho', '10,16'],
  ['Inadimplência', 2025, 'Julho', '9,98'],
  ['Inadimplência', 2025, 'Agosto', '8,35'],
  ['Inadimplência', 2025, 'Setembro', '6,1'],
  ['Inadimplência', 2025, 'Outubro', '6,66'],
  ['Inadimplência', 2025, 'Novembro', '6,72'],

  // Mora
  // (nenhuma linha de Mora específica no seu texto para Josiel)
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  for (const [categoria, ano, mes, valorBruto] of dadosJosiel) {
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

    insert.run({
      mes,
      ano,
      mes_ordem: mesParaOrdem(mes),
      categoria,
      pessoa,
      valor: valorNum
    });
  }
});

tx();

console.log(`✅ Registros inseridos para o agente ${pessoa}.`);
db.close();
