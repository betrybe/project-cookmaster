import { 
  verifyContainsText, 
  login,
  clickButton,
  insertText,
  clickLinkOrText,
  createRecipe,
  clickLastElement
} from '../actions/actionBase';

import { name } from 'faker';
  
describe("Crie uma página de edição de receitas.", () => {
  let randomName = name.title();
  let randonIngredient = name.firstName();
  let randonPrepare = name.firstName();

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('http://localhost:3000/');
    login('bruno.batista@gmail.com', '12345678');
    createRecipe();
  })

  it("Editar o nome da receita.", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="nome-receita"]').clear();
    insertText('[data-testid="nome-receita"]', randomName);
    clickButton('[data-testid="postar-receita"]');
    verifyContainsText(randomName);
  })

  it("Editar os ingredientes da receita.", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    clickLinkOrText('Excluir Ingrediente');
    insertText('[data-testid="ingredientes"]', randonIngredient);
    clickButton('[data-testid="adicionar-ingrediente"]');
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randonIngredient);
  })
 
  it("Editar o modo de preparo da receita.", () => {
    clickButton('[data-testid="minhas-receitas"]');
    clickLastElement('a');
    clickButton('[data-testid="editar-receita"]');
    cy.get('[data-testid="modo-de-preparo"]').clear();
    insertText('[data-testid="modo-de-preparo"]', randonPrepare);
    clickButton('[data-testid="postar-receita"]');
    clickLastElement('a');
    verifyContainsText(randonPrepare);
  })
});
  