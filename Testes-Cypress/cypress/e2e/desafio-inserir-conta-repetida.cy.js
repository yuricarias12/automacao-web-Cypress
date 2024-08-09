/// <reference types="cypress" />

describe('Colocando conhecimento em pratica', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/');

        //Comando pode ser visualizado no arquivo commands.js na pasta do projeto
        cy.login('yuri12@hotmail.com', 2123, '.btn')
    })

    it('Inserindo Conta Repetida', () => {
        // Primeiro, clique no elemento do menu
        cy.xpath('//li/a[@data-test="menu-settings"]').click()

        // Em seguida, clico no link de contas após garantir que está visível e tenha o texto Contas
        cy.xpath('//li//div//a[@href="/contas"]').should('be.visible').and('have.text', 'Contas').click();

        cy.get('[data-test="nome"]').type('Conta mesmo nome')
       
        cy.get('.btn').click()

        cy.xpath('//div[contains(@class, "toast toast-error animated bounceIn")]/div[contains(text(), "Erro: Error: Request failed with status code 400")]').should('contain', 'Erro: Error: Request failed with status code 400')
    })
})