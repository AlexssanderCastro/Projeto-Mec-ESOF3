const { Builder, By, until } = require('selenium-webdriver');

async function testarFluxoLogin(login, senha,resultado) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    
    await driver.get('http://localhost:3003');
    await driver.manage().window().maximize();
    
    const linkLogin = await driver.wait(
      until.elementLocated(By.linkText('Entre')),
      5000
    );
    await linkLogin.click();

   
    await driver.wait(until.titleIs('Login'), 5000);

    
    await driver.findElement(By.id('login')).sendKeys(login);
    await driver.findElement(By.id('senha')).sendKeys(senha);

   
    await driver.findElement(By.css('button[type="submit"]')).click();

    
    const currentUrl = await driver.getCurrentUrl();

    if (
      currentUrl.includes(resultado) 
     
    ) {
      let saida='';
      if(resultado=='/login.html'){
        saida='❌Login falhou';
      }else if(resultado=='/cliente.html'){
        saida='✅Login funcionou e redirecionou para página do cliente';
      }else if(resultado=='/gerente.html'){
        saida='✅Login funcionou e redirecionou para página do gerente';
      }else{
        saida='✅Login funcionou e redirecionou para página do funcionario';
      }
      console.log('✅ Teste bem-sucedido!',saida);
    } else {
      console.log('❌ Teste falhou.');
    }

    
  } catch (error) {
    console.error('❌ \x1b[31mTeste falhou com erro!\x1b[0m');
  } finally {
    await driver.quit();
  }
}

(async () => {
  await testarFluxoLogin('cliente123', 'cliente123','/cliente.html');
  await testarFluxoLogin('alex123', 'alex','/gerente.html');
  await testarFluxoLogin('teste123', 'teste123','/funcionario.html');
  await testarFluxoLogin('abcd123', 'abcd123','/login.html');
})();


