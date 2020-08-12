export function verifyContainsText(text) {
  cy.contains(text).should('be.visible');
}

export function verifyNotContainsText(text){
  cy.contains(text).should('not.exist')
}

export function clickLinkOrText(text) {
  cy.contains(text).first().click();
}

export function clickLastElement(element) {
  cy.get(element).last().click();
}

export function clickButton(element){
  cy.get(element).click();
}

export function verifyElementVisible(element){
  cy.get(element).should('to.be.visible');
}

export function verifyElementNotVisible(element){
  cy.get(element).should('not.be.visible');
}

export function verifyContainsUrl(url){
  cy.url().should('includes', url);
}

export function getValueInput(element, text){
  cy.get(element).should('have.value', text);
}

export function insertText(element, text){
  cy.get(element).type(text);
}

export function login(email, password) {
  cy.get('[data-testid="login"]').click();
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
}

export function clearFieldsUser (){
  cy.get('[data-testid="email"]').clear();
  cy.get('[data-testid="senha"]').clear();
  cy.get('[data-testid="nome"]').clear();
  cy.get('[data-testid="sobrenome"]').clear();
}

export function registerUser(email, password, confirmPassword, name, lastName){
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="confirmar-senha"]').type(confirmPassword);
  cy.get('[data-testid="nome"]').type(name);
  cy.get('[data-testid="sobrenome"]').type(lastName);
  cy.get('[data-testid="cadastrar"]').click();
}

export function createRecipe(){
  clickButton('[data-testid="nova-receita"]');
  insertText('[data-testid="nome-receita"]', 'Receita para excluir');
  insertText('[data-testid="ingredientes"]', 'Trigo');
  clickButton('[data-testid="adicionar-ingrediente"]');
  insertText('[data-testid="modo-de-preparo"]', '20 minutos no forno');
  clickButton('[data-testid="postar-receita"]');
}
