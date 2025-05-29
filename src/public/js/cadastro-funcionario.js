const form = document.getElementById('form-cadastro-funcionario');
const alerta = document.getElementById('alerta-funcionario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());

  try {
    const resposta = await fetch('/cadastrar-funcionario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      mostrarAlerta(resultado.mensagem); 
    } else {
      mostrarAlerta('Cadastro realizado com sucesso!', 'verde');
      form.reset();
    }
  } catch (erro) {
    mostrarAlerta('Erro ao conectar com o servidor.');
  }
});

function mostrarAlerta(mensagem, cor = 'vermelho') {
  alerta.textContent = mensagem;
  alerta.style.display = 'block';
  alerta.style.backgroundColor = cor === 'vermelho' ? '#f44336' : '#4CAF50'; // vermelho ou verde
  setTimeout(() => alerta.style.display = 'none', 4000); // some após 4 segundos
}
