import {
  login,
  clickButton,
  verifyContainsUrl,
  registerUser,
  clearFieldsUser,
  getValueInput
} from '../actions/actionBase';

import { name, internet } from 'faker';
 
describe("Crie uma página de editar usuário.", () => {
  let randomName = name.firstName(); 
  let randomEmail = internet.email();
  let randomLast = name.lastName();

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('http://localhost:3000/');
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
    cy.visit('http://localhost:3000/');
  })
 
  it("Verificar se o botão editar usuário redireciona para tela de editar usuário.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="editar-usuario"]');
    verifyContainsUrl('/me/edit');
  })

  it("Validar alterar email.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="editar-usuario"]');
    clearFieldsUser()
    registerUser('emailalterado@gmail.com', '12345678', '12345678', randomName, randomLast);
    clickButton('[data-testid="editar-usuario"]');
    getValueInput('[data-testid="email"]','emailalterado@gmail.com');
  })

  it("Validar alterar nome.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="editar-usuario"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', 'ALTERADO', randomLast);
    clickButton('[data-testid="editar-usuario"]');
    getValueInput('[data-testid="nome"]','ALTERADO');
  })

  it("Validar alterar sobrenome.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="editar-usuario"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', randomName, 'ALTERADO');
    clickButton('[data-testid="editar-usuario"]');
    getValueInput('[data-testid="sobrenome"]','ALTERADO');
  }) 

  it("Validar alterar senha.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="editar-usuario"]');
    clearFieldsUser();
    registerUser(randomEmail, '123456789', '123456789', randomName, randomLast);
    clickButton('[data-testid="editar-usuario"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
  }) 
}); 
