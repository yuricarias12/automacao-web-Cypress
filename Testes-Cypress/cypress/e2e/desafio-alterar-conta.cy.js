/// <reference types="cypress" />

describe('Colocando conhecimento em pratica', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/');

        cy.get('[data-test="email"]').type('yuri12@hotmail.com')
        cy.get('[data-test="passwd"]').type(2123)
        cy.get('.btn').click()
    })

    it('Alterando Conta', () => {
        // Primeiro, clique no elemento do menu
        cy.xpath('//li/a[@data-test="menu-settings"]').click()

        // Em seguida, clico no link de contas após garantir que está visível e tenha o texto Contas
        cy.xpath('//li//div//a[@href="/contas"]').should('be.visible').and('have.text', 'Contas').click();

        cy.xpath("//table//td[contains(., 'Conta para alterar')]/..//i[@class='far fa-edit']").click()

        cy.get('[data-test="nome"]').clear().should('have.value', '')

        cy.get('[data-test="nome"]').type('Conta alterada')
       
        cy.get('.btn').click()

        cy.xpath('//div[contains(@class, "toast toast-success animated bounceIn")]/div[contains(text(), "Conta atualizada com sucesso!")]').should('contain', 'Conta atualizada com sucesso!')
    })
})