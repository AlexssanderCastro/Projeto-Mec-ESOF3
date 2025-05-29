document.getElementById('form-servico').addEventListener('submit', async function(event) {
  
  event.preventDefault(); // evita recarregar a página

  const selectCliente = document.getElementById('cliente');
  const descricao = document.getElementById('descricao').value.trim();

  const clienteId = selectCliente.value; // pega o id do cliente selecionado

  if (!clienteId) {
    alert('Selecione um cliente.');
    return;
  }

  if (!descricao) {
    alert('Digite a descrição do serviço.');
    return;
  }

  const dados = {
    clienteId: Number(clienteId), 
    descricao: descricao,
  };

  try {
    const resposta = await fetch('/criar-servico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados),
    });

    if (resposta.ok) {
      alert('Serviço criado com sucesso!');
      // opcional: limpar o formulário
      selectCliente.value = '';
      document.getElementById('descricao').value = '';
    } else {
      const erro = await resposta.json();
      alert('Erro: ' + (erro.mensagem || 'Não foi possível criar o serviço.'));
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
});
