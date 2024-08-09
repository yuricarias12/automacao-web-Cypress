//Usado para o Vscode reconhecer que estamos utilizando o Cypress
/// <reference types="cypress" />

//only utilizado para especificar que apenas aquele teste seja executado, o only sempre executara o ultimo only econtrado do código
it.only('A external test...', () => { 

})

//Describe serve para agrupar testes
//Skip utilizado para especificar que um teste não deve ser executado
describe('Um grupo de testes...', () => {
    describe('Mais um grupo de teste...', () => {
        it.skip('Um teste especifico...', () => { 

        })

    })

    it('Um teste externo...', () => { 

    })
})
