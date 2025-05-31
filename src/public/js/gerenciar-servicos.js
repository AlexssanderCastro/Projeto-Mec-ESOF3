document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('cards-servicos');

    try {
        const resposta = await fetch('/servicos-ativos');
        const servicos = await resposta.json();

        servicos.forEach(servico => {
            const card = document.createElement('div');
            card.classList.add('card-servico');
            
           card.innerHTML = `
                <div class="titulo-campo">Nome do cliente</div>
                <div class="valor-campo">${servico.clienteNome}</div>
                <hr>
                <div class="status-campo">Status</div>
                <div class="status-valor">${servico.status}</div>
                <hr>
                <div class="descricao-label">Descrição</div>
                <div class="descricao-texto">${servico.descricao}</div>
                <a href="gerenciar-servico.html?id=${servico.id}" class="botao-gerenciar">Gerenciar</a>
            `;


            card.addEventListener('click', () => {
                window.location.href = `/gerenciar-servico-gerente.html?id=${servico.id}`;
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        container.innerHTML = '<p>Erro ao carregar os serviços.</p>';
    }
});
