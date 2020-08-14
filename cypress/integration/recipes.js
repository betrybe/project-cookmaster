import {
  verifyContainsText,
  clickLinkOrText,
  clickButton,
  verifyContainsUrl,
  verifyElementNotVisible,
  verifyElementVisible,
  login,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes,
} from '../actions/actionBase';

describe('Crie uma tela para visualizar uma receita específica.', () => {
  before(() => {
    cy.task('queryDb', createDataBase());
    cy.task('queryDb', 'USE cookmaster;');
    cy.task('queryDb', createTableUsers());
    cy.task('queryDb', createTableRecipes());
    cy.task('queryDb', insertUsers());
    cy.task('queryDb', insertRecipes());
  })

  after(() => {
    cy.task('queryDb', 'DELETE FROM cookmaster.recipes;');
    cy.task('queryDb', 'SET FOREIGN_KEY_CHECKS = 0; ');
    cy.task('queryDb', 'DELETE FROM cookmaster.users;');
    cy.task('queryDb', 'ALTER TABLE cookmaster.users AUTO_INCREMENT = 1;');
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Verificar se consigo acessar uma receita específica', () => {
    clickLinkOrText('Ver mais');
    verifyContainsText('Receita de Bolo');
  })

  it('Verificar se consigo acessar uma receita específica depois que faço login', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickLinkOrText('Ver mais');
    verifyContainsText('Receita de Bolo');
  })

  it('Quando estou logado verfico se na página de uma receita específica existe os botões "Editar Receita" e "Excluir Receita"', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickLinkOrText('Ver mais');
    verifyElementVisible('[data-testid="editar-receita"]');
    verifyElementVisible('[data-testid="excluir-receita"]');
  })

  it('Verificar se na página da receita irá exibir o "título da receita", os "ingredientes", e a "forma de preparo" da receita', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickLinkOrText('Ver mais');
    verifyContainsText('Farinha');
    verifyContainsText('ovo');
    verifyContainsText('leite');
    verifyContainsText('30 minutos no forno');
  })

  it('Verificar se o botão "Editar Receita" leva para página de edição de receita', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickLinkOrText('Ver mais');
    clickButton('[data-testid="editar-receita"]');
    verifyContainsUrl('/edit');
  })

  it('Verificar se o botão "Excluir Receita" leva para página de exclusão de receita', () => {
    login(Cypress.env('login'), Cypress.env('password'));
    clickLinkOrText('Ver mais');
    clickButton('[data-testid="excluir-receita"]');
    verifyContainsUrl('/delete');
  })

  it('Verificar se quando não estou logado os botões "Editar Receita" e "Excluir Receita" não podem estar visíveis na tela', () => {
    clickLinkOrText('Ver mais');
    verifyElementNotVisible('[data-testid="editar-receita"]');
    verifyElementNotVisible('[data-testid="excluir-receita"]');
  })
});
