// cypress/e2e/login.cy.js
Cypress.config('defaultCommandTimeout', 12000);

describe('SauceDemo Full E2E Suite', () => {
  const url = 'https://www.saucedemo.com/';

  const login = (username, password) => {
    cy.get('#user-name').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('#login-button').click();
    cy.url().should('include', 'inventory.html');
  };

  beforeEach(() => {
    cy.visit(url);
    cy.wait(500);
  });

  // ───────────── 로그인 관련 테스트 ─────────────
  it('로그인 성공', () => {
    login('standard_user', 'secret_sauce');
  });

  it('로그인 실패 - 잘못된 비밀번호', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('wrong_password');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain.text', 'do not match');
  });

  it('로그인 실패 - 사용자 없음', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain.text', 'Sorry');
  });

  it('로그인 실패 - 비밀번호 누락', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain.text', 'Password is required');
  });

  it('로그인 실패 - 사용자명 누락', () => {
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
  });

  // ───────────── 로그인 후 시나리오 ─────────────
  context('로그인 후 전체 기능 흐름', () => {
    beforeEach(() => {
      cy.visit(url);
      login('standard_user', 'secret_sauce');
    });

    it('상품 리스트 로드 확인', () => {
      cy.get('.inventory_item').should('have.length.at.least', 6);
    });

    it('상품 클릭 시 상세 페이지 이동 및 확인', () => {
      cy.get('.inventory_item_name').first().click();
      cy.url().should('include', 'inventory-item');
      cy.get('.inventory_details_name').should('exist');
      cy.get('#back-to-products').click();
    });

    it('상품 추가 및 장바구니 아이콘 업데이트', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });

    it('장바구니 이동 및 상품 확인', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', 'cart.html');
      cy.get('.cart_item').should('have.length', 1);
    });

    it('상품 제거 기능', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_button').click();
      cy.get('.cart_item').should('not.exist');
    });

    it('상품 정렬 기능 확인', () => {
      cy.get('.product_sort_container').select('hilo');
      cy.get('.product_sort_container').select('az');
    });

    it('햄버거 메뉴 열기 확인', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('.bm-item.menu-item').should('be.visible');
    });

    it('About 페이지 이동 (cross-origin 허용)', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#about_sidebar_link').click();

      // 🚀 Cross-origin 에러 무시 + 복귀
      cy.on('uncaught:exception', (err) => {
        console.warn('Ignoring expected cross-origin error:', err.message);
        return false;
      });

      cy.origin('https://saucelabs.com', () => {
        cy.url().should('include', 'saucelabs.com');
      });

      // ✅ 다시 saucedemo로 복귀
      cy.visit('https://www.saucedemo.com/inventory.html');
    });

    it('로그아웃 기능 확인', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('include', 'saucedemo.com');
    });

    it('결제 프로세스 전체 확인', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
      cy.get('.complete-header').should('contain.text', 'Thank you');
      cy.get('[data-test="back-to-products"]').click();
    });
  });
});
