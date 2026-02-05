// Script para adicionar em lote os dados do agente "Marcos" (Coordenador Parnaiba)
// Uso (na pasta do projeto):
//   node adicionar-marcos.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Marcos';

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
const dadosMarcos = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '155.073'],
  ['Carteira Ativa', 2023, 'Fevereiro', '168.551'],
  ['Carteira Ativa', 2023, 'Março', '175.472'],
  ['Carteira Ativa', 2023, 'Abril', '183.643'],
  ['Carteira Ativa', 2023, 'Maio', '177.408'],
  ['Carteira Ativa', 2023, 'Junho', '167.024'],
  ['Carteira Ativa', 2023, 'Julho', '171.561'],
  ['Carteira Ativa', 2023, 'Agosto', '143.985'],
  ['Carteira Ativa', 2023, 'Setembro', '164.233'],
  ['Carteira Ativa', 2023, 'Outubro', '150.168'],
  ['Carteira Ativa', 2023, 'Novembro', '159.659'],
  ['Carteira Ativa', 2023, 'Dezembro', '187.200'],
  ['Carteira Ativa', 2024, 'Janeiro', '152.077'],
  ['Carteira Ativa', 2024, 'Fevereiro', '139.672'],
  ['Carteira Ativa', 2024, 'Março', '166.647'],
  ['Carteira Ativa', 2024, 'Abril', '205.200'],
  ['Carteira Ativa', 2024, 'Maio', '184.100'],
  ['Carteira Ativa', 2024, 'Junho', '198.119'],
  ['Carteira Ativa', 2024, 'Julho', '204.357'],
  ['Carteira Ativa', 2024, 'Agosto', '233.227'],
  ['Carteira Ativa', 2024, 'Setembro', '217.201'],
  ['Carteira Ativa', 2024, 'Outubro', '221.142'],
  ['Carteira Ativa', 2024, 'Novembro', '196.754'],
  ['Carteira Ativa', 2024, 'Dezembro', '230.447'],
  ['Carteira Ativa', 2025, 'Janeiro', '180.990'],
  ['Carteira Ativa', 2025, 'Fevereiro', '227.197'],
  ['Carteira Ativa', 2025, 'Março', '200.639'],
  ['Carteira Ativa', 2025, 'Abril', '199.039'],
  ['Carteira Ativa', 2025, 'Maio', '219.437'],
  ['Carteira Ativa', 2025, 'Junho', '260.697'],
  ['Carteira Ativa', 2025, 'Julho', '253.598'],
  ['Carteira Ativa', 2025, 'Agosto', '212.899'],
  ['Carteira Ativa', 2025, 'Setembro', '183.458'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '28.600'],
  ['Liberações', 2023, 'Fevereiro', '67.900'],
  ['Liberações', 2023, 'Março', '65.800'],
  ['Liberações', 2023, 'Abril', '61.300'],
  ['Liberações', 2023, 'Maio', '48.700'],
  ['Liberações', 2023, 'Junho', '42.600'],
  ['Liberações', 2023, 'Julho', '59.300'],
  ['Liberações', 2023, 'Agosto', '36.800'],
  ['Liberações', 2023, 'Setembro', '60.900'],
  ['Liberações', 2023, 'Outubro', '36.200'],
  ['Liberações', 2023, 'Novembro', '54.200'],
  ['Liberações', 2023, 'Dezembro', '81.400'],
  ['Liberações', 2024, 'Janeiro', '21.800'],
  ['Liberações', 2024, 'Fevereiro', '40.000'],
  ['Liberações', 2024, 'Março', '71.800'],
  ['Liberações', 2024, 'Abril', '83.200'],
  ['Liberações', 2024, 'Maio', '49.600'],
  ['Liberações', 2024, 'Junho', '72.800'],
  ['Liberações', 2024, 'Julho', '86.200'],
  ['Liberações', 2024, 'Agosto', '91.500'],
  ['Liberações', 2024, 'Setembro', '59.400'],
  ['Liberações', 2024, 'Outubro', '73.100'],
  ['Liberações', 2024, 'Novembro', '59.000'],
  ['Liberações', 2024, 'Dezembro', '110.100'],
  ['Liberações', 2025, 'Janeiro', '28.200'],
  ['Liberações', 2025, 'Fevereiro', '107.500'],
  ['Liberações', 2025, 'Março', '46.400'],
  ['Liberações', 2025, 'Abril', '70.600'],
  ['Liberações', 2025, 'Maio', '89.600'],
  ['Liberações', 2025, 'Junho', '109.900'],
  ['Liberações', 2025, 'Julho', '72.700'],
  ['Liberações', 2025, 'Agosto', '25.700'],
  ['Liberações', 2025, 'Setembro', '51.400'],

  // Novos
  ['Novos', 2023, 'Janeiro', '4'],
  ['Novos', 2023, 'Fevereiro', '4'],
  ['Novos', 2023, 'Março', '7'],
  ['Novos', 2023, 'Abril', '0'],
  ['Novos', 2023, 'Maio', '7'],
  ['Novos', 2023, 'Junho', '2'],
  ['Novos', 2023, 'Julho', '2'],
  ['Novos', 2023, 'Agosto', '0'],
  ['Novos', 2023, 'Setembro', '7'],
  ['Novos', 2023, 'Outubro', '1'],
  ['Novos', 2023, 'Novembro', '5'],
  ['Novos', 2023, 'Dezembro', '7'],
  ['Novos', 2024, 'Janeiro', '3'],
  ['Novos', 2024, 'Fevereiro', '0'],
  ['Novos', 2024, 'Março', '9'],
  ['Novos', 2024, 'Abril', '5'],
  ['Novos', 2024, 'Maio', '1'],
  ['Novos', 2024, 'Junho', '1'],
  ['Novos', 2024, 'Julho', '1'],
  ['Novos', 2024, 'Agosto', '6'],
  ['Novos', 2024, 'Setembro', '7'],
  ['Novos', 2024, 'Outubro', '9'],
  ['Novos', 2024, 'Novembro', '4'],
  ['Novos', 2024, 'Dezembro', '7'],
  ['Novos', 2025, 'Janeiro', '1'],
  ['Novos', 2025, 'Fevereiro', '6'],
  ['Novos', 2025, 'Março', '3'],
  ['Novos', 2025, 'Abril', '5'],
  ['Novos', 2025, 'Maio', '8'],
  ['Novos', 2025, 'Junho', '9'],
  ['Novos', 2025, 'Julho', '4'],
  ['Novos', 2025, 'Agosto', '5'],
  ['Novos', 2025, 'Setembro', '4'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '16'],
  ['Renovações', 2023, 'Fevereiro', '31'],
  ['Renovações', 2023, 'Março', '30'],
  ['Renovações', 2023, 'Abril', '27'],
  ['Renovações', 2023, 'Maio', '19'],
  ['Renovações', 2023, 'Junho', '27'],
  ['Renovações', 2023, 'Julho', '24'],
  ['Renovações', 2023, 'Agosto', '23'],
  ['Renovações', 2023, 'Setembro', '28'],
  ['Renovações', 2023, 'Outubro', '20'],
  ['Renovações', 2023, 'Novembro', '20'],
  ['Renovações', 2023, 'Dezembro', '31'],
  ['Renovações', 2024, 'Janeiro', '10'],
  ['Renovações', 2024, 'Fevereiro', '21'],
  ['Renovações', 2024, 'Março', '29'],
  ['Renovações', 2024, 'Abril', '42'],
  ['Renovações', 2024, 'Maio', '31'],
  ['Renovações', 2024, 'Junho', '30'],
  ['Renovações', 2024, 'Julho', '37'],
  ['Renovações', 2024, 'Agosto', '40'],
  ['Renovações', 2024, 'Setembro', '28'],
  ['Renovações', 2024, 'Outubro', '34'],
  ['Renovações', 2024, 'Novembro', '20'],
  ['Renovações', 2024, 'Dezembro', '48'],
  ['Renovações', 2025, 'Janeiro', '13'],
  ['Renovações', 2025, 'Fevereiro', '50'],
  ['Renovações', 2025, 'Março', '23'],
  ['Renovações', 2025, 'Abril', '31'],
  ['Renovações', 2025, 'Maio', '33'],
  ['Renovações', 2025, 'Junho', '30'],
  ['Renovações', 2025, 'Julho', '32'],
  ['Renovações', 2025, 'Agosto', '13'],
  ['Renovações', 2025, 'Setembro', '20'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '147'],
  ['Clientes Ativos', 2023, 'Fevereiro', '146'],
  ['Clientes Ativos', 2023, 'Março', '152'],
  ['Clientes Ativos', 2023, 'Abril', '153'],
  ['Clientes Ativos', 2023, 'Maio', '156'],
  ['Clientes Ativos', 2023, 'Junho', '158'],
  ['Clientes Ativos', 2023, 'Julho', '148'],
  ['Clientes Ativos', 2023, 'Agosto', '135'],
  ['Clientes Ativos', 2023, 'Setembro', '143'],
  ['Clientes Ativos', 2023, 'Outubro', '136'],
  ['Clientes Ativos', 2023, 'Novembro', '145'],
  ['Clientes Ativos', 2023, 'Dezembro', '144'],
  ['Clientes Ativos', 2024, 'Janeiro', '127'],
  ['Clientes Ativos', 2024, 'Fevereiro', '116'],
  ['Clientes Ativos', 2024, 'Março', '125'],
  ['Clientes Ativos', 2024, 'Abril', '164'],
  ['Clientes Ativos', 2024, 'Maio', '162'],
  ['Clientes Ativos', 2024, 'Junho', '168'],
  ['Clientes Ativos', 2024, 'Julho', '164'],
  ['Clientes Ativos', 2024, 'Agosto', '160'],
  ['Clientes Ativos', 2024, 'Setembro', '164'],
  ['Clientes Ativos', 2024, 'Outubro', '178'],
  ['Clientes Ativos', 2024, 'Novembro', '171'],
  ['Clientes Ativos', 2024, 'Dezembro', '169'],
  ['Clientes Ativos', 2025, 'Janeiro', '159'],
  ['Clientes Ativos', 2025, 'Fevereiro', '162'],
  ['Clientes Ativos', 2025, 'Março', '165'],
  ['Clientes Ativos', 2025, 'Abril', '161'],
  ['Clientes Ativos', 2025, 'Maio', '168'],
  ['Clientes Ativos', 2025, 'Junho', '178'],
  ['Clientes Ativos', 2025, 'Julho', '169'],
  ['Clientes Ativos', 2025, 'Agosto', '166'],
  ['Clientes Ativos', 2025, 'Setembro', '151'],
  ['Clientes Ativos', 2025, 'Outubro', '151'], // Clientes ATivos corrigido
  ['Clientes Ativos', 2025, 'Novembro', '156'],
  ['Clientes Ativos', 2025, 'Dezembro', '143'],
  ['Clientes Ativos', 2026, 'Janeiro', '144'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '3,25'],
  ['Inadimplência', 2023, 'Fevereiro', '2,66'],
  ['Inadimplência', 2023, 'Março', '4,20'],
  ['Inadimplência', 2023, 'Abril', '5,58'],
  ['Inadimplência', 2023, 'Maio', '7,03'],
  ['Inadimplência', 2023, 'Junho', '7,87'],
  ['Inadimplência', 2023, 'Julho', '9,27'],
  ['Inadimplência', 2023, 'Agosto', '12,03'],
  ['Inadimplência', 2023, 'Setembro', '10,29'],
  ['Inadimplência', 2023, 'Outubro', '10,53'],
  ['Inadimplência', 2023, 'Novembro', '9,74'],
  ['Inadimplência', 2023, 'Dezembro', '8,07'],
  ['Inadimplência', 2024, 'Janeiro', '7,57'],
  ['Inadimplência', 2024, 'Fevereiro', '8,24'],
  ['Inadimplência', 2024, 'Março', '6,22'],
  ['Inadimplência', 2024, 'Abril', '4,68'],
  ['Inadimplência', 2024, 'Maio', '2,71'],
  ['Inadimplência', 2024, 'Junho', '2,52'],
  ['Inadimplência', 2024, 'Julho', '3,60'],
  ['Inadimplência', 2024, 'Agosto', '2,14'],
  ['Inadimplência', 2024, 'Setembro', '0,00'],
  ['Inadimplência', 2024, 'Outubro', '0,78'],
  ['Inadimplência', 2024, 'Novembro', '0,90'],
  ['Inadimplência', 2024, 'Dezembro', '1,37'],
  ['Inadimplência', 2025, 'Janeiro', '2,57'],
  ['Inadimplência', 2025, 'Fevereiro', '1,82'],
  ['Inadimplência', 2025, 'Março', '2,59'],
  ['Inadimplência', 2025, 'Abril', '2,97'],
  ['Inadimplência', 2025, 'Maio', '3,04'],
  ['Inadimplência', 2025, 'Junho', '3,08'],
  ['Inadimplência', 2025, 'Julho', '3,79'],
  ['Inadimplência', 2025, 'Agosto', '5,35'],
  ['Inadimplência', 2025, 'Setembro', '6,52'],
  ['Inadimplência', 2025, 'Outubro', '5'],
  ['Inadimplência', 2025, 'Novembro', '7'],
  ['Inadimplência', 2025, 'Dezembro', '7'],
  ['Inadimplência', 2026, 'Janeiro', '9'],

  // Castigado (corrigindo "Castigados")
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '2'],
  ['Inativos', 2025, 'Setembro', '1'],

  // ajustes finais 2025/2026
  ['Carteira Ativa', 2025, 'Outubro', '218.520'],
  ['Carteira Ativa', 2025, 'Novembro', '211.022'],
  ['Inadimplência', 2025, 'Outubro', '5'],
  ['Inadimplência', 2025, 'Novembro', '7'],
  ['Liberações', 2025, 'Outubro', '97.900'],
  ['Liberações', 2025, 'Novembro', '50.700'],
  ['Liberações', 2025, 'Dezembro', '74.300'],
  ['Carteira Ativa', 2025, 'Dezembro', '215.868'],
  ['Liberações', 2026, 'Janeiro', '31.500'],
  ['Carteira Ativa', 2026, 'Janeiro', '182.742']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Marcos para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoriaRaw, ano, mes, valorBruto] of dadosMarcos) {
    if (valorBruto === undefined || valorBruto === null || valorBruto === '') {
      console.warn('Valor vazio, pulando registro:', categoriaRaw, ano, mes);
      continue;
    }

    let categoria = categoriaRaw;
    if (categoriaRaw === 'Castigados') categoria = 'Castigado';
    if (categoriaRaw === 'Clientes ATivos') categoria = 'Clientes Ativos';

    let v = String(valorBruto).trim();
    if (v.includes(',')) {
      v = v.replace(/\./g, '').replace(',', '.'); // milhar + decimal
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

