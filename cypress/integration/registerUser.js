import {
  registerUser,
  clickButton,
  verifyContainsText,
  createDataBase,
  createTableUsers,
  createTableRecipes,
  insertUsers,
  insertRecipes,
} from '../actions/actionBase';

import { name, internet } from 'faker';

describe('Crie uma página de cadastro de usuários', () => {
  const randomName = name.firstName();
  const randomEmail = internet.email();
  const randomLast = name.lastName();

  before(() => {
    cy.task('queryDb', createDataBase());
    cy.task('queryDb', 'USE cookmaster;');
    cy.task('queryDb', createTableUsers());
    cy.task('queryDb', createTableRecipes());
    cy.task('queryDb', insertUsers());
    cy.task('queryDb', insertRecipes());
  })

  after(() => {
    cy.task('queryDb', 'DELETE FROM cookmaster.recipes;');
    cy.task('queryDb', 'SET FOREIGN_KEY_CHECKS = 0;');
    cy.task('queryDb', 'DELETE FROM cookmaster.users;');
    cy.task('queryDb', 'ALTER TABLE cookmaster.users AUTO_INCREMENT = 1;');
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Criar um usuário com sucesso', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, randomLast);
    verifyContainsText('Cadastro efetuado com sucesso!');
  })

  it('Validar o campo email', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(' ', '12345678', '12345678', randomName, randomLast);
    verifyContainsText('O email deve ter o formato email@mail.com');
  })

  it('Validar o campo senha', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, ' ', '12345678', randomName, randomLast);
    verifyContainsText('A senha deve ter pelo menos 6 caracteres');
  })

  it('Validar campos confirmar senha', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', ' ', randomName, randomLast);
    verifyContainsText('As senhas tem que ser iguais');
  })

  it('Validar campos nome', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', ' ', randomLast);
    verifyContainsText('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  })

  it('Validar campos sobrenome', () => {
    clickButton('[data-testid="login"]');
    clickButton('[data-testid="cadastrar"]');
    registerUser(randomEmail, '12345678', '12345678', randomName, ' ');
    verifyContainsText('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  })
});
