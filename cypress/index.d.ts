declare namespace Cypress {
  interface Chainable {
    // custom cypress commands
    InsertTokenBeforeLoad(): Chainable<number>;
  }
}