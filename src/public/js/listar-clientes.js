document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/clientes');
    const clientes = await response.json();

    const selectCliente = document.getElementById('cliente');

    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = `${cliente.nome} - ${cliente.cpf}`;
      selectCliente.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
});
