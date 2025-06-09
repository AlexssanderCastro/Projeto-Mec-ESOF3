document.addEventListener('DOMContentLoaded', async function () {
  const form = document.getElementById('form-editar-funcionario');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    alert("Funcionário não encontrado.");
    return;
  }

  try {
    const resposta = await fetch(`/buscar-funcionario/${id}`);
    const funcionario = await resposta.json();

    // Preenche os campos do formulário
    document.getElementById('id').value = funcionario._id;
    document.getElementById('nome').value = funcionario._nome;
    document.getElementById('cpf').value = funcionario._cpf;
    document.getElementById('data_nascimento').value = funcionario._data_nascimento.split('T')[0];
    document.getElementById('cargo').value = funcionario._cargo;
    document.getElementById('salario').value = funcionario._salario;
    document.getElementById('email').value = funcionario._email;
    document.getElementById('telefone').value = funcionario._telefone;
    document.getElementById('endereco').value = funcionario._endereco;
    document.getElementById('login').value = funcionario._usuario._login;
    document.getElementById('senha').value = funcionario._usuario._senha;
    document.getElementById('perfil').value = funcionario._usuario._perfil;
  } catch (error) {
    alert('Erro ao carregar dados do funcionário.');
    console.error(error);
  }

  // Envio do formulário
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));

    try {
      const resposta = await fetch('/editar-funcionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();
      alert(resultado.mensagem || 'Funcionário editado com sucesso.');
    } catch (error) {
      console.error(error);
      alert('Erro ao editar funcionário.');
    }
  });
});
