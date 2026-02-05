// Script para adicionar em lote os dados do agente "Xavier" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-xavier.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Xavier';

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
const dadosXavier = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '114.835'],
  ['Carteira Ativa', 2023, 'Julho', '116.330'],
  ['Carteira Ativa', 2023, 'Agosto', '125.016'],
  ['Carteira Ativa', 2023, 'Setembro', '105.826'],
  ['Carteira Ativa', 2023, 'Outubro', '150.383'],
  ['Carteira Ativa', 2023, 'Novembro', '152.716'],
  ['Carteira Ativa', 2023, 'Dezembro', '125.000'],
  ['Carteira Ativa', 2024, 'Janeiro', '139.792'],
  ['Carteira Ativa', 2024, 'Fevereiro', '148.887'],
  ['Carteira Ativa', 2024, 'Março', '126.667'],
  ['Carteira Ativa', 2024, 'Abril', '142.207'],
  ['Carteira Ativa', 2024, 'Maio', '143.986'],
  ['Carteira Ativa', 2024, 'Junho', '144.731'],
  ['Carteira Ativa', 2024, 'Julho', '134.231'],
  ['Carteira Ativa', 2024, 'Agosto', '128.729'],
  ['Carteira Ativa', 2024, 'Setembro', '140.564'],
  ['Carteira Ativa', 2024, 'Outubro', '153.222'],
  ['Carteira Ativa', 2024, 'Novembro', '122.121'],
  ['Carteira Ativa', 2024, 'Dezembro', '98.062'],
  ['Carteira Ativa', 2025, 'Janeiro', '87.257'],
  ['Carteira Ativa', 2025, 'Fevereiro', '146.391'],
  ['Carteira Ativa', 2025, 'Março', '113.586'],
  ['Carteira Ativa', 2025, 'Abril', '122.029'],
  ['Carteira Ativa', 2025, 'Maio', '111.666'],
  ['Carteira Ativa', 2025, 'Junho', '147.841'],
  ['Carteira Ativa', 2025, 'Julho', '128.634'],
  ['Carteira Ativa', 2025, 'Agosto', '120.995'],
  ['Carteira Ativa', 2025, 'Setembro', '124.049'],

  // Castigado
  ['Castigado', 2023, 'Setembro', '0'],
  ['Castigado', 2023, 'Outubro', '0'],
  ['Castigado', 2023, 'Novembro', '0'],
  ['Castigado', 2023, 'Dezembro', '430'],
  ['Castigado', 2024, 'Janeiro', '4.650'],
  ['Castigado', 2024, 'Fevereiro', '0'],
  ['Castigado', 2024, 'Março', '0'],
  ['Castigado', 2024, 'Abril', '0'],
  ['Castigado', 2024, 'Maio', '2.320'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '790'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '2.060'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2025, 'Janeiro', '0'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '78'],
  ['Clientes Ativos', 2023, 'Julho', '81'],
  ['Clientes Ativos', 2023, 'Agosto', '92'],
  ['Clientes Ativos', 2023, 'Setembro', '94'],
  ['Clientes Ativos', 2023, 'Outubro', '99'],
  ['Clientes Ativos', 2023, 'Novembro', '92'],
  ['Clientes Ativos', 2023, 'Dezembro', '73'],
  ['Clientes Ativos', 2024, 'Janeiro', '76'],
  ['Clientes Ativos', 2024, 'Fevereiro', '78'],
  ['Clientes Ativos', 2024, 'Março', '78'],
  ['Clientes Ativos', 2024, 'Abril', '80'],
  ['Clientes Ativos', 2024, 'Maio', '80'],
  ['Clientes Ativos', 2024, 'Junho', '79'],
  ['Clientes Ativos', 2024, 'Julho', '81'],
  ['Clientes Ativos', 2024, 'Agosto', '79'],
  ['Clientes Ativos', 2024, 'Setembro', '84'],
  ['Clientes Ativos', 2024, 'Outubro', '94'],
  ['Clientes Ativos', 2024, 'Novembro', '92'],
  ['Clientes Ativos', 2024, 'Dezembro', '81'],
  ['Clientes Ativos', 2025, 'Janeiro', '74'],
  ['Clientes Ativos', 2025, 'Fevereiro', '96'],
  ['Clientes Ativos', 2025, 'Março', '99'],
  ['Clientes Ativos', 2025, 'Abril', '103'],
  ['Clientes Ativos', 2025, 'Maio', '91'],
  ['Clientes Ativos', 2025, 'Junho', '86'],
  ['Clientes Ativos', 2025, 'Julho', '99'],
  ['Clientes Ativos', 2025, 'Agosto', '98'],
  ['Clientes Ativos', 2025, 'Setembro', '98'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '11,12'],
  ['Inadimplência', 2023, 'Julho', '8,33'],
  ['Inadimplência', 2023, 'Agosto', '8,03'],
  ['Inadimplência', 2023, 'Setembro', '9,96'],
  ['Inadimplência', 2023, 'Outubro', '8,24'],
  ['Inadimplência', 2023, 'Novembro', '7,55'],
  ['Inadimplência', 2023, 'Dezembro', '3,86'],
  ['Inadimplência', 2024, 'Janeiro', '3,15'],
  ['Inadimplência', 2024, 'Fevereiro', '3,18'],
  ['Inadimplência', 2024, 'Março', '3,76'],
  ['Inadimplência', 2024, 'Abril', '4,18'],
  ['Inadimplência', 2024, 'Maio', '4,31'],
  ['Inadimplência', 2024, 'Junho', '4,70'],
  ['Inadimplência', 2024, 'Julho', '4,70'],
  ['Inadimplência', 2024, 'Agosto', '4,35'],
  ['Inadimplência', 2024, 'Setembro', '3,80'],
  ['Inadimplência', 2024, 'Outubro', '2,71'],
  ['Inadimplência', 2024, 'Novembro', '3,02'],
  ['Inadimplência', 2024, 'Dezembro', '5,35'],
  ['Inadimplência', 2025, 'Janeiro', '9,90'],
  ['Inadimplência', 2025, 'Fevereiro', '6,80'],
  ['Inadimplência', 2025, 'Março', '8,11'],
  ['Inadimplência', 2025, 'Abril', '6,38'],
  ['Inadimplência', 2025, 'Maio', '5,26'],
  ['Inadimplência', 2025, 'Junho', '3,53'],
  ['Inadimplência', 2025, 'Julho', '3,68'],
  ['Inadimplência', 2025, 'Agosto', '3,21'],
  ['Inadimplência', 2025, 'Setembro', '2,90'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '2'],
  ['Inativos', 2025, 'Setembro', '0'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '4.500'],
  ['Liberações', 2023, 'Julho', '37.900'],
  ['Liberações', 2023, 'Agosto', '41.800'],
  ['Liberações', 2023, 'Setembro', '14.700'],
  ['Liberações', 2023, 'Outubro', '96.100'],
  ['Liberações', 2023, 'Novembro', '50.500'],
  ['Liberações', 2023, 'Dezembro', '22.500'],
  ['Liberações', 2024, 'Janeiro', '68.200'],
  ['Liberações', 2024, 'Fevereiro', '57.500'],
  ['Liberações', 2024, 'Março', '27.800'],
  ['Liberações', 2024, 'Abril', '72.300'],
  ['Liberações', 2024, 'Maio', '55.200'],
  ['Liberações', 2024, 'Junho', '46.500'],
  ['Liberações', 2024, 'Julho', '48.700'],
  ['Liberações', 2024, 'Agosto', '44.800'],
  ['Liberações', 2024, 'Setembro', '59.200'],
  ['Liberações', 2024, 'Outubro', '62.700'],
  ['Liberações', 2024, 'Novembro', '9.500'],
  ['Liberações', 2024, 'Dezembro', '31.300'],
  ['Liberações', 2025, 'Janeiro', '26.000'],
  ['Liberações', 2025, 'Fevereiro', '64.000'],
  ['Liberações', 2025, 'Março', '7.700'],
  ['Liberações', 2025, 'Abril', '51.400'],
  ['Liberações', 2025, 'Maio', '37.500'],
  ['Liberações', 2025, 'Junho', '76.800'],
  ['Liberações', 2025, 'Julho', '22.400'],
  ['Liberações', 2025, 'Agosto', '40.200'],
  ['Liberações', 2025, 'Setembro', '50.100'],

  // Mora
  ['Mora', 2023, 'Janeiro', '22.997'],
  ['Mora', 2023, 'Julho', '26.122'],
  ['Mora', 2023, 'Agosto', '9.701'],
  ['Mora', 2023, 'Setembro', '10.536'],
  ['Mora', 2023, 'Outubro', '12.388'],
  ['Mora', 2023, 'Novembro', '11.536'],
  ['Mora', 2023, 'Dezembro', '4.825'],
  ['Mora', 2024, 'Janeiro', '43.970'],
  ['Mora', 2024, 'Fevereiro', '47.370'],
  ['Mora', 2024, 'Março', '47.620'],
  ['Mora', 2024, 'Abril', '59.470'],
  ['Mora', 2024, 'Maio', '62.060'],
  ['Mora', 2024, 'Junho', '68.060'],
  ['Mora', 2024, 'Julho', '63.060'],
  ['Mora', 2024, 'Agosto', '55.940'],
  ['Mora', 2024, 'Setembro', '53.440'],
  ['Mora', 2024, 'Outubro', '41.500'],
  ['Mora', 2024, 'Novembro', '36.860'],
  ['Mora', 2024, 'Dezembro', '52.470'],
  ['Mora', 2025, 'Janeiro', '86.420'],
  ['Mora', 2025, 'Fevereiro', '99.560'],
  ['Mora', 2025, 'Março', '92.160'],
  ['Mora', 2025, 'Abril', '77.840'],
  ['Mora', 2025, 'Maio', '58.710'],
  ['Mora', 2025, 'Junho', '52.210'],
  ['Mora', 2025, 'Julho', '47.290'],
  ['Mora', 2025, 'Agosto', '38.800'],
  ['Mora', 2025, 'Setembro', '36.020'],

  // Novos
  ['Novos', 2023, 'Janeiro', '1'],
  ['Novos', 2023, 'Julho', '8'],
  ['Novos', 2023, 'Agosto', '6'],
  ['Novos', 2023, 'Setembro', '3'],
  ['Novos', 2023, 'Outubro', '2'],
  ['Novos', 2023, 'Novembro', '2'],
  ['Novos', 2023, 'Dezembro', '2'],
  ['Novos', 2024, 'Janeiro', '40'],
  ['Novos', 2024, 'Fevereiro', '20'],
  ['Novos', 2024, 'Março', '0'],
  ['Novos', 2024, 'Abril', '0'],
  ['Novos', 2024, 'Maio', '110'],
  ['Novos', 2024, 'Junho', '20'],
  ['Novos', 2024, 'Julho', '40'],
  ['Novos', 2024, 'Agosto', '20'],
  ['Novos', 2024, 'Setembro', '80'],
  ['Novos', 2024, 'Outubro', '100'],
  ['Novos', 2024, 'Novembro', '30'],
  ['Novos', 2024, 'Dezembro', '0'],
  ['Novos', 2025, 'Janeiro', '40'],
  ['Novos', 2025, 'Fevereiro', '80'],
  ['Novos', 2025, 'Março', '10'],
  ['Novos', 2025, 'Abril', '50'],
  ['Novos', 2025, 'Maio', '10'],
  ['Novos', 2025, 'Junho', '60'],
  ['Novos', 2025, 'Julho', '70'],
  ['Novos', 2025, 'Agosto', '50'],
  ['Novos', 2025, 'Setembro', '0'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '2'],
  ['Renovações', 2023, 'Julho', '8'],
  ['Renovações', 2023, 'Agosto', '14'],
  ['Renovações', 2023, 'Setembro', '7'],
  ['Renovações', 2023, 'Outubro', '21'],
  ['Renovações', 2023, 'Novembro', '18'],
  ['Renovações', 2023, 'Dezembro', '11'],
  ['Renovações', 2024, 'Janeiro', '160'],
  ['Renovações', 2024, 'Fevereiro', '160'],
  ['Renovações', 2024, 'Março', '130'],
  ['Renovações', 2024, 'Abril', '200'],
  ['Renovações', 2024, 'Maio', '120'],
  ['Renovações', 2024, 'Junho', '140'],
  ['Renovações', 2024, 'Julho', '100'],
  ['Renovações', 2024, 'Agosto', '160'],
  ['Renovações', 2024, 'Setembro', '160'],
  ['Renovações', 2024, 'Outubro', '190'],
  ['Renovações', 2024, 'Novembro', '60'],
  ['Renovações', 2024, 'Dezembro', '130'],
  ['Renovações', 2025, 'Janeiro', '70'],
  ['Renovações', 2025, 'Fevereiro', '260'],
  ['Renovações', 2025, 'Março', '50'],
  ['Renovações', 2025, 'Abril', '140'],
  ['Renovações', 2025, 'Maio', '150'],
  ['Renovações', 2025, 'Junho', '220'],
  ['Renovações', 2025, 'Julho', '70'],
  ['Renovações', 2025, 'Agosto', '180'],
  ['Renovações', 2025, 'Setembro', '190'],

  // ajustes finais 2025/2026
  ['Inadimplência', 2025, 'Outubro', '2'],
  ['Carteira Ativa', 2025, 'Outubro', '196.757'],
  ['Carteira Ativa', 2025, 'Novembro', '165.113'],
  ['Clientes Ativos', 2025, 'Outubro', '103'],
  ['Clientes Ativos', 2025, 'Novembro', '99'],
  ['Inadimplência', 2025, 'Novembro', '2'],
  ['Liberações', 2025, 'Outubro', '119.700'],
  ['Liberações', 2025, 'Novembro', '20.000'],
  ['Clientes Ativos', 2025, 'Dezembro', '97'],
  ['Carteira Ativa', 2025, 'Dezembro', '148.231'],
  ['Inadimplência', 2025, 'Dezembro', '2'],
  ['Liberações', 2025, 'Dezembro', '42.800'],
  ['Carteira Ativa', 2026, 'Janeiro', '148.969'],
  ['Clientes Ativos', 2026, 'Janeiro', '96'],
  ['Inadimplência', 2026, 'Janeiro', '2'],
  ['Liberações', 2026, 'Janeiro', '60.000']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Xavier para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosXavier) {
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

