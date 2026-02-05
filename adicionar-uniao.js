// Script para adicionar em lote os dados do agente "Uniao" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-uniao.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Uniao';

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
const dadosUniao = [
  // Carteira Ativa
  ['Carteira Ativa', 2024, 'Janeiro', '206092'],
  ['Carteira Ativa', 2024, 'Fevereiro', '213842'],
  ['Carteira Ativa', 2024, 'Abril', '199791'],
  ['Carteira Ativa', 2024, 'Maio', '214171'],
  ['Carteira Ativa', 2024, 'Junho', '200216'],
  ['Carteira Ativa', 2024, 'Julho', '225666'],
  ['Carteira Ativa', 2024, 'Agosto', '218553'],
  ['Carteira Ativa', 2024, 'Setembro', '224194'],
  ['Carteira Ativa', 2024, 'Outubro', '258892'],
  ['Carteira Ativa', 2024, 'Novembro', '296533'],
  ['Carteira Ativa', 2024, 'Dezembro', '274022'],
  ['Carteira Ativa', 2025, 'Janeiro', '242331'],
  ['Carteira Ativa', 2025, 'Fevereiro', '294053'],
  ['Carteira Ativa', 2025, 'Março', '260508'],
  ['Carteira Ativa', 2025, 'Abril', '242564'],
  ['Carteira Ativa', 2025, 'Maio', '293684'],
  ['Carteira Ativa', 2025, 'Junho', '278485'],
  ['Carteira Ativa', 2025, 'Julho', '273424'],
  ['Carteira Ativa', 2025, 'Agosto', '261977'],
  ['Carteira Ativa', 2025, 'Setembro', '232537'],

  // Liberações
  ['Liberações', 2024, 'Janeiro', '80600'],
  ['Liberações', 2024, 'Fevereiro', '54100'],
  ['Liberações', 2024, 'Março', '101300'],
  ['Liberações', 2024, 'Abril', '53600'],
  ['Liberações', 2024, 'Maio', '76700'],
  ['Liberações', 2024, 'Junho', '48900'],
  ['Liberações', 2024, 'Julho', '110600'],
  ['Liberações', 2024, 'Agosto', '63500'],
  ['Liberações', 2024, 'Setembro', '83300'],
  ['Liberações', 2024, 'Outubro', '69100'],
  ['Liberações', 2024, 'Novembro', '128100'],
  ['Liberações', 2024, 'Dezembro', '64500'],
  ['Liberações', 2025, 'Janeiro', '57300'],
  ['Liberações', 2025, 'Fevereiro', '133400'],
  ['Liberações', 2025, 'Março', '53600'],
  ['Liberações', 2025, 'Abril', '71000'],
  ['Liberações', 2025, 'Maio', '131700'],
  ['Liberações', 2025, 'Junho', '71200'],
  ['Liberações', 2025, 'Julho', '90000'],
  ['Liberações', 2025, 'Agosto', '72000'],
  ['Liberações', 2025, 'Setembro', '62700'],

  // Novos
  ['Novos', 2024, 'Janeiro', '11'],
  ['Novos', 2024, 'Fevereiro', '1'],
  ['Novos', 2024, 'Março', '0'],
  ['Novos', 2024, 'Abril', '1'],
  ['Novos', 2024, 'Maio', '2'],
  ['Novos', 2024, 'Junho', '0'],
  ['Novos', 2024, 'Julho', '0'],
  ['Novos', 2024, 'Agosto', '0'],
  ['Novos', 2024, 'Setembro', '2'],
  ['Novos', 2024, 'Outubro', '0'],
  ['Novos', 2024, 'Novembro', '1'],
  ['Novos', 2024, 'Dezembro', '0'],
  ['Novos', 2025, 'Janeiro', '0'],
  ['Novos', 2025, 'Fevereiro', '4'],
  ['Novos', 2025, 'Março', '0'],
  ['Novos', 2025, 'Abril', '2'],
  ['Novos', 2025, 'Maio', '2'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '6'],
  ['Novos', 2025, 'Agosto', '8'],
  ['Novos', 2025, 'Setembro', '2'],

  // Renovações
  ['Renovações', 2024, 'Janeiro', '22'],
  ['Renovações', 2024, 'Fevereiro', '18'],
  ['Renovações', 2024, 'Março', '28'],
  ['Renovações', 2024, 'Abril', '16'],
  ['Renovações', 2024, 'Maio', '26'],
  ['Renovações', 2024, 'Junho', '15'],
  ['Renovações', 2024, 'Julho', '17'],
  ['Renovações', 2024, 'Agosto', '30'],
  ['Renovações', 2024, 'Setembro', '29'],
  ['Renovações', 2024, 'Outubro', '20'],
  ['Renovações', 2024, 'Novembro', '30'],
  ['Renovações', 2024, 'Dezembro', '31'],
  ['Renovações', 2025, 'Janeiro', '21'],
  ['Renovações', 2025, 'Fevereiro', '31'],
  ['Renovações', 2025, 'Março', '24'],
  ['Renovações', 2025, 'Abril', '23'],
  ['Renovações', 2025, 'Maio', '27'],
  ['Renovações', 2025, 'Junho', '21'],
  ['Renovações', 2025, 'Julho', '24'],
  ['Renovações', 2025, 'Agosto', '28'],
  ['Renovações', 2025, 'Setembro', '28'],

  // Clientes Ativos
  ['Clientes Ativos', 2024, 'Janeiro', '137'],
  ['Clientes Ativos', 2024, 'Fevereiro', '156'],
  ['Clientes Ativos', 2024, 'Abril', '105'],
  ['Clientes Ativos', 2024, 'Maio', '118'],
  ['Clientes Ativos', 2024, 'Junho', '124'],
  ['Clientes Ativos', 2024, 'Julho', '128'],
  ['Clientes Ativos', 2024, 'Agosto', '142'],
  ['Clientes Ativos', 2024, 'Setembro', '137'],
  ['Clientes Ativos', 2024, 'Outubro', '166'],
  ['Clientes Ativos', 2024, 'Novembro', '166'],
  ['Clientes Ativos', 2024, 'Dezembro', '177'],
  ['Clientes Ativos', 2025, 'Janeiro', '165'],
  ['Clientes Ativos', 2025, 'Fevereiro', '168'],
  ['Clientes Ativos', 2025, 'Março', '165'],
  ['Clientes Ativos', 2025, 'Abril', '157'],
  ['Clientes Ativos', 2025, 'Maio', '155'],
  ['Clientes Ativos', 2025, 'Junho', '151'],
  ['Clientes Ativos', 2025, 'Julho', '151'],
  ['Clientes Ativos', 2025, 'Agosto', '155'],
  ['Clientes Ativos', 2025, 'Setembro', '146'],

  // Inadimplência
  ['Inadimplência', 2024, 'Janeiro', '0,22'],
  ['Inadimplência', 2024, 'Fevereiro', '1,92'],
  ['Inadimplência', 2024, 'Abril', '1,54'],
  ['Inadimplência', 2024, 'Maio', '3,15'],
  ['Inadimplência', 2024, 'Junho', '4,65'],
  ['Inadimplência', 2024, 'Julho', '2,68'],
  ['Inadimplência', 2024, 'Agosto', '2,23'],
  ['Inadimplência', 2024, 'Setembro', '2,59'],
  ['Inadimplência', 2024, 'Outubro', '5,35'],
  ['Inadimplência', 2024, 'Novembro', '5,5'],
  ['Inadimplência', 2024, 'Dezembro', '7,11'],
  ['Inadimplência', 2025, 'Janeiro', '8,79'],
  ['Inadimplência', 2025, 'Fevereiro', '8,75'],
  ['Inadimplência', 2025, 'Março', '10,43'],
  ['Inadimplência', 2025, 'Abril', '10,39'],
  ['Inadimplência', 2025, 'Maio', '9,02'],
  ['Inadimplência', 2025, 'Junho', '9,87'],
  ['Inadimplência', 2025, 'Julho', '10,57'],
  ['Inadimplência', 2025, 'Agosto', '9,93'],
  ['Inadimplência', 2025, 'Setembro', '11,02'],

  // Mora
  ['Mora', 2024, 'Janeiro', '444'],
  ['Mora', 2024, 'Fevereiro', '1054,65'],
  ['Mora', 2024, 'Abril', '3075'],
  ['Mora', 2024, 'Maio', '6739'],
  ['Mora', 2024, 'Junho', '9312'],
  ['Mora', 2024, 'Julho', '6050'],
  ['Mora', 2024, 'Agosto', '4868'],
  ['Mora', 2024, 'Setembro', '5804'],
  ['Mora', 2024, 'Outubro', '13861'],
  ['Mora', 2024, 'Novembro', '16297'],
  ['Mora', 2024, 'Dezembro', '19471'],
  ['Mora', 2025, 'Janeiro', '21299'],
  ['Mora', 2025, 'Fevereiro', '25739'],
  ['Mora', 2025, 'Março', '27166'],
  ['Mora', 2025, 'Abril', '25197'],
  ['Mora', 2025, 'Maio', '26499'],
  ['Mora', 2025, 'Junho', '27498'],
  ['Mora', 2025, 'Julho', '28896'],
  ['Mora', 2025, 'Agosto', '26014'],
  ['Mora', 2025, 'Setembro', '25622'],

  // Castigado
  ['Castigado', 2024, 'Abril', '80'],
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '300'],
  ['Castigado', 2024, 'Julho', '59'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '50'],
  ['Castigado', 2024, 'Outubro', '100'],
  ['Castigado', 2024, 'Novembro', '130'],
  ['Castigado', 2025, 'Janeiro', '100'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '1'],
  ['Inativos', 2025, 'Setembro', '2'],

  // ajustes finais 2025/2026
  ['Carteira Ativa', 2025, 'Outubro', '210075'],
  ['Carteira Ativa', 2025, 'Novembro', '208205'],
  ['Clientes Ativos', 2025, 'Outubro', '144'],
  ['Clientes Ativos', 2025, 'Novembro', '141'],
  ['Inadimplência', 2025, 'Outubro', '15'],
  ['Inadimplência', 2025, 'Novembro', '12,74'],
  ['Liberações', 2025, 'Outubro', '43600'],
  ['Liberações', 2025, 'Novembro', '66900'],
  ['Liberações', 2025, 'Dezembro', '85.700'],
  ['Clientes Ativos', 2025, 'Dezembro', '143'],
  ['Carteira Ativa', 2025, 'Dezembro', '215.384'],
  ['Inadimplência', 2025, 'Dezembro', '12,31'],
  ['Inadimplência', 2026, 'Janeiro', '19,1'],
  ['Carteira Ativa', 2026, 'Janeiro', '222.977'],
  ['Clientes Ativos', 2026, 'Janeiro', '129'],
  ['Liberações', 2026, 'Janeiro', '66.700']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Uniao para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosUniao) {
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

