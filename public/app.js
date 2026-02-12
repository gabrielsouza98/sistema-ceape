const categoriaSelect = document.getElementById('categoriaSelect');
const pessoaSelect = document.getElementById('pessoaSelect');
const coordenadorSelect = document.getElementById('coordenadorSelect');
const anoSelect = document.getElementById('anoSelect');
const mesSelect = document.getElementById('mesSelect');
const tabelaBody = document.getElementById('tabelaBody');
const tabelaGerenciarBody = document.getElementById('tabelaGerenciarBody');
const cardsResumo = document.getElementById('cardsResumo');
const serieTitulo = document.getElementById('serieTitulo');
const btnComparar = document.getElementById('btnComparar');
const comparePessoa1 = document.getElementById('comparePessoa1');
const comparePessoa2 = document.getElementById('comparePessoa2');
const compareAno1 = document.getElementById('compareAno1');
const compareAno2 = document.getElementById('compareAno2');
const cadastroForm = document.getElementById('cadastroForm');
const cadPessoaSelect = document.getElementById('cadPessoaSelect');
const cadPessoaNovo = document.getElementById('cadPessoaNovo');
const cadPessoaNovoLabel = document.getElementById('cadPessoaNovoLabel');
const cadAno = document.getElementById('cadAno');
const cadMes = document.getElementById('cadMes');
const cadCategoria = document.getElementById('cadCategoria');
const cadValor = document.getElementById('cadValor');
const tabDashboard = document.getElementById('tabDashboard');
const tabCadastro = document.getElementById('tabCadastro');
const tabGerenciar = document.getElementById('tabGerenciar');
const tabLogs = document.getElementById('tabLogs');
const dashboardSection = document.getElementById('dashboardSection');
const cadastroSection = document.getElementById('cadastroSection');
const gerenciarSection = document.getElementById('gerenciarSection');
const logsSection = document.getElementById('logsSection');
const gerenciarPessoaSelect = document.getElementById('gerenciarPessoaSelect');
const gerenciarCategoriaSelect = document.getElementById('gerenciarCategoriaSelect');
const logsPasswordInput = document.getElementById('logsPasswordInput');
const logsLoadButton = document.getElementById('logsLoadButton');
const logsBody = document.getElementById('logsBody');

let grafico;
let graficoComparacao;
let editingId = null;
let logsPassword = '';

if (window.Chart && window.ChartDataLabels) {
  Chart.register(window.ChartDataLabels);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" aria-label="Fechar notificação">&times;</button>
  `;

  const close = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 150);
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  setTimeout(close, 4500);

  container.appendChild(toast);
}

const GRUPOS = {
  'Coordenador Edivaldo': ['Eudes', 'Josiel', 'Atailson', 'Rangel'],
  'Coordenador Glenyo': ['Jessyca', 'Carlos', 'Helio', 'Xavier', 'Dirceu', 'Jose de Freitas', 'Uniao', 'Altos'],
  'Coordenador Anaídia': ['Arlene', 'David'],
  'Coordenador Parnaiba': ['Alessia', 'Marcos', 'Renan']
};

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao carregar ' + url);
  return res.json();
}

function formatValor(valor, categoria) {
  if (categoria === 'Inadimplência') {
    return valor.toFixed(2).replace('.', ',') + ' %';
  }
  if (categoria === 'Clientes Ativos' || categoria === 'Novos' || categoria === 'Renovações' || categoria === 'Inativos') {
    return valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function labelMesAno(row) {
  return `${row.mes}/${row.ano}`;
}

function atualizarTabela(dados) {
  tabelaBody.innerHTML = '';
  if (dados.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5" style="text-align: center; color: var(--muted);">Nenhum dado encontrado</td>';
    tabelaBody.appendChild(tr);
    return;
  }
  for (const row of dados) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.mes}</td>
      <td>${row.ano}</td>
      <td>${row.pessoa || '-'}</td>
      <td>${row.categoria}</td>
      <td class="right">${formatValor(row.valor, row.categoria)}</td>
    `;
    tabelaBody.appendChild(tr);
  }
}

function atualizarTabelaGerenciar(dados) {
  tabelaGerenciarBody.innerHTML = '';
  if (dados.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="7" style="text-align: center; color: var(--muted);">Nenhum dado encontrado</td>';
    tabelaGerenciarBody.appendChild(tr);
    return;
  }
  for (const row of dados) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.mes}</td>
      <td>${row.ano}</td>
      <td>${row.pessoa || '-'}</td>
      <td>${row.categoria}</td>
      <td class="right">${formatValor(row.valor, row.categoria)}</td>
      <td class="right">
        <div class="actions">
          <button class="btn-sm" data-action="edit" data-id="${row.id}">Editar</button>
          <button class="btn-sm danger" data-action="delete" data-id="${row.id}">Remover</button>
        </div>
      </td>
    `;
    tabelaGerenciarBody.appendChild(tr);
  }
}

function calcularResumo(dados) {
  if (!dados.length) return null;
  const ultimo = dados[dados.length - 1];

  const valores = dados.map(d => d.valor);
  const min = Math.min(...valores);
  const max = Math.max(...valores);

  const labels = dados.map(labelMesAno);
  const uniqueLabels = [...new Set(labels)];

  return {
    ultimo,
    min,
    max,
    pontos: uniqueLabels.length,
    total: dados.length
  };
}

function renderizarCards(dados, filtros) {
  cardsResumo.innerHTML = '';
  if (!dados.length) return;

  const resumo = calcularResumo(dados);
  const pessoa = filtros.coordenador || filtros.pessoa || 'Todas';
  const categoria = filtros.categoria || 'Todas';
  const ano = filtros.ano || 'Todos';

  const cards = [
    {
      titulo: 'Filtros ativos',
      valor: `${pessoa} | ${categoria}`,
      sub: `Ano: ${ano} | ${resumo.total} registros`
    },
    {
      titulo: 'Último valor',
      valor: formatValor(resumo.ultimo.valor, resumo.ultimo.categoria),
      sub: `${resumo.ultimo.mes}/${resumo.ultimo.ano}`
    },
    {
      titulo: 'Mínimo x Máximo',
      valor: `${formatValor(resumo.min, resumo.ultimo.categoria)} — ${formatValor(resumo.max, resumo.ultimo.categoria)}`,
      sub: 'No período filtrado'
    }
  ];

  for (const card of cards) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="card-title">${card.titulo}</div>
      <div class="card-value">${card.valor}</div>
      <div class="card-sub">${card.sub}</div>
    `;
    cardsResumo.appendChild(div);
  }
}

function renderizarGrafico(dados, filtros) {
  const ctx = document.getElementById('graficoLinha').getContext('2d');
  const labels = dados.map(labelMesAno);
  const valores = dados.map(d => d.valor);

  if (grafico) {
    grafico.destroy();
  }

  const pessoa = filtros.coordenador || filtros.pessoa || 'Todas';
  const categoria = filtros.categoria || 'Todas';
  const label = `${pessoa !== 'Todas' ? pessoa + ' - ' : ''}${categoria}`;

  const isSinglePoint = dados.length === 1;

  grafico = new Chart(ctx, {
    type: isSinglePoint ? 'bar' : 'line',
    data: {
      labels,
      datasets: [
        {
          label,
          data: valores,
          borderColor: '#38bdf8',
          backgroundColor: isSinglePoint
            ? 'rgba(56, 189, 248, 0.6)'
            : 'rgba(56, 189, 248, 0.18)',
          tension: isSinglePoint ? 0 : 0.35,
          fill: !isSinglePoint,
          pointRadius: isSinglePoint ? 0 : 3,
          pointHoverRadius: isSinglePoint ? 0 : 5,
          borderWidth: isSinglePoint ? 0 : 2
        }
      ]
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#e5e7eb',
          // acima do ponto
          anchor: 'start',
          align: 'end',
          offset: 12,
          padding: 6,
          clip: false,
          font: { size: 10, weight: '500' },
          formatter: (value) => value.toLocaleString('pt-BR')
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        }
      }
    }
  });

  serieTitulo.textContent = label;
}

async function renderizarComparacao() {
  const categoria = categoriaSelect.value;
  if (!categoria) {
    showToast('Selecione uma categoria para comparar.', 'info');
    return;
  }

  const pessoa1 = comparePessoa1.value;
  const pessoa2 = comparePessoa2.value;
  const ano1 = compareAno1.value;
  const ano2 = compareAno2.value;

  const params = new URLSearchParams({ categoria });
  if (pessoa1) params.append('pessoa1', pessoa1);
  if (pessoa2) params.append('pessoa2', pessoa2);
  if (ano1) params.append('ano1', ano1);
  if (ano2) params.append('ano2', ano2);

  const comparacao = await fetchJSON(`/api/comparar?${params}`);

  const ctx = document.getElementById('graficoComparacao').getContext('2d');

  if (graficoComparacao) {
    graficoComparacao.destroy();
  }

  // Montar eixo em ordem cronológica (ano + mes_ordem)
  const makeKey = (r) => `${r.ano}-${String(r.mes_ordem).padStart(2, '0')}`;

  const eixoMap = new Map();
  for (const r of [...comparacao.serie1, ...comparacao.serie2]) {
    const key = makeKey(r);
    if (!eixoMap.has(key)) {
      eixoMap.set(key, { ano: r.ano, mes: r.mes, mes_ordem: r.mes_ordem });
    }
  }

  const eixo = Array.from(eixoMap.values()).sort(
    (a, b) => a.ano - b.ano || a.mes_ordem - b.mes_ordem
  );

  const labels = eixo.map((p) => `${p.mes}/${p.ano}`);

  const serie1Map = new Map(comparacao.serie1.map((r) => [makeKey(r), r.valor]));
  const serie2Map = new Map(comparacao.serie2.map((r) => [makeKey(r), r.valor]));

  graficoComparacao = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: comparacao.labels.serie1,
          data: eixo.map((p) => serie1Map.get(makeKey(p)) ?? null),
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.18)',
          tension: 0.35,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: comparacao.labels.serie2,
          data: eixo.map((p) => serie2Map.get(makeKey(p)) ?? null),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.18)',
          tension: 0.35,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },
    options: {
      plugins: {
        legend: { 
          display: true,
          labels: { color: '#9ca3af' }
        },
        datalabels: {
          color: '#e5e7eb',
          // acima do ponto
          anchor: 'start',
          align: 'end',
          offset: 10,
          padding: 6,
          clip: false,
          font: { size: 9 },
          formatter: (value) => value.toLocaleString('pt-BR')
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        },
        y: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        }
      }
    }
  });
}

async function popularSelect(selectId, endpoint, optionValue = '', optionText = '') {
  const select = document.getElementById(selectId);
  const dados = await fetchJSON(endpoint);
  
  const primeiraOpcao = select.querySelector('option[value=""]');
  select.innerHTML = '';
  if (primeiraOpcao) {
    select.appendChild(primeiraOpcao);
  }
  
  for (const item of dados) {
    const opt = document.createElement('option');
    opt.value = optionValue ? item[optionValue] : item;
    opt.textContent = optionText ? item[optionText] : item;
    select.appendChild(opt);
  }

  // Adicionar opção "Outros" apenas no cadastro de agente
  if (selectId === 'cadPessoaSelect') {
    const optOutros = document.createElement('option');
    optOutros.value = '__OUTROS__';
    optOutros.textContent = 'Outros';
    select.appendChild(optOutros);
  }
}

async function salvarCadastro(event) {
  event.preventDefault();

  const pessoaSelecionada = cadPessoaSelect.value;
  const novaPessoa = cadPessoaNovo.value.trim();

  let pessoa = '';
  if (pessoaSelecionada === '__OUTROS__') {
    pessoa = novaPessoa;
  } else {
    pessoa = pessoaSelecionada;
  }

  const ano = cadAno.value;
  const mes = cadMes.value;
  const categoria = cadCategoria.value;
  const valor = cadValor.value;

  if (!pessoaSelecionada) {
    showToast('Selecione um agente.', 'error');
    return;
  }

  if (pessoaSelecionada === '__OUTROS__' && !novaPessoa) {
    showToast('Informe o nome do novo agente.', 'error');
    return;
  }

  if (!ano || !mes || !categoria || !valor) {
    showToast('Preencha todos os campos do cadastro.', 'error');
    return;
  }

  try {
    const payload = { pessoa, ano, mes, categoria, valor };
    const wasEditing = editingId !== null;
    const url = wasEditing ? `/api/indicadores/${editingId}` : '/api/indicadores';
    const method = wasEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const erro = await res.json().catch(() => ({}));
      throw new Error(erro.error || 'Erro ao salvar registro.');
    }

    cadPessoa.value = '';
    cadPessoaSelect.value = '';
    cadPessoaNovo.value = '';
    cadPessoaNovoLabel.classList.add('hidden');
    cadAno.value = '';
    cadMes.value = '';
    cadCategoria.value = '';
    cadValor.value = '';

    if (wasEditing) {
      editingId = null;
      const btnText = document.querySelector('#cadastroForm .btn-primary');
      if (btnText) btnText.textContent = 'Salvar registro';
    }

    await Promise.all([
      popularSelect('pessoaSelect', '/api/pessoas'),
      popularSelect('gerenciarPessoaSelect', '/api/pessoas'),
      popularSelect('cadPessoaSelect', '/api/pessoas'),
      popularSelect('anoSelect', '/api/anos'),
      popularSelect('mesSelect', '/api/meses'),
      popularSelect('comparePessoa1', '/api/pessoas'),
      popularSelect('comparePessoa2', '/api/pessoas'),
      popularSelect('compareAno1', '/api/anos'),
      popularSelect('compareAno2', '/api/anos')
    ]);

    await carregarDados();
    await carregarGerenciar();
    showToast(
      wasEditing ? 'Registro atualizado com sucesso.' : 'Registro salvo com sucesso.',
      'success'
    );
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Erro ao salvar registro.', 'error');
  }
}

function entrarModoEdicao(row) {
  editingId = row.id;
  cadAno.value = row.ano;
  cadMes.value = row.mes;
  cadCategoria.value = row.categoria;
  cadValor.value = row.valor;

  const btnText = document.querySelector('#cadastroForm .btn-primary');
  if (btnText) btnText.textContent = 'Atualizar registro';

  tabCadastro.click();

  // Ajustar seleção do agente ao entrar em edição
  if (row.pessoa) {
    const options = Array.from(cadPessoaSelect.options);
    const exists = options.some((o) => o.value === row.pessoa);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = row.pessoa;
      opt.textContent = row.pessoa;
      cadPessoaSelect.insertBefore(opt, options[options.length - 1] || null); // antes de "Outros"
    }
    cadPessoaSelect.value = row.pessoa;
    cadPessoaNovoLabel.classList.add('hidden');
    cadPessoaNovo.value = '';
  }
}

async function removerRegistro(id) {
  if (!confirm('Tem certeza que deseja remover este registro?')) return;
  try {
    const res = await fetch(`/api/indicadores/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      const erro = await res.json().catch(() => ({}));
      throw new Error(erro.error || 'Erro ao remover registro.');
    }
    await Promise.all([
      popularSelect('pessoaSelect', '/api/pessoas'),
      popularSelect('anoSelect', '/api/anos'),
      popularSelect('mesSelect', '/api/meses'),
      popularSelect('comparePessoa1', '/api/pessoas'),
      popularSelect('comparePessoa2', '/api/pessoas'),
      popularSelect('compareAno1', '/api/anos'),
      popularSelect('compareAno2', '/api/anos')
    ]);
    await carregarDados();
    await carregarGerenciar();
    showToast('Registro removido com sucesso.', 'success');
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Erro ao remover registro.', 'error');
  }
}

async function carregarDados() {
  const params = new URLSearchParams();
  const pessoa = pessoaSelect.value;
  const categoria = categoriaSelect.value;
  const ano = anoSelect.value;
  const mes = mesSelect.value;
  const coordenador = coordenadorSelect.value;

  // Regra 1: se Coordenador tiver valor, ele pode funcionar sozinho (soma do grupo)
  if (!coordenador) {
    // Regra 2: sem coordenador, só mostra quando tiver Pessoa E Categoria
    if (!pessoa && !categoria && !ano && !mes) {
      tabelaBody.innerHTML = '';
      cardsResumo.innerHTML = '';
      serieTitulo.textContent = 'Selecione uma pessoa e uma categoria';

      if (grafico) {
        grafico.destroy();
        grafico = null;
      }
      return;
    }

    if (!pessoa || !categoria) {
      tabelaBody.innerHTML = '';
      cardsResumo.innerHTML = '';
      serieTitulo.textContent = 'Selecione uma pessoa e uma categoria';

      if (grafico) {
        grafico.destroy();
        grafico = null;
      }
      return;
    }
  }

  if (!pessoa && !categoria && !ano && !mes && !coordenador) {
    tabelaBody.innerHTML = '';
    cardsResumo.innerHTML = '';
    serieTitulo.textContent = 'Selecione filtros para visualizar';

    if (grafico) {
      grafico.destroy();
      grafico = null;
    }
    return;
  }

  if (pessoa) params.append('pessoa', pessoa);
  if (categoria) params.append('categoria', categoria);
  if (ano) params.append('ano', ano);
  if (mes) params.append('mes', mes);

  if (coordenador && GRUPOS[coordenador]) {
    const pessoasGrupo = GRUPOS[coordenador];
    const requisicoes = pessoasGrupo.map((p) => {
      const pParams = new URLSearchParams(params);
      pParams.set('pessoa', p);
      return fetchJSON(`/api/indicadores?${pParams.toString()}`);
    });

    const resultados = await Promise.all(requisicoes);
    const todos = resultados.flat();

    const chave = (r) => `${r.ano}-${String(r.mes_ordem).padStart(2, '0')}-${r.categoria}-${r.mes}`;

    const mapa = new Map();
    for (const r of todos) {
      const k = chave(r);
      const atual = mapa.get(k) || {
        mes: r.mes,
        ano: r.ano,
        mes_ordem: r.mes_ordem,
        categoria: r.categoria,
        pessoa: coordenador,
        valor: 0
      };
      atual.valor += r.valor;
      mapa.set(k, atual);
    }

    const dadosAgregados = Array.from(mapa.values()).sort(
      (a, b) => a.ano - b.ano || a.mes_ordem - b.mes_ordem
    );

    const filtros = { pessoa: null, coordenador, categoria, ano, mes };
    atualizarTabela(dadosAgregados);
    renderizarCards(dadosAgregados, filtros);
    renderizarGrafico(dadosAgregados, filtros);
  } else {
    const url = `/api/indicadores?${params}`;
    const dados = await fetchJSON(url);

    const filtros = { pessoa, categoria, ano, mes };
    atualizarTabela(dados);
    renderizarCards(dados, filtros);
    renderizarGrafico(dados, filtros);
  }
}

async function carregarGerenciar() {
  const params = new URLSearchParams();
  const pessoa = gerenciarPessoaSelect.value;
  const categoria = gerenciarCategoriaSelect.value;

  if (pessoa) params.append('pessoa', pessoa);
  if (categoria) params.append('categoria', categoria);

  const url = params.toString()
    ? `/api/indicadores?${params}`
    : '/api/indicadores';

  const dados = await fetchJSON(url);
  atualizarTabelaGerenciar(dados);
}

async function carregarLogs() {
  const pwd = logsPasswordInput.value.trim();
  if (!pwd) {
    showToast('Informe a senha para visualizar os logs.', 'info');
    return;
  }
  logsPassword = pwd;

  try {
    logsBody.innerHTML = '<tr><td colspan="9" style="text-align:center; color: var(--muted);">Carregando logs...</td></tr>';

    const res = await fetch('/api/logs?limit=200', {
      headers: {
        'x-logs-password': logsPassword
      }
    });

    if (res.status === 401) {
      logsBody.innerHTML = '';
      showToast('Senha de logs incorreta.', 'error');
      return;
    }

    if (!res.ok) {
      throw new Error('Erro ao carregar logs.');
    }

    const dados = await res.json();
    logsBody.innerHTML = '';

    if (!dados.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="9" style="text-align:center; color: var(--muted);">Nenhum log encontrado.</td>';
      logsBody.appendChild(tr);
      return;
    }

    for (const row of dados) {
      const tr = document.createElement('tr');
      const data = row.criado_em ? new Date(row.criado_em) : null;
      const dataFmt = data
        ? data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        : '-';

      tr.innerHTML = `
        <td>${dataFmt}</td>
        <td>${row.acao || '-'}</td>
        <td>${row.pessoa || '-'}</td>
        <td>${row.categoria || '-'}</td>
        <td>${row.ano ?? '-'}</td>
        <td>${row.mes || '-'}</td>
        <td class="right">${row.valor_antigo ?? '-'}</td>
        <td class="right">${row.valor_novo ?? '-'}</td>
        <td>${row.origem || '-'}</td>
      `;
      logsBody.appendChild(tr);
    }
  } catch (e) {
    console.error(e);
    showToast('Erro ao carregar logs.', 'error');
  }
}

async function init() {
  try {
    await Promise.all([
      popularSelect('categoriaSelect', '/api/categorias'),
      popularSelect('cadCategoria', '/api/categorias'),
      popularSelect('gerenciarCategoriaSelect', '/api/categorias'),
      popularSelect('pessoaSelect', '/api/pessoas'),
      popularSelect('gerenciarPessoaSelect', '/api/pessoas'),
      popularSelect('cadPessoaSelect', '/api/pessoas'),
      popularSelect('anoSelect', '/api/anos'),
      popularSelect('mesSelect', '/api/meses'),
      popularSelect('comparePessoa1', '/api/pessoas'),
      popularSelect('comparePessoa2', '/api/pessoas'),
      popularSelect('compareAno1', '/api/anos'),
      popularSelect('compareAno2', '/api/anos')
    ]);
    
    await carregarDados();
    await carregarGerenciar();
  } catch (e) {
    console.error(e);
    showToast('Erro ao carregar dados do servidor.', 'error');
  }
}

pessoaSelect.addEventListener('change', carregarDados);
coordenadorSelect.addEventListener('change', carregarDados);
categoriaSelect.addEventListener('change', carregarDados);
anoSelect.addEventListener('change', carregarDados);
mesSelect.addEventListener('change', carregarDados);
btnComparar.addEventListener('click', renderizarComparacao);
cadastroForm.addEventListener('submit', salvarCadastro);

gerenciarPessoaSelect.addEventListener('change', carregarGerenciar);
gerenciarCategoriaSelect.addEventListener('change', carregarGerenciar);
logsLoadButton.addEventListener('click', carregarLogs);

cadPessoaSelect.addEventListener('change', () => {
  if (cadPessoaSelect.value === '__OUTROS__') {
    cadPessoaNovoLabel.classList.remove('hidden');
    cadPessoaNovoLabel.style.display = '';
    cadPessoaNovo.focus();
  } else {
    cadPessoaNovoLabel.classList.add('hidden');
    cadPessoaNovoLabel.style.display = 'none';
    cadPessoaNovo.value = '';
  }
});

tabelaGerenciarBody.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const action = target.getAttribute('data-action');
  const id = target.getAttribute('data-id');
  if (!action || !id) return;

  if (action === 'edit') {
    const tr = target.closest('tr');
    if (!tr) return;
    const cells = tr.querySelectorAll('td');
    const row = {
      id: Number(id),
      mes: cells[1].textContent,
      ano: Number(cells[2].textContent),
      pessoa: cells[3].textContent === '-' ? '' : cells[3].textContent,
      categoria: cells[4].textContent,
      valor: Number(String(cells[5].textContent).replace(/\./g, '').replace(',', '.'))
    };
    entrarModoEdicao(row);
  } else if (action === 'delete') {
    await removerRegistro(Number(id));
  }
});

tabDashboard.addEventListener('click', () => {
  tabDashboard.classList.add('active');
  tabCadastro.classList.remove('active');
  tabGerenciar.classList.remove('active');
  tabLogs.classList.remove('active');
  dashboardSection.classList.remove('hidden');
  cadastroSection.classList.add('hidden');
  gerenciarSection.classList.add('hidden');
  logsSection.classList.add('hidden');
});

tabCadastro.addEventListener('click', () => {
  tabCadastro.classList.add('active');
  tabDashboard.classList.remove('active');
  tabGerenciar.classList.remove('active');
  tabLogs.classList.remove('active');
  dashboardSection.classList.add('hidden');
  cadastroSection.classList.remove('hidden');
  gerenciarSection.classList.add('hidden');
  logsSection.classList.add('hidden');
});

tabGerenciar.addEventListener('click', async () => {
  tabGerenciar.classList.add('active');
  tabDashboard.classList.remove('active');
  tabCadastro.classList.remove('active');
  tabLogs.classList.remove('active');
  dashboardSection.classList.add('hidden');
  cadastroSection.classList.add('hidden');
  gerenciarSection.classList.remove('hidden');
  logsSection.classList.add('hidden');
  await carregarGerenciar();
});

tabLogs.addEventListener('click', () => {
  tabLogs.classList.add('active');
  tabDashboard.classList.remove('active');
  tabCadastro.classList.remove('active');
  tabGerenciar.classList.remove('active');
  dashboardSection.classList.add('hidden');
  cadastroSection.classList.add('hidden');
  gerenciarSection.classList.add('hidden');
  logsSection.classList.remove('hidden');
});

init();
