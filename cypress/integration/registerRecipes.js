import { 
  verifyContainsText, 
  login,
  clickButton,
  verifyContainsUrl,
  insertText,
  verifyNotContainsText,
  clickLinkOrText
} from '../actions/actionBase';
  
describe("Crie uma página de cadastro de receitas.", () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('http://localhost:3000/');
    login('bruno.batista@gmail.com', '12345678');
  })

  it("Verificar se o botão 'Nova Receita' direciona para página de cadastrar receitas.", () => {
    clickButton('[data-testid="nova-receita"]');
    verifyContainsUrl('/recipes/new');
    verifyContainsText('Nova Receita');
  })
  
  it("Cadastrar uma receita.", () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="nome-receita"]', 'Receita de pão');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    insertText('[data-testid="modo-de-preparo"]', '20 minutos no forno');
    clickButton('[data-testid="postar-receita"]');
  })
  
  it("Remover um ingrediente da receita.", () => {
    clickButton('[data-testid="nova-receita"]');
    insertText('[data-testid="ingredientes"]', 'Trigo');
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickLinkOrText('Excluir Ingrediente');
    verifyNotContainsText('Trigo');
  }) 
});
  