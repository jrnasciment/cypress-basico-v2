
it('Acessa a página de politica de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')

    cy.contains('Talking About Testing').should('be.visible')
})