document.addEventListener("DOMContentLoaded", async () => {
    const tabela = document.getElementById("tabela-funcionarios");

    try {
        const resposta = await fetch("/listar-funcionarios");
        const funcionarios = await resposta.json();

        funcionarios.forEach(func => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${func._nome}</td>
                <td>${func._cpf}</td>
                <td>${new Date(func._data_nascimento).toLocaleDateString()}</td>
                <td>${func._cargo}</td>
                <td>R$ ${parseFloat(func._salario).toFixed(2)}</td>
                <td>${func._email}</td>
                <td>${func._telefone}</td>
                <td>${func._endereco}</td>
                <td>${func._usuario._login}</td>
                <td>${func._usuario._perfil}</td>
                <td>
                    <button class="btn btn-editar" onclick="editarFuncionario(${func._id})">Editar</button>
                    <button class="btn btn-excluir" onclick="excluirFuncionario(${func._id})">Excluir</button>
                </td>
            `;

            tabela.appendChild(linha);
        });
    } catch (err) {
        console.error("Erro ao buscar funcionários:", err);
    }
});

function editarFuncionario(id) {
    window.location.href = `/editar-funcionario.html?id=${id}`;
}

async function excluirFuncionario(id) {
    if (confirm("Deseja realmente excluir este funcionário?")) {
        try {
            const resposta = await fetch(`/excluir-funcionario/${id}`, {
                method: "DELETE"
            });

            if (resposta.ok) {
                alert("Funcionário excluído com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao excluir funcionário.");
            }
        } catch (err) {
            console.error("Erro na exclusão:", err);
        }
    }
}
