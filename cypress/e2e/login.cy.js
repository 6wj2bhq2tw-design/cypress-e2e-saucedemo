describe('SauceDemo Login E2E Test', () => {
  const url = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(url);
  });

  it('로그인 성공', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', 'inventory');
  });

  it('로그인 실패 - 비밀번호 오류', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_password');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]')
      .should('contain.text', 'Username and password do not match');
  });
});
