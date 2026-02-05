// Script para adicionar em lote os dados do agente "David" (Coordenador Anaídia)
// Uso (na pasta do projeto):
//   node adicionar-david.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'David';

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
const dadosDavid = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Fevereiro', '120.636'],
  ['Carteira Ativa', 2023, 'Julho', '165.640'],
  ['Carteira Ativa', 2023, 'Agosto', '204.771'],
  ['Carteira Ativa', 2023, 'Setembro', '194.752'],
  ['Carteira Ativa', 2023, 'Outubro', '190.434'],
  ['Carteira Ativa', 2023, 'Novembro', '150.637'],
  ['Carteira Ativa', 2023, 'Dezembro', '174.619'],
  ['Carteira Ativa', 2024, 'Janeiro', '178.422'],
  ['Carteira Ativa', 2024, 'Fevereiro', '199.116'],
  ['Carteira Ativa', 2024, 'Março', '160.416'],
  ['Carteira Ativa', 2024, 'Abril', '156.611'],
  ['Carteira Ativa', 2024, 'Maio', '148.067'],
  ['Carteira Ativa', 2024, 'Junho', '139.189'],
  ['Carteira Ativa', 2024, 'Julho', '127.652'],
  ['Carteira Ativa', 2024, 'Agosto', '155.353'],
  ['Carteira Ativa', 2024, 'Setembro', '135.195'],
  ['Carteira Ativa', 2024, 'Outubro', '133.376'],
  ['Carteira Ativa', 2024, 'Novembro', '115.936'],
  ['Carteira Ativa', 2024, 'Dezembro', '140.295'],
  ['Carteira Ativa', 2025, 'Janeiro', '123.884'],
  ['Carteira Ativa', 2025, 'Fevereiro', '113.470'],
  ['Carteira Ativa', 2025, 'Março', '98.674'],
  ['Carteira Ativa', 2025, 'Abril', '126.394'],
  ['Carteira Ativa', 2025, 'Maio', '116.009'],
  ['Carteira Ativa', 2025, 'Junho', '119.875'],
  ['Carteira Ativa', 2025, 'Julho', '118.897'],
  ['Carteira Ativa', 2025, 'Agosto', '155.964'],
  ['Carteira Ativa', 2025, 'Setembro', '145.139'],

  // Liberações
  ['Liberações', 2023, 'Fevereiro', '24.400'],
  ['Liberações', 2023, 'Julho', '76.000'],
  ['Liberações', 2023, 'Agosto', '78.700'],
  ['Liberações', 2023, 'Setembro', '41.800'],
  ['Liberações', 2023, 'Outubro', '55.400'],
  ['Liberações', 2023, 'Novembro', '13.500'],
  ['Liberações', 2023, 'Dezembro', '85.400'],
  ['Liberações', 2024, 'Janeiro', '56.500'],
  ['Liberações', 2024, 'Fevereiro', '67.100'],
  ['Liberações', 2024, 'Março', '5.300'],
  ['Liberações', 2024, 'Abril', '56.900'],
  ['Liberações', 2024, 'Maio', '36.400'],
  ['Liberações', 2024, 'Junho', '33.800'],
  ['Liberações', 2024, 'Julho', '34.800'],
  ['Liberações', 2024, 'Agosto', '67.500'],
  ['Liberações', 2024, 'Setembro', '18.600'],
  ['Liberações', 2024, 'Outubro', '46.300'],
  ['Liberações', 2024, 'Novembro', '20.900'],
  ['Liberações', 2024, 'Dezembro', '85.700'],
  ['Liberações', 2025, 'Janeiro', '20.900'],
  ['Liberações', 2025, 'Fevereiro', '29.600'],
  ['Liberações', 2025, 'Março', '24.300'],
  ['Liberações', 2025, 'Abril', '62.700'],
  ['Liberações', 2025, 'Maio', '27.700'],
  ['Liberações', 2025, 'Junho', '37.100'],
  ['Liberações', 2025, 'Julho', '36.700'],
  ['Liberações', 2025, 'Agosto', '73.200'],
  ['Liberações', 2025, 'Setembro', '38.600'],

  // Novos
  ['Novos', 2023, 'Fevereiro', '12'],
  ['Novos', 2023, 'Julho', '0'],
  ['Novos', 2023, 'Agosto', '7'],
  ['Novos', 2023, 'Setembro', '10'],
  ['Novos', 2023, 'Outubro', '14'],
  ['Novos', 2023, 'Novembro', '3'],
  ['Novos', 2023, 'Dezembro', '1'],
  ['Novos', 2024, 'Janeiro', '1'],
  ['Novos', 2024, 'Fevereiro', '5'],
  ['Novos', 2024, 'Março', '0'],
  ['Novos', 2024, 'Abril', '0'],
  ['Novos', 2024, 'Maio', '1'],
  ['Novos', 2024, 'Junho', '1'],
  ['Novos', 2024, 'Julho', '3'],
  ['Novos', 2024, 'Agosto', '2'],
  ['Novos', 2024, 'Setembro', '3'],
  ['Novos', 2024, 'Outubro', '7'],
  ['Novos', 2024, 'Novembro', '11'],
  ['Novos', 2024, 'Dezembro', '1'],
  ['Novos', 2025, 'Janeiro', '3'],
  ['Novos', 2025, 'Fevereiro', '11'],
  ['Novos', 2025, 'Março', '3'],
  ['Novos', 2025, 'Abril', '2'],
  ['Novos', 2025, 'Maio', '4'],
  ['Novos', 2025, 'Junho', '5'],
  ['Novos', 2025, 'Julho', '12'],
  ['Novos', 2025, 'Agosto', '15'],
  ['Novos', 2025, 'Setembro', '5'],

  // Renovações
  ['Renovações', 2023, 'Fevereiro', '36'],
  ['Renovações', 2023, 'Julho', '30'],
  ['Renovações', 2023, 'Agosto', '28'],
  ['Renovações', 2023, 'Setembro', '17'],
  ['Renovações', 2023, 'Outubro', '21'],
  ['Renovações', 2023, 'Novembro', '6'],
  ['Renovações', 2023, 'Dezembro', '26'],
  ['Renovações', 2024, 'Janeiro', '27'],
  ['Renovações', 2024, 'Fevereiro', '27'],
  ['Renovações', 2024, 'Março', '4'],
  ['Renovações', 2024, 'Abril', '14'],
  ['Renovações', 2024, 'Maio', '13'],
  ['Renovações', 2024, 'Junho', '16'],
  ['Renovações', 2024, 'Julho', '12'],
  ['Renovações', 2024, 'Agosto', '14'],
  ['Renovações', 2024, 'Setembro', '5'],
  ['Renovações', 2024, 'Outubro', '18'],
  ['Renovações', 2024, 'Novembro', '4'],
  ['Renovações', 2024, 'Dezembro', '27'],
  ['Renovações', 2025, 'Janeiro', '9'],
  ['Renovações', 2025, 'Fevereiro', '9'],
  ['Renovações', 2025, 'Março', '12'],
  ['Renovações', 2025, 'Abril', '19'],
  ['Renovações', 2025, 'Maio', '10'],
  ['Renovações', 2025, 'Junho', '13'],
  ['Renovações', 2025, 'Julho', '11'],
  ['Renovações', 2025, 'Agosto', '20'],
  ['Renovações', 2025, 'Setembro', '15'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Fevereiro', '118'],
  ['Clientes Ativos', 2023, 'Julho', '130'],
  ['Clientes Ativos', 2023, 'Agosto', '138'],
  ['Clientes Ativos', 2023, 'Setembro', '137'],
  ['Clientes Ativos', 2023, 'Outubro', '150'],
  ['Clientes Ativos', 2023, 'Novembro', '140'],
  ['Clientes Ativos', 2023, 'Dezembro', '128'],
  ['Clientes Ativos', 2024, 'Janeiro', '123'],
  ['Clientes Ativos', 2024, 'Fevereiro', '128'],
  ['Clientes Ativos', 2024, 'Março', '124'],
  ['Clientes Ativos', 2024, 'Abril', '121'],
  ['Clientes Ativos', 2024, 'Maio', '113'],
  ['Clientes Ativos', 2024, 'Junho', '103'],
  ['Clientes Ativos', 2024, 'Julho', '88'],
  ['Clientes Ativos', 2024, 'Agosto', '89'],
  ['Clientes Ativos', 2024, 'Setembro', '84'],
  ['Clientes Ativos', 2024, 'Outubro', '87'],
  ['Clientes Ativos', 2024, 'Novembro', '99'],
  ['Clientes Ativos', 2024, 'Dezembro', '82'],
  ['Clientes Ativos', 2025, 'Janeiro', '87'],
  ['Clientes Ativos', 2025, 'Fevereiro', '92'],
  ['Clientes Ativos', 2025, 'Março', '86'],
  ['Clientes Ativos', 2025, 'Abril', '87'],
  ['Clientes Ativos', 2025, 'Maio', '89'],
  ['Clientes Ativos', 2025, 'Junho', '86'],
  ['Clientes Ativos', 2025, 'Julho', '97'],
  ['Clientes Ativos', 2025, 'Agosto', '109'],
  ['Clientes Ativos', 2025, 'Setembro', '114'],

  // Inadimplência
  ['Inadimplência', 2023, 'Julho', '17,85'],
  ['Inadimplência', 2023, 'Agosto', '15,48'],
  ['Inadimplência', 2023, 'Setembro', '16,81'],
  ['Inadimplência', 2023, 'Outubro', '19,37'],
  ['Inadimplência', 2023, 'Novembro', '26,80'],
  ['Inadimplência', 2023, 'Dezembro', '14,28'],
  ['Inadimplência', 2024, 'Janeiro', '16,68'],
  ['Inadimplência', 2024, 'Fevereiro', '17,33'],
  ['Inadimplência', 2024, 'Março', '23,57'],
  ['Inadimplência', 2024, 'Abril', '23,50'],
  ['Inadimplência', 2024, 'Maio', '24,27'],
  ['Inadimplência', 2024, 'Junho', '26,34'],
  ['Inadimplência', 2024, 'Julho', '23,21'],
  ['Inadimplência', 2024, 'Agosto', '17,85'],
  ['Inadimplência', 2024, 'Setembro', '20,04'],
  ['Inadimplência', 2024, 'Outubro', '16,94'],
  ['Inadimplência', 2024, 'Novembro', '19,72'],
  ['Inadimplência', 2024, 'Dezembro', '4,97'],
  ['Inadimplência', 2025, 'Janeiro', '5,00'],
  ['Inadimplência', 2025, 'Fevereiro', '5,64'],
  ['Inadimplência', 2025, 'Março', '7,74'],
  ['Inadimplência', 2025, 'Abril', '8,14'],
  ['Inadimplência', 2025, 'Maio', '8,54'],
  ['Inadimplência', 2025, 'Junho', '9,56'],
  ['Inadimplência', 2025, 'Julho', '9,89'],
  ['Inadimplência', 2025, 'Agosto', '7,12'],
  ['Inadimplência', 2025, 'Setembro', '7,68'],

  // Mora
  ['Mora', 2023, 'Fevereiro', '20.278'],
  ['Mora', 2023, 'Julho', '29.565'],
  ['Mora', 2023, 'Agosto', '31.071'],
  ['Mora', 2023, 'Setembro', '32.728'],
  ['Mora', 2023, 'Outubro', '36.892'],
  ['Mora', 2023, 'Novembro', '40.367'],
  ['Mora', 2023, 'Dezembro', '24.941'],
  ['Mora', 2024, 'Janeiro', '29.766'],
  ['Mora', 2024, 'Fevereiro', '34.516'],
  ['Mora', 2024, 'Março', '37.803'],
  ['Mora', 2024, 'Abril', '36.808'],
  ['Mora', 2024, 'Maio', '35.931'],
  ['Mora', 2024, 'Junho', '36.661'],
  ['Mora', 2024, 'Julho', '29.630'],
  ['Mora', 2024, 'Agosto', '27.728'],
  ['Mora', 2024, 'Setembro', '27.091'],
  ['Mora', 2024, 'Outubro', '22.594'],
  ['Mora', 2024, 'Novembro', '22.856'],
  ['Mora', 2024, 'Dezembro', '5.989'],
  ['Mora', 2025, 'Janeiro', '6.385'],
  ['Mora', 2025, 'Fevereiro', '6.400'],
  ['Mora', 2025, 'Março', '7.640'],
  ['Mora', 2025, 'Abril', '10.289'],
  ['Mora', 2025, 'Maio', '9.909'],
  ['Mora', 2025, 'Junho', '11.455'],
  ['Mora', 2025, 'Julho', '11.757'],
  ['Mora', 2025, 'Agosto', '11.104'],
  ['Mora', 2025, 'Setembro', '11.149'],

  // Castigado
  ['Castigado', 2023, 'Setembro', '0'],
  ['Castigado', 2023, 'Outubro', '100'],
  ['Castigado', 2023, 'Dezembro', '100'],
  ['Castigado', 2024, 'Janeiro', '20'],
  ['Castigado', 2024, 'Maio', '300'],
  ['Castigado', 2024, 'Junho', '120'],
  ['Castigado', 2024, 'Julho', '500'],
  ['Castigado', 2025, 'Janeiro', '350'],
  ['Castigado', 2025, 'Fevereiro', '300'],
  ['Castigado', 2025, 'Março', '869'],
  ['Castigado', 2025, 'Abril', '50'],
  ['Castigado', 2025, 'Maio', '80'],
  ['Castigado', 2025, 'Junho', '80'],
  ['Castigado', 2025, 'Agosto', '80'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '1'],
  ['Inativos', 2025, 'Setembro', '1'],

  // ajustes finais 2025
  ['Carteira Ativa', 2025, 'Outubro', '151.252'],
  ['Carteira Ativa', 2025, 'Novembro', '145.769'],
  ['Clientes Ativos', 2025, 'Outubro', '117'],
  ['Clientes Ativos', 2025, 'Novembro', '121'],
  ['Inadimplência', 2025, 'Outubro', '11,8'],
  ['Inadimplência', 2025, 'Novembro', '17,31'],
  ['Liberações', 2025, 'Outubro', '45.600'],
  ['Liberações', 2025, 'Novembro', '30.500'],
  ['Liberações', 2025, 'Dezembro', '83.800'],
  ['Carteira Ativa', 2025, 'Dezembro', '141.191'],
  ['Clientes Ativos', 2025, 'Dezembro', '113'],
  ['Inadimplência', 2025, 'Dezembro', '20,65']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de David para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoriaRaw, ano, mes, valorBruto] of dadosDavid) {
    if (valorBruto === undefined || valorBruto === null || valorBruto === '') {
      console.warn('Valor vazio, pulando registro:', categoriaRaw, ano, mes);
      continue;
    }

    const categoria = categoriaRaw === 'Carteira ATiva' ? 'Carteira Ativa' : categoriaRaw;

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

