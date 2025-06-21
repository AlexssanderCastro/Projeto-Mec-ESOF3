const { Builder, By, until } = require('selenium-webdriver');

async function testarFluxoLogin(login, senha) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Abrir a página inicial
    await driver.get('http://localhost:3003');

    // 2. Esperar e clicar no link "Entre"
    const linkLogin = await driver.wait(
      until.elementLocated(By.linkText('Entre')),
      5000
    );
    await linkLogin.click();

    // 3. Esperar a página de login carregar
    await driver.wait(until.titleIs('Login'), 5000);

    // 4. Preencher login e senha
    await driver.findElement(By.id('login')).sendKeys(login);
    await driver.findElement(By.id('senha')).sendKeys(senha);

    // 5. Clicar no botão "Entrar"
    await driver.findElement(By.css('button[type="submit"]')).click();

    // 6. Verificar sucesso (ex: redirecionamento para gerente.html)
    const currentUrl = await driver.getCurrentUrl();

    if (
      currentUrl.includes('/gerente.html') ||
      currentUrl.includes('/cliente.html') ||
      currentUrl.includes('/funcionario.html')
    ) {
      console.log('✅ Login bem-sucedido!');
    } else {
      console.log('❌ Login falhou.');
    }

    
  } catch (error) {
    console.error('❌ \x1b[31mLogin falhou!\x1b[0m');
  } finally {
    await driver.quit();
  }
}

(async () => {
  await testarFluxoLogin('cliente123', 'cliente123');
  await testarFluxoLogin('alex123', 'alex');
})();


