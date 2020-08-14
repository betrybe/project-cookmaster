import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  verifyContainsUrl,
  verifyNotContainsText,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';
 
describe("Cria uma página de buscar de receitas.", () => {

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
    login('bruno.batista@gmail.com', '12345678');
  })
 
  it("Verificar se o botão 'Buscar Receitas' redireciona para a página das minhas receitas.", () => {
    clickButton('[data-testid="buscar-receita"]');
    verifyContainsUrl('/recipes/search');
  })

  it("Validar se consigo fazer uma busca de receita.", () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]','Receita de Bolo');
    clickButton('[data-testid="buscar"]');
    verifyContainsText('Receita de Bolo');
  })

  it("Validar se não possível buscar uma receita que não existe.", () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]','Receita de que não existe');
    clickButton('[data-testid="buscar"]');
    verifyNotContainsText('Receita de que não existe');
  })
});
    