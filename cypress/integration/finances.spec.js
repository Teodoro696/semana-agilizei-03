/// <reference types="cypress"/>

import { format, prepareLocalStorage } from '../support/utils'

/// cy.viewport
/// arquivos de config
/// configs por linhda de comando

context('Dev Finances Agiliezei', () => {
// hooks
// trechos que executam antes e depois do teste
// before -> antes de todos os testes
// beforeEach -> antes de cada testes
// after -> depois de todos os testes 
// afterEach -> depois de cada testes

beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/#', {
        onBeforeLoad: (win)=>{
            prepareLocalStorage(win)
        }    
    }
    
    )
   // cy.get('#data-table tbody tr').should('have.length', 0)
});


    it('Cadastrar entradas', () => {
 
     cy.get('#transaction .button').click() // id + class
     cy.get('#description').type('Presente') // id
     cy.get('[name=amount]').type(12) // atributos
     cy.get('[name=date]').type('2021-03-24')  // atributos
     cy.get('button').contains('Salvar').click() // tipo e valor

     cy.get('#data-table tbody tr').should('have.length', 3)

    });

    it('Cadastar saídas', () => {

        cy.get('#transaction .button').click() // id + class
        cy.get('#description').type('Presente') // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[name=date]').type('2021-03-24')  // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor
   
   //     cy.get('#data-table tbody tr').should('have.length',31)
    });

    it('Remover entradas e saídas', () => {
/*      const entrada = 'Mesada'
        const saida   = 'KinderOvo'

        cy.get('#transaction .button').click() // id + class
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) // atributos
        cy.get('[name=date]').type('2021-03-24')  // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click() // id + class
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) // atributos
        cy.get('[name=date]').type('2021-03-24')  // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor */

        // estratégia 1: voltar para o elemento pai, e avançar para um td img attr
        cy.get('td.description')
        .contains("Mesada")
        .parent()
        .find('img[onclick*=remove]')
        .click()

        // estrátegia 2: buscar todos os irmãs, e buscar o que tem img + attr
        cy.get('td.description')
        .contains('Suco Kapo')
        .siblings()
        .children('img[onclick*=remove]')
        .click()

        cy.get('#data-table tbody tr').should('have.length', 0)


    });

    it('Validar saldo com diversas transações', () => {

/*         const entrada = 'Mesada'
        const saida   = 'KinderOvo'

        cy.get('#transaction .button').click() // id + class
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(100) // atributos
        cy.get('[name=date]').type('2021-03-24')  // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click() // id + class
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-35) // atributos
        cy.get('[name=date]').type('2021-03-24')  // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor */
        // capturar as linhas com as transações e as colunas com valores
        // capturar o texto dessas colunas 
        // formatar esse valores das linhas

        // somar os valores de entradas e saidas

        // capturar o texto do total
        // comparar o somatorio de entradas com o total 

        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')
        .each(($el, index, $list) =>{
            
            cy.get($el).find('td.income, td.expense').invoke('text').then(text=>{
                if(text.includes('-')){
                    expenses = expenses + format(text)
                } else{
                    incomes = incomes + format(text)
                }
                
                cy.log('Entradas',incomes)
                cy.log('Saídas', expenses)
               
            })        

        } )

        cy.get('#totalDisplay').invoke('text').then(text =>{
            cy.log('Valor Total', format(text))

            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses 

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })

    });

});

     // - entender o fluxo manualmente
     // - mapear os elementos que vamos interagir 
     // - descrever as interações com o cypress
     // - adicionar as asserções que a gente precisa  
