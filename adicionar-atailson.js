// Script para adicionar em lote os dados do agente "Atailson"
// Uso (na pasta do projeto):
//   node adicionar-atailson.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Atailson';

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
const dadosAtailson = [
  // Carteira Ativa
  ['Carteira Ativa', 2023, 'Julho', '20900'],
  ['Carteira Ativa', 2023, 'Agosto', '27575'],
  ['Carteira Ativa', 2023, 'Setembro', '21675'],
  ['Carteira Ativa', 2023, 'Outubro', '29275'],
  ['Carteira Ativa', 2023, 'Novembro', '35925'],
  ['Carteira Ativa', 2023, 'Dezembro', '57650'],
  ['Carteira Ativa', 2024, 'Janeiro', '53175'],
  ['Carteira Ativa', 2024, 'Fevereiro', '51646'],
  ['Carteira Ativa', 2024, 'Março', '57725'],
  ['Carteira Ativa', 2024, 'Abril', '71277'],
  ['Carteira Ativa', 2024, 'Maio', '64475'],
  ['Carteira Ativa', 2024, 'Junho', '64825'],
  ['Carteira Ativa', 2024, 'Julho', '84595'],
  ['Carteira Ativa', 2024, 'Agosto', '114500'],
  ['Carteira Ativa', 2024, 'Setembro', '87499'],
  ['Carteira Ativa', 2024, 'Outubro', '85224'],
  ['Carteira Ativa', 2024, 'Novembro', '76649'],
  ['Carteira Ativa', 2024, 'Dezembro', '97374'],
  ['Carteira Ativa', 2025, 'Janeiro', '77199'],
  ['Carteira Ativa', 2025, 'Fevereiro', '76384'],
  ['Carteira Ativa', 2025, 'Março', '62469'],
  ['Carteira Ativa', 2025, 'Abril', '79879'],
  ['Carteira Ativa', 2025, 'Maio', '56130'],
  ['Carteira Ativa', 2025, 'Junho', '33090'],
  ['Carteira Ativa', 2025, 'Julho', '19133'],
  ['Carteira Ativa', 2025, 'Agosto', '32900'],
  ['Carteira Ativa', 2025, 'Setembro', '39950'],
  ['Carteira Ativa', 2025, 'Outubro', '32325'],
  ['Carteira Ativa', 2025, 'Novembro', '21025'],
  ['Carteira Ativa', 2025, 'Dezembro', '62025'],
  ['Carteira Ativa', 2026, 'Janeiro', '61820'],

  // Liberações
  ['Liberações', 2023, 'Julho', '20900'],
  ['Liberações', 2023, 'Agosto', '11900'],
  ['Liberações', 2023, 'Setembro', '0'],
  ['Liberações', 2023, 'Outubro', '15800'],
  ['Liberações', 2023, 'Novembro', '21100'],
  ['Liberações', 2023, 'Dezembro', '27900'],
  ['Liberações', 2024, 'Janeiro', '14500'],
  ['Liberações', 2024, 'Fevereiro', '18800'],
  ['Liberações', 2024, 'Março', '28700'],
  ['Liberações', 2024, 'Abril', '36700'],
  ['Liberações', 2024, 'Maio', '16900'],
  ['Liberações', 2024, 'Junho', '23500'],
  ['Liberações', 2024, 'Julho', '42900'],
  ['Liberações', 2024, 'Agosto', '31600'],
  ['Liberações', 2024, 'Setembro', '27600'],
  ['Liberações', 2024, 'Outubro', '31200'],
  ['Liberações', 2024, 'Novembro', '18000'],
  ['Liberações', 2024, 'Dezembro', '43600'],
  ['Liberações', 2025, 'Janeiro', '48400'],
  ['Liberações', 2025, 'Fevereiro', '28800'],
  ['Liberações', 2025, 'Março', '13400'],
  ['Liberações', 2025, 'Abril', '40600'],
  ['Liberações', 2025, 'Maio', '1500'],
  ['Liberações', 2025, 'Junho', '0'],
  ['Liberações', 2025, 'Julho', '0'],
  ['Liberações', 2025, 'Agosto', '27800'],
  ['Liberações', 2025, 'Setembro', '18500'],
  ['Liberações', 2025, 'Outubro', '1800'],
  ['Liberações', 2025, 'Novembro', '0'],
  ['Liberações', 2025, 'Dezembro', '52300'],
  ['Liberações', 2026, 'Janeiro', '18000'],

  // Novos
  ['Novos', 2023, 'Julho', '9'],
  ['Novos', 2023, 'Agosto', '8'],
  ['Novos', 2023, 'Setembro', '0'],
  ['Novos', 2023, 'Outubro', '0'],
  ['Novos', 2023, 'Novembro', '0'],
  ['Novos', 2023, 'Dezembro', '4'],
  ['Novos', 2024, 'Janeiro', '7'],
  ['Novos', 2024, 'Fevereiro', '0'],
  ['Novos', 2024, 'Março', '4'],
  ['Novos', 2024, 'Abril', '7'],
  ['Novos', 2024, 'Maio', '1'],
  ['Novos', 2024, 'Junho', '0'],
  ['Novos', 2024, 'Julho', '1'],
  ['Novos', 2024, 'Agosto', '0'],
  ['Novos', 2024, 'Setembro', '5'],
  ['Novos', 2024, 'Outubro', '0'],
  ['Novos', 2024, 'Novembro', '3'],
  ['Novos', 2024, 'Dezembro', '0'],
  ['Novos', 2025, 'Janeiro', '4'],
  ['Novos', 2025, 'Fevereiro', '0'],
  ['Novos', 2025, 'Março', '3'],
  ['Novos', 2025, 'Abril', '0'],
  ['Novos', 2025, 'Maio', '1'],
  ['Novos', 2025, 'Junho', '0'],
  ['Novos', 2025, 'Julho', '0'],
  ['Novos', 2025, 'Agosto', '0'],
  ['Novos', 2025, 'Setembro', '0'],
  ['Novos', 2025, 'Outubro', '6'],

  // Renovações
  ['Renovações', 2023, 'Julho', '4'],
  ['Renovações', 2023, 'Agosto', '4'],
  ['Renovações', 2023, 'Setembro', '0'],
  ['Renovações', 2023, 'Outubro', '3'],
  ['Renovações', 2023, 'Novembro', '10'],
  ['Renovações', 2023, 'Dezembro', '19'],
  ['Renovações', 2024, 'Janeiro', '2'],
  ['Renovações', 2024, 'Fevereiro', '6'],
  ['Renovações', 2024, 'Março', '9'],
  ['Renovações', 2024, 'Abril', '20'],
  ['Renovações', 2024, 'Maio', '8'],
  ['Renovações', 2024, 'Junho', '8'],
  ['Renovações', 2024, 'Julho', '15'],
  ['Renovações', 2024, 'Agosto', '20'],
  ['Renovações', 2024, 'Setembro', '9'],
  ['Renovações', 2024, 'Outubro', '10'],
  ['Renovações', 2024, 'Novembro', '8'],
  ['Renovações', 2024, 'Dezembro', '23'],
  ['Renovações', 2025, 'Janeiro', '16'],
  ['Renovações', 2025, 'Fevereiro', '10'],
  ['Renovações', 2025, 'Março', '3'],
  ['Renovações', 2025, 'Abril', '20'],
  ['Renovações', 2025, 'Maio', '2'],
  ['Renovações', 2025, 'Junho', '0'],
  ['Renovações', 2025, 'Julho', '0'],
  ['Renovações', 2025, 'Agosto', '16'],
  ['Renovações', 2025, 'Setembro', '4'],

  // Clientes Ativos
  ['Clientes Ativos', 2023, 'Julho', '13'],
  ['Clientes Ativos', 2023, 'Agosto', '25'],
  ['Clientes Ativos', 2023, 'Setembro', '25'],
  ['Clientes Ativos', 2023, 'Outubro', '28'],
  ['Clientes Ativos', 2023, 'Novembro', '25'],
  ['Clientes Ativos', 2023, 'Dezembro', '39'],
  ['Clientes Ativos', 2024, 'Janeiro', '48'],
  ['Clientes Ativos', 2024, 'Fevereiro', '51'],
  ['Clientes Ativos', 2024, 'Março', '51'],
  ['Clientes Ativos', 2024, 'Abril', '55'],
  ['Clientes Ativos', 2024, 'Maio', '55'],
  ['Clientes Ativos', 2024, 'Junho', '57'],
  ['Clientes Ativos', 2024, 'Julho', '63'],
  ['Clientes Ativos', 2024, 'Agosto', '57'],
  ['Clientes Ativos', 2024, 'Setembro', '68'],
  ['Clientes Ativos', 2024, 'Outubro', '65'],
  ['Clientes Ativos', 2024, 'Novembro', '66'],
  ['Clientes Ativos', 2024, 'Dezembro', '70'],
  ['Clientes Ativos', 2025, 'Janeiro', '66'],
  ['Clientes Ativos', 2025, 'Fevereiro', '65'],
  ['Clientes Ativos', 2025, 'Março', '60'],
  ['Clientes Ativos', 2025, 'Abril', '59'],
  ['Clientes Ativos', 2025, 'Maio', '56'],
  ['Clientes Ativos', 2025, 'Junho', '42'],
  ['Clientes Ativos', 2025, 'Julho', '37'],
  ['Clientes Ativos', 2025, 'Agosto', '27'],
  ['Clientes Ativos', 2025, 'Setembro', '27'],
  ['Clientes Ativos', 2025, 'Outubro', '27'],
  ['Clientes Ativos', 2025, 'Novembro', '27'],
  ['Clientes Ativos', 2025, 'Dezembro', '41'],
  ['Clientes Ativos', 2026, 'Janeiro', '44'],

  // Inadimplência
  ['Inadimplência', 2023, 'Julho', '0'],
  ['Inadimplência', 2023, 'Agosto', '0'],
  ['Inadimplência', 2023, 'Setembro', '0'],
  ['Inadimplência', 2023, 'Outubro', '0'],
  ['Inadimplência', 2023, 'Novembro', '0'],
  ['Inadimplência', 2023, 'Dezembro', '0'],
  ['Inadimplência', 2024, 'Janeiro', '0'],
  ['Inadimplência', 2024, 'Fevereiro', '0'],
  ['Inadimplência', 2024, 'Março', '0'],
  ['Inadimplência', 2024, 'Abril', '0'],
  ['Inadimplência', 2024, 'Maio', '0'],
  ['Inadimplência', 2024, 'Junho', '1,54'],
  ['Inadimplência', 2024, 'Julho', '3,6'],
  ['Inadimplência', 2024, 'Agosto', '5,28'],
  ['Inadimplência', 2024, 'Setembro', '5,66'],
  ['Inadimplência', 2024, 'Outubro', '4,63'],
  ['Inadimplência', 2024, 'Novembro', '5,15'],
  ['Inadimplência', 2024, 'Dezembro', '4,06'],
  ['Inadimplência', 2025, 'Janeiro', '5'],
  ['Inadimplência', 2025, 'Fevereiro', '7,04'],
  ['Inadimplência', 2025, 'Março', '7,72'],
  ['Inadimplência', 2025, 'Abril', '7,14'],
  ['Inadimplência', 2025, 'Maio', '9,38'],
  ['Inadimplência', 2025, 'Junho', '12,89'],
  ['Inadimplência', 2025, 'Julho', '19,69'],
  ['Inadimplência', 2025, 'Agosto', '8,36'],
  ['Inadimplência', 2025, 'Setembro', '4,38'],
  ['Inadimplência', 2025, 'Outubro', '5,41'],
  ['Inadimplência', 2025, 'Novembro', '8,32'],
  ['Inadimplência', 2025, 'Dezembro', '2,82'],
  ['Inadimplência', 2026, 'Janeiro', '1,42'],

  // Mora
  ['Mora', 2023, 'Julho', '0'],
  ['Mora', 2023, 'Agosto', '0'],
  ['Mora', 2023, 'Setembro', '0'],
  ['Mora', 2023, 'Outubro', '0'],
  ['Mora', 2023, 'Novembro', '0'],
  ['Mora', 2023, 'Dezembro', '0'],
  ['Mora', 2024, 'Janeiro', '0'],
  ['Mora', 2024, 'Fevereiro', '0'],
  ['Mora', 2024, 'Março', '0'],
  ['Mora', 2024, 'Abril', '0'],
  ['Mora', 2024, 'Maio', '0'],
  ['Mora', 2024, 'Junho', '1000'],
  ['Mora', 2024, 'Julho', '3045'],
  ['Mora', 2024, 'Agosto', '4586'],
  ['Mora', 2024, 'Setembro', '4949'],
  ['Mora', 2024, 'Outubro', '3949'],
  ['Mora', 2024, 'Novembro', '3949'],
  ['Mora', 2024, 'Dezembro', '3949'],
  ['Mora', 2025, 'Janeiro', '3949'],
  ['Mora', 2025, 'Fevereiro', '3949'],
  ['Mora', 2025, 'Março', '4824'],
  ['Mora', 2025, 'Abril', '5699'],
  ['Mora', 2025, 'Maio', '5265'],
  ['Mora', 2025, 'Junho', '4265'],
  ['Mora', 2025, 'Julho', '3763'],
  ['Mora', 2025, 'Agosto', '2750'],
  ['Mora', 2025, 'Setembro', '1750'],

  // Castigado
  ['Castigado', 2023, 'Julho', '0'],
  ['Castigado', 2023, 'Agosto', '0'],
  ['Castigado', 2023, 'Setembro', '0'],
  ['Castigado', 2023, 'Outubro', '0'],
  ['Castigado', 2023, 'Novembro', '0'],
  ['Castigado', 2023, 'Dezembro', '270'],
  ['Castigado', 2024, 'Janeiro', '105'],
  ['Castigado', 2024, 'Fevereiro', '0'],
  ['Castigado', 2024, 'Março', '0'],
  ['Castigado', 2024, 'Abril', '0'],
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '0'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '0'],
  ['Castigado', 2025, 'Janeiro', '0'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Maio', '100'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Julho', '0'],
  ['Castigado', 2025, 'Agosto', '100']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // limpa todos os registros anteriores do Atailson para evitar duplicação
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosAtailson) {
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
