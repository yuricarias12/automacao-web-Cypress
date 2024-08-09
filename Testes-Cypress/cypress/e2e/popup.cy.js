/// <reference types="cypress" />


describe('Trabalhando com Popup', () => {
    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')

        })
    })


    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        //Criando Mocks para verificar se o popup realmente foi invocado
        cy.window().then(win => {
            //Utilizando o .as para definir a chamada como winOpen
            cy.stub(win, 'open').as('winOpen')
        })

        cy.get('#buttonPopUp').click()

        //Utilizando o @ para informar que o winOpen é um .as e não uma TAG
        cy.get('@winOpen').should('be.called')
    })


    describe.only('Com Links', () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html');
        })

        it('Checando PopUp URL', () => {
            //Verificando se uma URL do Link está correta
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })


        it('Deve Acessar Dinamicamente', () => {
            //Estrategia util para quando o link não é fixo, eu não sei qual o link no momento
            cy.contains('Popup2').then($a => {
                //Extraindo o href
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })

        })


        it('Forçando o link para abrir na mesma página', () => {
            cy.contains('Popup2')
                //removeAttr usado para remover um atributo
                //Removendo o atributo target para impedir que a página não abra em um popup
                .invoke('removeAttr', 'target')
                .click()
        })

    })
})