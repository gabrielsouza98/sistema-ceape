// Script para adicionar em lote os dados do agente "Eudes"
// Uso (na pasta do projeto):
//   node adicionar-eudes.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Eudes';

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
const dadosEudes = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '544516'],
  ['Carteira Ativa', 2023, 'Julho', '463047'],
  ['Carteira Ativa', 2023, 'Agosto', '498975'],
  ['Carteira Ativa', 2023, 'Setembro', '434663'],
  ['Carteira Ativa', 2023, 'Outubro', '451251'],
  ['Carteira Ativa', 2023, 'Novembro', '505095'],
  ['Carteira Ativa', 2023, 'Dezembro', '503785'],
  ['Carteira Ativa', 2024, 'Janeiro', '477495'],
  ['Carteira Ativa', 2024, 'Fevereiro', '439430'],
  ['Carteira Ativa', 2024, 'Março', '452494'],
  ['Carteira Ativa', 2024, 'Abril', '530647'],
  ['Carteira Ativa', 2024, 'Maio', '414752'],
  ['Carteira Ativa', 2024, 'Junho', '386112'],
  ['Carteira Ativa', 2024, 'Julho', '518628'],
  ['Carteira Ativa', 2024, 'Agosto', '513976'],
  ['Carteira Ativa', 2024, 'Setembro', '441410'],
  ['Carteira Ativa', 2024, 'Outubro', '392972'],
  ['Carteira Ativa', 2024, 'Novembro', '490479'],
  ['Carteira Ativa', 2024, 'Dezembro', '476603'],
  ['Carteira Ativa', 2025, 'Janeiro', '410764'],
  ['Carteira Ativa', 2025, 'Fevereiro', '427200'],
  ['Carteira Ativa', 2025, 'Março', '466048'],
  ['Carteira Ativa', 2025, 'Abril', '444989'],
  ['Carteira Ativa', 2025, 'Maio', '442427'],
  ['Carteira Ativa', 2025, 'Junho', '374371'],
  ['Carteira Ativa', 2025, 'Julho', '493989'],
  ['Carteira Ativa', 2025, 'Agosto', '498829'],
  ['Carteira Ativa', 2025, 'Setembro', '449757'],
  ['Carteira Ativa', 2025, 'Outubro', '428393'],
  ['Carteira Ativa', 2025, 'Novembro', '505823'],
  ['Carteira Ativa', 2025, 'Dezembro', '515932'],
  ['Carteira Ativa', 2026, 'Janeiro', '449426'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '191.400'],
  ['Liberações', 2023, 'Julho', '151.800'],
  ['Liberações', 2023, 'Agosto', '203.100'],
  ['Liberações', 2023, 'Setembro', '98.800'],
  ['Liberações', 2023, 'Outubro', '177.200'],
  ['Liberações', 2023, 'Novembro', '231.700'],
  ['Liberações', 2023, 'Dezembro', '184.300'],
  ['Liberações', 2024, 'Janeiro', '142.000'],
  ['Liberações', 2024, 'Fevereiro', '140.800'],
  ['Liberações', 2024, 'Março', '153.000'],
  ['Liberações', 2024, 'Abril', '257.300'],
  ['Liberações', 2024, 'Maio', '36.500'],
  ['Liberações', 2024, 'Junho', '102.500'],
  ['Liberações', 2024, 'Julho', '303.500'],
  ['Liberações', 2024, 'Agosto', '153.100'],
  ['Liberações', 2024, 'Setembro', '93.700'],
  ['Liberações', 2024, 'Outubro', '122.800'],
  ['Liberações', 2024, 'Novembro', '246.200'],
  ['Liberações', 2024, 'Dezembro', '149.500'],
  ['Liberações', 2025, 'Janeiro', '91.300'],
  ['Liberações', 2025, 'Fevereiro', '161.100'],
  ['Liberações', 2025, 'Março', '195.000'],
  ['Liberações', 2025, 'Abril', '131.250'],
  ['Liberações', 2025, 'Maio', '150.600'],
  ['Liberações', 2025, 'Junho', '89.700'],
  ['Liberações', 2025, 'Julho', '290.700'],
  ['Liberações', 2025, 'Agosto', '168.650'],
  ['Liberações', 2025, 'Setembro', '121.900'],
  ['Liberações', 2025, 'Outubro', '145.800'],
  ['Liberações', 2025, 'Novembro', '234.400'],
  ['Liberações', 2025, 'Dezembro', '194.300'],
  ['Liberações', 2026, 'Janeiro', '97.500'],

  // Novos
  ['Novos', 2023, 'Janeiro', '4'],
  ['Novos', 2023, 'Julho', '11'],
  ['Novos', 2023, 'Agosto', '5'],
  ['Novos', 2023, 'Setembro', '18'],
  ['Novos', 2023, 'Outubro', '12'],
  ['Novos', 2023, 'Novembro', '8'],
  ['Novos', 2023, 'Dezembro', '6'],
  ['Novos', 2024, 'Janeiro', '11'],
  ['Novos', 2024, 'Fevereiro', '9'],
  ['Novos', 2024, 'Março', '2'],
  ['Novos', 2024, 'Abril', '9'],
  ['Novos', 2024, 'Maio', '0'],
  ['Novos', 2024, 'Junho', '3'],
  ['Novos', 2024, 'Julho', '2'],
  ['Novos', 2024, 'Agosto', '5'],
  ['Novos', 2024, 'Setembro', '5'],
  ['Novos', 2024, 'Outubro', '5'],
  ['Novos', 2024, 'Novembro', '3'],
  ['Novos', 2024, 'Dezembro', '7'],
  ['Novos', 2025, 'Janeiro', '10'],
  ['Novos', 2025, 'Fevereiro', '9'],
  ['Novos', 2025, 'Março', '4'],
  ['Novos', 2025, 'Abril', '7'],
  ['Novos', 2025, 'Maio', '6'],
  ['Novos', 2025, 'Junho', '3'],
  ['Novos', 2025, 'Julho', '14'],
  ['Novos', 2025, 'Agosto', '5'],
  ['Novos', 2025, 'Setembro', '4'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '55'],
  ['Renovações', 2023, 'Julho', '47'],
  ['Renovações', 2023, 'Agosto', '58'],
  ['Renovações', 2023, 'Setembro', '28'],
  ['Renovações', 2023, 'Outubro', '46'],
  ['Renovações', 2023, 'Novembro', '67'],
  ['Renovações', 2023, 'Dezembro', '55'],
  ['Renovações', 2024, 'Janeiro', '37'],
  ['Renovações', 2024, 'Fevereiro', '43'],
  ['Renovações', 2024, 'Março', '51'],
  ['Renovações', 2024, 'Abril', '69'],
  ['Renovações', 2024, 'Maio', '17'],
  ['Renovações', 2024, 'Junho', '34'],
  ['Renovações', 2024, 'Julho', '74'],
  ['Renovações', 2024, 'Agosto', '54'],
  ['Renovações', 2024, 'Setembro', '28'],
  ['Renovações', 2024, 'Outubro', '41'],
  ['Renovações', 2024, 'Novembro', '64'],
  ['Renovações', 2024, 'Dezembro', '46'],
  ['Renovações', 2025, 'Janeiro', '28'],
  ['Renovações', 2025, 'Fevereiro', '34'],
  ['Renovações', 2025, 'Março', '63'],
  ['Renovações', 2025, 'Abril', '33'],
  ['Renovações', 2025, 'Maio', '51'],
  ['Renovações', 2025, 'Junho', '29'],
  ['Renovações', 2025, 'Julho', '66'],
  ['Renovações', 2025, 'Agosto', '50'],
  ['Renovações', 2025, 'Setembro', '39'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '277'],
  ['Clientes Ativos', 2023, 'Julho', '251'],
  ['Clientes Ativos', 2023, 'Agosto', '250'],
  ['Clientes Ativos', 2023, 'Setembro', '264'],
  ['Clientes Ativos', 2023, 'Outubro', '276'],
  ['Clientes Ativos', 2023, 'Novembro', '272'],
  ['Clientes Ativos', 2023, 'Dezembro', '250'],
  ['Clientes Ativos', 2024, 'Janeiro', '258'],
  ['Clientes Ativos', 2024, 'Fevereiro', '256'],
  ['Clientes Ativos', 2024, 'Março', '256'],
  ['Clientes Ativos', 2024, 'Abril', '257'],
  ['Clientes Ativos', 2024, 'Maio', '243'],
  ['Clientes Ativos', 2024, 'Junho', '240'],
  ['Clientes Ativos', 2024, 'Julho', '236'],
  ['Clientes Ativos', 2024, 'Agosto', '241'],
  ['Clientes Ativos', 2024, 'Setembro', '233'],
  ['Clientes Ativos', 2024, 'Outubro', '237'],
  ['Clientes Ativos', 2024, 'Novembro', '239'],
  ['Clientes Ativos', 2024, 'Dezembro', '230'],
  ['Clientes Ativos', 2025, 'Janeiro', '229'],
  ['Clientes Ativos', 2025, 'Fevereiro', '237'],
  ['Clientes Ativos', 2025, 'Março', '239'],
  ['Clientes Ativos', 2025, 'Abril', '233'],
  ['Clientes Ativos', 2025, 'Maio', '243'],
  ['Clientes Ativos', 2025, 'Junho', '242'],
  ['Clientes Ativos', 2025, 'Julho', '244'],
  ['Clientes Ativos', 2025, 'Agosto', '239'],
  ['Clientes Ativos', 2025, 'Setembro', '233'],
  ['Clientes Ativos', 2025, 'Outubro', '240'],
  ['Clientes Ativos', 2025, 'Novembro', '237'],
  ['Clientes Ativos', 2025, 'Dezembro', '238'],
  ['Clientes Ativos', 2026, 'Janeiro', '232'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '4,62'],
  ['Inadimplência', 2023, 'Julho', '5,26'],
  ['Inadimplência', 2023, 'Agosto', '4,61'],
  ['Inadimplência', 2023, 'Setembro', '4,64'],
  ['Inadimplência', 2023, 'Outubro', '4,94'],
  ['Inadimplência', 2023, 'Novembro', '4,79'],
  ['Inadimplência', 2023, 'Dezembro', '1,74'],
  ['Inadimplência', 2024, 'Janeiro', '2,56'],
  ['Inadimplência', 2024, 'Fevereiro', '3,92'],
  ['Inadimplência', 2024, 'Março', '5,12'],
  ['Inadimplência', 2024, 'Abril', '5,02'],
  ['Inadimplência', 2024, 'Maio', '7,42'],
  ['Inadimplência', 2024, 'Junho', '9,32'],
  ['Inadimplência', 2024, 'Julho', '6,64'],
  ['Inadimplência', 2024, 'Agosto', '6,4'],
  ['Inadimplência', 2024, 'Setembro', '6,89'],
  ['Inadimplência', 2024, 'Outubro', '7,64'],
  ['Inadimplência', 2024, 'Novembro', '6,5'],
  ['Inadimplência', 2024, 'Dezembro', '6,65'],
  ['Inadimplência', 2025, 'Janeiro', '7,87'],
  ['Inadimplência', 2025, 'Fevereiro', '7,77'],
  ['Inadimplência', 2025, 'Março', '8,05'],
  ['Inadimplência', 2025, 'Abril', '8,36'],
  ['Inadimplência', 2025, 'Maio', '7,44'],
  ['Inadimplência', 2025, 'Junho', '6,07'],
  ['Inadimplência', 2025, 'Julho', '3,09'],
  ['Inadimplência', 2025, 'Agosto', '2,07'],
  ['Inadimplência', 2025, 'Setembro', '2,13'],
  ['Inadimplência', 2025, 'Outubro', '2,83'],
  ['Inadimplência', 2025, 'Novembro', '2,28'],
  ['Inadimplência', 2025, 'Dezembro', '1,77'],
  ['Inadimplência', 2026, 'Janeiro', '2,47'],

  // Mora
  ['Mora', 2023, 'Janeiro', '25163'],
  ['Mora', 2023, 'Julho', '24347'],
  ['Mora', 2023, 'Agosto', '23001'],
  ['Mora', 2023, 'Setembro', '22787'],
  ['Mora', 2023, 'Outubro', '22289'],
  ['Mora', 2023, 'Novembro', '24205'],
  ['Mora', 2023, 'Dezembro', '8772'],
  ['Mora', 2024, 'Janeiro', '12230'],
  ['Mora', 2024, 'Fevereiro', '17205'],
  ['Mora', 2024, 'Março', '23159'],
  ['Mora', 2024, 'Abril', '26644'],
  ['Mora', 2024, 'Maio', '30791'],
  ['Mora', 2024, 'Junho', '35992'],
  ['Mora', 2024, 'Julho', '34455'],
  ['Mora', 2024, 'Agosto', '32888'],
  ['Mora', 2024, 'Setembro', '30418'],
  ['Mora', 2024, 'Outubro', '30022'],
  ['Mora', 2024, 'Novembro', '31905'],
  ['Mora', 2024, 'Dezembro', '31713'],
  ['Mora', 2025, 'Janeiro', '32315'],
  ['Mora', 2025, 'Fevereiro', '33190'],
  ['Mora', 2025, 'Março', '37510'],
  ['Mora', 2025, 'Abril', '37209'],
  ['Mora', 2025, 'Maio', '32900'],
  ['Mora', 2025, 'Junho', '22736'],
  ['Mora', 2025, 'Julho', '15267'],
  ['Mora', 2025, 'Agosto', '10314'],
  ['Mora', 2025, 'Setembro', '9600'],

  // Castigado
  ['Castigado', 2023, 'Julho', '352'],
  ['Castigado', 2024, 'Janeiro', '908'],
  ['Castigado', 2024, 'Março', '420'],
  ['Castigado', 2024, 'Abril', '0'],
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '49'],
  ['Castigado', 2024, 'Outubro', '289'],
  ['Castigado', 2025, 'Fevereiro', '750'],
  ['Castigado', 2025, 'Abril', '1000'],
  ['Castigado', 2025, 'Julho', '50'],
  ['Castigado', 2025, 'Outubro', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '6'],
  ['Inativos', 2025, 'Setembro', '3'],
  ['Inativos', 2025, 'Outubro', '0']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  for (const [categoria, ano, mes, valorBruto] of dadosEudes) {
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
