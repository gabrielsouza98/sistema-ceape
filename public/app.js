// Elementos de autenticação
const loginScreen = document.getElementById('loginScreen');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const logoutButton = document.getElementById('logoutButton');

// Elementos principais
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
const renameAgentePanel = document.getElementById('renameAgentePanel');
const renamePessoaAtualSelect = document.getElementById('renamePessoaAtualSelect');
const renamePessoaNovoInput = document.getElementById('renamePessoaNovoInput');
const renamePessoaButton = document.getElementById('renamePessoaButton');
const logsPasswordInput = document.getElementById('logsPasswordInput');
const logsLoadButton = document.getElementById('logsLoadButton');
const logsBody = document.getElementById('logsBody');

let grafico;
let graficoComparacao;
let editingId = null;
let logsPassword = '';
let isAdmin = false;
let salvarCadastroEmAndamento = false;
let carregarDadosController = null;
let carregarGerenciarController = null;
const API_TIMEOUT_MS = 15000;

// Gerenciamento de autenticação
let authToken = localStorage.getItem('authToken') || null;

// Função para obter headers de autenticação
function getAuthHeaders() {
  const headers = {};
  if (authToken) {
    headers['x-auth-token'] = authToken;
  }
  return headers;
}

// Função para fazer requisições autenticadas
async function fetchAuth(url, options = {}) {
  // Não requer autenticação para rotas de login
  const isAuthRoute = url.includes('/api/auth/login');
  
  const headers = {
    ...(isAuthRoute ? {} : getAuthHeaders()),
    ...(options.headers || {})
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  // Só fazer logout automático se não for rota de login e retornar 401
  if (!isAuthRoute && response.status === 401) {
    logout();
    throw new Error('Sessão expirada. Faça login novamente.');
  }
  
  return response;
}

if (window.Chart && window.ChartDataLabels) {
  Chart.register(window.ChartDataLabels);
}

// Funções de autenticação
async function fazerLogin(username, senha) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, senha })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erro ao fazer login');
    }

    const data = await response.json();
    authToken = data.token;
    localStorage.setItem('authToken', authToken);
    isAdmin = !!data.isAdmin;
    return data;
  } catch (error) {
    throw error;
  }
}

async function verificarToken() {
  if (!authToken) return null;
  
  try {
    const response = await fetch('/api/auth/verify', {
      headers: {
        'x-auth-token': authToken
      }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

function logout() {
  if (authToken) {
    fetchAuth('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }
  authToken = null;
  isAdmin = false;
  localStorage.removeItem('authToken');
  mostrarTelaLogin();
}

function atualizarVisibilidadeAdmin() {
  if (!renameAgentePanel) return;
  if (isAdmin) {
    renameAgentePanel.classList.remove('hidden');
  } else {
    renameAgentePanel.classList.add('hidden');
  }
}

function mostrarTelaLogin() {
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
    loginScreen.style.display = 'flex';
  }
  if (mainApp) {
    mainApp.classList.add('hidden');
    mainApp.style.display = 'none';
  }
}

function mostrarApp() {
  if (loginScreen) {
    loginScreen.classList.add('hidden');
    loginScreen.style.display = 'none';
  }
  if (mainApp) {
    mainApp.classList.remove('hidden');
    mainApp.style.display = '';
  }
}

async function verificarAutenticacao() {
  if (!authToken) {
    mostrarTelaLogin();
    return false;
  }

  const tokenInfo = await verificarToken();
  if (!tokenInfo?.valid) {
    logout();
    return false;
  }

  isAdmin = !!tokenInfo.isAdmin;
  atualizarVisibilidadeAdmin();
  mostrarApp();
  return true;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-message"></span>
    <button class="toast-close" aria-label="Fechar notificação">&times;</button>
  `;

  const toastMessage = toast.querySelector('.toast-message');
  if (toastMessage) toastMessage.textContent = String(message);

  const close = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 150);
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  setTimeout(close, 4500);

  container.appendChild(toast);
}

function isAbortError(error) {
  return error && (error.name === 'AbortError' || String(error.message).includes('aborted'));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setButtonLoading(button, loading, loadingText, defaultText) {
  if (!button) return;
  button.disabled = loading;
  button.textContent = loading ? loadingText : defaultText;
}

function formatarDadoLabel(value, isPercentCategoria) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '';
  }
  const num = Number(value);
  return isPercentCategoria
    ? num.toFixed(2).replace('.', ',') + ' %'
    : num.toLocaleString('pt-BR');
}

const GRUPOS = {
  'Coordenador Edivaldo': ['Eudes', 'Josiel', 'Atailson', 'Rangel'],
  'Coordenador Glenyo': ['Jessyca', 'Carlos', 'Helio', 'Xavier', 'Dirceu', 'Jose de Freitas', 'Uniao', 'Altos'],
  'Coordenador Anaídia': ['Arlene', 'David'],
  'Coordenador Parnaiba': ['Alessia', 'Marcos', 'Renan']
};

async function fetchJSON(url, options = {}) {
  const { timeoutMs = API_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = !fetchOptions.signal ? new AbortController() : null;
  const timer = controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  try {
    const res = await fetchAuth(url, {
      ...fetchOptions,
      signal: fetchOptions.signal || controller.signal
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Erro ao carregar ' + url);
    }
    if (res.status === 204) {
      return null;
    }
    return await res.json();
  } finally {
    if (timer) clearTimeout(timer);
  }
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
    const mes = escapeHtml(row.mes);
    const ano = escapeHtml(row.ano);
    const pessoa = escapeHtml(row.pessoa || '-');
    const categoria = escapeHtml(row.categoria);
    const valor = escapeHtml(formatValor(row.valor, row.categoria));
    tr.innerHTML = `
      <td>${mes}</td>
      <td>${ano}</td>
      <td>${pessoa}</td>
      <td>${categoria}</td>
      <td class="right">${valor}</td>
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
    const id = Number(row.id);
    const mes = escapeHtml(row.mes);
    const ano = escapeHtml(row.ano);
    const pessoa = escapeHtml(row.pessoa || '-');
    const categoria = escapeHtml(row.categoria);
    const valor = escapeHtml(formatValor(row.valor, row.categoria));
    tr.innerHTML = `
      <td>${id}</td>
      <td>${mes}</td>
      <td>${ano}</td>
      <td>${pessoa}</td>
      <td>${categoria}</td>
      <td class="right">${valor}</td>
      <td class="right">
        <div class="actions">
          <button class="btn-sm" data-action="edit" data-id="${id}">Editar</button>
          <button class="btn-sm danger" data-action="delete" data-id="${id}">Remover</button>
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
    const titulo = escapeHtml(card.titulo);
    const valor = escapeHtml(card.valor);
    const sub = escapeHtml(card.sub);
    div.innerHTML = `
      <div class="card-title">${titulo}</div>
      <div class="card-value">${valor}</div>
      <div class="card-sub">${sub}</div>
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
  const isPercentCategoria = categoria === 'Inadimplência';

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
          formatter: (value) => formatarDadoLabel(value, isPercentCategoria)
        }
      },
      scales: {
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        },
        y: {
          ticks: {
            color: '#9ca3af',
            callback: (val) =>
              isPercentCategoria
                ? Number(val).toFixed(2).replace('.', ',') + ' %'
                : Number(val).toLocaleString('pt-BR')
          },
          grid: { color: 'rgba(31, 41, 55, 0.7)' }
        }
      }
    }
  });

  serieTitulo.textContent = label;
}

async function renderizarComparacao() {
  try {
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
    if (!comparacao.serie1?.length && !comparacao.serie2?.length) {
      showToast('Sem dados para comparacao com os filtros atuais.', 'info');
      return;
    }

    const ctx = document.getElementById('graficoComparacao').getContext('2d');

    if (graficoComparacao) {
      graficoComparacao.destroy();
    }

    // Montar eixo em ordem cronologica (ano + mes_ordem)
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

    const isPercentCategoria = categoria === 'Inadimplência';

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
            formatter: (value) => formatarDadoLabel(value, isPercentCategoria)
          }
        },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(31, 41, 55, 0.7)' }
          },
          y: {
            ticks: {
              color: '#9ca3af',
              callback: (val) =>
                isPercentCategoria
                  ? Number(val).toFixed(2).replace('.', ',') + ' %'
                  : Number(val).toLocaleString('pt-BR')
            },
            grid: { color: 'rgba(31, 41, 55, 0.7)' }
          }
        }
      }
    });
  } catch (e) {
    if (isAbortError(e)) return;
    console.error(e);
    showToast('Erro ao gerar comparacao.', 'error');
  }
}
async function popularSelect(selectId, endpoint, optionValue = '', optionText = '') {
  const select = document.getElementById(selectId);
  const valorAtual = select.value;
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

  const existeValorAnterior = Array.from(select.options).some((o) => o.value === valorAtual);
  select.value = existeValorAnterior ? valorAtual : '';
}

async function recarregarCombosGlobais() {
  await Promise.all([
    popularSelect('pessoaSelect', '/api/pessoas'),
    popularSelect('gerenciarPessoaSelect', '/api/pessoas'),
    popularSelect('cadPessoaSelect', '/api/pessoas'),
    popularSelect('renamePessoaAtualSelect', '/api/pessoas'),
    popularSelect('anoSelect', '/api/anos'),
    popularSelect('mesSelect', '/api/meses'),
    popularSelect('comparePessoa1', '/api/pessoas'),
    popularSelect('comparePessoa2', '/api/pessoas'),
    popularSelect('compareAno1', '/api/anos'),
    popularSelect('compareAno2', '/api/anos')
  ]);
}

async function renomearAgente() {
  if (!isAdmin) {
    showToast('Apenas admin pode renomear agente.', 'error');
    return;
  }

  const nomeAtual = renamePessoaAtualSelect.value;
  const novoNome = renamePessoaNovoInput.value.trim();

  if (!nomeAtual) {
    showToast('Selecione o agente que deseja renomear.', 'error');
    return;
  }
  if (!novoNome) {
    showToast('Informe o novo nome do agente.', 'error');
    return;
  }
  if (nomeAtual.toLowerCase() === novoNome.toLowerCase()) {
    showToast('O novo nome precisa ser diferente do atual.', 'error');
    return;
  }
  if (!confirm(`Confirmar renomeação de "${nomeAtual}" para "${novoNome}"?`)) {
    return;
  }

  try {
    setButtonLoading(renamePessoaButton, true, 'Renomeando...', 'Renomear agente');
    const result = await fetchJSON('/api/pessoas/renomear', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeAtual, novoNome }),
      timeoutMs: 20000
    });

    renamePessoaNovoInput.value = '';
    await recarregarCombosGlobais();
    await carregarDados();
    await carregarGerenciar();
    showToast(`Agente renomeado com sucesso (${result.atualizados} registro(s)).`, 'success');
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Erro ao renomear agente.', 'error');
  } finally {
    setButtonLoading(renamePessoaButton, false, '', 'Renomear agente');
  }
}

async function salvarCadastro(event) {
  event.preventDefault();
  if (salvarCadastroEmAndamento) return;

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

  if (!ano || !mes || !categoria || valor === '') {
    showToast('Preencha todos os campos do cadastro.', 'error');
    return;
  }

  try {
    salvarCadastroEmAndamento = true;
    const submitButton = document.querySelector('#cadastroForm .btn-primary');
    setButtonLoading(
      submitButton,
      true,
      editingId !== null ? 'Atualizando...' : 'Salvando...',
      editingId !== null ? 'Atualizar registro' : 'Salvar registro'
    );

    const payload = { pessoa, ano, mes, categoria, valor };
    const wasEditing = editingId !== null;
    const url = wasEditing ? `/api/indicadores/${editingId}` : '/api/indicadores';
    const method = wasEditing ? 'PUT' : 'POST';

    // Guardar filtros atuais da aba Gerenciar para restaurar depois do refresh
    const gerenciarPessoaSelecionada = gerenciarPessoaSelect.value;
    const gerenciarCategoriaSelecionada = gerenciarCategoriaSelect.value;

    await fetchJSON(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      timeoutMs: 20000
    });

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

    await recarregarCombosGlobais();

    // Restaurar filtros da aba Gerenciar
    gerenciarPessoaSelect.value = gerenciarPessoaSelecionada;
    gerenciarCategoriaSelect.value = gerenciarCategoriaSelecionada;

    await carregarDados();
    await carregarGerenciar();
    showToast(
      wasEditing ? 'Registro atualizado com sucesso.' : 'Registro salvo com sucesso.',
      'success'
    );
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Erro ao salvar registro.', 'error');
  } finally {
    salvarCadastroEmAndamento = false;
    const submitButton = document.querySelector('#cadastroForm .btn-primary');
    const labelPadrao = editingId !== null ? 'Atualizar registro' : 'Salvar registro';
    setButtonLoading(submitButton, false, '', labelPadrao);
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
    await fetchJSON(`/api/indicadores/${id}`, { method: 'DELETE' });
    await recarregarCombosGlobais();
    await carregarDados();
    await carregarGerenciar();
    showToast('Registro removido com sucesso.', 'success');
  } catch (e) {
    console.error(e);
    showToast(e.message || 'Erro ao remover registro.', 'error');
  }
}

async function carregarDados() {
  if (carregarDadosController) {
    carregarDadosController.abort();
  }
  carregarDadosController = new AbortController();
  const { signal } = carregarDadosController;

  const params = new URLSearchParams();
  const pessoa = pessoaSelect.value;
  const categoria = categoriaSelect.value;
  const ano = anoSelect.value;
  const mes = mesSelect.value;
  const coordenador = coordenadorSelect.value;

  try {
    // Regra 1: se Coordenador tiver valor, ele pode funcionar sozinho (soma do grupo)
    if (!coordenador) {
      // Regra 2: sem coordenador, so mostra quando tiver Pessoa E Categoria
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
        return fetchJSON(`/api/indicadores?${pParams.toString()}`, { signal });
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
      const dados = await fetchJSON(url, { signal });

      const filtros = { pessoa, categoria, ano, mes };
      atualizarTabela(dados);
      renderizarCards(dados, filtros);
      renderizarGrafico(dados, filtros);
    }
  } catch (e) {
    if (isAbortError(e)) return;
    console.error(e);
    showToast('Erro ao carregar dados filtrados.', 'error');
  }
}

async function carregarGerenciar() {
  if (carregarGerenciarController) {
    carregarGerenciarController.abort();
  }
  carregarGerenciarController = new AbortController();
  const { signal } = carregarGerenciarController;

  try {
    const params = new URLSearchParams();
    const pessoa = gerenciarPessoaSelect.value;
    const categoria = gerenciarCategoriaSelect.value;

    if (pessoa) params.append('pessoa', pessoa);
    if (categoria) params.append('categoria', categoria);

    const url = params.toString()
      ? `/api/indicadores?${params}`
      : '/api/indicadores';

    const dados = await fetchJSON(url, { signal });
    atualizarTabelaGerenciar(dados);
  } catch (e) {
    if (isAbortError(e)) return;
    console.error(e);
    showToast('Erro ao carregar dados para gerenciar.', 'error');
  }
}

async function carregarLogs() {
  const pwd = logsPasswordInput.value.trim();
  if (!pwd) {
    showToast('Informe a senha para visualizar os logs.', 'info');
    return;
  }
  logsPassword = pwd;

  try {
    setButtonLoading(logsLoadButton, true, 'Carregando...', 'Carregar logs');
    logsBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: var(--muted);">Carregando logs...</td></tr>';

    const res = await fetchAuth('/api/logs?limit=200', {
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
      tr.innerHTML = '<td colspan="6" style="text-align:center; color: var(--muted);">Nenhum log encontrado.</td>';
      logsBody.appendChild(tr);
      return;
    }

    for (const row of dados) {
      const tr = document.createElement('tr');
      const data = row.criado_em ? new Date(row.criado_em) : null;
      const dataFmt = data
        ? data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        : '-';

      const formatValorLog = (antigo, novo) => {
        const baseCategoria = row.categoria;
        const normalizar = (valor) => {
          if (valor === null || valor === undefined) return null;
          const num = Number(valor);
          if (Number.isNaN(num)) return String(valor);
          if (baseCategoria === 'Inadimplência') {
            return num.toFixed(2).replace('.', ',') + ' %';
          }
          return num.toLocaleString('pt-BR');
        };
        const a = normalizar(antigo);
        const b = normalizar(novo);

        if (a === null && b === null) return '-';
        if (a === null) return b;
        if (b === null || a === b) return a;
        return `${a} → ${b}`;
      };

      const acaoLegivel =
        row.acao === 'create'
          ? 'Cadastro'
          : row.acao === 'update'
          ? 'Edição'
          : row.acao === 'delete'
          ? 'Exclusão'
          : row.acao || '-';

      const titulo =
        row.categoria && row.mes && row.ano
          ? `${row.categoria} • ${row.mes}/${row.ano}`
          : row.categoria || '-';

      const alvo = row.pessoa || '-';

      const valorDesc = formatValorLog(row.valor_antigo, row.valor_novo);

      const origemLegivel =
        row.origem === 'delete-pessoa'
          ? 'Remoção em massa por agente'
          : row.origem === 'app'
          ? 'Operação no sistema'
          : row.origem || '-';

      tr.innerHTML = `
        <td>${escapeHtml(dataFmt)}</td>
        <td>${escapeHtml(acaoLegivel)}</td>
        <td>${escapeHtml(alvo)}</td>
        <td>${escapeHtml(titulo)}</td>
        <td class="right">${escapeHtml(valorDesc)}</td>
        <td>${escapeHtml(origemLegivel)}</td>
      `;
      logsBody.appendChild(tr);
    }
  } catch (e) {
    console.error(e);
    showToast('Erro ao carregar logs.', 'error');
  } finally {
    setButtonLoading(logsLoadButton, false, '', 'Carregar logs');
  }
}

async function init() {
  try {
    await Promise.all([
      popularSelect('categoriaSelect', '/api/categorias'),
      popularSelect('cadCategoria', '/api/categorias'),
      popularSelect('gerenciarCategoriaSelect', '/api/categorias')
    ]);
    await recarregarCombosGlobais();
    
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
      valor: Number(
        String(cells[5].textContent)
          .replace(/\s*%/g, '')   // remove símbolo de porcentagem
          .replace(/\./g, '')     // remove pontos de milhar
          .replace(',', '.')      // vírgula -> ponto decimal
      )
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

if (renamePessoaButton) {
  renamePessoaButton.addEventListener('click', renomearAgente);
}

// Event listeners de autenticação
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginUsername.value.trim();
    const senha = loginPassword.value;

    if (!username || !senha) {
      loginError.textContent = 'Preencha todos os campos.';
      loginError.classList.remove('hidden');
      return;
    }

    try {
      loginError.classList.add('hidden');
      const loginInfo = await fazerLogin(username, senha);
      isAdmin = !!loginInfo?.isAdmin;
      atualizarVisibilidadeAdmin();
      mostrarApp();
      await init();
      showToast('Login realizado com sucesso!', 'success');
    } catch (error) {
      loginError.textContent = error.message || 'Erro ao fazer login.';
      loginError.classList.remove('hidden');
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    logout();
    showToast('Logout realizado com sucesso.', 'info');
  });
}

// Garantir que apenas a tela de login seja exibida inicialmente
if (loginScreen) {
  loginScreen.classList.remove('hidden');
  loginScreen.style.display = 'flex';
}
if (mainApp) {
  mainApp.classList.add('hidden');
  mainApp.style.display = 'none';
}

// Verificar autenticação ao carregar a página
verificarAutenticacao().then((isAuthenticated) => {
  if (isAuthenticated) {
    mostrarApp();
    init();
  } else {
    mostrarTelaLogin();
  }
});


