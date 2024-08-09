/// <reference types="cypress" />

// Grupo de testes relacionados a alertas
describe('Trabalhando com Alerts', () => {

    // Hook que garante que todos os testes do grupo visitem o site especificado antes de executar
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    // Teste para manipular o tempo voltando ao passado
    it('Voltando ao passado com time', () => {
        // Define uma data específica: Ano, mês, dia, horas, minutos, segundos
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime()) // Congela o relógio no tempo especificado
        cy.get('#buttonNow').click() // Clica no botão para obter a data e hora atual
        cy.get('#resultado > span').should('contain', '10/04/2012') // Verifica se o resultado contém a data especificada
    })

    // Teste marcado para execução exclusiva que manipula o tempo avançando para o futuro
    it.only('Vai para o futuro', () => {
        cy.get('#buttonTimePassed').click() // Clica no botão para obter o tempo passado desde o início do teste
        cy.get('#resultado > span').should('contain', '17184') // Verifica se o resultado contém '17184'

        // Pega o texto do elemento, converte para número e verifica se é maior que 1718479594315
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gt', 1718479594315)
        })

        cy.clock() // Congela o relógio no tempo atual
        cy.get('#buttonTimePassed').click() // Clica no botão para obter o tempo passado desde o início do teste
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 0) // Verifica se o número é menor ou igual a 0
        })

        // Descomente para esperar 1 segundo e verificar o tempo passado
        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 1000)

        cy.tick(5000) // Avança o relógio em 5000 milissegundos (5 segundos)
        cy.get('#buttonTimePassed').click() // Clica no botão para obter o tempo passado
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 5000) // Verifica se o número é maior ou igual a 5000
        })

        cy.tick(10000) // Avança o relógio em 10000 milissegundos (10 segundos)
        cy.get('#buttonTimePassed').click() // Clica no botão para obter o tempo passado
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 15000) // Verifica se o número é maior ou igual a 15000
        })
    })
})
