import { 
  verifyContainsText, 
  login,
  clickButton,
  verifyContainsUrl,
  insertText,
  verifyNotContainsText,
  clickLinkOrText,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';
  
describe("Crie uma página de cadastro de receitas.", () => {

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
  })

  it("Verificar se o botão 'Nova Receita' direciona para página de cadastrar receitas", () => {
    clickButton('[data-testid="nova-receita"]');
    verifyContainsUrl('/recipes/new');
    verifyContainsText('Nova Receita');
  })
  
  it("Cadastrar uma receita", () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="nome-receita"]', 'Receita de pão');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    insertText('[data-testid="modo-de-preparo"]', '20 minutos no forno');
    clickButton('[data-testid="postar-receita"]');
  })
  
  it("Remover um ingrediente da receita", () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickLinkOrText('Excluir Ingrediente');
    verifyNotContainsText('Trigo');
  }) 
});
  