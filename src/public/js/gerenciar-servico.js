document.addEventListener("DOMContentLoaded", async () => {

    const servicoId = sessionStorage.getItem('servicoId');
    
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
        

        preencherDadosServico(servico);
        preencherDadosCliente(servico._cliente);

        if (servico._orcamento && servico._status != 'Em análise') {
            preencherDadosOrcamento(servico._orcamento);
            preencherItensOrcamento(servico._orcamento._itens);
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
        <br>
        <p><strong>Status:</strong> ${servico._status}</p>
        <br>
        <p><strong>Descrição:</strong> ${servico._descricao}</p>
        
    `;
}

function preencherDadosCliente(cliente) {
    const div = document.getElementById("dados-cliente");
    div.innerHTML = `
        <h3>Dados do Cliente</h3>
        <hr>
        <br>
        <p><strong>Nome:</strong> ${cliente._nome}</p>
        <br>
        <p><strong>Email:</strong> ${cliente._email}</p>
        <br>
        <p><strong>Telefone:</strong> ${cliente._telefone}</p>
        
    `;
}

function preencherDadosOrcamento(orcamento) {
    const div = document.getElementById("dados-orcamento");
    div.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">Orçamento</h2>
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
            <div><strong>Data:</strong> ${new Date(orcamento._data_orcamento).toLocaleDateString()}</div>
            <div><strong>Valor Total:</strong> R$ ${parseFloat(orcamento._valor_total).toFixed(2)}</div>
        </div>
        <hr/>
    `;
}

function preencherItensOrcamento(itens) {
    const div = document.getElementById("itens-orcamento");

    // Começa a tabela
    let html = `
        <h3 style="margin-top: 30px;">Itens do Orçamento</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f0f0f0;">
                    <th style="padding: 8px; border: 1px solid #ccc;">Peça</th>
                    <th style="padding: 8px; border: 1px solid #ccc;">Valor Unitário</th>
                    <th style="padding: 8px; border: 1px solid #ccc;">Quantidade</th>
                    <th style="padding: 8px; border: 1px solid #ccc;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;

    itens.forEach(item => {
        const subtotal = item._quantidade * item._valor_unitario;
        html += `
            <tr>
                <td style="padding: 8px; border: 1px solid #ccc;">${item._descricao_peca}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">R$ ${parseFloat(item._valor_unitario).toFixed(2)}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">${item._quantidade}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">R$ ${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    div.innerHTML = html;
}

function renderizarAcoes(servico) {
    const div = document.getElementById("acoes-status");
    

    if (servico._status === "Em análise") {
        div.innerHTML += `<button onclick="abrirTelaCriarOrcamento('${servico._id}')">Gerenciar Orçamento</button>`;
    } else if (servico._status === "Aguardando confirmação") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico._id})">Confirmar</button>`;
    } else if (servico._status === "Consertando") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico._id})">Prosseguir</button>`;
    } else if (servico._status === "Aguardando pagamento") {
        div.innerHTML += `<button onclick="atualizarStatus(${servico._id})">Finalizar</button>`;
    }
}

function abrirTelaCriarOrcamento(id) {
    window.location.href = `/criar-orcamento-gerente.html?id=${id}`;
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
