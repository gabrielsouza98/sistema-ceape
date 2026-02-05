// Script para adicionar em lote os dados da agente "Alessia" (Coordenador Parnaiba)
// Uso (na pasta do projeto):
//   node adicionar-alessia.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Alessia';

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
const dadosAlessia = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '238.648'],
  ['Carteira Ativa', 2023, 'Fevereiro', '227.804'],
  ['Carteira Ativa', 2023, 'Março', '222.918'],
  ['Carteira Ativa', 2023, 'Abril', '236.670'],
  ['Carteira Ativa', 2023, 'Maio', '194.859'],
  ['Carteira Ativa', 2023, 'Junho', '188.070'],
  ['Carteira Ativa', 2023, 'Julho', '203.155'],
  ['Carteira Ativa', 2023, 'Agosto', '184.498'],
  ['Carteira Ativa', 2023, 'Setembro', '170.137'],
  ['Carteira Ativa', 2023, 'Outubro', '174.776'],
  ['Carteira Ativa', 2023, 'Novembro', '183.724'],
  ['Carteira Ativa', 2023, 'Dezembro', '245.077'],
  ['Carteira Ativa', 2024, 'Janeiro', '189.656'],
  ['Carteira Ativa', 2024, 'Fevereiro', '167.410'],
  ['Carteira Ativa', 2024, 'Março', '196.074'],
  ['Carteira Ativa', 2024, 'Abril', '203.209'],
  ['Carteira Ativa', 2024, 'Maio', '179.611'],
  ['Carteira Ativa', 2024, 'Junho', '197.014'],
  ['Carteira Ativa', 2024, 'Julho', '194.233'],
  ['Carteira Ativa', 2024, 'Agosto', '202.982'],
  ['Carteira Ativa', 2024, 'Setembro', '188.600'],
  ['Carteira Ativa', 2024, 'Outubro', '165.844'],
  ['Carteira Ativa', 2024, 'Novembro', '185.150'],
  ['Carteira Ativa', 2024, 'Dezembro', '212.340'],
  ['Carteira Ativa', 2025, 'Janeiro', '189.656'],
  ['Carteira Ativa', 2025, 'Fevereiro', '178.198'],
  ['Carteira Ativa', 2025, 'Março', '186.736'],
  ['Carteira Ativa', 2025, 'Abril', '207.819'],
  ['Carteira Ativa', 2025, 'Maio', '157.085'],
  ['Carteira Ativa', 2025, 'Junho', '155.978'],
  ['Carteira Ativa', 2025, 'Julho', '176.605'],
  ['Carteira Ativa', 2025, 'Agosto', '188.809'],
  ['Carteira Ativa', 2025, 'Setembro', '204.557'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '57.900'],
  ['Liberações', 2023, 'Fevereiro', '55.400'],
  ['Liberações', 2023, 'Março', '69.300'],
  ['Liberações', 2023, 'Abril', '85.100'],
  ['Liberações', 2023, 'Maio', '25.700'],
  ['Liberações', 2023, 'Junho', '50.100'],
  ['Liberações', 2023, 'Julho', '72.100'],
  ['Liberações', 2023, 'Agosto', '41.400'],
  ['Liberações', 2023, 'Setembro', '44.000'],
  ['Liberações', 2023, 'Outubro', '56.800'],
  ['Liberações', 2023, 'Novembro', '68.700'],
  ['Liberações', 2023, 'Dezembro', '116.200'],
  ['Liberações', 2024, 'Janeiro', '21.000'],
  ['Liberações', 2024, 'Fevereiro', '44.900'],
  ['Liberações', 2024, 'Março', '83.750'],
  ['Liberações', 2024, 'Abril', '74.200'],
  ['Liberações', 2024, 'Maio', '41.100'],
  ['Liberações', 2024, 'Junho', '80.000'],
  ['Liberações', 2024, 'Julho', '60.100'],
  ['Liberações', 2024, 'Agosto', '72.400'],
  ['Liberações', 2024, 'Setembro', '52.400'],
  ['Liberações', 2024, 'Outubro', '40.600'],
  ['Liberações', 2024, 'Novembro', '81.800'],
  ['Liberações', 2024, 'Dezembro', '91.600'],
  ['Liberações', 2025, 'Janeiro', '43.400'],
  ['Liberações', 2025, 'Fevereiro', '54.600'],
  ['Liberações', 2025, 'Março', '72.400'],
  ['Liberações', 2025, 'Abril', '81.100'],
  ['Liberações', 2025, 'Maio', '9.300'],
  ['Liberações', 2025, 'Junho', '56.900'],
  ['Liberações', 2025, 'Julho', '79.500'],
  ['Liberações', 2025, 'Agosto', '61.000'],
  ['Liberações', 2025, 'Setembro', '77.600'],

  // Novos
  ['Novos', 2023, 'Janeiro', '5'],
  ['Novos', 2023, 'Fevereiro', '3'],
  ['Novos', 2023, 'Março', '1'],
  ['Novos', 2023, 'Abril', '5'],
  ['Novos', 2023, 'Maio', '0'],
  ['Novos', 2023, 'Junho', '0'],
  ['Novos', 2023, 'Julho', '1'],
  ['Novos', 2023, 'Agosto', '5'],
  ['Novos', 2023, 'Setembro', '2'],
  ['Novos', 2023, 'Outubro', '7'],
  ['Novos', 2023, 'Novembro', '2'],
  ['Novos', 2023, 'Dezembro', '8'],
  ['Novos', 2024, 'Janeiro', '6'],
  ['Novos', 2024, 'Fevereiro', '5'],
  ['Novos', 2024, 'Março', '3'],
  ['Novos', 2024, 'Abril', '6'],
  ['Novos', 2024, 'Maio', '4'],
  ['Novos', 2024, 'Junho', '5'],
  ['Novos', 2024, 'Julho', '5'],
  ['Novos', 2024, 'Agosto', '3'],
  ['Novos', 2024, 'Setembro', '2'],
  ['Novos', 2024, 'Outubro', '1'],
  ['Novos', 2024, 'Novembro', '3'],
  ['Novos', 2024, 'Dezembro', '4'],
  ['Novos', 2025, 'Janeiro', '0'],
  ['Novos', 2025, 'Fevereiro', '4'],
  ['Novos', 2025, 'Março', '3'],
  ['Novos', 2025, 'Abril', '1'],
  ['Novos', 2025, 'Maio', '0'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '4'],
  ['Novos', 2025, 'Agosto', '2'],
  ['Novos', 2025, 'Setembro', '2'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '15'],
  ['Renovações', 2023, 'Fevereiro', '26'],
  ['Renovações', 2023, 'Março', '34'],
  ['Renovações', 2023, 'Abril', '30'],
  ['Renovações', 2023, 'Maio', '9'],
  ['Renovações', 2023, 'Junho', '19'],
  ['Renovações', 2023, 'Julho', '32'],
  ['Renovações', 2023, 'Agosto', '19'],
  ['Renovações', 2023, 'Setembro', '20'],
  ['Renovações', 2023, 'Outubro', '24'],
  ['Renovações', 2023, 'Novembro', '28'],
  ['Renovações', 2023, 'Dezembro', '41'],
  ['Renovações', 2024, 'Janeiro', '7'],
  ['Renovações', 2024, 'Fevereiro', '25'],
  ['Renovações', 2024, 'Março', '34'],
  ['Renovações', 2024, 'Abril', '28'],
  ['Renovações', 2024, 'Maio', '22'],
  ['Renovações', 2024, 'Junho', '38'],
  ['Renovações', 2024, 'Julho', '17'],
  ['Renovações', 2024, 'Agosto', '25'],
  ['Renovações', 2024, 'Setembro', '29'],
  ['Renovações', 2024, 'Outubro', '27'],
  ['Renovações', 2024, 'Novembro', '29'],
  ['Renovações', 2024, 'Dezembro', '32'],
  ['Renovações', 2025, 'Janeiro', '18'],
  ['Renovações', 2025, 'Fevereiro', '29'],
  ['Renovações', 2025, 'Março', '28'],
  ['Renovações', 2025, 'Abril', '32'],
  ['Renovações', 2025, 'Maio', '7'],
  ['Renovações', 2025, 'Junho', '25'],
  ['Renovações', 2025, 'Julho', '31'],
  ['Renovações', 2025, 'Agosto', '27'],
  ['Renovações', 2025, 'Setembro', '34'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '163'],
  ['Clientes Ativos', 2023, 'Fevereiro', '166'],
  ['Clientes Ativos', 2023, 'Março', '163'],
  ['Clientes Ativos', 2023, 'Abril', '163'],
  ['Clientes Ativos', 2023, 'Maio', '154'],
  ['Clientes Ativos', 2023, 'Junho', '145'],
  ['Clientes Ativos', 2023, 'Julho', '148'],
  ['Clientes Ativos', 2023, 'Agosto', '140'],
  ['Clientes Ativos', 2023, 'Setembro', '136'],
  ['Clientes Ativos', 2023, 'Outubro', '151'],
  ['Clientes Ativos', 2023, 'Novembro', '154'],
  ['Clientes Ativos', 2023, 'Dezembro', '157'],
  ['Clientes Ativos', 2024, 'Janeiro', '141'],
  ['Clientes Ativos', 2024, 'Fevereiro', '137'],
  ['Clientes Ativos', 2024, 'Março', '149'],
  ['Clientes Ativos', 2024, 'Abril', '152'],
  ['Clientes Ativos', 2024, 'Maio', '144'],
  ['Clientes Ativos', 2024, 'Junho', '150'],
  ['Clientes Ativos', 2024, 'Julho', '154'],
  ['Clientes Ativos', 2024, 'Agosto', '148'],
  ['Clientes Ativos', 2024, 'Setembro', '144'],
  ['Clientes Ativos', 2024, 'Outubro', '143'],
  ['Clientes Ativos', 2024, 'Novembro', '142'],
  ['Clientes Ativos', 2024, 'Dezembro', '148'],
  ['Clientes Ativos', 2025, 'Janeiro', '136'],
  ['Clientes Ativos', 2025, 'Fevereiro', '143'],
  ['Clientes Ativos', 2025, 'Março', '141'],
  ['Clientes Ativos', 2025, 'Abril', '143'],
  ['Clientes Ativos', 2025, 'Maio', '140'],
  ['Clientes Ativos', 2025, 'Junho', '132'],
  ['Clientes Ativos', 2025, 'Julho', '137'],
  ['Clientes Ativos', 2025, 'Agosto', '140'],
  ['Clientes Ativos', 2025, 'Setembro', '142'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '9,94'],
  ['Inadimplência', 2023, 'Fevereiro', '10,23'],
  ['Inadimplência', 2023, 'Março', '10,21'],
  ['Inadimplência', 2023, 'Abril', '9,39'],
  ['Inadimplência', 2023, 'Maio', '11,27'],
  ['Inadimplência', 2023, 'Junho', '14,12'],
  ['Inadimplência', 2023, 'Julho', '12,93'],
  ['Inadimplência', 2023, 'Agosto', '13,53'],
  ['Inadimplência', 2023, 'Setembro', '15,45'],
  ['Inadimplência', 2023, 'Outubro', '13,42'],
  ['Inadimplência', 2023, 'Novembro', '9,60'],
  ['Inadimplência', 2023, 'Dezembro', '8,16'],
  ['Inadimplência', 2024, 'Janeiro', '3,62'],
  ['Inadimplência', 2024, 'Fevereiro', '5,69'],
  ['Inadimplência', 2024, 'Março', '5,70'],
  ['Inadimplência', 2024, 'Abril', '5,45'],
  ['Inadimplência', 2024, 'Maio', '5,94'],
  ['Inadimplência', 2024, 'Junho', '4,96'],
  ['Inadimplência', 2024, 'Julho', '6,82'],
  ['Inadimplência', 2024, 'Agosto', '4,81'],
  ['Inadimplência', 2024, 'Setembro', '5,23'],
  ['Inadimplência', 2024, 'Outubro', '5,69'],
  ['Inadimplência', 2024, 'Novembro', '3,93'],
  ['Inadimplência', 2024, 'Dezembro', '3,43'],
  ['Inadimplência', 2025, 'Janeiro', '5,04'],
  ['Inadimplência', 2025, 'Fevereiro', '1,49'],
  ['Inadimplência', 2025, 'Março', '3,97'],
  ['Inadimplência', 2025, 'Abril', '4,81'],
  ['Inadimplência', 2025, 'Maio', '7,47'],
  ['Inadimplência', 2025, 'Junho', '7,92'],
  ['Inadimplência', 2025, 'Julho', '6,81'],
  ['Inadimplência', 2025, 'Agosto', '6,52'],
  ['Inadimplência', 2025, 'Setembro', '5,79'],

  // Castigado (corrigindo "Castigados")
  ['Castigado', 2025, 'Maio', '50'],
  ['Castigado', 2025, 'Julho', '50'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '6'],
  ['Inativos', 2025, 'Setembro', '0'],

  // ajustes finais 2025/2026
  ['Carteira Ativa', 2025, 'Outubro', '180.352'],
  ['Carteira Ativa', 2025, 'Novembro', '203.128'],
  ['Clientes Ativos', 2025, 'Outubro', '152'],
  ['Clientes Ativos', 2025, 'Novembro', '154'],
  ['Inadimplência', 2025, 'Outubro', '6'],
  ['Inadimplência', 2025, 'Novembro', '6'],
  ['Liberações', 2025, 'Outubro', '30.800'],
  ['Liberações', 2025, 'Novembro', '79.700'],
  ['Liberações', 2025, 'Dezembro', '62.600'],
  ['Inadimplência', 2025, 'Dezembro', '5'],
  ['Clientes Ativos', 2025, 'Dezembro', '151'],
  ['Carteira Ativa', 2025, 'Dezembro', '197.477'],
  ['Liberações', 2026, 'Janeiro', '41.100'],
  ['Carteira Ativa', 2026, 'Janeiro', '174.717'],
  ['Clientes Ativos', 2026, 'Janeiro', '149'],
  ['Inadimplência', 2026, 'Janeiro', '6']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Alessia para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoriaRaw, ano, mes, valorBruto] of dadosAlessia) {
    if (valorBruto === undefined || valorBruto === null || valorBruto === '') {
      console.warn('Valor vazio, pulando registro:', categoriaRaw, ano, mes);
      continue;
    }

    // corrige nome de categoria, se vier com variação
    let categoria = categoriaRaw;
    if (categoriaRaw === 'Carteira ATiva') categoria = 'Carteira Ativa';
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

console.log(`✅ Registros inseridos para a agente ${pessoa}.`);
db.close();

