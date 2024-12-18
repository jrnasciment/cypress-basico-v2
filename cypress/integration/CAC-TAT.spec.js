//<reference types="Cypress" />//

//Exercicio 1
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    //Verifica se o título da aplicação está correto
    it('verifica o título da aplicação', function () { //Função de callback
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //Preencimento de todos os campos obrigatórios e exibe mensagem de sucesso
    it('Preencher os campos obrigatórios e enviar o fomulario', function () {
        const longText = 'Deus forte, poderoso!'

        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Nascimento')
        cy.get('#email').type('jnascimentox@outlook.com')
        cy.get('#open-text-area').type(longText, { delay: 3 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    //Se o formulário for enviado sem o preenchimento correto do e-mail, exige erro.
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Nascimento')
        cy.get('#email').type('jnascimentox@outlook,com')
        cy.get('#open-text-area').type('testes')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //Se no campo de preenchimento do input 'telefone' conter 'letras' ou 'caracteres' não númericos, exige erro.
    it('Se um valor não numérico for digitado, seu valor continuará vazio', function () {
        cy.get('#phone')
            .type('aaaaa')
            .should('have.value', '')
    })

    //checkbox 'telefone' marcado como obrigatorio e não preenchido
    it('Telefone não foi preenchido obrigatoriamente antes do envio do formulario', function () {
        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Nascimento')
        cy.get('#email').type('jnascimentox@outlook.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Esse teste pega o erro se o campo telefone não for digitado mesmo sendo obrigatório.')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //Comando 'Clear' limpa os campos depois do preenchimento
    it('Preenche e limpa os campos, nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Junior')
            .should('have.value', 'Junior')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Nascimento')
            .should('have.value', 'Nascimento')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('jnascimentox@outlook.com')
            .should('have.value', 'jnascimentox@outlook.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('27992578948')
            .should('have.value', '27992578948')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('exercicio de limpeza do input.')
            .should('have.value', 'exercicio de limpeza do input.')
            .clear()
            .should('have.value', '')
    })

    //Exibe mensagem de erro caso os campos obrigatórios não tenham sido preenchidos
    it('Exibe erro se sbmter o fomulário sem preencher os campos obrigatórios.', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Função automatizada
    it('Envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })

    //Pega o valor pelo texto
    it('Seleciona um produto (Youtube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    //Pega o valor pelo value
    it('Seleciona um produto (Mentoria) por seu indíce', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //Pega o valor pelo indíce
    it('Seleciona um produto (Blog) por seu indíce', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    //Marca o elemento do tipo radio selecionando a opção "Feedback"
    it('Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })
    //marca cada tipo de atendimento
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) { // Pega cada um dos elemento radios dentro de uma função de callback
                // que recebe cada um dos elementos.
                cy.wrap($radio).check() //empacotar cada um dos radios e check para selecionar cada um
                cy.wrap($radio).should('be.checked') //Verifica se todos foram realmente marcados
            })
    })

    it('Marca ambos checkboxes, depois demarca o ultimo', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Exibe msg de erro quando o tel se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        const texto = 'tessssssssssssssssssssssssssssste'
        cy.get('#firstName').type('Junior')
            .should('have.value', 'Junior')
        cy.get('#lastName').type('Nascimento')
            .should('have.value', 'Nascimento')
        cy.get('#email').type('jnascimentox@outlook.com')
            .should('have.value', 'jnascimentox@outlook.com')
        cy.get('#phone-checkbox').check()
            .should('be.checked')
        cy.get('#open-text-area').type(texto)
            .should('have.value', texto)
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    // Simula a seleção de um arquivo com o caminho completo, faz a verificação
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    // Simula a ação de arrastar um arquivo ae o campo de "selecione um arquivo", faz a verificação
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        //cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .should('not.have.value', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})

