import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  clickLinkOrText,
  createRecipe,
  clickLastElement,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';

import { name } from 'faker';
  
describe("Crie uma página de edição de receitas.", () => {
  let randomName = name.title();
  let randomIngredient = name.firstName();
  let randomPrepare = name.firstName();

  before(() => {
    cy.task('queryDb', createDataBase());
    cy.task('queryDb', "USE cookmaster;")
    cy.task('queryDb', createTableUsers());
    cy.task('queryDb', createTableRecipes());
    cy.task('queryDb', insertUsers());
    cy.task('queryDb', insertRecipes());
  })

  after(() =>{
    cy.task('queryDb', 'DELETE FROM cookmaster.recipes;');
    cy.task('queryDb', "SET FOREIGN_KEY_CHECKS = 0; ");
    cy.task('queryDb', "DELETE FROM cookmaster.users;");
    cy.task('queryDb', "ALTER TABLE cookmaster.users AUTO_INCREMENT = 1;");
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    login(Cypress.env('login'), Cypress.env('password'));
    createRecipe();
  })

  it("Editar o nome da receita", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="nome-receita"]').clear();
    insertText('[data-testid="nome-receita"]', randomName);
    clickButton('[data-testid="postar-receita"]');
    verifyContainsText(randomName);
  })

  it("Editar os ingredientes da receita", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    clickLinkOrText('Excluir Ingrediente');
    insertText('[data-testid="ingredientes"]', randomIngredient);
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randomIngredient);
  })
 
  it("Editar o modo de preparo da receita", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="modo-de-preparo"]').clear();
    insertText('[data-testid="modo-de-preparo"]', randomPrepare);
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randomPrepare);
  })
});
  