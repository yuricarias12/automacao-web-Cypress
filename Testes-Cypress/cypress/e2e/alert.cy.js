/// <reference types="cypress" />

//Se tiver duvidas de quais eventos de teclas utilizar, escrever um errado que o Cypress mostrará quais eventos de teclas tem
describe('Trabalhando com Alerts', () => {

    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        // //ON captura eventos que ocorrem em nossa tela
        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        
        //Utilizando o comando clickAlert criado em commands.js
        cy.clickAlert('#alert', 'Alert Simples')

    })


    it('Alert com MOCK', () => {
        //O stub ele substitui uma função, armazena o uso e também permite que eu controle o comportamento
        //.as serve para dar nome a eventos ou alguma outra operação, no contexto abaixo o as da nome ao stub
        const stub = cy.stub().as('alerta')
        cy.get('#alert').click()
        //ON captura eventos que ocorrem em nossa tela
        //O stub substitui o metado window:alert, msg que está no código acima
        //Toda vez que o metado alert surgir na tela o metodo stub será invocado
        cy.on('window:alert', stub)
        //Utilizando o then para a checagem ocorrer apos o click
        //Depois que ele fizer o click então=then
          cy.get('#alert').click().then(() => {
            //Assertiva para pegar a chamada que foi feita a patir do stub
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
          })
    })


    it('Confirm', () => {
        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.get('#confirm').click()
        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })

        cy.get('#confirm').click()
        
    })


    it('Deny/Negar', () => {
        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            //Usado para ''cancelar'' o confirm, em vez de retornar true, retorna false
            return false
        })

        cy.get('#confirm').click()
        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm').click()
        
    })


    it('Prompt', () => {
        //Crindo um stub para o metodo prompt
        //.returns utilizado para dar um retorno para o stub
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        //ON captura eventos que ocorrem em nossa tela
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
        
    })
})