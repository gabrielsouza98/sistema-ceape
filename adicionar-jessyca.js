// Script para adicionar em lote os dados da agente "Jessyca" (Coordenador Glênyo)
// Uso (na pasta do projeto):
//   node adicionar-jessyca.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

const pessoa = 'Jessyca';

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
const dadosJessyca = [
  // Carteira Ativa
  ['Carteira Ativa', 2024, 'Janeiro', '190112'],
  ['Carteira Ativa', 2024, 'Fevereiro', '175010'],
  ['Carteira Ativa', 2024, 'Março', '145355'],
  ['Carteira Ativa', 2024, 'Abril', '166661'],
  ['Carteira Ativa', 2024, 'Maio', '195768'],
  ['Carteira Ativa', 2024, 'Junho', '188524'],
  ['Carteira Ativa', 2024, 'Julho', '142154'],
  ['Carteira Ativa', 2024, 'Agosto', '138596'],
  ['Carteira Ativa', 2024, 'Setembro', '123619'],
  ['Carteira Ativa', 2024, 'Outubro', '137230'],
  ['Carteira Ativa', 2024, 'Novembro', '109713'],
  ['Carteira Ativa', 2024, 'Dezembro', '114663'],
  ['Carteira Ativa', 2025, 'Janeiro', '101229'],
  ['Carteira Ativa', 2025, 'Fevereiro', '140002'],
  ['Carteira Ativa', 2025, 'Março', '137411'],
  ['Carteira Ativa', 2025, 'Abril', '129138'],
  ['Carteira Ativa', 2025, 'Maio', '112506'],
  ['Carteira Ativa', 2025, 'Junho', '112092'],
  ['Carteira Ativa', 2025, 'Julho', '116739'],
  ['Carteira Ativa', 2025, 'Agosto', '83599'],
  ['Carteira Ativa', 2025, 'Setembro', '80857'],
  ['Carteira Ativa', 2025, 'Outubro', '101725'],
  ['Carteira Ativa', 2025, 'Novembro', '96044'],
  ['Carteira Ativa', 2025, 'Dezembro', '87569'],

  // Liberações
  ['Liberações', 2024, 'Janeiro', '55300'],
  ['Liberações', 2024, 'Fevereiro', '23300'],
  ['Liberações', 2024, 'Março', '18050'],
  ['Liberações', 2024, 'Abril', '83100'],
  ['Liberações', 2024, 'Maio', '81000'],
  ['Liberações', 2024, 'Junho', '38800'],
  ['Liberações', 2024, 'Julho', '20200'],
  ['Liberações', 2024, 'Agosto', '25800'],
  ['Liberações', 2024, 'Setembro', '34600'],
  ['Liberações', 2024, 'Outubro', '23700'],
  ['Liberações', 2024, 'Novembro', '14600'],
  ['Liberações', 2024, 'Dezembro', '39700'],
  ['Liberações', 2025, 'Janeiro', '18000'],
  ['Liberações', 2025, 'Fevereiro', '72300'],
  ['Liberações', 2025, 'Março', '37100'],
  ['Liberações', 2025, 'Abril', '26100'],
  ['Liberações', 2025, 'Maio', '21900'],
  ['Liberações', 2025, 'Junho', '47600'],
  ['Liberações', 2025, 'Julho', '43500'],
  ['Liberações', 2025, 'Agosto', '0'],
  ['Liberações', 2025, 'Setembro', '12000'],
  ['Liberações', 2025, 'Outubro', '53000'],
  ['Liberações', 2025, 'Novembro', '0'],
  ['Liberações', 2025, 'Dezembro', '11000'],

  // Novos
  ['Novos', 2024, 'Janeiro', '4'],
  ['Novos', 2024, 'Fevereiro', '2'],
  ['Novos', 2024, 'Março', '7'],
  ['Novos', 2024, 'Abril', '8'],
  ['Novos', 2024, 'Maio', '3'],
  ['Novos', 2024, 'Junho', '3'],
  ['Novos', 2024, 'Julho', '3'],
  ['Novos', 2024, 'Agosto', '2'],
  ['Novos', 2024, 'Setembro', '1'],
  ['Novos', 2024, 'Outubro', '3'],
  ['Novos', 2024, 'Novembro', '2'],
  ['Novos', 2024, 'Dezembro', '7'],
  ['Novos', 2025, 'Janeiro', '9'],
  ['Novos', 2025, 'Fevereiro', '5'],
  ['Novos', 2025, 'Março', '4'],
  ['Novos', 2025, 'Abril', '1'],
  ['Novos', 2025, 'Maio', '5'],
  ['Novos', 2025, 'Junho', '7'],
  ['Novos', 2025, 'Julho', '3'],
  ['Novos', 2025, 'Agosto', '0'],
  ['Novos', 2025, 'Setembro', '3'],

  // Renovações
  ['Renovações', 2024, 'Janeiro', '17'],
  ['Renovações', 2024, 'Fevereiro', '8'],
  ['Renovações', 2024, 'Março', '9'],
  ['Renovações', 2024, 'Abril', '21'],
  ['Renovações', 2024, 'Maio', '17'],
  ['Renovações', 2024, 'Junho', '7'],
  ['Renovações', 2024, 'Julho', '7'],
  ['Renovações', 2024, 'Agosto', '15'],
  ['Renovações', 2024, 'Setembro', '4'],
  ['Renovações', 2024, 'Outubro', '7'],
  ['Renovações', 2024, 'Novembro', '7'],
  ['Renovações', 2024, 'Dezembro', '14'],
  ['Renovações', 2025, 'Janeiro', '5'],
  ['Renovações', 2025, 'Fevereiro', '11'],
  ['Renovações', 2025, 'Março', '10'],
  ['Renovações', 2025, 'Abril', '10'],
  ['Renovações', 2025, 'Maio', '9'],
  ['Renovações', 2025, 'Junho', '19'],
  ['Renovações', 2025, 'Julho', '7'],
  ['Renovações', 2025, 'Agosto', '0'],
  ['Renovações', 2025, 'Setembro', '4'],

  // Clientes Ativos
  ['Clientes Ativos', 2024, 'Janeiro', '89'],
  ['Clientes Ativos', 2024, 'Fevereiro', '92'],
  ['Clientes Ativos', 2024, 'Março', '91'],
  ['Clientes Ativos', 2024, 'Abril', '94'],
  ['Clientes Ativos', 2024, 'Maio', '92'],
  ['Clientes Ativos', 2024, 'Junho', '90'],
  ['Clientes Ativos', 2024, 'Julho', '73'],
  ['Clientes Ativos', 2024, 'Agosto', '77'],
  ['Clientes Ativos', 2024, 'Setembro', '63'],
  ['Clientes Ativos', 2024, 'Outubro', '77'],
  ['Clientes Ativos', 2024, 'Novembro', '68'],
  ['Clientes Ativos', 2024, 'Dezembro', '74'],
  ['Clientes Ativos', 2025, 'Janeiro', '79'],
  ['Clientes Ativos', 2025, 'Fevereiro', '84'],
  ['Clientes Ativos', 2025, 'Março', '85'],
  ['Clientes Ativos', 2025, 'Abril', '84'],
  ['Clientes Ativos', 2025, 'Maio', '85'],
  ['Clientes Ativos', 2025, 'Junho', '85'],
  ['Clientes Ativos', 2025, 'Julho', '78'],
  ['Clientes Ativos', 2025, 'Agosto', '63'],
  ['Clientes Ativos', 2025, 'Setembro', '74'],
  ['Clientes Ativos', 2025, 'Outubro', '76'],
  ['Clientes Ativos', 2025, 'Novembro', '75'],
  ['Clientes Ativos', 2025, 'Dezembro', '68'],

  // Inadimplência
  ['Inadimplência', 2024, 'Janeiro', '3,35'],
  ['Inadimplência', 2024, 'Fevereiro', '5,77'],
  ['Inadimplência', 2024, 'Março', '9,43'],
  ['Inadimplência', 2024, 'Abril', '8,65'],
  ['Inadimplência', 2024, 'Maio', '7,58'],
  ['Inadimplência', 2024, 'Junho', '7,40'],
  ['Inadimplência', 2024, 'Julho', '10,80'],
  ['Inadimplência', 2024, 'Agosto', '12,00'],
  ['Inadimplência', 2024, 'Setembro', '15,62'],
  ['Inadimplência', 2024, 'Outubro', '16,02'],
  ['Inadimplência', 2024, 'Novembro', '19,72'],
  ['Inadimplência', 2024, 'Dezembro', '19,63'],
  ['Inadimplência', 2025, 'Janeiro', '23,14'],
  ['Inadimplência', 2025, 'Fevereiro', '15,16'],
  ['Inadimplência', 2025, 'Março', '14,71'],
  ['Inadimplência', 2025, 'Abril', '15,44'],
  ['Inadimplência', 2025, 'Maio', '15,26'],
  ['Inadimplência', 2025, 'Junho', '12,25'],
  ['Inadimplência', 2025, 'Julho', '10,43'],
  ['Inadimplência', 2025, 'Agosto', '13,59'],
  ['Inadimplência', 2025, 'Setembro', '15,61'],
  ['Inadimplência', 2025, 'Outubro', '12,71'],
  ['Inadimplência', 2025, 'Novembro', '13,65'],
  ['Inadimplência', 2025, 'Dezembro', '14,7'],

  // Mora
  ['Mora', 2024, 'Janeiro', '6364'],
  ['Mora', 2024, 'Fevereiro', '10100'],
  ['Mora', 2024, 'Março', '13710'],
  ['Mora', 2024, 'Abril', '14419'],
  ['Mora', 2024, 'Maio', '14830'],
  ['Mora', 2024, 'Junho', '13795'],
  ['Mora', 2024, 'Julho', '15461'],
  ['Mora', 2024, 'Agosto', '17686'],
  ['Mora', 2024, 'Setembro', '19311'],
  ['Mora', 2024, 'Outubro', '21986'],
  ['Mora', 2024, 'Novembro', '21636'],
  ['Mora', 2024, 'Dezembro', '22504'],
  ['Mora', 2025, 'Janeiro', '23429'],
  ['Mora', 2025, 'Fevereiro', '21217'],
  ['Mora', 2025, 'Março', '20216'],
  ['Mora', 2025, 'Abril', '19944'],
  ['Mora', 2025, 'Maio', '17164'],
  ['Mora', 2025, 'Junho', '13725'],
  ['Mora', 2025, 'Julho', '12176'],
  ['Mora', 2025, 'Agosto', '11364'],
  ['Mora', 2025, 'Setembro', '12625'],

  // Castigado
  ['Castigado', 2024, 'Abril', '200'],
  ['Castigado', 2024, 'Maio', '0'],
  ['Castigado', 2024, 'Junho', '1200'],
  ['Castigado', 2024, 'Julho', '0'],
  ['Castigado', 2024, 'Agosto', '0'],
  ['Castigado', 2024, 'Setembro', '0'],
  ['Castigado', 2024, 'Outubro', '0'],
  ['Castigado', 2024, 'Novembro', '0'],
  ['Castigado', 2025, 'Fevereiro', '0'],
  ['Castigado', 2025, 'Março', '0'],
  ['Castigado', 2025, 'Abril', '0'],
  ['Castigado', 2025, 'Junho', '0'],
  ['Castigado', 2025, 'Agosto', '0'],
  ['Castigado', 2025, 'Setembro', '0'],

  // Inativos
  ['Inativos', 2025, 'Setembro', '1']
];

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tx = db.transaction(() => {
  // apaga dados antigos da Jessyca para evitar duplicar
  db.prepare('DELETE FROM indicadores WHERE pessoa = ?').run(pessoa);

  for (const [categoria, ano, mes, valorBruto] of dadosJessyca) {
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

console.log(`✅ Registros inseridos para a agente ${pessoa}.`);
db.close();
