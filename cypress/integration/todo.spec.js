/// <reference types="cypress" />

context('To-Do App', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('should show an empty list on initial render', () => {
    cy
      .get('[data-testid=todoList]')
      .should('be.empty')
  })

  it('should add todo item', () => {
    cy
      .get('[data-testid=todoInput]')
      .type('buy merch{enter}')

    cy
      .get('[data-testid=todoInput]')
      .type('get some gadgets{enter}')

    cy
      .get('[data-testid=todoItem]')
      .should('have.length', 2)

    cy
      .get('[data-testid=todoItem] [data-testid=todoText]')
      .first()
      .should('have.text', 'buy merch')

    cy
      .get('[data-testid=todoItem] [data-testid=todoText]')
      .last()
      .should('have.text', 'get some gadgets')
  })

  it('should remove todo items', () => {
    // Ensure length
    cy
      .get('[data-testid=todoItem]')
      .should('have.length', 2)

    cy
      .get('[data-testid=todoItem] [data-testid=removeBtn]')
      .click({ multiple: true })

    cy
      .get('[data-testid=todoList]')
      .should('be.empty')
  })
})
