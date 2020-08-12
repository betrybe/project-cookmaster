import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  verifyContainsUrl,
  verifyNotContainsText,
} from '../actions/actionBase';
 
describe("Cria uma página de pesquisa de receitas.", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('http://localhost:3000/');
    login('bruno.batista@gmail.com', '12345678');
  })
 
  it("Verificar se o botão 'Minhas Receitas' redireciona para a página das minhas receitas.", () => {
    clickButton('[data-testid="buscar-receita"]');
    verifyContainsUrl('/recipes/search');
  })

  it("Validar se consigo fazer uma busca de receita.", () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]','Receita de Bolo');
    clickButton('[data-testid="buscar-receita"]');
    verifyContainsText('Receita de Bolo');
  })

  it("Validar se não possível buscar uma receita que não existe.", () => {
    clickButton('[data-testid="buscar-receita"]');
    insertText('[data-testid="receita"]','Receita de que não existe');
    clickButton('[data-testid="buscar-receita"]');
    verifyNotContainsText('Receita de que não existe');
  })
});
    