import { 
  verifyContainsText, 
  clickLinkOrText, 
  clickButton, 
  verifyContainsUrl, 
  verifyElementNotVisible, 
  verifyElementVisible,
  login 
} from '../actions/actionBase';

describe("Crie uma tela para visualizar uma receita específica.", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })
    
  it("Verificar se consigo acessar uma receita específica.", () => {
    clickLinkOrText('Ver mais');
    verifyContainsText('Receita de Bolo');
  })

  it("Verificar se consigo acessar uma receita específica depois que faço login.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickLinkOrText('Ver mais');
    verifyContainsText('Receita de Bolo');
  })
  
  it("Quando estou logado verfico se na página de uma receita específica existe os botões 'Editar Receita' e 'Excluir Receita'.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickLinkOrText('Ver mais');
    verifyElementVisible('[data-testid="editar-receita"]');
    verifyElementVisible('[data-testid="excluir-receita"]');
  })
  
  it("Verificar se na página da receita irá exibir o 'título da receita', os 'ingredientes', e a 'forma de preparo' da receita.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickLinkOrText('Ver mais');
    verifyContainsText('Farinha');
    verifyContainsText('ovo');
    verifyContainsText('leite');
    verifyContainsText('30 minutos no forno');
  })
 
  it("Verificar se o botão 'Editar Receita' leva para página de edição de receita.", () => { 
    login('bruno.batista@gmail.com', '12345678');
    clickLinkOrText('Ver mais');
    clickButton('[data-testid="editar-receita"]');
    verifyContainsUrl('/recipes/1/edit');
  })
 
  it("Verificar se o botão 'Excluir Receita' leva para página de exclusão de receita.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickLinkOrText('Ver mais');
    clickButton('[data-testid="excluir-receita"]');
    verifyContainsUrl('/recipes/1/delete');
  })

  it("Verificar se quando não estou logado os botões 'Editar Receita' e 'Excluir Receita' não podem estar visíveis na tela.", () => {
    clickLinkOrText('Ver mais');
    verifyElementNotVisible('[data-testid="editar-receita"]');
    verifyElementNotVisible('[data-testid="excluir-receita"]');
  })
});
  