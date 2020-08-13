import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  verifyContainsUrl,
  clickLastElement,
  createRecipe
} from '../actions/actionBase';
 
describe("Crie uma página de exclusão de uma receita.", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    login('bruno.batista@gmail.com', '12345678');
    createRecipe();
  })
 
  it("Tentar excluir uma receita passando a senha errada e verificar a mensagem de erro.", () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','1234');
    clickButton('[data-testid="confirmar"]');
    verifyContainsText('Senha Incorreta.');
  })

  it("Excluir receita com sucesso e verificar se foi redirecionada à página de listagem de receitas.", () => {
    clickLastElement('a');
    clickButton('[data-testid="excluir-receita"]');
    insertText('[data-testid="senha"]','12345678');
    clickButton('[data-testid="confirmar"]');
    verifyContainsUrl('/')
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })
});
    