import {
  login,
  clickButton,
  verifyContainsUrl,
  registerUser,
  clearFieldsUser,
  getValueInput,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes
} from '../actions/actionBase';

import { name, internet } from 'faker';
 
describe("Crie uma página de editar usuário.", () => {
  let randomName = name.firstName(); 
  let randomEmail = internet.email();
  let randomLast = name.lastName();

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
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
    cy.visit('http://localhost:3000/');
  })
 
  it("Verificar se o botão editar usuário redireciona para tela de editar usuário.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    verifyContainsUrl('/me/edit');
  })

  it("Validar alterar email.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser()
    registerUser('emailalterado@gmail.com', '12345678', '12345678', randomName, randomLast);
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="email"]','emailalterado@gmail.com');
  })

  it("Validar alterar nome.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', 'ALTERADO', randomLast);
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="nome"]','ALTERADO');
  })

  it("Validar alterar sobrenome.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', randomName, 'ALTERADO');
    clickButton('[data-testid="minha-conta"]');
    getValueInput('[data-testid="sobrenome"]','ALTERADO');
  }) 

  it("Validar alterar senha.", () => {
    login(randomEmail, '12345678');
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    registerUser(randomEmail, '123456789', '123456789', randomName, randomLast);
    clickButton('[data-testid="minha-conta"]');
    clearFieldsUser();
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
  }) 
}); 
