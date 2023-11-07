describe('Segundo teste end-to-end', () => {
    it('Cadastra uma resposta e verifica se ela é listada', () => {
      cy.visit('localhost:3000/resposta/1');
      
      cy.get('#textarea-resposta').type('6');
      cy.get('#btn-resposta').click();
      cy.get('#tabela-respostas').contains('6');
      
    });
  });
