/// <reference types="cypress" />

describe('devfinance', () => {
    it('Adicionar nova transação de entrada', () => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');

        // get & contains - Aula
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('Freela')
        cy.get('#amount').type(12)
        cy.get('#date').type('2021-11-03')
        cy.contains('button', 'Salvar').click()

        // Assert
        cy.get('table tbody tr').should('have.length', 1)

        // Remover Freela
        cy.get('img[onclick*=remove]').click()

        // Adicionar Saida
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('1L Gasolina')
        cy.get('#amount').type('-10')
        cy.get('#date').type('2021-11-03')
        cy.contains('button', 'Salvar').click()

        // Assert IF Saida is correct
        cy.get('table tbody tr').within(() => {
            cy.get('td').eq(0).should('have.text', '1L Gasolina')
            cy.get('td').eq(1).should('have.html', '-R$&nbsp;10,00')
            cy.get('td').eq(2).should('have.text', '03/11/2021')
        })

        // Assert calculo de valor 
        cy.get('a[onclick*=open]').click()
        cy.get('#description').type('Freela')
        cy.get('#amount').type(120)
        cy.get('#date').type('2021-11-03')
        cy.contains('button', 'Salvar').click()

        // Verificar se valor = 110
        cy.get('#totalDisplay').should('have.html', 'R$&nbsp;110,00')

        // Remover Freela
        cy.get('img[onclick*=remove]').eq(1).click()

        // Verificar se valor = -10
        cy.get('#totalDisplay').should('have.html', '-R$&nbsp;10,00')


    });
});