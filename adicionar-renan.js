// Script para adicionar em lote os dados do agente "Renan" (Coordenador Parnaiba)
// Uso (na pasta do projeto):
//   node adicionar-renan.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Renan';

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
const dadosRenan = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '227.833'],
  ['Carteira Ativa', 2023, 'Fevereiro', '234.074'],
  ['Carteira Ativa', 2023, 'Março', '199.506'],
  ['Carteira Ativa', 2023, 'Abril', '189.877'],
  ['Carteira Ativa', 2023, 'Maio', '215.475'],
  ['Carteira Ativa', 2023, 'Junho', '268.047'],
  ['Carteira Ativa', 2023, 'Julho', '234.487'],
  ['Carteira Ativa', 2023, 'Agosto', '205.916'],
  ['Carteira Ativa', 2023, 'Setembro', '216.406'],
  ['Carteira Ativa', 2023, 'Outubro', '203.191'],
  ['Carteira Ativa', 2023, 'Novembro', '221.997'],
  ['Carteira Ativa', 2023, 'Dezembro', '240.286'],
  ['Carteira Ativa', 2024, 'Janeiro', '200.341'],
  ['Carteira Ativa', 2024, 'Fevereiro', '205.186'],
  ['Carteira Ativa', 2024, 'Março', '196.765'],
  ['Carteira Ativa', 2024, 'Abril', '159.496'],
  ['Carteira Ativa', 2024, 'Maio', '159.865'],
  ['Carteira Ativa', 2024, 'Junho', '195.217'],
  ['Carteira Ativa', 2024, 'Julho', '184.354'],
  ['Carteira Ativa', 2024, 'Agosto', '179.990'],
  ['Carteira Ativa', 2024, 'Setembro', '156.592'],
  ['Carteira Ativa', 2024, 'Outubro', '147.194'],
  ['Carteira Ativa', 2024, 'Novembro', '176.022'],
  ['Carteira Ativa', 2024, 'Dezembro', '219.492'],
  ['Carteira Ativa', 2025, 'Janeiro', '182.272'],
  ['Carteira Ativa', 2025, 'Fevereiro', '181.868'],
  ['Carteira Ativa', 2025, 'Março', '147.863'],
  ['Carteira Ativa', 2025, 'Abril', '165.680'],
  ['Carteira Ativa', 2025, 'Maio', '204.611'],
  ['Carteira Ativa', 2025, 'Junho', '185.790'],
  ['Carteira Ativa', 2025, 'Julho', '170.651'],
  ['Carteira Ativa', 2025, 'Agosto', '200.368'],
  ['Carteira Ativa', 2025, 'Setembro', '166.698'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '48.600'],
  ['Liberações', 2023, 'Fevereiro', '78.100'],
  ['Liberações', 2023, 'Março', '37.200'],
  ['Liberações', 2023, 'Abril', '48.700'],
  ['Liberações', 2023, 'Maio', '92.600'],
  ['Liberações', 2023, 'Junho', '111.000'],
  ['Liberações', 2023, 'Julho', '27.900'],
  ['Liberações', 2023, 'Agosto', '32.500'],
  ['Liberações', 2023, 'Setembro', '0'],
  ['Liberações', 2023, 'Outubro', '50.200'],
  ['Liberações', 2023, 'Novembro', '85.000'],
  ['Liberações', 2023, 'Dezembro', '70.600'],
  ['Liberações', 2024, 'Janeiro', '37.400'],
  ['Liberações', 2024, 'Fevereiro', '57.400'],
  ['Liberações', 2024, 'Março', '51.100'],
  ['Liberações', 2024, 'Abril', '30.100'],
  ['Liberações', 2024, 'Maio', '62.500'],
  ['Liberações', 2024, 'Junho', '84.200'],
  ['Liberações', 2024, 'Julho', '45.400'],
  ['Liberações', 2024, 'Agosto', '48.400'],
  ['Liberações', 2024, 'Setembro', '37.700'],
  ['Liberações', 2024, 'Outubro', '44.800'],
  ['Liberações', 2024, 'Novembro', '84.300'],
  ['Liberações', 2024, 'Dezembro', '102.100'],
  ['Liberações', 2025, 'Janeiro', '26.500'],
  ['Liberações', 2025, 'Fevereiro', '62.300'],
  ['Liberações', 2025, 'Março', '25.900'],
  ['Liberações', 2025, 'Abril', '80.000'],
  ['Liberações', 2025, 'Maio', '101.800'],
  ['Liberações', 2025, 'Junho', '39.300'],
  ['Liberações', 2025, 'Julho', '46.200'],
  ['Liberações', 2025, 'Agosto', '82.200'],
  ['Liberações', 2025, 'Setembro', '32.600'],
  ['Liberações', 2025, 'Outubro', '24.500'],
  ['Liberações', 2025, 'Novembro', '61.600'],
  ['Liberações', 2025, 'Dezembro', '125.100'],
  ['Liberações', 2026, 'Janeiro', '31.600'],

  // Novos
  ['Novos', 2023, 'Janeiro', '2'],
  ['Novos', 2023, 'Fevereiro', '7'],
  ['Novos', 2023, 'Março', '2'],
  ['Novos', 2023, 'Abril', '0'],
  ['Novos', 2023, 'Maio', '4'],
  ['Novos', 2023, 'Junho', '3'],
  ['Novos', 2023, 'Julho', '6'],
  ['Novos', 2023, 'Agosto', '4'],
  ['Novos', 2023, 'Setembro', '5'],
  ['Novos', 2023, 'Outubro', '11'],
  ['Novos', 2023, 'Novembro', '5'],
  ['Novos', 2023, 'Dezembro', '0'],
  ['Novos', 2024, 'Janeiro', '1'],
  ['Novos', 2024, 'Fevereiro', '1'],
  ['Novos', 2024, 'Março', '1'],
  ['Novos', 2024, 'Abril', '2'],
  ['Novos', 2024, 'Maio', '1'],
  ['Novos', 2024, 'Junho', '1'],
  ['Novos', 2024, 'Julho', '1'],
  ['Novos', 2024, 'Agosto', '0'],
  ['Novos', 2024, 'Setembro', '1'],
  ['Novos', 2024, 'Outubro', '0'],
  ['Novos', 2024, 'Novembro', '4'],
  ['Novos', 2024, 'Dezembro', '4'],
  ['Novos', 2025, 'Janeiro', '0'],
  ['Novos', 2025, 'Fevereiro', '5'],
  ['Novos', 2025, 'Março', '4'],
  ['Novos', 2025, 'Abril', '4'],
  ['Novos', 2025, 'Maio', '1'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '6'],
  ['Novos', 2025, 'Agosto', '9'],
  ['Novos', 2025, 'Setembro', '1'],

  // Renovações (corrigindo "Renovados")
  ['Renovações', 2023, 'Janeiro', '24'],
  ['Renovações', 2023, 'Fevereiro', '32'],
  ['Renovações', 2023, 'Março', '8'],
  ['Renovações', 2023, 'Abril', '20'],
  ['Renovações', 2023, 'Maio', '30'],
  ['Renovações', 2023, 'Junho', '42'],
  ['Renovações', 2023, 'Julho', '15'],
  ['Renovações', 2023, 'Agosto', '10'],
  ['Renovações', 2023, 'Setembro', '32'],
  ['Renovações', 2023, 'Outubro', '19'],
  ['Renovações', 2023, 'Novembro', '23'],
  ['Renovações', 2023, 'Dezembro', '23'],
  ['Renovações', 2024, 'Janeiro', '20'],
  ['Renovações', 2024, 'Fevereiro', '24'],
  ['Renovações', 2024, 'Março', '22'],
  ['Renovações', 2024, 'Abril', '6'],
  ['Renovações', 2024, 'Maio', '17'],
  ['Renovações', 2024, 'Junho', '26'],
  ['Renovações', 2024, 'Julho', '22'],
  ['Renovações', 2024, 'Agosto', '14'],
  ['Renovações', 2024, 'Setembro', '12'],
  ['Renovações', 2024, 'Outubro', '17'],
  ['Renovações', 2024, 'Novembro', '17'],
  ['Renovações', 2024, 'Dezembro', '27'],
  ['Renovações', 2025, 'Janeiro', '8'],
  ['Renovações', 2025, 'Fevereiro', '16'],
  ['Renovações', 2025, 'Março', '11'],
  ['Renovações', 2025, 'Abril', '21'],
  ['Renovações', 2025, 'Maio', '19'],
  ['Renovações', 2025, 'Junho', '9'],
  ['Renovações', 2025, 'Julho', '21'],
  ['Renovações', 2025, 'Agosto', '19'],
  ['Renovações', 2025, 'Setembro', '7'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '137'],
  ['Clientes Ativos', 2023, 'Fevereiro', '139'],
  ['Clientes Ativos', 2023, 'Março', '139'],
  ['Clientes Ativos', 2023, 'Abril', '135'],
  ['Clientes Ativos', 2023, 'Maio', '135'],
  ['Clientes Ativos', 2023, 'Junho', '142'],
  ['Clientes Ativos', 2023, 'Julho', '144'],
  ['Clientes Ativos', 2023, 'Agosto', '146'],
  ['Clientes Ativos', 2023, 'Setembro', '149'],
  ['Clientes Ativos', 2023, 'Outubro', '154'],
  ['Clientes Ativos', 2023, 'Novembro', '152'],
  ['Clientes Ativos', 2023, 'Dezembro', '152'],
  ['Clientes Ativos', 2024, 'Janeiro', '136'],
  ['Clientes Ativos', 2024, 'Fevereiro', '132'],
  ['Clientes Ativos', 2024, 'Março', '132'],
  ['Clientes Ativos', 2024, 'Abril', '116'],
  ['Clientes Ativos', 2024, 'Maio', '106'],
  ['Clientes Ativos', 2024, 'Junho', '111'],
  ['Clientes Ativos', 2024, 'Julho', '103'],
  ['Clientes Ativos', 2024, 'Agosto', '104'],
  ['Clientes Ativos', 2024, 'Setembro', '99'],
  ['Clientes Ativos', 2024, 'Outubro', '94'],
  ['Clientes Ativos', 2024, 'Novembro', '96'],
  ['Clientes Ativos', 2024, 'Dezembro', '98'],
  ['Clientes Ativos', 2025, 'Janeiro', '92'],
  ['Clientes Ativos', 2025, 'Fevereiro', '88'],
  ['Clientes Ativos', 2025, 'Março', '89'],
  ['Clientes Ativos', 2025, 'Abril', '93'],
  ['Clientes Ativos', 2025, 'Maio', '92'],
  ['Clientes Ativos', 2025, 'Junho', '88'],
  ['Clientes Ativos', 2025, 'Julho', '92'],
  ['Clientes Ativos', 2025, 'Agosto', '99'],
  ['Clientes Ativos', 2025, 'Setembro', '93'],
  ['Clientes Ativos', 2025, 'Outubro', '93'],
  ['Clientes Ativos', 2025, 'Novembro', '85'],
  ['Clientes Ativos', 2025, 'Dezembro', '87'],
  ['Clientes Ativos', 2026, 'Janeiro', '95'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '6'],
  ['Inadimplência', 2023, 'Fevereiro', '8'],
  ['Inadimplência', 2023, 'Março', '12'],
  ['Inadimplência', 2023, 'Abril', '14'],
  ['Inadimplência', 2023, 'Maio', '15'],
  ['Inadimplência', 2023, 'Junho', '12'],
  ['Inadimplência', 2023, 'Julho', '15'],
  ['Inadimplência', 2023, 'Agosto', '19'],
  ['Inadimplência', 2023, 'Setembro', '19'],
  ['Inadimplência', 2023, 'Outubro', '20'],
  ['Inadimplência', 2023, 'Novembro', '18'],
  ['Inadimplência', 2023, 'Dezembro', '16'],
  ['Inadimplência', 2024, 'Janeiro', '14'],
  ['Inadimplência', 2024, 'Fevereiro', '14'],
  ['Inadimplência', 2024, 'Março', '14'],
  ['Inadimplência', 2024, 'Abril', '14'],
  ['Inadimplência', 2024, 'Maio', '12'],
  ['Inadimplência', 2024, 'Junho', '10'],
  ['Inadimplência', 2024, 'Julho', '10'],
  ['Inadimplência', 2024, 'Agosto', '9'],
  ['Inadimplência', 2024, 'Setembro', '8'],
  ['Inadimplência', 2024, 'Outubro', '7'],
  ['Inadimplência', 2024, 'Novembro', '6'],
  ['Inadimplência', 2024, 'Dezembro', '5'],
  ['Inadimplência', 2025, 'Janeiro', '2'],
  ['Inadimplência', 2025, 'Fevereiro', '1'],
  ['Inadimplência', 2025, 'Março', '1'],
  ['Inadimplência', 2025, 'Abril', '1'],
  ['Inadimplência', 2025, 'Maio', '1'],
  ['Inadimplência', 2025, 'Junho', '1'],
  ['Inadimplência', 2025, 'Julho', '1'],
  ['Inadimplência', 2025, 'Agosto', '1'],
  ['Inadimplência', 2025, 'Setembro', '1'],
  ['Inadimplência', 2025, 'Outubro', '2'],
  ['Inadimplência', 2025, 'Novembro', '3'],
  ['Inadimplência', 2025, 'Dezembro', '2'],
  ['Inadimplência', 2026, 'Janeiro', '2'],

  // Castigado (corrigindo "Castigados")
  ['Castigado', 2025, 'Janeiro', '600'],
  ['Castigado', 2025, 'Março', '200'],
  ['Castigado', 2025, 'Maio', '400'],
  ['Castigado', 2025, 'Agosto', '0']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Renan para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoriaRaw, ano, mes, valorBruto] of dadosRenan) {
    if (valorBruto === undefined || valorBruto === null || valorBruto === '') {
      console.warn('Valor vazio, pulando registro:', categoriaRaw, ano, mes);
      continue;
    }

    let categoria = categoriaRaw;
    if (categoriaRaw === 'Renovados') categoria = 'Renovações';
    if (categoriaRaw === 'Castigados') categoria = 'Castigado';

    let v = String(valorBruto).trim();
    if (v.includes(',')) {
      v = v.replace(/\./g, '').replace(',', '.'); // trata milhar + decimal
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

