// js/filtroCliente.js

document.addEventListener('DOMContentLoaded', () => {
  const inputBusca = document.getElementById('busca-cliente');
  const selectCliente = document.getElementById('cliente');

  if (inputBusca && selectCliente) {
    inputBusca.addEventListener('input', () => {
      const termo = inputBusca.value.toLowerCase();
      const options = selectCliente.options;

      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const texto = option.text.toLowerCase();
        option.style.display = texto.includes(termo) ? '' : 'none';
      }
    });
  }
});
