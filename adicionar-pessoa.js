// Script auxiliar para adicionar/atualizar dados com pessoa específica
// Uso: node adicionar-pessoa.js

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'dados.db');
const db = new Database(dbPath);

// Exemplo: Atualizar dados de Inadimplência de 2025 para a pessoa "Josiel"
// Você pode modificar esses valores conforme necessário

const pessoa = 'Josiel';
const categoria = 'Inadimplência';
const ano = 2025;

// Dados de exemplo - substitua pelos dados reais
const dadosJosiel2025 = [
  ['Janeiro', 2025, 'Inadimplência', '9,53'],
  ['Fevereiro', 2025, 'Inadimplência', '9,01'],
  ['Março', 2025, 'Inadimplência', '11,58'],
  ['Abril', 2025, 'Inadimplência', '11,16'],
  ['Maio', 2025, 'Inadimplência', '11,44'],
  ['Junho', 2025, 'Inadimplência', '11,25'],
  ['Julho', 2025, 'Inadimplência', '11,76'],
  ['Agosto', 2025, 'Inadimplência', '11,80'],
  ['Setembro', 2025, 'Inadimplência', '10,90'],
  ['Outubro', 2025, 'Inadimplência', '11'],
  ['Novembro', 2025, 'Inadimplência', '11']
];

function mesParaOrdem(mes) {
  const mapa = {
    'janeiro': 1, 'fevereiro': 2, 'março': 3, 'marco': 3,
    'abril': 4, 'maio': 5, 'junho': 6, 'julho': 7,
    'agosto': 8, 'setembro': 9, 'outubro': 10,
    'novembro': 11, 'dezembro': 12
  };
  return mapa[mes.toLowerCase()] ?? 0;
}

const insert = db.prepare(`
  INSERT INTO indicadores (mes, ano, mes_ordem, categoria, pessoa, valor)
  VALUES (@mes, @ano, @mes_ordem, @categoria, @pessoa, @valor)
`);

const tran = db.transaction(() => {
  for (const [mes, ano, categoria, valorBruto] of dadosJosiel2025) {
    let v = String(valorBruto).trim();
    if (v.includes(',')) {
      v = v.replace('.', '').replace(',', '.');
    } else {
      v = v.replace('.', '').replace(/\./g, '');
    }
    const valorNum = Number(v);
    
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

tran();

console.log(`✅ Dados adicionados para ${pessoa} - ${categoria} - ${ano}`);
console.log(`Total de registros inseridos: ${dadosJosiel2025.length}`);

db.close();
