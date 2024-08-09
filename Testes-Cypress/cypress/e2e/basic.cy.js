/// <reference types="cypress" />

describe('Cypress basic', () => {
    it.only('Visita a página com should com assertiva do titulo', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        //Usar o pause para executar passo a passo com gerenciamento do Cypress
        //cy.pause()



        //const title = cy.title();
        //console.log(title);

        
        //Solicita o titulo e logo após faz uma assertiva com should
        
        //Verifica se o titulo da página é igual a Campo de Treinamento
        //cy.title().should('be.equal', 'Campo de Treinamento')

        //Verifica se contém Campo
        //cy.title().should('be.contain', 'Campo')

        //Forma mais simples de realizar mais de um Should
        //cy.title()
        //.should('be.equal', 'Campo de Treinamento')
        //.should('be.contain', 'Campo')


        //Outra forma de verificar com .and
        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('be.contain', 'Campo')

        let syncTitle

        //Imprimindo log no console
        cy.title().then(title => {
            console.log(title)

            //Reutilizando e Imprimindo o title em um input
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        //Outra forma de Reutilizar e Imprimindo o title em um input
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        //Outra forma de Reutilizar e Imprimindo o title em um input
        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })

    })

    //Usar o .debug() para pegar mais detalhes sobre determinado campo


    it('Encontrar e interagir com um elemento', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        //Clica no botão ''Click Me'' e faz a assertiva verificando se o valor após o click é ''Obrigado!''
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
    })
    
})