// Script para adicionar em lote os dados do agente "Helio" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-helio.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Helio';

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
const dadosHelio = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Julho', '242.653'],
  ['Carteira Ativa', 2023, 'Agosto', '272.355'],
  ['Carteira Ativa', 2023, 'Setembro', '296.222'],
  ['Carteira Ativa', 2023, 'Outubro', '299.448'],
  ['Carteira Ativa', 2023, 'Novembro', '268.599'],
  ['Carteira Ativa', 2023, 'Dezembro', '287.649'],
  ['Carteira Ativa', 2024, 'Janeiro', '2.482.580'],
  ['Carteira Ativa', 2024, 'Fevereiro', '3.014.750'],
  ['Carteira Ativa', 2024, 'Março', '2.618.460'],
  ['Carteira Ativa', 2024, 'Abril', '2.659.380'],
  ['Carteira Ativa', 2024, 'Maio', '2.431.850'],
  ['Carteira Ativa', 2024, 'Junho', '2.618.970'],
  ['Carteira Ativa', 2024, 'Julho', '2.646.520'],
  ['Carteira Ativa', 2024, 'Agosto', '2.511.650'],
  ['Carteira Ativa', 2024, 'Setembro', '2.669.760'],
  ['Carteira Ativa', 2024, 'Outubro', '2.790.250'],
  ['Carteira Ativa', 2024, 'Novembro', '2.929.560'],
  ['Carteira Ativa', 2024, 'Dezembro', '2.895.960'],
  ['Carteira Ativa', 2025, 'Janeiro', '283.696'],
  ['Carteira Ativa', 2025, 'Fevereiro', '268.081'],
  ['Carteira Ativa', 2025, 'Março', '245.421'],
  ['Carteira Ativa', 2025, 'Abril', '286.614'],
  ['Carteira Ativa', 2025, 'Maio', '296.772'],
  ['Carteira Ativa', 2025, 'Junho', '266.974'],
  ['Carteira Ativa', 2025, 'Julho', '270.154'],
  ['Carteira Ativa', 2025, 'Agosto', '291.243'],
  ['Carteira Ativa', 2025, 'Setembro', '318.846'],

  // Castigado
  ['Castigado', 2023, 'Setembro', '0'],
  ['Castigado', 2023, 'Outubro', '100'],
  ['Castigado', 2023, 'Novembro', '390'],
  ['Castigado', 2023, 'Dezembro', '1174'],
  ['Castigado', 2024, 'Janeiro', '150'],
  ['Castigado', 2024, 'Fevereiro', '400'],
  ['Castigado', 2024, 'Março', '5900'],
  ['Castigado', 2024, 'Abril', '0'],
  ['Castigado', 2024, 'Maio', '790'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '2080'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '0'],
  ['Castigado', 2025, 'Janeiro', '0'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Junho', '1000'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Fevereiro', '167'],
  ['Clientes Ativos', 2023, 'Julho', '139'],
  ['Clientes Ativos', 2023, 'Agosto', '150'],
  ['Clientes Ativos', 2023, 'Setembro', '160'],
  ['Clientes Ativos', 2023, 'Outubro', '167'],
  ['Clientes Ativos', 2023, 'Novembro', '174'],
  ['Clientes Ativos', 2023, 'Dezembro', '159'],
  ['Clientes Ativos', 2024, 'Janeiro', '1460'],
  ['Clientes Ativos', 2024, 'Fevereiro', '1450'],
  ['Clientes Ativos', 2024, 'Março', '1510'],
  ['Clientes Ativos', 2024, 'Abril', '1410'],
  ['Clientes Ativos', 2024, 'Maio', '1400'],
  ['Clientes Ativos', 2024, 'Junho', '1260'],
  ['Clientes Ativos', 2024, 'Julho', '1230'],
  ['Clientes Ativos', 2024, 'Agosto', '1260'],
  ['Clientes Ativos', 2024, 'Setembro', '1290'],
  ['Clientes Ativos', 2024, 'Outubro', '1330'],
  ['Clientes Ativos', 2024, 'Novembro', '1340'],
  ['Clientes Ativos', 2024, 'Dezembro', '1480'],
  ['Clientes Ativos', 2025, 'Janeiro', '139'],
  ['Clientes Ativos', 2025, 'Fevereiro', '141'],
  ['Clientes Ativos', 2025, 'Março', '133'],
  ['Clientes Ativos', 2025, 'Abril', '134'],
  ['Clientes Ativos', 2025, 'Maio', '128'],
  ['Clientes Ativos', 2025, 'Junho', '133'],
  ['Clientes Ativos', 2025, 'Julho', '147'],
  ['Clientes Ativos', 2025, 'Agosto', '144'],
  ['Clientes Ativos', 2025, 'Setembro', '147'],

  // Inadimplência
  ['Inadimplência', 2023, 'Fevereiro', '6,68'],
  ['Inadimplência', 2023, 'Julho', '14,71'],
  ['Inadimplência', 2023, 'Agosto', '13,40'],
  ['Inadimplência', 2023, 'Setembro', '12,91'],
  ['Inadimplência', 2023, 'Outubro', '12,75'],
  ['Inadimplência', 2023, 'Novembro', '13,65'],
  ['Inadimplência', 2023, 'Dezembro', '6,58'],
  ['Inadimplência', 2024, 'Janeiro', '7,98'],
  ['Inadimplência', 2024, 'Fevereiro', '5,83'],
  ['Inadimplência', 2024, 'Março', '6,72'],
  ['Inadimplência', 2024, 'Abril', '7,26'],
  ['Inadimplência', 2024, 'Maio', '5,32'],
  ['Inadimplência', 2024, 'Junho', '4,17'],
  ['Inadimplência', 2024, 'Julho', '3,66'],
  ['Inadimplência', 2024, 'Agosto', '3,94'],
  ['Inadimplência', 2024, 'Setembro', '3,46'],
  ['Inadimplência', 2024, 'Outubro', '2,73'],
  ['Inadimplência', 2024, 'Novembro', '3,14'],
  ['Inadimplência', 2024, 'Dezembro', '3,74'],
  ['Inadimplência', 2025, 'Janeiro', '5,09'],
  ['Inadimplência', 2025, 'Fevereiro', '6,36'],
  ['Inadimplência', 2025, 'Março', '8,65'],
  ['Inadimplência', 2025, 'Abril', '7,42'],
  ['Inadimplência', 2025, 'Maio', '7,15'],
  ['Inadimplência', 2025, 'Junho', '7,25'],
  ['Inadimplência', 2025, 'Julho', '7,57'],
  ['Inadimplência', 2025, 'Agosto', '6,72'],
  ['Inadimplência', 2025, 'Setembro', '6,06'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '2'],
  ['Inativos', 2025, 'Setembro', '2'],

  // Liberações
  ['Liberações', 2023, 'Fevereiro', '56.400'],
  ['Liberações', 2023, 'Julho', '77.300'],
  ['Liberações', 2023, 'Agosto', '109.700'],
  ['Liberações', 2023, 'Setembro', '94.200'],
  ['Liberações', 2023, 'Outubro', '111.300'],
  ['Liberações', 2023, 'Novembro', '59.500'],
  ['Liberações', 2023, 'Dezembro', '118.500'],
  ['Liberações', 2024, 'Janeiro', '680.000'],
  ['Liberações', 2024, 'Fevereiro', '1.436.000'],
  ['Liberações', 2024, 'Março', '525.000'],
  ['Liberações', 2024, 'Abril', '1.117.000'],
  ['Liberações', 2024, 'Maio', '726.000'],
  ['Liberações', 2024, 'Junho', '1.099.000'],
  ['Liberações', 2024, 'Julho', '1.030.000'],
  ['Liberações', 2024, 'Agosto', '824.000'],
  ['Liberações', 2024, 'Setembro', '1.059.000'],
  ['Liberações', 2024, 'Outubro', '1.122.000'],
  ['Liberações', 2024, 'Novembro', '1.085.000'],
  ['Liberações', 2024, 'Dezembro', '997.000'],
  ['Liberações', 2025, 'Janeiro', '110.300'],
  ['Liberações', 2025, 'Fevereiro', '67.200'],
  ['Liberações', 2025, 'Março', '83.800'],
  ['Liberações', 2025, 'Abril', '123.590'],
  ['Liberações', 2025, 'Maio', '113.600'],
  ['Liberações', 2025, 'Junho', '64.000'],
  ['Liberações', 2025, 'Julho', '98.100'],
  ['Liberações', 2025, 'Agosto', '103.600'],
  ['Liberações', 2025, 'Setembro', '143.900'],

  // Mora
  ['Mora', 2023, 'Fevereiro', '14.076'],
  ['Mora', 2023, 'Julho', '17.861'],
  ['Mora', 2023, 'Agosto', '36.493'],
  ['Mora', 2023, 'Setembro', '38.249'],
  ['Mora', 2023, 'Outubro', '38.168'],
  ['Mora', 2023, 'Novembro', '36.654'],
  ['Mora', 2023, 'Dezembro', '18.939'],
  ['Mora', 2024, 'Janeiro', '198.080'],
  ['Mora', 2024, 'Fevereiro', '175.750'],
  ['Mora', 2024, 'Março', '175.960'],
  ['Mora', 2024, 'Abril', '193.130'],
  ['Mora', 2024, 'Maio', '129.350'],
  ['Mora', 2024, 'Junho', '109.320'],
  ['Mora', 2024, 'Julho', '96.890'],
  ['Mora', 2024, 'Agosto', '98.850'],
  ['Mora', 2024, 'Setembro', '92.480'],
  ['Mora', 2024, 'Outubro', '76.280'],
  ['Mora', 2024, 'Novembro', '92.110'],
  ['Mora', 2024, 'Dezembro', '108.260'],
  ['Mora', 2025, 'Janeiro', '144.510'],
  ['Mora', 2025, 'Fevereiro', '170.460'],
  ['Mora', 2025, 'Março', '212.210'],
  ['Mora', 2025, 'Abril', '212.590'],
  ['Mora', 2025, 'Maio', '212.160'],
  ['Mora', 2025, 'Junho', '193.420'],
  ['Mora', 2025, 'Julho', '204.370'],
  ['Mora', 2025, 'Agosto', '195.650'],
  ['Mora', 2025, 'Setembro', '193.180'],

  // Novos
  ['Novos', 2023, 'Fevereiro', '5'],
  ['Novos', 2023, 'Julho', '1'],
  ['Novos', 2023, 'Agosto', '5'],
  ['Novos', 2023, 'Setembro', '5'],
  ['Novos', 2023, 'Outubro', '14'],
  ['Novos', 2023, 'Novembro', '6'],
  ['Novos', 2023, 'Dezembro', '7'],
  ['Novos', 2024, 'Janeiro', '0'],
  ['Novos', 2024, 'Fevereiro', '10'],
  ['Novos', 2024, 'Março', '50'],
  ['Novos', 2024, 'Abril', '0'],
  ['Novos', 2024, 'Maio', '30'],
  ['Novos', 2024, 'Junho', '0'],
  ['Novos', 2024, 'Julho', '10'],
  ['Novos', 2024, 'Agosto', '40'],
  ['Novos', 2024, 'Setembro', '10'],
  ['Novos', 2024, 'Outubro', '80'],
  ['Novos', 2024, 'Novembro', '70'],
  ['Novos', 2024, 'Dezembro', '160'],
  ['Novos', 2025, 'Janeiro', '10'],
  ['Novos', 2025, 'Fevereiro', '10'],
  ['Novos', 2025, 'Março', '0'],
  ['Novos', 2025, 'Abril', '30'],
  ['Novos', 2025, 'Maio', '0'],
  ['Novos', 2025, 'Junho', '40'],
  ['Novos', 2025, 'Julho', '120'],
  ['Novos', 2025, 'Agosto', '30'],
  ['Novos', 2025, 'Setembro', '40'],

  // Renovações
  ['Renovações', 2023, 'Fevereiro', '21'],
  ['Renovações', 2023, 'Julho', '17'],
  ['Renovações', 2023, 'Agosto', '39'],
  ['Renovações', 2023, 'Setembro', '29'],
  ['Renovações', 2023, 'Outubro', '24'],
  ['Renovações', 2023, 'Novembro', '16'],
  ['Renovações', 2023, 'Dezembro', '34'],
  ['Renovações', 2024, 'Janeiro', '280'],
  ['Renovações', 2024, 'Fevereiro', '370'],
  ['Renovações', 2024, 'Março', '100'],
  ['Renovações', 2024, 'Abril', '340'],
  ['Renovações', 2024, 'Maio', '220'],
  ['Renovações', 2024, 'Junho', '250'],
  ['Renovações', 2024, 'Julho', '240'],
  ['Renovações', 2024, 'Agosto', '280'],
  ['Renovações', 2024, 'Setembro', '280'],
  ['Renovações', 2024, 'Outubro', '260'],
  ['Renovações', 2024, 'Novembro', '230'],
  ['Renovações', 2024, 'Dezembro', '250'],
  ['Renovações', 2025, 'Janeiro', '300'],
  ['Renovações', 2025, 'Fevereiro', '190'],
  ['Renovações', 2025, 'Março', '220'],
  ['Renovações', 2025, 'Abril', '290'],
  ['Renovações', 2025, 'Maio', '270'],
  ['Renovações', 2025, 'Junho', '210'],
  ['Renovações', 2025, 'Julho', '240'],
  ['Renovações', 2025, 'Agosto', '260'],
  ['Renovações', 2025, 'Setembro', '290'],

  // ajustes finais 2025/2026
  ['Inadimplência', 2025, 'Outubro', '7'],
  ['Carteira Ativa', 2025, 'Outubro', '285.833'],
  ['Carteira Ativa', 2025, 'Novembro', '300.617'],
  ['Clientes Ativos', 2025, 'Outubro', '146'],
  ['Clientes Ativos', 2025, 'Novembro', '149'],
  ['Inadimplência', 2025, 'Novembro', '6,45'],
  ['Liberações', 2025, 'Outubro', '72.500'],
  ['Liberações', 2025, 'Novembro', '97.400'],
  ['Clientes Ativos', 2025, 'Dezembro', '148'],
  ['Carteira Ativa', 2025, 'Dezembro', '274.324'],
  ['Inadimplência', 2025, 'Dezembro', '6,18'],
  ['Liberações', 2025, 'Dezembro', '91.800'],
  ['Carteira Ativa', 2026, 'Janeiro', '301.599'],
  ['Clientes Ativos', 2026, 'Janeiro', '154'],
  ['Inadimplência', 2026, 'Janeiro', '4,92'],
  ['Liberações', 2026, 'Janeiro', '125.400']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Helio para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosHelio) {
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

