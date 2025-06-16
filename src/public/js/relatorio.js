document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById('cards-servicos');
  const selectFiltro = document.getElementById('filtroStatus');
  let todosServicos = [];

  try {
    const resposta = await fetch("/relatorio-servicos");
    const dados = await resposta.json();

    const total = dados.total || 0;
    const finalizados = dados.finalizados || 0;
    const cancelados = dados.cancelados || 0;
    const taxa = total > 0 ? ((cancelados / total) * 100).toFixed(1) : 0;

    document.getElementById("total-servicos").textContent = total;
    document.getElementById("servicos-finalizados").textContent = finalizados;
    document.getElementById("servicos-cancelados").textContent = cancelados;
    document.getElementById("taxa-cancelamento").textContent = `${taxa}%`;

    todosServicos = dados.servicos;
    renderizarServicos("Todos");

  } catch (erro) {
    console.error("Erro ao carregar o relatório:", erro);
    alert("Erro ao carregar dados do relatório.");
  }

  selectFiltro.addEventListener("change", () => {
    const statusSelecionado = selectFiltro.value;
    renderizarServicos(statusSelecionado);
  });

  function renderizarServicos(filtro) {
    container.innerHTML = "";

    let servicosFiltrados = [];

    if (filtro === "Todos") {
      servicosFiltrados = todosServicos;
    } else if (filtro === "Cancelado") {
      servicosFiltrados = todosServicos.filter(s => s._status === "Cancelado");
    } else if (filtro === "Finalizado") {
      servicosFiltrados = todosServicos.filter(s => s._status === "Finalizado");
    } else if (filtro === "Ativo") {
      servicosFiltrados = todosServicos.filter(s => s._status !== "Finalizado" && s._status !== "Cancelado");
    }

    if (servicosFiltrados.length === 0) {
      container.innerHTML = "<p>Nenhum serviço encontrado para esse filtro.</p>";
      return;
    }

    servicosFiltrados.forEach(servico => {
      const card = document.createElement('div');
      card.classList.add('card-servico');

      card.innerHTML = `
        <div class="titulo-campo">Nome do cliente</div>
        <div class="valor-campo">${servico._cliente._nome}</div>
        <hr>
        <div class="status-campo">Status</div>
        <div class="status-valor">${servico._status}</div>
        <hr>
        <div class="descricao-label">Descrição</div>
        <div class="descricao-texto">${servico._descricao}</div>
        <a href="#" class="botao-gerenciar">Visualizar</a>
      `;

      card.addEventListener('click', () => {
        sessionStorage.setItem('servicoId', servico._id);
        window.location.href = '/gerenciar-servico-gerente.html';
      });

      container.appendChild(card);
    });
  }
});
