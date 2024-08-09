/// <reference types="cypress" />

const dayjs = require('dayjs')



describe('Deve testar o nível funcional', () => {
    //Token deve é uma propriedade que deve ser guardada
    //let token
    beforeEach(() => {
        cy.getToken('yuri12@hotmail.com', '2123')
            // .then(tkn => {
            //     token = tkn
            // })

        cy.resetRest()
    })

    it('Inserindo Conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //Passa o token do usuário
            //headers: { Authorization: `JWT ${token}` },
            //Corpo com o nome da conta que será criada
            body: {
                nome: 'Conta via rest'
            }
            //Nomeando o cy.request acima que está inserindo uma conta 
        }).as('response')


        //Este get espera até que a requisição seja concluída
        cy.get('@response').then(resposta => {
            //Verifica se o status code é 201
            expect(resposta.status).to.be.equal(201)
            //Verifica apenas se retornou algum ID pois o ID é unico e será diferente para cada conta criada
            expect(resposta.body).to.have.property('id')
            //Verifico o nome da conta criada
            expect(resposta.body).to.have.property('nome', 'Conta via rest')
        })
    })



    it('Alterando Conta', () => {
        //Primeiro faço uma requisição GET para escolher qual a conta será alterada
        cy.getContaByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    //Resposta no primeiro elemento do body na propeiedade ID eu tenho o ID da conta que eu quero alterar
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 200)
    })


    it('Inserindo Conta Repetida', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //Passa o token do usuário
            //headers: { Authorization: `JWT ${token}` },
            //Corpo com o nome da conta que será criada
            body: {
                nome: 'Conta mesmo nome'
            },
            //Quando o cypress ver um status code de falha 400, 500 ou outros, ele não falha o teste, deixa o teste seguir
            failOnStatusCode: false
            //Nomeando o cy.request acima que está inserindo uma conta 
        }).as('response')


        //Este get espera até que a requisição seja concluída
        cy.get('@response').then(resposta => {
            console.log(resposta)
            //Verifica se o status code é 201
            expect(resposta.status).to.be.equal(400)
            //Verifica apenas se retornou algum ID pois o ID é unico e será diferente para cada conta criada
            //expect(resposta.body).to.have.property('id')
            //Verifico o nome da conta criada
            expect(resposta.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it('Inserir Movimentacao', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    //Passa o token do usuário
                    //headers: { Authorization: `JWT ${token}` },
                    //Corpo com o nome da conta que será criada
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: "Desc",
                        envolvido: "Inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                }).as('response')

            })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Calculo de Saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        //Buscando o ID da conta que realizou a alteração no saldo
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: { Authorization: `JWT ${token}` },
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {

            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('Removendo Movimentacao', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: { Authorization: `JWT ${token}` },
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
    })
})





