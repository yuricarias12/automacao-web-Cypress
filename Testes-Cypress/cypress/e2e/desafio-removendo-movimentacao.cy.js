/// <reference types="cypress" />

import loc from '../support/locators'
import '../support/commandsConta'

describe('Deve testar o nível funcional', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.login('yuri12@hotmail.com', 2123, '.btn')
        //cy.resetApp()
    })

    it.only('Removendo Movimentacao', () => {
        cy.get(loc.MENU.EXTRATO).click()

        cy.xpath(loc.EXTRATO.FN_XP_DELETAR_ELEMENTO('Movimentacao de conta', '1.500,00', 'far fa-trash-alt')).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação removida com sucesso!')
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Movimentacao de conta', '35.500,00')).should('not.exist')
    })
})