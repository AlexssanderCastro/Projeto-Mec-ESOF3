document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/cliente-logado');
      const data = await response.json();
  
      if (data.nome) {
        const nomeElemento = document.getElementById('Nome-usuario');
        if (nomeElemento) {
          nomeElemento.textContent = `Olá, ${data.nome}`;
        }
      }
    } catch (error) {
      console.error('Erro ao buscar nome do cliente:', error);
    }
  });
  