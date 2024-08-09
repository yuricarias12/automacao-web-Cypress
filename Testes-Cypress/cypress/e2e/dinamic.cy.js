/// <reference types="cypress" />

//Teste dinamico é um tipo de teste que a maioria dos passos são iguais variando apenas algum atributo, no teste abaixo a variação é de comida selecionada 

//Se tiver duvidas de quais eventos de teclas utilizar, escrever um errado que o Cypress mostrará quais eventos de teclas tem
describe('Testes Dinamico', () => {

    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    //Seleciona uma comida por vez em cada teste
    const comidas = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    comidas.forEach ( comidas => {
        it(`Cadastro com a comida ${comidas}`, () => {
            cy.fixture('userData').as('usuario').then(() => {
                cy.get('#formNome').type('Usuario')
                cy.get('#formSobrenome').type('Qualquer')
                cy.get(`[name=formSexo][value=F]`).click()
                cy.xpath(`//label[contains(.,'${comidas}')]/preceding-sibling::input`).click()
                cy.get('[name=formEscolaridade]').select('Superior')
                cy.get('[data-testid="dataEsportes"]').select('nada')
                cy.get('#formCadastrar').click()
                cy.get('#resultado').should('contain', 'Cadastrado!')
            })
        })

    })


    it.only('Deve selecionar todos usando o each', () => {
        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()

            //Each = Para cada um dos elementos que ele encontrar, ou seja, para as 4 comidas, ele execute algo
            cy.get('[name=formComidaFavorita]').each($el => {
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click()
            })
            
            cy.get('[name=formEscolaridade]').select('Superior')
            cy.get('[data-testid="dataEsportes"]').select('nada')
            // cy.get('#formCadastrar').click()
            // cy.get('#resultado').should('contain', 'Cadastrado!')
            
            cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        })
    })
})