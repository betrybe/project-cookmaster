import {
  verifyContainsText,
  login,
  clickButton,
  verifyContainsUrl,
  createAndInsertsDataBase,
  dropAndTruncadeDataBase,
} from '../actions/actionBase';

describe('Crie uma página de Minhas receitas.', () => {
  before(() => {
    createAndInsertsDataBase();
  })

  after(() => {
    dropAndTruncadeDataBase();
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Validar se o botão minhas receitas está redirecionando para página das minhas receitas', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsUrl('/me/recipes');
  })

  it('Validar se na página está listando as minhas receitas minhas receitas', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsText('Receita de Bolo');
  })

  it('Validar se quando o usuário não está logado tentar acessar a url das minhas receitas seja redirecionado para a tela de login', () => {
    cy.visit('http://localhost:3000/me/recipes');
    verifyContainsUrl('/login');
  })
});
