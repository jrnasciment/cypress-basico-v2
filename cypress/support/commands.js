Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Junior')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('jnascimentox@outlook.com')
    cy.get('#phone').type('992578948')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
    cy.get('select').select('Blog')
    cy.get('select').select('Cursos')
    cy.get('select').select('Mentoria')

    cy.get('.success').should('be.visible')
   
})