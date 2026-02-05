// Script para adicionar em lote os dados do agente "Carlos" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-carlos.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

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
const dadosCarlos = [
  // Carteira Ativa
  ['Carteira Ativa', 2024, 'Janeiro', '104709'],
  ['Carteira Ativa', 2024, 'Fevereiro', '128829'],
  ['Carteira Ativa', 2024, 'Março', '127902'],
  ['Carteira Ativa', 2024, 'Abril', '104481'],
  ['Carteira Ativa', 2024, 'Maio', '106586'],
  ['Carteira Ativa', 2024, 'Junho', '116073'],
  ['Carteira Ativa', 2024, 'Julho', '127867'],
  ['Carteira Ativa', 2024, 'Agosto', '109678'],
  ['Carteira Ativa', 2024, 'Setembro', '119563'],
  ['Carteira Ativa', 2024, 'Outubro', '122364'],
  ['Carteira Ativa', 2024, 'Novembro', '139911'],
  ['Carteira Ativa', 2024, 'Dezembro', '167636'],
  ['Carteira Ativa', 2025, 'Janeiro', '1471540'],
  ['Carteira Ativa', 2025, 'Fevereiro', '1360630'],
  ['Carteira Ativa', 2025, 'Março', '1001410'],
  ['Carteira Ativa', 2025, 'Abril', '1284540'],
  ['Carteira Ativa', 2025, 'Maio', '1407500'],
  ['Carteira Ativa', 2025, 'Junho', '1231250'],
  ['Carteira Ativa', 2025, 'Julho', '1086260'],
  ['Carteira Ativa', 2025, 'Agosto', '1142210'],
  ['Carteira Ativa', 2025, 'Setembro', '1067710'],

  // Castigado
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '299'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '200'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Clientes Ativos
  ['Clientes Ativos', 2024, 'Janeiro', '106'],
  ['Clientes Ativos', 2024, 'Fevereiro', '97'],
  ['Clientes Ativos', 2024, 'Março', '106'],
  ['Clientes Ativos', 2024, 'Abril', '95'],
  ['Clientes Ativos', 2024, 'Maio', '95'],
  ['Clientes Ativos', 2024, 'Junho', '91'],
  ['Clientes Ativos', 2024, 'Julho', '89'],
  ['Clientes Ativos', 2024, 'Agosto', '93'],
  ['Clientes Ativos', 2024, 'Setembro', '96'],
  ['Clientes Ativos', 2024, 'Outubro', '93'],
  ['Clientes Ativos', 2024, 'Novembro', '92'],
  ['Clientes Ativos', 2024, 'Dezembro', '102'],
  ['Clientes Ativos', 2025, 'Janeiro', '950'],
  ['Clientes Ativos', 2025, 'Fevereiro', '940'],
  ['Clientes Ativos', 2025, 'Março', '830'],
  ['Clientes Ativos', 2025, 'Abril', '760'],
  ['Clientes Ativos', 2025, 'Maio', '830'],
  ['Clientes Ativos', 2025, 'Junho', '780'],
  ['Clientes Ativos', 2025, 'Julho', '830'],
  ['Clientes Ativos', 2025, 'Agosto', '930'],
  ['Clientes Ativos', 2025, 'Setembro', '880'],
  ['Clientes Ativos', 2025, 'Outubro', '76'],
  ['Clientes Ativos', 2025, 'Novembro', '91'],
  ['Clientes Ativos', 2025, 'Dezembro', '70'],

  // Inadimplência
  ['Inadimplência', 2024, 'Janeiro', '0,82'],
  ['Inadimplência', 2024, 'Fevereiro', '1,4'],
  ['Inadimplência', 2024, 'Março', '1,7'],
  ['Inadimplência', 2024, 'Abril', '1,89'],
  ['Inadimplência', 2024, 'Maio', '3,21'],
  ['Inadimplência', 2024, 'Junho', '1,22'],
  ['Inadimplência', 2024, 'Julho', '2,22'],
  ['Inadimplência', 2024, 'Agosto', '2,59'],
  ['Inadimplência', 2024, 'Setembro', '0,98'],
  ['Inadimplência', 2024, 'Outubro', '1,47'],
  ['Inadimplência', 2024, 'Novembro', '1,91'],
  ['Inadimplência', 2024, 'Dezembro', '3,43'],
  ['Inadimplência', 2025, 'Janeiro', '7,62'],
  ['Inadimplência', 2025, 'Fevereiro', '5,45'],
  ['Inadimplência', 2025, 'Março', '17,36'],
  ['Inadimplência', 2025, 'Abril', '14,76'],
  ['Inadimplência', 2025, 'Maio', '18,85'],
  ['Inadimplência', 2025, 'Junho', '22,32'],
  ['Inadimplência', 2025, 'Julho', '23,47'],
  ['Inadimplência', 2025, 'Agosto', '22,88'],
  ['Inadimplência', 2025, 'Setembro', '24,18'],
  ['Inadimplência', 2025, 'Outubro', '17,96'],
  ['Inadimplência', 2025, 'Novembro', '13,65'],
  ['Inadimplência', 2025, 'Dezembro', '14,7'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '3'],
  ['Inativos', 2025, 'Setembro', '1'],

  // Liberações
  ['Liberações', 2024, 'Janeiro', '48000'],
  ['Liberações', 2024, 'Fevereiro', '63200'],
  ['Liberações', 2024, 'Março', '31000'],
  ['Liberações', 2024, 'Abril', '18000'],
  ['Liberações', 2024, 'Maio', '46100'],
  ['Liberações', 2024, 'Junho', '37400'],
  ['Liberações', 2024, 'Julho', '57800'],
  ['Liberações', 2024, 'Agosto', '23000'],
  ['Liberações', 2024, 'Setembro', '51000'],
  ['Liberações', 2024, 'Outubro', '69000'],
  ['Liberações', 2024, 'Novembro', '52100'],
  ['Liberações', 2024, 'Dezembro', '71850'],
  ['Liberações', 2025, 'Janeiro', '207000'],
  ['Liberações', 2025, 'Fevereiro', '294000'],
  ['Liberações', 2025, 'Março', '0'],
  ['Liberações', 2025, 'Abril', '750000'],
  ['Liberações', 2025, 'Maio', '460000'],
  ['Liberações', 2025, 'Junho', '140000'],
  ['Liberações', 2025, 'Julho', '149000'],
  ['Liberações', 2025, 'Agosto', '388000'],
  ['Liberações', 2025, 'Setembro', '389000'],
  ['Liberações', 2025, 'Outubro', '84400'],
  ['Liberações', 2025, 'Novembro', '0'],
  ['Liberações', 2025, 'Dezembro', '11000'],

  // Mora
  ['Mora', 2024, 'Janeiro', '85999'],
  ['Mora', 2024, 'Fevereiro', '1804'],
  ['Mora', 2024, 'Março', '2272'],
  ['Mora', 2024, 'Abril', '1971'],
  ['Mora', 2024, 'Maio', '3426'],
  ['Mora', 2024, 'Junho', '1418'],
  ['Mora', 2024, 'Julho', '2843'],
  ['Mora', 2024, 'Agosto', '2843'],
  ['Mora', 2024, 'Setembro', '1176'],
  ['Mora', 2024, 'Outubro', '1801'],
  ['Mora', 2024, 'Novembro', '2671'],
  ['Mora', 2024, 'Dezembro', '5751'],
  ['Mora', 2025, 'Janeiro', '112160'],
  ['Mora', 2025, 'Fevereiro', '74160'],
  ['Mora', 2025, 'Março', '173810'],
  ['Mora', 2025, 'Abril', '189540'],
  ['Mora', 2025, 'Maio', '265330'],
  ['Mora', 2025, 'Junho', '274820'],
  ['Mora', 2025, 'Julho', '254910'],
  ['Mora', 2025, 'Agosto', '261370'],
  ['Mora', 2025, 'Setembro', '258180'],

  // Novos
  ['Novos', 2024, 'Janeiro', '11'],
  ['Novos', 2024, 'Fevereiro', '2'],
  ['Novos', 2024, 'Março', '15'],
  ['Novos', 2024, 'Abril', '3'],
  ['Novos', 2024, 'Maio', '5'],
  ['Novos', 2024, 'Junho', '1'],
  ['Novos', 2024, 'Julho', '2'],
  ['Novos', 2024, 'Agosto', '7'],
  ['Novos', 2024, 'Setembro', '4'],
  ['Novos', 2024, 'Outubro', '1'],
  ['Novos', 2024, 'Novembro', '2'],
  ['Novos', 2024, 'Dezembro', '11'],
  ['Novos', 2025, 'Janeiro', '10'],
  ['Novos', 2025, 'Fevereiro', '50'],
  ['Novos', 2025, 'Março', '0'],
  ['Novos', 2025, 'Abril', '30'],
  ['Novos', 2025, 'Maio', '10'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '70'],
  ['Novos', 2025, 'Agosto', '20'],
  ['Novos', 2025, 'Setembro', '50'],

  // Renovações
  ['Renovações', 2024, 'Janeiro', '12'],
  ['Renovações', 2024, 'Fevereiro', '31'],
  ['Renovações', 2024, 'Março', '5'],
  ['Renovações', 2024, 'Abril', '6'],
  ['Renovações', 2024, 'Maio', '12'],
  ['Renovações', 2024, 'Junho', '20'],
  ['Renovações', 2024, 'Julho', '29'],
  ['Renovações', 2024, 'Agosto', '9'],
  ['Renovações', 2024, 'Setembro', '15'],
  ['Renovações', 2024, 'Outubro', '28'],
  ['Renovações', 2024, 'Novembro', '15'],
  ['Renovações', 2024, 'Dezembro', '22'],
  ['Renovações', 2025, 'Janeiro', '120'],
  ['Renovações', 2025, 'Fevereiro', '90'],
  ['Renovações', 2025, 'Março', '0'],
  ['Renovações', 2025, 'Abril', '140'],
  ['Renovações', 2025, 'Maio', '270'],
  ['Renovações', 2025, 'Junho', '50'],
  ['Renovações', 2025, 'Julho', '40'],
  ['Renovações', 2025, 'Agosto', '200'],
  ['Renovações', 2025, 'Setembro', '140']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Carlos para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosCarlos) {
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

console.log(`✅ Registros inseridos para o agente ${pessoa}.`);
db.close();
