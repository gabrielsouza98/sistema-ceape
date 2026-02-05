// Script para adicionar em lote os dados da agente "Arlene" (Coordenador Anaídia)
// Uso (na pasta do projeto):
//   node adicionar-arlene.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Arlene';

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
const dadosArlene = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '308.177'],
  ['Carteira Ativa', 2023, 'Agosto', '369.239'],
  ['Carteira Ativa', 2023, 'Setembro', '352.399'],
  ['Carteira Ativa', 2023, 'Outubro', '318.081'],
  ['Carteira Ativa', 2023, 'Novembro', '408.181'],
  ['Carteira Ativa', 2023, 'Dezembro', '344.474'],
  ['Carteira Ativa', 2024, 'Janeiro', '346.138'],
  ['Carteira Ativa', 2024, 'Fevereiro', '373.134'],
  ['Carteira Ativa', 2024, 'Março', '434.398'],
  ['Carteira Ativa', 2024, 'Abril', '363.942'],
  ['Carteira Ativa', 2024, 'Maio', '367.449'],
  ['Carteira Ativa', 2024, 'Junho', '410.840'],
  ['Carteira Ativa', 2024, 'Julho', '399.892'],
  ['Carteira Ativa', 2024, 'Agosto', '376.931'],
  ['Carteira Ativa', 2024, 'Setembro', '366.732'],
  ['Carteira Ativa', 2024, 'Outubro', '356.966'],
  ['Carteira Ativa', 2024, 'Novembro', '329.494'],
  ['Carteira Ativa', 2024, 'Dezembro', '319.173'],
  ['Carteira Ativa', 2025, 'Janeiro', '324.532'],
  ['Carteira Ativa', 2025, 'Fevereiro', '274.107'],
  ['Carteira Ativa', 2025, 'Março', '322.111'],
  ['Carteira Ativa', 2025, 'Abril', '312.434'],
  ['Carteira Ativa', 2025, 'Maio', '315.003'],
  ['Carteira Ativa', 2025, 'Junho', '261.235'],
  ['Carteira Ativa', 2025, 'Julho', '319.940'],
  ['Carteira Ativa', 2025, 'Agosto', '305.498'],
  ['Carteira Ativa', 2025, 'Setembro', '276.921'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '95.200'],
  ['Liberações', 2023, 'Agosto', '119.100'],
  ['Liberações', 2023, 'Setembro', '92.400'],
  ['Liberações', 2023, 'Outubro', '99.900'],
  ['Liberações', 2023, 'Novembro', '192.800'],
  ['Liberações', 2023, 'Dezembro', '79.100'],
  ['Liberações', 2024, 'Janeiro', '109.200'],
  ['Liberações', 2024, 'Fevereiro', '153.800'],
  ['Liberações', 2024, 'Março', '182.000'],
  ['Liberações', 2024, 'Abril', '52.800'],
  ['Liberações', 2024, 'Maio', '133.600'],
  ['Liberações', 2024, 'Junho', '158.300'],
  ['Liberações', 2024, 'Julho', '126.100'],
  ['Liberações', 2024, 'Agosto', '101.900'],
  ['Liberações', 2024, 'Setembro', '116.900'],
  ['Liberações', 2024, 'Outubro', '118.450'],
  ['Liberações', 2024, 'Novembro', '85.400'],
  ['Liberações', 2024, 'Dezembro', '114.900'],
  ['Liberações', 2025, 'Janeiro', '117.500'],
  ['Liberações', 2025, 'Fevereiro', '47.400'],
  ['Liberações', 2025, 'Março', '151.200'],
  ['Liberações', 2025, 'Abril', '80.400'],
  ['Liberações', 2025, 'Maio', '107.500'],
  ['Liberações', 2025, 'Junho', '51.100'],
  ['Liberações', 2025, 'Julho', '165.300'],
  ['Liberações', 2025, 'Agosto', '58.000'],
  ['Liberações', 2025, 'Setembro', '100.900'],

  // Novos
  ['Novos', 2023, 'Janeiro', '10'],
  ['Novos', 2023, 'Agosto', '14'],
  ['Novos', 2023, 'Setembro', '7'],
  ['Novos', 2023, 'Outubro', '3'],
  ['Novos', 2023, 'Novembro', '15'],
  ['Novos', 2023, 'Dezembro', '12'],
  ['Novos', 2024, 'Janeiro', '15'],
  ['Novos', 2024, 'Fevereiro', '18'],
  ['Novos', 2024, 'Março', '17'],
  ['Novos', 2024, 'Abril', '13'],
  ['Novos', 2024, 'Maio', '13'],
  ['Novos', 2024, 'Junho', '6'],
  ['Novos', 2024, 'Julho', '8'],
  ['Novos', 2024, 'Agosto', '7'],
  ['Novos', 2024, 'Setembro', '1'],
  ['Novos', 2024, 'Outubro', '6'],
  ['Novos', 2024, 'Novembro', '3'],
  ['Novos', 2024, 'Dezembro', '6'],
  ['Novos', 2025, 'Janeiro', '1'],
  ['Novos', 2025, 'Fevereiro', '7'],
  ['Novos', 2025, 'Março', '5'],
  ['Novos', 2025, 'Abril', '2'],
  ['Novos', 2025, 'Maio', '2'],
  ['Novos', 2025, 'Junho', '6'],
  ['Novos', 2025, 'Julho', '4'],
  ['Novos', 2025, 'Agosto', '6'],
  ['Novos', 2025, 'Setembro', '1'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '37'],
  ['Renovações', 2023, 'Agosto', '43'],
  ['Renovações', 2023, 'Setembro', '26'],
  ['Renovações', 2023, 'Outubro', '32'],
  ['Renovações', 2023, 'Novembro', '49'],
  ['Renovações', 2023, 'Dezembro', '28'],
  ['Renovações', 2024, 'Janeiro', '32'],
  ['Renovações', 2024, 'Fevereiro', '42'],
  ['Renovações', 2024, 'Março', '50'],
  ['Renovações', 2024, 'Abril', '18'],
  ['Renovações', 2024, 'Maio', '41'],
  ['Renovações', 2024, 'Junho', '52'],
  ['Renovações', 2024, 'Julho', '39'],
  ['Renovações', 2024, 'Agosto', '40'],
  ['Renovações', 2024, 'Setembro', '28'],
  ['Renovações', 2024, 'Outubro', '42'],
  ['Renovações', 2024, 'Novembro', '27'],
  ['Renovações', 2024, 'Dezembro', '43'],
  ['Renovações', 2025, 'Janeiro', '25'],
  ['Renovações', 2025, 'Fevereiro', '21'],
  ['Renovações', 2025, 'Março', '42'],
  ['Renovações', 2025, 'Abril', '27'],
  ['Renovações', 2025, 'Maio', '20'],
  ['Renovações', 2025, 'Junho', '21'],
  ['Renovações', 2025, 'Julho', '39'],
  ['Renovações', 2025, 'Agosto', '21'],
  ['Renovações', 2025, 'Setembro', '22'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '249'],
  ['Clientes Ativos', 2023, 'Agosto', '253'],
  ['Clientes Ativos', 2023, 'Setembro', '250'],
  ['Clientes Ativos', 2023, 'Outubro', '235'],
  ['Clientes Ativos', 2023, 'Novembro', '247'],
  ['Clientes Ativos', 2023, 'Dezembro', '215'],
  ['Clientes Ativos', 2024, 'Janeiro', '235'],
  ['Clientes Ativos', 2024, 'Fevereiro', '247'],
  ['Clientes Ativos', 2024, 'Março', '266'],
  ['Clientes Ativos', 2024, 'Abril', '265'],
  ['Clientes Ativos', 2024, 'Maio', '266'],
  ['Clientes Ativos', 2024, 'Junho', '271'],
  ['Clientes Ativos', 2024, 'Julho', '257'],
  ['Clientes Ativos', 2024, 'Agosto', '263'],
  ['Clientes Ativos', 2024, 'Setembro', '234'],
  ['Clientes Ativos', 2024, 'Outubro', '223'],
  ['Clientes Ativos', 2024, 'Novembro', '203'],
  ['Clientes Ativos', 2024, 'Dezembro', '192'],
  ['Clientes Ativos', 2025, 'Janeiro', '186'],
  ['Clientes Ativos', 2025, 'Fevereiro', '178'],
  ['Clientes Ativos', 2025, 'Março', '182'],
  ['Clientes Ativos', 2025, 'Abril', '183'],
  ['Clientes Ativos', 2025, 'Maio', '180'],
  ['Clientes Ativos', 2025, 'Junho', '173'],
  ['Clientes Ativos', 2025, 'Julho', '174'],
  ['Clientes Ativos', 2025, 'Agosto', '172'],
  ['Clientes Ativos', 2025, 'Setembro', '156'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '6,0'],
  ['Inadimplência', 2023, 'Agosto', '10,6'],
  ['Inadimplência', 2023, 'Setembro', '11,2'],
  ['Inadimplência', 2023, 'Outubro', '12,4'],
  ['Inadimplência', 2023, 'Novembro', '11,3'],
  ['Inadimplência', 2023, 'Dezembro', '8,2'],
  ['Inadimplência', 2024, 'Janeiro', '10,3'],
  ['Inadimplência', 2024, 'Fevereiro', '10,3'],
  ['Inadimplência', 2024, 'Março', '9,2'],
  ['Inadimplência', 2024, 'Abril', '12,3'],
  ['Inadimplência', 2024, 'Maio', '14,0'],
  ['Inadimplência', 2024, 'Junho', '12,8'],
  ['Inadimplência', 2024, 'Julho', '12,7'],
  ['Inadimplência', 2024, 'Agosto', '13,6'],
  ['Inadimplência', 2024, 'Setembro', '13,4'],
  ['Inadimplência', 2024, 'Outubro', '12,9'],
  ['Inadimplência', 2024, 'Novembro', '15,8'],
  ['Inadimplência', 2024, 'Dezembro', '10,1'],
  ['Inadimplência', 2025, 'Janeiro', '10,0'],
  ['Inadimplência', 2025, 'Fevereiro', '12,6'],
  ['Inadimplência', 2025, 'Março', '11,6'],
  ['Inadimplência', 2025, 'Abril', '13,0'],
  ['Inadimplência', 2025, 'Maio', '13,0'],
  ['Inadimplência', 2025, 'Junho', '14,1'],
  ['Inadimplência', 2025, 'Julho', '10,3'],
  ['Inadimplência', 2025, 'Agosto', '10,3'],
  ['Inadimplência', 2025, 'Setembro', '7,4'],

  // Mora
  ['Mora', 2023, 'Janeiro', '18.465'],
  ['Mora', 2023, 'Setembro', '37.026'],
  ['Mora', 2023, 'Outubro', '39.321'],
  ['Mora', 2023, 'Novembro', '46.278'],
  ['Mora', 2023, 'Dezembro', '28.199'],
  ['Mora', 2024, 'Janeiro', '35.592'],
  ['Mora', 2024, 'Fevereiro', '38.314'],
  ['Mora', 2024, 'Março', '40.140'],
  ['Mora', 2024, 'Abril', '44.917'],
  ['Mora', 2024, 'Maio', '51.441'],
  ['Mora', 2024, 'Junho', '52.714'],
  ['Mora', 2024, 'Julho', '50.830'],
  ['Mora', 2024, 'Agosto', '51.253'],
  ['Mora', 2024, 'Setembro', '49.076'],
  ['Mora', 2024, 'Outubro', '46.026'],
  ['Mora', 2024, 'Novembro', '52.095'],
  ['Mora', 2024, 'Dezembro', '32.317'],
  ['Mora', 2025, 'Janeiro', '32.892'],
  ['Mora', 2025, 'Fevereiro', '34.579'],
  ['Mora', 2025, 'Março', '37.425'],
  ['Mora', 2025, 'Abril', '40.524'],
  ['Mora', 2025, 'Maio', '43.134'],
  ['Mora', 2025, 'Junho', '36.788'],
  ['Mora', 2025, 'Julho', '33.025'],
  ['Mora', 2025, 'Agosto', '31.560'],
  ['Mora', 2025, 'Setembro', '20.615'],

  // Castigado
  ['Castigado', 2023, 'Setembro', '200'],
  ['Castigado', 2023, 'Outubro', '250'],
  ['Castigado', 2023, 'Novembro', '2.137'],
  ['Castigado', 2023, 'Dezembro', '840'],
  ['Castigado', 2024, 'Janeiro', '493'],
  ['Castigado', 2024, 'Fevereiro', '478'],
  ['Castigado', 2024, 'Março', '520'],
  ['Castigado', 2024, 'Abril', '200'],
  ['Castigado', 2024, 'Maio', '420'],
  ['Castigado', 2024, 'Junho', '587'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '150'],
  ['Castigado', 2024, 'Setembro', '150'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '650'],
  ['Castigado', 2025, 'Janeiro', '0'],
  ['Castigado', 2025, 'Fevereiro', '340'],
  ['Castigado', 2025, 'Março', '440'],
  ['Castigado', 2025, 'Abril', '240'],
  ['Castigado', 2025, 'Maio', '300'],
  ['Castigado', 2025, 'Junho', '160'],
  ['Castigado', 2025, 'Julho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '4'],
  ['Inativos', 2025, 'Setembro', '2'],

  // ajustes finais 2025
  ['Carteira Ativa', 2025, 'Outubro', '259.901'],
  ['Carteira Ativa', 2025, 'Novembro', '305.229'],
  ['Clientes Ativos', 2025, 'Outubro', '160'],
  ['Clientes Ativos', 2025, 'Novembro', '163'],
  ['Inadimplência', 2025, 'Outubro', '7,6'],
  ['Inadimplência', 2025, 'Novembro', '6,76'],
  ['Liberações', 2025, 'Outubro', '79.650'],
  ['Liberações', 2025, 'Novembro', '131.400'],
  ['Liberações', 2025, 'Dezembro', '34.100'],
  ['Carteira Ativa', 2025, 'Dezembro', '282.771'],
  ['Clientes Ativos', 2025, 'Dezembro', '160'],
  ['Inadimplência', 2025, 'Dezembro', '5,9']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Arlene para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosArlene) {
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

console.log(`✅ Registros inseridos para a agente ${pessoa}.`);
db.close();

