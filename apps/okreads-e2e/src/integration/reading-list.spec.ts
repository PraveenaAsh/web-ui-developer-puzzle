describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
  it('Then: I should be able to mark the book as finished', () => {
    cy.get('input[type="search"]').type('net');

    cy.get('form').submit();

    cy.get('[data-testing="book-add-button"]:enabled').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="finish-read-book-btn"]:enabled').first().click();

    cy.get('[data-testing="finished-reading-date"]').first().should('contain.text', 'Finished on');

    // removing book from the list
    cy.get('[data-testing="book-remove-button"]:enabled').last().should('exist').click();

    //closing reading list
    cy.get('[data-testing="close-reading-list"]').click();
    //again add item 

    cy.get('[data-testing="book-add-button"]:enabled').first().should('exist').click();
    //open the reading list

    cy.get('[data-testing="toggle-reading-list"]').click();

    // For the same book, finish button should be visible

    cy.get('.reading-list-item').last().find('.mark-finish-circle').should('exist');
  });
});
