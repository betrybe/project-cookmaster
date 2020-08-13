import { 
  verifyContainsText, 
  login,
  clickButton,
  verifyContainsUrl,
} from '../actions/actionBase';
 
describe("Crie uma página de 'Minhas receitas'.", () => {
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
