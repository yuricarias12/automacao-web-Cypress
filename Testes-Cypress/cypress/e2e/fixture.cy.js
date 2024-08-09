/// <reference types="cypress" />

//Utiliza-se Fixture para utilizar dados externos e poar os nossos testes

describe('Fixtures tests', () => {
    it('Pegando dados de arquivos fixtures', function () {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('[name=formEscolaridade]').select(this.usuario.escolaridade)
            cy.get('[data-testid="dataEsportes"]').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain', 'Cadastrado!')
        })
    })
})