// Script para adicionar em lote os dados do agente "Dirceu" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-dirceu.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Dirceu';

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
const dadosDirceu = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Janeiro', '378578'],
  ['Carteira Ativa', 2023, 'Julho', '391154'],
  ['Carteira Ativa', 2023, 'Agosto', '367714'],
  ['Carteira Ativa', 2023, 'Setembro', '397894'],
  ['Carteira Ativa', 2023, 'Outubro', '345814'],
  ['Carteira Ativa', 2023, 'Novembro', '391437'],
  ['Carteira Ativa', 2023, 'Dezembro', '368121'],
  ['Carteira Ativa', 2024, 'Janeiro', '377936'],
  ['Carteira Ativa', 2024, 'Fevereiro', '417038'],
  ['Carteira Ativa', 2024, 'Março', '484599'],
  ['Carteira Ativa', 2024, 'Abril', '373943'],
  ['Carteira Ativa', 2024, 'Maio', '431626'],
  ['Carteira Ativa', 2024, 'Junho', '458447'],
  ['Carteira Ativa', 2024, 'Julho', '435983'],
  ['Carteira Ativa', 2024, 'Agosto', '371183'],
  ['Carteira Ativa', 2024, 'Setembro', '460026'],
  ['Carteira Ativa', 2024, 'Outubro', '445334'],
  ['Carteira Ativa', 2024, 'Novembro', '442775'],
  ['Carteira Ativa', 2024, 'Dezembro', '336652'],
  ['Carteira Ativa', 2025, 'Janeiro', '351971'],
  ['Carteira Ativa', 2025, 'Fevereiro', '398885'],
  ['Carteira Ativa', 2025, 'Março', '395020'],
  ['Carteira Ativa', 2025, 'Abril', '313076'],
  ['Carteira Ativa', 2025, 'Maio', '306722'],
  ['Carteira Ativa', 2025, 'Junho', '333814'],
  ['Carteira Ativa', 2025, 'Julho', '319940'],
  ['Carteira Ativa', 2025, 'Agosto', '315231'],
  ['Carteira Ativa', 2025, 'Setembro', '326682'],

  // Liberações
  ['Liberações', 2023, 'Janeiro', '128400'],
  ['Liberações', 2023, 'Julho', '142700'],
  ['Liberações', 2023, 'Agosto', '90300'],
  ['Liberações', 2023, 'Setembro', '146400'],
  ['Liberações', 2023, 'Outubro', '68400'],
  ['Liberações', 2023, 'Novembro', '167100'],
  ['Liberações', 2023, 'Dezembro', '112800'],
  ['Liberações', 2024, 'Janeiro', '125400'],
  ['Liberações', 2024, 'Fevereiro', '162000'],
  ['Liberações', 2024, 'Março', '149000'],
  ['Liberações', 2024, 'Abril', '50100'],
  ['Liberações', 2024, 'Maio', '192200'],
  ['Liberações', 2024, 'Junho', '127700'],
  ['Liberações', 2024, 'Julho', '122100'],
  ['Liberações', 2024, 'Agosto', '55100'],
  ['Liberações', 2024, 'Setembro', '216300'],
  ['Liberações', 2024, 'Outubro', '123800'],
  ['Liberações', 2024, 'Novembro', '90000'],
  ['Liberações', 2024, 'Dezembro', '80600'],
  ['Liberações', 2025, 'Janeiro', '131100'],
  ['Liberações', 2025, 'Fevereiro', '165200'],
  ['Liberações', 2025, 'Março', '120000'],
  ['Liberações', 2025, 'Abril', '30500'],
  ['Liberações', 2025, 'Maio', '111000'],
  ['Liberações', 2025, 'Junho', '127900'],
  ['Liberações', 2025, 'Julho', '111000'],
  ['Liberações', 2025, 'Agosto', '80100'],
  ['Liberações', 2025, 'Setembro', '129100'],

  // Novos
  ['Novos', 2023, 'Janeiro', '11'],
  ['Novos', 2023, 'Julho', '5'],
  ['Novos', 2023, 'Agosto', '5'],
  ['Novos', 2023, 'Setembro', '1'],
  ['Novos', 2023, 'Outubro', '5'],
  ['Novos', 2023, 'Novembro', '11'],
  ['Novos', 2023, 'Dezembro', '1'],
  ['Novos', 2024, 'Janeiro', '13'],
  ['Novos', 2024, 'Fevereiro', '6'],
  ['Novos', 2024, 'Março', '14'],
  ['Novos', 2024, 'Abril', '7'],
  ['Novos', 2024, 'Maio', '4'],
  ['Novos', 2024, 'Junho', '0'],
  ['Novos', 2024, 'Julho', '3'],
  ['Novos', 2024, 'Agosto', '3'],
  ['Novos', 2024, 'Setembro', '6'],
  ['Novos', 2024, 'Outubro', '5'],
  ['Novos', 2024, 'Novembro', '4'],
  ['Novos', 2024, 'Dezembro', '5'],
  ['Novos', 2025, 'Janeiro', '1'],
  ['Novos', 2025, 'Fevereiro', '8'],
  ['Novos', 2025, 'Março', '1'],
  ['Novos', 2025, 'Abril', '2'],
  ['Novos', 2025, 'Maio', '1'],
  ['Novos', 2025, 'Junho', '5'],
  ['Novos', 2025, 'Julho', '4'],
  ['Novos', 2025, 'Agosto', '4'],
  ['Novos', 2025, 'Setembro', '5'],

  // Renovações
  ['Renovações', 2023, 'Janeiro', '34'],
  ['Renovações', 2023, 'Julho', '49'],
  ['Renovações', 2023, 'Agosto', '31'],
  ['Renovações', 2023, 'Setembro', '41'],
  ['Renovações', 2023, 'Outubro', '30'],
  ['Renovações', 2023, 'Novembro', '26'],
  ['Renovações', 2023, 'Dezembro', '41'],
  ['Renovações', 2024, 'Janeiro', '37'],
  ['Renovações', 2024, 'Fevereiro', '41'],
  ['Renovações', 2024, 'Março', '41'],
  ['Renovações', 2024, 'Abril', '11'],
  ['Renovações', 2024, 'Maio', '56'],
  ['Renovações', 2024, 'Junho', '41'],
  ['Renovações', 2024, 'Julho', '37'],
  ['Renovações', 2024, 'Agosto', '16'],
  ['Renovações', 2024, 'Setembro', '56'],
  ['Renovações', 2024, 'Outubro', '33'],
  ['Renovações', 2024, 'Novembro', '20'],
  ['Renovações', 2024, 'Dezembro', '27'],
  ['Renovações', 2025, 'Janeiro', '31'],
  ['Renovações', 2025, 'Fevereiro', '44'],
  ['Renovações', 2025, 'Março', '34'],
  ['Renovações', 2025, 'Abril', '8'],
  ['Renovações', 2025, 'Maio', '26'],
  ['Renovações', 2025, 'Junho', '45'],
  ['Renovações', 2025, 'Julho', '36'],
  ['Renovações', 2025, 'Agosto', '19'],
  ['Renovações', 2025, 'Setembro', '21'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Janeiro', '232'],
  ['Clientes Ativos', 2023, 'Julho', '238'],
  ['Clientes Ativos', 2023, 'Agosto', '244'],
  ['Clientes Ativos', 2023, 'Setembro', '242'],
  ['Clientes Ativos', 2023, 'Outubro', '239'],
  ['Clientes Ativos', 2023, 'Novembro', '224'],
  ['Clientes Ativos', 2023, 'Dezembro', '204'],
  ['Clientes Ativos', 2024, 'Janeiro', '210'],
  ['Clientes Ativos', 2024, 'Fevereiro', '210'],
  ['Clientes Ativos', 2024, 'Março', '240'],
  ['Clientes Ativos', 2024, 'Abril', '236'],
  ['Clientes Ativos', 2024, 'Maio', '225'],
  ['Clientes Ativos', 2024, 'Junho', '235'],
  ['Clientes Ativos', 2024, 'Julho', '231'],
  ['Clientes Ativos', 2024, 'Agosto', '225'],
  ['Clientes Ativos', 2024, 'Setembro', '221'],
  ['Clientes Ativos', 2024, 'Outubro', '224'],
  ['Clientes Ativos', 2024, 'Novembro', '219'],
  ['Clientes Ativos', 2024, 'Dezembro', '204'],
  ['Clientes Ativos', 2025, 'Janeiro', '195'],
  ['Clientes Ativos', 2025, 'Fevereiro', '191'],
  ['Clientes Ativos', 2025, 'Março', '189'],
  ['Clientes Ativos', 2025, 'Abril', '179'],
  ['Clientes Ativos', 2025, 'Maio', '173'],
  ['Clientes Ativos', 2025, 'Junho', '183'],
  ['Clientes Ativos', 2025, 'Julho', '174'],
  ['Clientes Ativos', 2025, 'Agosto', '180'],
  ['Clientes Ativos', 2025, 'Setembro', '167'],

  // Inadimplência
  ['Inadimplência', 2023, 'Janeiro', '4,45'],
  ['Inadimplência', 2023, 'Julho', '7,23'],
  ['Inadimplência', 2023, 'Agosto', '7,69'],
  ['Inadimplência', 2023, 'Setembro', '7,90'],
  ['Inadimplência', 2023, 'Outubro', '11,23'],
  ['Inadimplência', 2023, 'Novembro', '10,51'],
  ['Inadimplência', 2023, 'Dezembro', '10,33'],
  ['Inadimplência', 2024, 'Janeiro', '11,24'],
  ['Inadimplência', 2024, 'Fevereiro', '11,45'],
  ['Inadimplência', 2024, 'Março', '10,67'],
  ['Inadimplência', 2024, 'Abril', '14,89'],
  ['Inadimplência', 2024, 'Maio', '13,73'],
  ['Inadimplência', 2024, 'Junho', '14,26'],
  ['Inadimplência', 2024, 'Julho', '15,63'],
  ['Inadimplência', 2024, 'Agosto', '19,71'],
  ['Inadimplência', 2024, 'Setembro', '15,57'],
  ['Inadimplência', 2024, 'Outubro', '16,09'],
  ['Inadimplência', 2024, 'Novembro', '16,00'],
  ['Inadimplência', 2024, 'Dezembro', '7,62'],
  ['Inadimplência', 2025, 'Janeiro', '9,00'],
  ['Inadimplência', 2025, 'Fevereiro', '9,85'],
  ['Inadimplência', 2025, 'Março', '10,48'],
  ['Inadimplência', 2025, 'Abril', '14,12'],
  ['Inadimplência', 2025, 'Maio', '14,29'],
  ['Inadimplência', 2025, 'Junho', '12,24'],
  ['Inadimplência', 2025, 'Julho', '10,32'],
  ['Inadimplência', 2025, 'Agosto', '10,82'],
  ['Inadimplência', 2025, 'Setembro', '7,80'],

  // Mora
  ['Mora', 2023, 'Janeiro', '13056'],
  ['Mora', 2023, 'Julho', '28269'],
  ['Mora', 2023, 'Agosto', '28269'],
  ['Mora', 2023, 'Setembro', '31419'],
  ['Mora', 2023, 'Outubro', '38819'],
  ['Mora', 2023, 'Novembro', '41147'],
  ['Mora', 2023, 'Dezembro', '38034'],
  ['Mora', 2024, 'Janeiro', '42493'],
  ['Mora', 2024, 'Fevereiro', '47769'],
  ['Mora', 2024, 'Março', '51719'],
  ['Mora', 2024, 'Abril', '55669'],
  ['Mora', 2024, 'Maio', '59269'],
  ['Mora', 2024, 'Junho', '65374'],
  ['Mora', 2024, 'Julho', '68154'],
  ['Mora', 2024, 'Agosto', '73163'],
  ['Mora', 2024, 'Setembro', '71604'],
  ['Mora', 2024, 'Outubro', '71634'],
  ['Mora', 2024, 'Novembro', '70831'],
  ['Mora', 2024, 'Dezembro', '25660'],
  ['Mora', 2025, 'Janeiro', '31963'],
  ['Mora', 2025, 'Fevereiro', '39289'],
  ['Mora', 2025, 'Março', '41383'],
  ['Mora', 2025, 'Abril', '44210'],
  ['Mora', 2025, 'Maio', '43830'],
  ['Mora', 2025, 'Junho', '40845'],
  ['Mora', 2025, 'Julho', '33025'],
  ['Mora', 2025, 'Agosto', '34092'],
  ['Mora', 2025, 'Setembro', '25542'],

  // Castigado
  ['Castigado', 2023, 'Setembro', '300'],
  ['Castigado', 2023, 'Outubro', '1100'],
  ['Castigado', 2023, 'Novembro', '400'],
  ['Castigado', 2023, 'Dezembro', '500'],
  ['Castigado', 2024, 'Janeiro', '35'],
  ['Castigado', 2024, 'Fevereiro', '1300'],
  ['Castigado', 2024, 'Março', '118'],
  ['Castigado', 2024, 'Abril', '80'],
  ['Castigado', 2024, 'Maio', '80'],
  ['Castigado', 2024, 'Junho', '39'],
  ['Castigado', 2024, 'Julho', '39'],
  ['Castigado', 2024, 'Agosto', '118'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '250'],
  ['Castigado', 2025, 'Janeiro', '3750'],
  ['Castigado', 2025, 'Fevereiro', '1300'],
  ['Castigado', 2025, 'Março', '125'],
  ['Castigado', 2025, 'Abril', '125'],
  ['Castigado', 2025, 'Maio', '79'],
  ['Castigado', 2025, 'Junho', '150'],
  ['Castigado', 2025, 'Julho', '400'],
  ['Castigado', 2025, 'Agosto', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '2'],

  // ajustes finais 2025/2026
  ['Inadimplência', 2025, 'Outubro', '9,39'],
  ['Carteira Ativa', 2025, 'Outubro', '329.989'],
  ['Carteira Ativa', 2025, 'Novembro', '363.091'],
  ['Clientes Ativos', 2025, 'Outubro', '167'],
  ['Clientes Ativos', 2025, 'Novembro', '155'],
  ['Inadimplência', 2025, 'Novembro', '11,4'],
  ['Liberações', 2025, 'Outubro', '103.900'],
  ['Liberações', 2025, 'Novembro', '123.800'],
  ['Liberações', 2025, 'Dezembro', '56.300'],
  ['Carteira Ativa', 2025, 'Dezembro', '306.777'],
  ['Clientes Ativos', 2025, 'Dezembro', '150'],
  ['Inadimplência', 2025, 'Dezembro', '15,27'],
  ['Carteira Ativa', 2026, 'Janeiro', '343.120'],
  ['Clientes Ativos', 2026, 'Janeiro', '143'],
  ['Inadimplência', 2026, 'Janeiro', '13,11'],
  ['Liberações', 2026, 'Janeiro', '142.500']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Dirceu para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosDirceu) {
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

