const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testarCadastroCliente({
    nome,
    dataNascimento,
    telefone,
    endereco,
    cpf,
    email,
    login,
    senha,
    resultado
}) {
    const driver = await new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize({ width: 1280, height: 800 }))
        .build();

    try {
        await driver.get('http://localhost:3003');

        // Clicar em "Cadastre-se"
        const linkCadastro = await driver.findElement(By.linkText('Cadastre-se'));
        await linkCadastro.click();

        // Aguarda título da página de cadastro
        await driver.wait(until.titleIs('Cadastro'), 5000);

        // Preenche formulário
        await driver.findElement(By.id('nome')).sendKeys(nome);
        await driver.findElement(By.id('data_nascimento')).sendKeys(dataNascimento);
        await driver.findElement(By.id('telefone')).sendKeys(telefone);
        await driver.findElement(By.id('endereco')).sendKeys(endereco);
        await driver.findElement(By.id('cpf')).sendKeys(cpf);
        await driver.findElement(By.id('email')).sendKeys(email);
        await driver.findElement(By.id('login')).sendKeys(login);
        await driver.findElement(By.id('senha')).sendKeys(senha);

        // Submete
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Espera redirecionamento
        await driver.sleep(2000);
        const url = await driver.getCurrentUrl();

        if (url.includes(resultado)) {
            let saida='';
            if(resultado=='/login.html'){
                saida='✅ Cadastro funcionou como deveria';
            }else{
                saida='❌ Cadastro falhou como deveria'
            }
            console.log('✅ Teste bem sucedido!',saida);
        } else {
            console.warn('⚠️ Teste falhou!');
        }

    } catch (error) {
        console.error('❌ Erro no teste de cadastro:', error);
    } finally {
        await driver.quit();
    }
}

function gerarCpfAleatorio() {
    const rand = () => Math.floor(Math.random() * 9);
    let cpf = Array.from({ length: 9 }, rand).join('');

    const calcularDigito = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base[i]) * ((base.length + 1) - i);
        }
        const resto = soma % 11;
        return (resto < 2) ? 0 : 11 - resto;
    };

    const d1 = calcularDigito(cpf);
    const d2 = calcularDigito(cpf + d1);

    return `${cpf}${d1}${d2}`.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

(async () => {
  let cpf = gerarCpfAleatorio();
  

  await testarCadastroCliente({
     nome: 'Maria Selenium',
    dataNascimento: '1990-10-10',
    telefone: '(34) 99999-1234',
    endereco: 'Av. Teste, 999',
    cpf: cpf,
    email: `maria${Date.now()}@mail.com`,
    login: `maria${Date.now()}`,
    senha: 'senha123',
    resultado:'/login.html'
  });

  await testarCadastroCliente({
     nome: 'Maria Selenium',
    dataNascimento: '1990-10-10',
    telefone: '(34) 99999-1234',
    endereco: 'Av. Teste, 999',
    cpf: cpf,
    email: `maria${Date.now()}@mail.com`,
    login: `maria${Date.now()}`,
    senha: 'senha123',
    resultado:'/cadastro-cliente.html'
  });
})();

