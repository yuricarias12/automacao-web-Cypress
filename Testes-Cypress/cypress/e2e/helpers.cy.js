///<reference types="cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('#formNome').then($el => {
        //     // $el.val('funciona via jquery')
        //     cy.wrap($el).type('funciona via cypress')
        // })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))

        cy.wrap(1).should(num => {
            return 2
        }).should('be.equal', 1)

        //No Cypress, cy.wrap() é usado para envolver um valor que pode não ser um comando do Cypress para que você possa tratá-lo como um comando do Cypress e, 
        //assim, usar os encadeamentos e métodos fornecidos pelo Cypress, como should e then. 

        //Envolver Promises
        //Se você tem uma função que retorna uma Promise, você pode usar cy.wrap para esperar pela resolução dessa Promise e, em seguida, continuar com o fluxo de comandos do Cypress:

        //Usar then para Encadear Comandos
        //cy.wrap permite o uso de then para encadear comandos e realizar operações adicionais quando a Promise for resolvida:


        //Usar should para Asserções
        //Você pode usar should diretamente após cy.wrap para fazer asserções:

        //Resumo
        //cy.wrap() é usado para envolver valores ou Promises para que possam ser manipulados no fluxo de comandos do Cypress.
        //should é usado para fazer asserções sobre o valor envolvido.
        //then é usado para realizar operações adicionais com o valor envolvido após a sua resolução.
        //Dessa forma, você pode integrar valores e operações assíncronas no fluxo de testes do Cypress de maneira fluida e eficiente.

    })


    it('Its...', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')

        //No Cypress, its é um comando utilizado para acessar uma propriedade de um objeto ou o resultado de uma função retornada por um comando anterior. 
        //É especialmente útil quando você está trabalhando com objetos complexos e deseja verificar ou utilizar uma propriedade específica desse objeto.
        
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        //Encadeando os Its endereco.rua = its('endereco').its('rua')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')
    
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.tittle().its('length').should('be.equal', 20)

    })

    it.only('Invoke', () => {
        //No Cypress, invoke é um comando usado para chamar uma função em um objeto ou elemento e, em seguida, continuar com a corrente de comandos do Cypress. 
        //Ele é especialmente útil quando você precisa chamar métodos diretamente em objetos ou elementos e realizar operações ou asserções com os resultados desses métodos.
        //O comando invoke permite chamar métodos de objetos ou elementos e pode ser usado para várias finalidades, como acessar propriedades computadas, 
        //chamar funções utilitárias ou realizar manipulações específicas em elementos da DOM.
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        //Colocando a função getValue como propriedade do objeto fn
        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)

        cy.wrap({fn: soma}).invoke('fn', 5, 5).should('be.equal', 10)
        
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //Passando texto para a págia pelo Invoke
        cy.get('#formNome').invoke('val', 'Texto via invoke')

        //Utilizando o window para chamar um alert na página
        cy.window().invoke('alert', 'Dá pra ver??')

        //Utilizado para imbutir um código HTML dentro da div especifica
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!" />')

    })
})


