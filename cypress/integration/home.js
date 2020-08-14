import { 
  verifyContainsText, 
  verifyElementNotVisible, 
  verifyElementVisible, 
  login 
} from '../actions/actionBase';

const Importer = require('mysql-import');
import Sequelize from 'sequelize';
const  my = require('mysql2');

describe("Crie uma tela de listagem de receitas.", () => {
/*
  let sequelize;

  before(() => {

    // testar conexao ao banco
  cy.task('teste');
  const con = my.createConnection({host: '127.0.0.1', user: 'root', password: '12345678', database: 'cookmaster'})

     const importer = new Importer(
      { user: 'root', password: '12345678', host: 'localhost' }
    );
    
    await importer.import('./cookmaster.sql');
    
    importer.disconnect();
    


    
    const sequelize = new Sequelize(
     'cookmaster',
     'root@localhost',
     '12345678',
     {
       dialect: 'mysql',
       dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
       host: 'localhost',
       port: 33060
     }
   ) 
    await sequelize.query('TRUNCADE recipes;', { type: 'RAW' });
    sequelize.close(); 
  })
  */
  beforeEach( () => {
    cy.visit('http://localhost:3000/');
  })


  it("Verificar se estou na home e tem os títulos 'Cookmaster' e 'Receitas'.", () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receitas');
  })

  it("Verificar se não existe o botão 'Nova Receita' quando acesso home sem estar logado.", () => {
    verifyContainsText('Cookmaster');
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyElementNotVisible('[data-testid="nova-receita"]');
  })

  it("Verificar se existe o botão 'Nova Receita' quando estou logado e acessei a home.", () => {
    login('bruno.batista@gmail.com', '12345678');
    verifyContainsText('Cookmaster');
    verifyContainsText('bruno batista');
    verifyContainsText('Nova Receita');
    verifyElementVisible('[data-testid="nova-receita"]');
  })

  it("Verificar se existe receita na tela com 'nome da receita', 'nome do usuário' e o link da receita 'Ver mais'.", () => {
    verifyContainsText('Receita de Bolo');
    verifyContainsText('bruno batista');
    verifyContainsText('Ver mais');
  })
});
