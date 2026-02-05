// Script para adicionar em lote os dados do agente "Rangel"
// Uso (na pasta do projeto):
//   node adicionar-rangel.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Rangel';

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
const dadosRangel = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '277181'],
  ['Carteira Ativa', 2023, 'Julho', '212451'],
  ['Carteira Ativa', 2023, 'Agosto', '237212'],
  ['Carteira Ativa', 2023, 'Setembro', '248421'],
  ['Carteira Ativa', 2023, 'Outubro', '212591'],
  ['Carteira Ativa', 2023, 'Novembro', '217737'],
  ['Carteira Ativa', 2023, 'Dezembro', '229841'],
  ['Carteira Ativa', 2024, 'Janeiro', '204249'],
  ['Carteira Ativa', 2024, 'Fevereiro', '168097'],
  ['Carteira Ativa', 2024, 'Março', '158797'],
  ['Carteira Ativa', 2024, 'Abril', '201849'],
  ['Carteira Ativa', 2024, 'Maio', '186953'],
  ['Carteira Ativa', 2024, 'Junho', '156241'],
  ['Carteira Ativa', 2024, 'Julho', '157263'],
  ['Carteira Ativa', 2024, 'Agosto', '190237'],
  ['Carteira Ativa', 2024, 'Setembro', '192446'],
  ['Carteira Ativa', 2024, 'Outubro', '210444'],
  ['Carteira Ativa', 2024, 'Novembro', '205718'],
  ['Carteira Ativa', 2024, 'Dezembro', '220119'],
  ['Carteira Ativa', 2025, 'Janeiro', '225082'],
  ['Carteira Ativa', 2025, 'Fevereiro', '241879'],
  ['Carteira Ativa', 2025, 'Março', '248555'],
  ['Carteira Ativa', 2025, 'Abril', '196387'],
  ['Carteira Ativa', 2025, 'Maio', '194048'],
  ['Carteira Ativa', 2025, 'Junho', '208334'],
  ['Carteira Ativa', 2025, 'Julho', '223745'],
  ['Carteira Ativa', 2025, 'Agosto', '224792'],
  ['Carteira Ativa', 2025, 'Setembro', '235697'],
  ['Carteira Ativa', 2025, 'Outubro', '218693'],
  ['Carteira Ativa', 2025, 'Novembro', '256260'],
  ['Carteira Ativa', 2025, 'Dezembro', '270726'],
  ['Carteira Ativa', 2026, 'Janeiro', '263625'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '148450'],
  ['Liberações', 2023, 'Julho', '168200'],
  ['Liberações', 2023, 'Agosto', '82500'],
  ['Liberações', 2023, 'Setembro', '60900'],
  ['Liberações', 2023, 'Outubro', '49100'],
  ['Liberações', 2023, 'Novembro', '68800'],
  ['Liberações', 2023, 'Dezembro', '89000'],
  ['Liberações', 2024, 'Janeiro', '43500'],
  ['Liberações', 2024, 'Fevereiro', '36600'],
  ['Liberações', 2024, 'Março', '39900'],
  ['Liberações', 2024, 'Abril', '110000'],
  ['Liberações', 2024, 'Maio', '41600'],
  ['Liberações', 2024, 'Junho', '30400'],
  ['Liberações', 2024, 'Julho', '70900'],
  ['Liberações', 2024, 'Agosto', '88800'],
  ['Liberações', 2024, 'Setembro', '76200'],
  ['Liberações', 2024, 'Outubro', '75100'],
  ['Liberações', 2024, 'Novembro', '62800'],
  ['Liberações', 2024, 'Dezembro', '107200'],
  ['Liberações', 2025, 'Janeiro', '80100'],
  ['Liberações', 2025, 'Fevereiro', '87200'],
  ['Liberações', 2025, 'Março', '82500'],
  ['Liberações', 2025, 'Abril', '51700'],
  ['Liberações', 2025, 'Maio', '70300'],
  ['Liberações', 2025, 'Junho', '81800'],
  ['Liberações', 2025, 'Julho', '89800'],
  ['Liberações', 2025, 'Agosto', '70900'],
  ['Liberações', 2025, 'Setembro', '83800'],
  ['Liberações', 2025, 'Outubro', '58900'],
  ['Liberações', 2025, 'Novembro', '113100'],
  ['Liberações', 2025, 'Dezembro', '98200'],
  ['Liberações', 2026, 'Janeiro', '80400'],

  // Novos
  ['Novos', 2023, 'Janeiro', '7'],
  ['Novos', 2023, 'Julho', '3'],
  ['Novos', 2023, 'Agosto', '6'],
  ['Novos', 2023, 'Setembro', '7'],
  ['Novos', 2023, 'Outubro', '4'],
  ['Novos', 2023, 'Novembro', '6'],
  ['Novos', 2023, 'Dezembro', '12'],
  ['Novos', 2024, 'Janeiro', '1'],
  ['Novos', 2024, 'Fevereiro', '6'],
  ['Novos', 2024, 'Março', '2'],
  ['Novos', 2024, 'Abril', '4'],
  ['Novos', 2024, 'Maio', '1'],
  ['Novos', 2024, 'Junho', '2'],
  ['Novos', 2024, 'Julho', '5'],
  ['Novos', 2024, 'Agosto', '3'],
  ['Novos', 2024, 'Setembro', '2'],
  ['Novos', 2024, 'Outubro', '7'],
  ['Novos', 2024, 'Novembro', '11'],
  ['Novos', 2024, 'Dezembro', '13'],
  ['Novos', 2025, 'Janeiro', '2'],
  ['Novos', 2025, 'Fevereiro', '3'],
  ['Novos', 2025, 'Março', '3'],
  ['Novos', 2025, 'Abril', '4'],
  ['Novos', 2025, 'Maio', '1'],
  ['Novos', 2025, 'Junho', '4'],
  ['Novos', 2025, 'Julho', '2'],
  ['Novos', 2025, 'Agosto', '9'],
  ['Novos', 2025, 'Setembro', '2'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '41'],
  ['Renovações', 2023, 'Julho', '16'],
  ['Renovações', 2023, 'Agosto', '24'],
  ['Renovações', 2023, 'Setembro', '20'],
  ['Renovações', 2023, 'Outubro', '12'],
  ['Renovações', 2023, 'Novembro', '27'],
  ['Renovações', 2023, 'Dezembro', '27'],
  ['Renovações', 2024, 'Janeiro', '15'],
  ['Renovações', 2024, 'Fevereiro', '12'],
  ['Renovações', 2024, 'Março', '13'],
  ['Renovações', 2024, 'Abril', '42'],
  ['Renovações', 2024, 'Maio', '19'],
  ['Renovações', 2024, 'Junho', '15'],
  ['Renovações', 2024, 'Julho', '26'],
  ['Renovações', 2024, 'Agosto', '34'],
  ['Renovações', 2024, 'Setembro', '32'],
  ['Renovações', 2024, 'Outubro', '22'],
  ['Renovações', 2024, 'Novembro', '23'],
  ['Renovações', 2024, 'Dezembro', '29'],
  ['Renovações', 2025, 'Janeiro', '37'],
  ['Renovações', 2025, 'Fevereiro', '26'],
  ['Renovações', 2025, 'Março', '27'],
  ['Renovações', 2025, 'Abril', '13'],
  ['Renovações', 2025, 'Maio', '30'],
  ['Renovações', 2025, 'Junho', '28'],
  ['Renovações', 2025, 'Julho', '35'],
  ['Renovações', 2025, 'Agosto', '18'],
  ['Renovações', 2025, 'Setembro', '32'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '150'],
  ['Clientes Ativos', 2023, 'Julho', '141'],
  ['Clientes Ativos', 2023, 'Agosto', '149'],
  ['Clientes Ativos', 2023, 'Setembro', '157'],
  ['Clientes Ativos', 2023, 'Outubro', '158'],
  ['Clientes Ativos', 2023, 'Novembro', '154'],
  ['Clientes Ativos', 2023, 'Dezembro', '137'],
  ['Clientes Ativos', 2024, 'Janeiro', '126'],
  ['Clientes Ativos', 2024, 'Fevereiro', '133'],
  ['Clientes Ativos', 2024, 'Março', '137'],
  ['Clientes Ativos', 2024, 'Abril', '127'],
  ['Clientes Ativos', 2024, 'Maio', '131'],
  ['Clientes Ativos', 2024, 'Junho', '125'],
  ['Clientes Ativos', 2024, 'Julho', '126'],
  ['Clientes Ativos', 2024, 'Agosto', '133'],
  ['Clientes Ativos', 2024, 'Setembro', '118'],
  ['Clientes Ativos', 2024, 'Outubro', '135'],
  ['Clientes Ativos', 2024, 'Novembro', '152'],
  ['Clientes Ativos', 2024, 'Dezembro', '141'],
  ['Clientes Ativos', 2025, 'Janeiro', '145'],
  ['Clientes Ativos', 2025, 'Fevereiro', '148'],
  ['Clientes Ativos', 2025, 'Março', '154'],
  ['Clientes Ativos', 2025, 'Abril', '145'],
  ['Clientes Ativos', 2025, 'Maio', '136'],
  ['Clientes Ativos', 2025, 'Junho', '135'],
  ['Clientes Ativos', 2025, 'Julho', '139'],
  ['Clientes Ativos', 2025, 'Agosto', '151'],
  ['Clientes Ativos', 2025, 'Setembro', '157'],
  ['Clientes Ativos', 2025, 'Outubro', '165'],
  ['Clientes Ativos', 2025, 'Novembro', '156'],
  ['Clientes Ativos', 2025, 'Dezembro', '155'],
  ['Clientes Ativos', 2026, 'Janeiro', '158'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '8,08'],
  ['Inadimplência', 2023, 'Julho', '15,87'],
  ['Inadimplência', 2023, 'Agosto', '14,72'],
  ['Inadimplência', 2023, 'Setembro', '14,92'],
  ['Inadimplência', 2023, 'Outubro', '21,77'],
  ['Inadimplência', 2023, 'Novembro', '24,95'],
  ['Inadimplência', 2023, 'Dezembro', '13,82'],
  ['Inadimplência', 2024, 'Janeiro', '15,22'],
  ['Inadimplência', 2024, 'Fevereiro', '12,59'],
  ['Inadimplência', 2024, 'Março', '15,55'],
  ['Inadimplência', 2024, 'Abril', '12,75'],
  ['Inadimplência', 2024, 'Maio', '12,4'],
  ['Inadimplência', 2024, 'Junho', '11,98'],
  ['Inadimplência', 2024, 'Julho', '8,77'],
  ['Inadimplência', 2024, 'Agosto', '6,55'],
  ['Inadimplência', 2024, 'Setembro', '4,27'],
  ['Inadimplência', 2024, 'Outubro', '3,6'],
  ['Inadimplência', 2024, 'Novembro', '3,38'],
  ['Inadimplência', 2024, 'Dezembro', '0,95'],
  ['Inadimplência', 2025, 'Janeiro', '0,09'],
  ['Inadimplência', 2025, 'Fevereiro', '1,34'],
  ['Inadimplência', 2025, 'Março', '3,44'],
  ['Inadimplência', 2025, 'Abril', '6,97'],
  ['Inadimplência', 2025, 'Maio', '8,88'],
  ['Inadimplência', 2025, 'Junho', '8,56'],
  ['Inadimplência', 2025, 'Julho', '7,29'],
  ['Inadimplência', 2025, 'Agosto', '8,32'],
  ['Inadimplência', 2025, 'Setembro', '7,73'],
  ['Inadimplência', 2025, 'Outubro', '7,87'],
  ['Inadimplência', 2025, 'Novembro', '6,01'],
  ['Inadimplência', 2025, 'Dezembro', '5,65'],
  ['Inadimplência', 2026, 'Janeiro', '4,74'],

  // Mora
  ['Mora', 2023, 'Janeiro', '22416'],
  ['Mora', 2023, 'Julho', '33726'],
  ['Mora', 2023, 'Agosto', '34926'],
  ['Mora', 2023, 'Setembro', '37067'],
  ['Mora', 2023, 'Outubro', '46284'],
  ['Mora', 2023, 'Novembro', '54327'],
  ['Mora', 2023, 'Dezembro', '31766'],
  ['Mora', 2024, 'Janeiro', '31079'],
  ['Mora', 2024, 'Fevereiro', '21167'],
  ['Mora', 2024, 'Março', '24692'],
  ['Mora', 2024, 'Abril', '25734'],
  ['Mora', 2024, 'Maio', '23189'],
  ['Mora', 2024, 'Junho', '18711'],
  ['Mora', 2024, 'Julho', '13788'],
  ['Mora', 2024, 'Agosto', '12457'],
  ['Mora', 2024, 'Setembro', '8214'],
  ['Mora', 2024, 'Outubro', '7584'],
  ['Mora', 2024, 'Novembro', '6954'],
  ['Mora', 2024, 'Dezembro', '2094'],
  ['Mora', 2025, 'Janeiro', '195'],
  ['Mora', 2025, 'Fevereiro', '3237'],
  ['Mora', 2025, 'Março', '8560'],
  ['Mora', 2025, 'Abril', '13697'],
  ['Mora', 2025, 'Maio', '17221'],
  ['Mora', 2025, 'Junho', '17826'],
  ['Mora', 2025, 'Julho', '16312'],
  ['Mora', 2025, 'Agosto', '18701'],
  ['Mora', 2025, 'Setembro', '18222'],
  ['Mora', 2025, 'Outubro', '17220'],
  ['Mora', 2025, 'Novembro', '15388'],

  // Castigado
  ['Castigado', 2023, 'Janeiro', '433,93'],
  ['Castigado', 2023, 'Julho', '100'],
  ['Castigado', 2023, 'Agosto', '0'],
  ['Castigado', 2023, 'Setembro', '0'],
  ['Castigado', 2023, 'Outubro', '0'],
  ['Castigado', 2023, 'Novembro', '424,4'],
  ['Castigado', 2023, 'Dezembro', '568'],
  ['Castigado', 2024, 'Janeiro', '0'],
  ['Castigado', 2024, 'Fevereiro', '1250'],
  ['Castigado', 2024, 'Março', '0'],
  ['Castigado', 2024, 'Abril', '0'],
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '179'],
  ['Castigado', 2024, 'Agosto', '969'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '119'],
  ['Castigado', 2025, 'Janeiro', '0'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Maio', '0'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Julho', '100'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],
  ['Castigado', 2025, 'Outubro', '0']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  for (const [categoria, ano, mes, valorBruto] of dadosRangel) {
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
