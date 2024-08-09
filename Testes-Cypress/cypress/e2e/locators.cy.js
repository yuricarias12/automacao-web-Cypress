/// <reference types="cypress" />


describe('Trabalho com elementos basicos', () => {

    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.reload()
    })

    it('Usando jquery selector', () => {
        //Seleciona o botão no terceiro filho do primeiro filho.
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        //Seleciona o input na terceira célula da primeira linha do tbody da tabela.
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        //Seleciona o elemento com atributo onclick contendo 'Francisco'.
        cy.get("[onclick*='Francisco']")
        //Seleciona o input na quarta célula após 'Doutorado' na tabela.
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        //Seleciona o input na sétima célula da linha contendo 'Doutorado'.
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    })

    it('Usando xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
    })

    it('using xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('funciona')
    })
})

   
        
