// login.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const erro = params.get('erro');
  if (erro) {
    const divErro = document.createElement('div');
    divErro.textContent = decodeURIComponent(erro);

    // Estilização do aviso
    divErro.style.backgroundColor = '#f44336';
    divErro.style.color = 'white';
    divErro.style.padding = '12px 20px';
    divErro.style.textAlign = 'center';
    divErro.style.fontWeight = 'bold';
    divErro.style.borderRadius = '0 0 5px 5px';
    divErro.style.marginBottom = '20px';

    // Insere o aviso logo após o header
    const header = document.querySelector('header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(divErro, header.nextSibling);
    }

    // Remove após 5 segundos
    setTimeout(() => {
      divErro.remove();
    }, 5000);
  }
});
