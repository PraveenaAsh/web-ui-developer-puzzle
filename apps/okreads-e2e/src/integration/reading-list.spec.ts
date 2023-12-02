describe('When: I use the reading list feature', () => {
  let readingItemsCount = 0;
  beforeEach(() => {
    cy.startAt('/');
    readingItemsCount = cy.$$('[data-testing="reading-list-item"]').length;
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add book and undo added book', () => {

    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    cy.get('[data-testing="add-to-reading-list-button"]:enabled').first().click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount + 1);

    cy.get('.mat-simple-snackbar-action button').click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount);

  });

  it('Then: I should be able to remove book and undo removed book', () => {
    cy.get('input[type="search"]').type('angular');

    cy.get('form').submit();

    cy.get('[data-testing="add-to-reading-list-button"]:enabled').first().click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount + 1);

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="remove-from-reading-list-button"]:enabled').first().click();

    cy.get('[data-testing="close-reading-list"]').click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount);

    //undo remove from reading list
    cy.get('.mat-simple-snackbar-action button').click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount + 1);
  });
});
