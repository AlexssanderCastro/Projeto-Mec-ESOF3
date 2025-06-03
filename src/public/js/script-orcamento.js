document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const servicoId = params.get("id");
    document.body.dataset.servicoId = servicoId;


    if (!servicoId) {
        alert("ID do serviço não foi informado na URL.");
        return;
    }

    try {
        const resposta = await fetch(`/buscar-servico/${servicoId}`);
        const servico = await resposta.json();
        
        


        if (!servico) {
            alert("Serviço não encontrado.");
            return;
        }

        if (servico._orcamento) {
            
            // Preenche os itens existentes
            preencherItensOrcamento(servico._orcamento._itens);
            atualizarValorTotal(servico._orcamento._itens);

            // Salva o ID do orçamento na div
            const container = document.getElementById("container-orcamento");
            container.dataset.orcamentoId = servico._orcamento._id;


            localStorage.setItem('orcamentoId', servico._orcamento._id.toString());
        }


    } catch (erro) {
        console.error("Erro ao buscar serviço:", erro);
    }

    // Adiciona o listener do botão "Adicionar"
    document.getElementById("formularioItem").addEventListener("submit", async (event) => {

        event.preventDefault(); // impede o recarregamento da página

        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = parseInt(document.getElementById("quantidade").value);
        const valorUnitario = parseFloat(document.getElementById("valorUnitario").value);
        const orcamentoId = parseInt(localStorage.getItem('orcamentoId'));
        console.log("Orçamento ID salvo:", orcamentoId);

        if (!descricao || quantidade <= 0 || valorUnitario < 0) {
            alert("Preencha os dados corretamente.");
            return;
        }

        try {
            const resposta = await fetch("/adicionar-item-orcamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orcamentoId,
                    descricao_peca: descricao,
                    quantidade,
                    valor_unitario: valorUnitario
                })
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                alert("Erro: " + erro.erro);
                return;
            }

            const novoItem = await resposta.json();
            console.log(novoItem);
            adicionarItemNaTabela(novoItem);
            atualizarValorTotalHTML(novoItem);

            document.getElementById("formularioItem").reset();
            document.getElementById("quantidade").value = "1";

        } catch (err) {
            console.error("Erro ao adicionar item:", err);
            alert("Erro ao adicionar item.");
        }
    });

});

function preencherItensOrcamento(itens) {
    const corpoTabela = document.getElementById("corpoTabelaItens");
    corpoTabela.innerHTML = "";

    itens.forEach(item => {
        adicionarItemNaTabela(item);
    });
}

function adicionarItemNaTabela(item) {
    const corpoTabela = document.getElementById("corpoTabelaItens");
    const subtotal = item._quantidade * item._valor_unitario;
    const quantidade = Number(item._quantidade);
    const valorUnitario = Number(item._valor_unitario);

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${item._descricao_peca}</td>
        <td>${quantidade}</td>
        <td>${valorUnitario.toFixed(2)}</td>
        <td>${subtotal.toFixed(2)}</td>
    `;
    corpoTabela.appendChild(linha);
}

function atualizarValorTotal(itens) {
    const total = itens.reduce((acc, item) => acc + item._quantidade * item._valor_unitario, 0);
    document.getElementById("total").value = total.toFixed(2);
}

function atualizarValorTotalHTML() {
    const linhas = document.querySelectorAll("#corpoTabelaItens tr");
    let total = 0;

    linhas.forEach(linha => {
        const subtotal = parseFloat(linha.children[3].textContent);
        total += subtotal;
    });

    document.getElementById("total").value = total.toFixed(2);
}


document.getElementById("submeterOrcamento").addEventListener("click", () => {
    const servicoId = document.body.dataset.servicoId;
    

    if (servicoId) {
        atualizarStatus(servicoId);
    } else {
        alert("ID do serviço não encontrado.");
    }
});

async function atualizarStatus(servicoId) {
    try {
        const resposta = await fetch(`/atualizar-status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: servicoId })
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