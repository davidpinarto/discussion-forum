/**
 * Register e2e cypress
 *   - should display login page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display login page when register is successfully
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testuser');

    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email is already taken', () => {
    cy.get('input[placeholder="Name"]').type('hebat sekali');

    cy.get('input[placeholder="Email"]').type('hebatsekali3@email.com');

    cy.get('input[placeholder="Password"]').type('hebatsekali');

    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should display login page when register is successfully', () => {
    cy.get('input[placeholder="Name"]').type('sukses');

    cy.get('input[placeholder="Email"]').type(`sukses${new Date().getTime()}@email.com`);

    cy.get('input[placeholder="Password"]').type('sukses');

    cy.get('button').contains(/^Register$/).click();

    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
  });
});
