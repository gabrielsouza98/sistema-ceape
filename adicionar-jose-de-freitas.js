// Script para adicionar em lote os dados do agente "Jose de Freitas" (Coordenador Glenyo)
// Uso (na pasta do projeto):
//   node adicionar-jose-de-freitas.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Jose de Freitas';

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
const dadosJoseDeFreitas = [
  // Carteira Ativa
  ['Carteira Ativa', 2024, 'Janeiro', '144914'],
  ['Carteira Ativa', 2024, 'Fevereiro', '115014'],
  ['Carteira Ativa', 2024, 'Março', '104964'],
  ['Carteira Ativa', 2024, 'Abril', '149456'],
  ['Carteira Ativa', 2024, 'Maio', '122268'],
  ['Carteira Ativa', 2024, 'Junho', '113488'],
  ['Carteira Ativa', 2024, 'Julho', '102428'],
  ['Carteira Ativa', 2024, 'Agosto', '118727'],
  ['Carteira Ativa', 2024, 'Setembro', '115747'],
  ['Carteira Ativa', 2024, 'Outubro', '83211'],
  ['Carteira Ativa', 2024, 'Novembro', '93510'],
  ['Carteira Ativa', 2025, 'Janeiro', '88555'],
  ['Carteira Ativa', 2025, 'Fevereiro', '98050'],
  ['Carteira Ativa', 2025, 'Março', '69395'],
  ['Carteira Ativa', 2025, 'Abril', '84340'],
  ['Carteira Ativa', 2025, 'Maio', '92193'],
  ['Carteira Ativa', 2025, 'Junho', '103201'],
  ['Carteira Ativa', 2025, 'Julho', '103276'],
  ['Carteira Ativa', 2025, 'Agosto', '107848'],
  ['Carteira Ativa', 2025, 'Setembro', '118653'],

  // Liberações
  ['Liberações', 2024, 'Janeiro', '38000'],
  ['Liberações', 2024, 'Fevereiro', '14200'],
  ['Liberações', 2024, 'Março', '52800'],
  ['Liberações', 2024, 'Abril', '64400'],
  ['Liberações', 2024, 'Maio', '15200'],
  ['Liberações', 2024, 'Junho', '19400'],
  ['Liberações', 2024, 'Julho', '26300'],
  ['Liberações', 2024, 'Agosto', '48000'],
  ['Liberações', 2024, 'Setembro', '32400'],
  ['Liberações', 2024, 'Outubro', '0'],
  ['Liberações', 2024, 'Novembro', '37100'],
  ['Liberações', 2024, 'Dezembro', '46000'],
  ['Liberações', 2025, 'Janeiro', '25000'],
  ['Liberações', 2025, 'Fevereiro', '37400'],
  ['Liberações', 2025, 'Março', '0'],
  ['Liberações', 2025, 'Abril', '41000'],
  ['Liberações', 2025, 'Maio', '41000'],
  ['Liberações', 2025, 'Junho', '39500'],
  ['Liberações', 2025, 'Julho', '32500'],
  ['Liberações', 2025, 'Agosto', '35400'],
  ['Liberações', 2025, 'Setembro', '41700'],

  // Novos
  ['Novos', 2024, 'Janeiro', '4'],
  ['Novos', 2024, 'Fevereiro', '3'],
  ['Novos', 2024, 'Março', '1'],
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
  ['Renovações', 2024, 'Janeiro', '10'],
  ['Renovações', 2024, 'Fevereiro', '8'],
  ['Renovações', 2024, 'Março', '17'],
  ['Renovações', 2024, 'Abril', '19'],
  ['Renovações', 2024, 'Maio', '7'],
  ['Renovações', 2024, 'Junho', '9'],
  ['Renovações', 2024, 'Julho', '10'],
  ['Renovações', 2024, 'Agosto', '12'],
  ['Renovações', 2024, 'Setembro', '15'],
  ['Renovações', 2024, 'Outubro', '0'],
  ['Renovações', 2024, 'Novembro', '14'],
  ['Renovações', 2024, 'Dezembro', '14'],
  ['Renovações', 2025, 'Janeiro', '6'],
  ['Renovações', 2025, 'Fevereiro', '15'],
  ['Renovações', 2025, 'Março', '0'],
  ['Renovações', 2025, 'Abril', '10'],
  ['Renovações', 2025, 'Maio', '16'],
  ['Renovações', 2025, 'Junho', '6'],
  ['Renovações', 2025, 'Julho', '7'],
  ['Renovações', 2025, 'Agosto', '12'],
  ['Renovações', 2025, 'Setembro', '13'],

  // Clientes Ativos
  ['Clientes Ativos', 2024, 'Janeiro', '97'],
  ['Clientes Ativos', 2024, 'Fevereiro', '94'],
  ['Clientes Ativos', 2024, 'Março', '87'],
  ['Clientes Ativos', 2024, 'Abril', '93'],
  ['Clientes Ativos', 2024, 'Maio', '83'],
  ['Clientes Ativos', 2024, 'Junho', '79'],
  ['Clientes Ativos', 2024, 'Julho', '76'],
  ['Clientes Ativos', 2024, 'Agosto', '72'],
  ['Clientes Ativos', 2024, 'Setembro', '72'],
  ['Clientes Ativos', 2024, 'Outubro', '68'],
  ['Clientes Ativos', 2024, 'Novembro', '67'],
  ['Clientes Ativos', 2025, 'Janeiro', '49'],
  ['Clientes Ativos', 2025, 'Fevereiro', '51'],
  ['Clientes Ativos', 2025, 'Março', '51'],
  ['Clientes Ativos', 2025, 'Abril', '53'],
  ['Clientes Ativos', 2025, 'Maio', '52'],
  ['Clientes Ativos', 2025, 'Junho', '52'],
  ['Clientes Ativos', 2025, 'Julho', '52'],
  ['Clientes Ativos', 2025, 'Agosto', '61'],
  ['Clientes Ativos', 2025, 'Setembro', '68'],

  // Inadimplência
  ['Inadimplência', 2024, 'Janeiro', '14,5'],
  ['Inadimplência', 2024, 'Fevereiro', '18,3'],
  ['Inadimplência', 2024, 'Março', '20,9'],
  ['Inadimplência', 2024, 'Abril', '13,5'],
  ['Inadimplência', 2024, 'Maio', '16,0'],
  ['Inadimplência', 2024, 'Junho', '17,6'],
  ['Inadimplência', 2024, 'Julho', '19,3'],
  ['Inadimplência', 2024, 'Agosto', '16,5'],
  ['Inadimplência', 2024, 'Setembro', '16,3'],
  ['Inadimplência', 2024, 'Outubro', '20,8'],
  ['Inadimplência', 2024, 'Novembro', '17,4'],
  ['Inadimplência', 2025, 'Janeiro', '0,0'],
  ['Inadimplência', 2025, 'Fevereiro', '0,0'],
  ['Inadimplência', 2025, 'Março', '0,0'],
  ['Inadimplência', 2025, 'Abril', '0,0'],
  ['Inadimplência', 2025, 'Maio', '0,0'],
  ['Inadimplência', 2025, 'Junho', '0,0'],
  ['Inadimplência', 2025, 'Julho', '0,0'],
  ['Inadimplência', 2025, 'Agosto', '0,0'],
  ['Inadimplência', 2025, 'Setembro', '0,0'],

  // Mora
  ['Mora', 2024, 'Janeiro', '20938'],
  ['Mora', 2024, 'Fevereiro', '21002'],
  ['Mora', 2024, 'Março', '21907'],
  ['Mora', 2024, 'Abril', '20164'],
  ['Mora', 2024, 'Maio', '19582'],
  ['Mora', 2024, 'Junho', '19957'],
  ['Mora', 2024, 'Julho', '19757'],
  ['Mora', 2024, 'Agosto', '19557'],
  ['Mora', 2024, 'Setembro', '18879'],
  ['Mora', 2024, 'Outubro', '17345'],
  ['Mora', 2024, 'Novembro', '16295'],
  ['Mora', 2025, 'Janeiro', '0'],
  ['Mora', 2025, 'Fevereiro', '0'],
  ['Mora', 2025, 'Março', '0'],
  ['Mora', 2025, 'Abril', '0'],
  ['Mora', 2025, 'Maio', '0'],
  ['Mora', 2025, 'Junho', '0'],
  ['Mora', 2025, 'Julho', '0'],
  ['Mora', 2025, 'Agosto', '0'],
  ['Mora', 2025, 'Setembro', '0'],

  // Castigado
  ['Castigado', 2024, 'Maio', '100'],
  ['Castigado', 2024, 'Junho', '100'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2025, 'Fevereiro', '1100'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '150'],
  ['Castigado', 2025, 'Junho', '60'],
  ['Castigado', 2025, 'Agosto', '200'],
  ['Castigado', 2025, 'Setembro', '200'],

  // Inativos
  ['Inativos', 2025, 'Agosto', '1'],
  ['Inativos', 2025, 'Setembro', '1'],

  // ajustes finais 2025/2026
  ['Inadimplência', 2025, 'Outubro', '0'],
  ['Carteira Ativa', 2025, 'Outubro', '111591'],
  ['Carteira Ativa', 2025, 'Novembro', '116.938'],
  ['Clientes Ativos', 2025, 'Outubro', '72'],
  ['Clientes Ativos', 2025, 'Novembro', '67'],
  ['Inadimplência', 2025, 'Novembro', '0,99'],
  ['Liberações', 2025, 'Outubro', '34700'],
  ['Liberações', 2025, 'Novembro', '38500'],
  ['Liberações', 2025, 'Dezembro', '60.500'],
  ['Inadimplência', 2025, 'Dezembro', '2,82'],
  ['Clientes Ativos', 2025, 'Dezembro', '72'],
  ['Carteira Ativa', 2025, 'Dezembro', '140.030'],
  ['Carteira Ativa', 2026, 'Janeiro', '147.151'],
  ['Clientes Ativos', 2026, 'Janeiro', '72'],
  ['Inadimplência', 2026, 'Janeiro', '4,43'],
  ['Liberações', 2026, 'Janeiro', '44.000']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // remover dados anteriores de Jose de Freitas para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosJoseDeFreitas) {
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

