
document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("tabela-clientes");
  const filtroInput = document.getElementById("filtro-nome");
  let clientes = [];

  // Buscar clientes da rota
  async function carregarClientes() {
    try {
      const resposta = await fetch("/listar-clientes");
      const resultado = await resposta.json();

      if (resposta.ok && resultado.clientes) {
        clientes = resultado.clientes;
        exibirClientes(clientes);
      } else {
        alert("Erro ao carregar clientes.");
      }
    } catch (erro) {
      console.error("Erro ao buscar clientes:", erro);
      alert("Erro ao buscar clientes.");
    }
  }

  // Exibir clientes na tabela
  function exibirClientes(lista) {
    
    tabela.innerHTML = ""; // limpa
    lista.forEach(cliente => {
        console.log(cliente);
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${cliente._nome}</td>
        <td>${cliente._cpf}</td>
        <td>${cliente._telefone}</td>
        <td>${cliente._email}</td>
        <td>${cliente._endereco || ''}</td>
      `;
      tabela.appendChild(linha);
    });
  }

  // Filtro por nome
  filtroInput.addEventListener("input", () => {
    const termo = filtroInput.value.toLowerCase();
    const filtrados = clientes.filter(c => c._nome.toLowerCase().includes(termo));
    exibirClientes(filtrados);
  });

  // Inicializa
  carregarClientes();
});

