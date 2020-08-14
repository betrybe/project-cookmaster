import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  verifyContainsUrl,
  clickLastElement,
  createRecipe,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';
 
describe("Crie uma página de exclusão de uma receita.", () => {

  before(() => {
    cy.task('queryDb', createDataBase());
    cy.task('queryDb', "USE cookmaster;");
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
 
  it("Tentar excluir uma receita passando a senha errada e verificar a mensagem de erro", () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','1234');
    clickButton('[data-testid="confirmar"]');
    verifyContainsText('Senha Incorreta.');
  })

  it("Excluir receita com sucesso e verificar se foi redirecionada à página de listagem de receitas", () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','12345678');
    clickButton('[data-testid="confirmar"]');
    verifyContainsUrl('/')
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })
});
    