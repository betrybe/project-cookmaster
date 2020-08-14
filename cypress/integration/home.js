import {
  verifyContainsText,
  verifyElementNotVisible,
  verifyElementVisible,
  login,
  createAndInsertsDataBase,
  dropAndTruncadeDataBase,
} from '../actions/actionBase';

describe('Crie uma tela de listagem de receitas', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncadeDataBase();
  })

  beforeEach( () => {
    cy.visit('http://localhost:3000/');
  })

  it('Verificar se estou na home e tem os títulos "Cookmaster" e "Receitas"', () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })

  it('Verificar se não existe o botão "Nova Receita" quando acesso home sem estar logado', () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyElementNotVisible('[data-testid="nova-receita"]');
  })

  it('Verificar se existe o botão "Nova Receita" quando estou logado e acessei a home', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    verifyContainsText('Cookmaster');
    verifyContainsText('bruno batista');
    verifyContainsText('Nova Receita');
    verifyElementVisible('[data-testid="nova-receita"]');
  })

  it('Verificar se existe receita na tela com "nome da receita", "nome do usuário" e o link da receita "Ver mais"', () => {
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyContainsText('Ver mais');
  })
});
