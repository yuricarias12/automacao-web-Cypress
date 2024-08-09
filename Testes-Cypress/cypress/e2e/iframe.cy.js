/// <reference types="cypress" />


describe('Trabalhando com Iframes', () => {
    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        //Promisse
        cy.get('#frame1').then(iframe => {
            //Contents trás os filhos dos elementos. No código abaixo trás todo o corpo(body) do iframe
            //Find faz uma busca mais especifica a partir de um determinado contexto
            //Encontrando a tag body do iframe e armazenando numa variavel
            const body = iframe.contents().find('body')
            //Wrapp pois o body não está sendo gerenciado pelo cypress
            //Procura no body o id tfield
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })

    })


    it.only('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')

        })
    })
})