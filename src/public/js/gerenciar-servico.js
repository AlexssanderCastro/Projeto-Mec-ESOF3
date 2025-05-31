document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const servicoId = urlParams.get("id");

    if (!servicoId) {
        alert("ID do serviço não informado.");
        return;
    }

    try {
        const resposta = await fetch(`/buscar-servico/${servicoId}`);
        const servico = await resposta.json();
        if(!servico){
            alert("Problema ao buscar serviço")
        }
        console.log(servico);

        preencherDadosServico(servico);
        preencherDadosCliente(servico._cliente);

        if (servico.orcamento) {
            preencherDadosOrcamento(servico.orcamento);
            preencherItensOrcamento(servico.orcamento.itens);
        }

        renderizarAcoes(servico);
    } catch (err) {
        console.error("Erro ao buscar dados do serviço:", err);
    }
});

function preencherDadosServico(servico) {
    const div = document.getElementById("dados-servico");
    div.innerHTML = `
        <h3>Dados do Serviço</h3>
        <hr>
        <p><strong>Status:</strong> ${servico._status}</p>
        <p><strong>Descrição:</strong> ${servico._descricao}</p>
        
    `;
}

function preencherDadosCliente(cliente) {
    const div = document.getElementById("dados-cliente");
    div.innerHTML = `
        <h3>Dados do Cliente</h3>
        <hr>
        <p><strong>Nome:</strong> ${cliente._nome}</p>
        <p><strong>Email:</strong> ${cliente._email}</p>
        <p><strong>Telefone:</strong> ${cliente._telefone}</p>
        
    `;
}

function preencherDadosOrcamento(orcamento) {
    const div = document.getElementById("dados-orcamento");
    div.innerHTML = `
        <h3>Orçamento</h3>
        <p><strong>Data:</strong> ${new Date(orcamento.data_orcamento).toLocaleDateString()}</p>
        <p><strong>Valor Total:</strong> R$ ${orcamento.valor_total.toFixed(2)}</p>
        <hr/>
    `;
}

function preencherItensOrcamento(itens) {
    const div = document.getElementById("itens-orcamento");
    div.innerHTML = `<h3>Itens do Orçamento</h3>`;
    itens.forEach(item => {
        div.innerHTML += `
            <div class="item-orcamento">
                <p><strong>Peça:</strong> ${item.descricao_peca}</p>
                <p><strong>Valor Unitário:</strong> R$ ${item.valor_unitario.toFixed(2)}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade}</p>
                <hr/>
            </div>
        `;
    });
}

function renderizarAcoes(servico) {
    const div = document.getElementById("acoes-status");
    div.innerHTML = `<h3>Ações</h3>`;

    if (servico.status === "Em análise") {
        div.innerHTML += `<button onclick="abrirTelaCriarOrcamento(${servico.id})">Criar Orçamento</button>`;
    } else if (servico.status === "Aguardando confirmação") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico.id})">Confirmar</button>`;
    } else if (servico.status === "Consertando") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico.id})">Prosseguir</button>`;
    } else if (servico.status === "Aguardando pagamento") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico.id})">Finalizar</button>`;
    }
}

function abrirTelaCriarOrcamento(servicoId) {
    window.location.href = `criar-orcamento.html?servicoId=${servicoId}`;
}

async function atualizarStatus(servicoId) {
    try {
        const resposta = await fetch(`/atualizar-status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: servicoId })  // ✅ Apenas o ID é enviado
        });

        if (resposta.ok) {
            alert("Status atualizado com sucesso!");
            window.location.reload();
        } else {
            const erro = await resposta.text();
            alert("Erro ao atualizar status: " + erro);
        }
    } catch (err) {
        console.error("Erro na atualização:", err);
    }
}
