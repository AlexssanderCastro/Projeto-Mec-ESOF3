document.addEventListener("DOMContentLoaded", async () => {
    try {
        const resposta = await fetch("/editar-cliente-dados");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os dados do cliente.");
        }

        const clienteResponse = await resposta.json();
        const cliente = clienteResponse.cliente;
        console.log(cliente);

        // Preencher os campos do formulário com os dados retornados
        document.getElementById("id-edit").value = cliente._id;
        document.getElementById("nome-edit").value = cliente._nome;

        const data = new Date(cliente._data_nascimento);
        if (!isNaN(data.getTime())) {
            document.getElementById("data_nascimento-edit").value = data.toISOString().split("T")[0];
        } else {
            console.warn("Data inválida:", cliente._data_nascimento);
        }

        document.getElementById("telefone-edit").value = cliente._telefone;
        document.getElementById("endereco-edit").value = cliente._endereco || "";
        document.getElementById("cpf-edit").value = cliente._cpf;
        document.getElementById("email-edit").value = cliente._email;
        document.getElementById("login-edit").value = cliente._usuario._login;

    } catch (erro) {
        console.error("Erro ao carregar os dados do cliente:", erro);
        alert("Não foi possível carregar os dados do cliente.");
    }

    // Submit do formulário de editar perfil
    document.getElementById("form-editar-perfil").addEventListener("submit", async (event) => {
        event.preventDefault();

        const dados = {
            id: document.getElementById("id-edit").value,
            nome: document.getElementById("nome-edit").value,
            data_nascimento: document.getElementById("data_nascimento-edit").value,
            telefone: document.getElementById("telefone-edit").value,
            endereco: document.getElementById("endereco-edit").value,
            cpf: document.getElementById("cpf-edit").value,
            email: document.getElementById("email-edit").value,
            login: document.getElementById("login-edit").value
        };

        try {
            const resposta = await fetch("/editar-cliente", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok && resultado.sucesso) {
                alert("Perfil atualizado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao atualizar: " + (resultado.mensagem || "Tente novamente."));
            }
        } catch (erro) {
            console.error("Erro ao enviar os dados do cliente:", erro);
            alert("Erro ao enviar os dados.");
        }
    });

    // Submit do formulário de alteração de senha
    document.getElementById("form-alterar-senha").addEventListener("submit", async (event) => {
        event.preventDefault();

        const senhaAntiga = document.getElementById("senhaAntiga").value;
        const novaSenha = document.getElementById("novaSenha").value;

        if (!novaSenha) {
            alert("Por favor, informe a nova senha.");
            return;
        }

        try {
            const resposta = await fetch("/trocar-senha", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ senhaAntiga, novaSenha })
            });

            const resultado = await resposta.json();

            if (resposta.ok && resultado.sucesso) {
                alert("Senha atualizada com sucesso!");
                document.getElementById("form-alterar-senha").reset();
            } else {
                alert("Erro ao alterar senha: " + (resultado.mensagem || "Tente novamente."));
            }
        } catch (erro) {
            console.error("Erro ao enviar a nova senha:", erro);
            alert("Erro ao enviar a nova senha.");
        }
    });
});
