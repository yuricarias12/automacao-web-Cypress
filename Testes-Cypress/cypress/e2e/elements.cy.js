/// <reference types="cypress" />

//Se tiver duvidas de quais eventos de teclas utilizar, escrever um errado que o Cypress mostrará quais eventos de teclas tem

describe('Trabalho com elementos basicos', () => {

    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Textos', () => {
       
        //Verifica se de todo texto do body contém Cuidado
        cy.get('body').should('contain', 'Cuidado')
        
        //Procura em um span a palavra Cuidado
        cy.get('span').should('contain', 'Cuidado')

        //Procura em uma CLASSE a palavra Cuidado(Está forma só funciona passando o texto EXATO) #Melhor forma
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

    })

    it('Links', () => {
        
        //Verifica se não tem o texto Voltou na tela
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        //Clica com base no nome do input
        cy.contains('Voltar').click()
        //Verifica se após o clique o nome Voltou! apareceu na tela
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('Campos de texto', () => {
        cy.get('#formNome').type('Cypress Test')
        //Textos digitados em campos se encontra através de value ao inves de text
        cy.get('#formNome').should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
        .type('textarea')
        .should('have.value', 'textarea')


        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('???')


        cy.get('[data-cy="dataSobrenome"]')
        //Apagando um caractere
        .type('Teste12345{backspace}')
        .should('have.value', 'Teste1234')


        cy.get('#elementosForm\\:sugestoes')
        //Utilizado para limpar o campo
        .clear()
        //Escreve acerto com um objeto de delay de 100 Milisegundos
        .type('Erro{selectall}acerto', { delay:100 })
        .should('have.value', 'acerto')
    })


    it('Radio Button', () => {
        cy.get('#formSexoFem').click()
        .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        //[] Usado para fazer busca de alguma propriedade do elemento
        //Ex: [name='formSexo']
        //Assertiva para garantir que exista 2 Radios Button
        cy.get("[name=formSexo]").should('have.length', 2)
    })


    it('CheckBox', () => {
        cy.get('#formComidaPizza')
        .click()
        .should('be.checked')

        //Utiliza o objeto multiple:true para clicar em vários elementos
        cy.get('[name=formComidaFavorita]').click({ multiple:true })
        
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })


    it('ComboBox', () => {
        cy.get('[data-test="dataEscolaridade"]')
        .select('Superior')
        //O have.value verifica o valor do value e não o nome visivel
        .should('have.value', 'superior')

        //Validando as opções do COMBO
        //Verificando a quantidade de elementos do COMBO
        cy.get('[data-test="dataEscolaridade"] option')
        .should('have.length', 8)
        //Verificando os elementos da Lista
        cy.get('[data-test="dataEscolaridade"] option')
        .then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            //Procurando apenas dois elementos
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('ComBoxMultiplo', () => {
        //Combo multiplo os valores do array precisam ser iguais ao do value
        cy.get('[data-testid="dataEsportes"]')
        .select(['natacao', 'Corrida', 'nada'])

        //Validando as opções selecionados no ComboBoxMultiplo
        //Forma simples de verificar
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        //Fazendo busca atraves do Invoke
        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])
    })
})