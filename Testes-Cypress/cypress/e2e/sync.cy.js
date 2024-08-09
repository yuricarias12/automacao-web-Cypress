/// <reference types="cypress" />

describe('Esperas Cypress', () => {

    //Utilizando Hooks para que todos os testes do grupo garanta o comportamento de visitar o site especificado.
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })


    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Testando')
    })


    it('Deve fazer Retrys', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        .should('exist')
        .type('Funciona')
        
    })


    it('Uso do Find', () => {
        //Evitar usar o find onde os elementos da tela vão se montando com  o tempo, 
        //ele pode ficar preso em algun ponto do carregamento o que ocasionara em erro 
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')

        cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 2')
    })


    it('Uso do TimeOut', () => {
        //cy.get('#buttonDelay').click()
        //Adicionando uma restrição, um timeout de 1 segundo
        //cy.get('#novoCampo', { timeout: 1000 }).should('exist')
        
        cy.get('#buttonListDOM').click()
        //Usado para parar o script por determinado tempo
        //Evitar o wait pois é tempo fixo,vai parar independente se o teste for rápido ou lento
        //cy.wait(5000)
        
        //Espera até que a condição do should se satisfaça ou até chegar no tempo limmite do timeout
        //Utilizar desta forma para fazer duas assertivas
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    
    })


    it('Click Retry', () => {
        //Utilizando dois click pois mesmo com a retentativa ele não conseguiria chegar no resultado 111
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111')
    })


    it.only('Should vs Then', () => {
        
        //$el Elemento JQuery, não pode ser manipulado por should
        cy.get('#buttonListDOM').then($el => {
            //Chega/Espera se o elemento tem tamanho de 1
            // .should('have.length', 1)
            //console.log($el)
            expect($el).to.have.length(1)
            //Com o Should funciona normalmente, porque ele IGNORA o que está dentro do return, ao final do Should ele sempre retorna o mesmo objeto que ele recebeu no caso $el
            //No Then se não retornar nada sai o mesmo objeto, colocando o RETURN no Then pode-se fazer alguma outra coisa a patir do return
            cy.get('#buttonList')

            //Diferença entre Should e Then
            //O Then ele aguardou cy.get('#lista li span') finalizar para então ser executado
            //Com Should ele fez a busca e já ficou fazendo a verificação
            //- Se quiser retornar um valor diferente para a assertiva seguinte, seria o then
            //- Se quiser fazer um novo cy.get() dentro do bloco, teria que ser o then tb
        })  
    })
})

//Valores Assíncronos
//Valores assíncronos são valores que serão fornecidos no futuro, após a conclusão de uma operação assíncrona. 
//Isso é comum em operações como requisições a servidores, leitura de arquivos, timers e outras tarefas que não podem ser concluídas instantaneamente.

//Exemplo de Valores Assíncronos
//Operações como chamadas de API são exemplos típicos de valores assíncronos. Por exemplo, ao buscar dados de um servidor:

//Diferenças entre Código Síncrono e Assíncrono
//Código Síncrono: As instruções são executadas de forma sequencial, uma após a outra. Cada instrução espera que a anterior seja concluída.

//Código Assíncrono: As instruções podem ser iniciadas e continuar a execução enquanto outras operações ainda estão em andamento. 
//Isso permite que tarefas demoradas não bloqueiem a execução do restante do código.

//Resumo
//Valores assíncronos são valores obtidos de operações que não são concluídas imediatamente, como chamadas de API.
//Código assíncrono permite que tarefas demoradas não bloqueiem a execução do restante do código.
//async/await proporciona uma maneira mais legível de trabalhar com Promises.