import { 
  verifyContainsText, 
  login,
  clickButton,
  verifyContainsUrl,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';
 
describe("Crie uma página de 'Minhas receitas'.", () => {

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
  })
 
  it("Validar se o botão minhas receitas está redirecionando para página das minhas receitas.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsUrl('/me/recipes');
  })

  it("Validar se na página está listando as minhas receitas minhas receitas.", () => {
    login('bruno.batista@gmail.com', '12345678');
    clickButton('[data-testid="minhas-receitas"]');
    verifyContainsText('Receita de Bolo');
  })

  it("Validar se quando o usuário não está logado tentar acessar a url das minhas receitas seja redirecionado para a tela de login.", () => {
    cy.visit('http://localhost:3000/me/recipes');
    verifyContainsUrl('/login');
  })
}); 
