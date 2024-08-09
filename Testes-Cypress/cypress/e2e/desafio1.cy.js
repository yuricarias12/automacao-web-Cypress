/// <reference types="cypress" />

describe('Desafio 1', () => {
    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Validando Mensagens', () => {
        //Criei um stub
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        //Dou o primeiro click e verifico/valido o alert
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })

        cy.get('#formNome').type('Yuri')

        //Dou o segundo click e verifico/valido o alert
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })

        cy.get('[data-cy="dataSobrenome"]').type('Carias')

        //Dou o terceiro click e verifico/valido o alert
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })

        cy.get('#formSexoMasc').click().should('be.checked')
        cy.get('#formSexoFem').should('not.be.checked')

        cy.get('#formCadastrar').click()

        cy.get('#resultado').should('contain', 'Cadastrado!')
    })
})