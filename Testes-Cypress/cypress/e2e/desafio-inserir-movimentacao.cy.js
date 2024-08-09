/// <reference types="cypress" />

describe('Colocando conhecimento em pratica', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/');

        //Comando pode ser visualizado no arquivo commands.js na pasta do projeto
        cy.login('yuri12@hotmail.com', 2123, '.btn')
        cy.resetApp()
    })

    it('Inserir Movimentacao', () => {
        // Primeiro, clique no elemento do menu
        cy.xpath('//li/a[@data-test="menu-movimentacao"]').click()

        // Usado para obter a data atual
        const hoje = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD

        // Usado para obter a data de amanhã
        const dataAmanha = new Date();
        dataAmanha.setDate(dataAmanha.getDate() + 1);

        //Formata a saída da data
        const dataAmanhaFormatada = dataAmanha.toISOString().slice(0, 10);


        //Selecionando o tipo de conta como Despesa
        cy.xpath('//button[@data-test="tipo-despesa"]').click()

        //Selecionando a data da transação
        cy.xpath('//input[@data-test="data-transacao"]').click().type(hoje)

        //Selecionando a data do pagamento
        cy.xpath('//input[@data-test="data-pagamento"]').click().type(dataAmanhaFormatada)

        cy.xpath('//input[@data-test="descricao"]').type('Desc')

        cy.xpath('//input[@data-test="valor"]').type(123)

        cy.xpath('//input[@data-test="envolvido"]').type('Yuri Carias')

        cy.xpath('//select[@data-test="conta"]').select('Conta para saldo').should('have.value', '534,00')

        cy.xpath('//button[@data-test="status"]').click().should('have.attr', 'title', 'Conta Paga')

        cy.xpath('//button[contains(text(), "Salvar")]').click()

        cy.xpath('//li/a[@data-test="menu-extrato"]').click()

        cy.xpath('//div[contains(@class, "toast toast-success animated bounceIn")]/div[contains(text(), "Movimentação inserida com sucesso!")]').should('contain', 'Movimentação inserida com sucesso!')
    })
})