// 느리게 실행 설정 (모든 명령 대기시간 + 기본 타임아웃)
Cypress.config('defaultCommandTimeout', 10000);

describe('SauceDemo Full E2E Suite', () => {
  const url = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(url);
    cy.wait(500); // 로딩 대기
  });

  const login = (username, password) => {
    cy.get('#user-name').type(username, { delay: 100 });
    cy.get('#password').type(password, { delay: 100 });
    cy.get('#login-button').click();
    cy.wait(700);
  };

  it('로그인 성공', () => {
    login('standard_user', 'secret_sauce');
    cy.url().should('include', 'inventory');
  });

  it('로그인 실패 - 잘못된 비밀번호', () => {
    login('standard_user', 'wrong_password');
    cy.get('[data-test="error"]').should('contain.text', 'do not match');
  });

  it('로그인 실패 - 사용자 없음', () => {
    login('locked_out_user', 'secret_sauce');
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

  // 로그인 후 테스트 시작
  context('로그인 후 기능 테스트', () => {
    beforeEach(() => {
      login('standard_user', 'secret_sauce');
      cy.url().should('include', 'inventory');
    });

    it('상품 리스트 로드 확인', () => {
      cy.get('.inventory_item').should('have.length.at.least', 6);
    });

    it('상품 클릭 시 상세 페이지 이동', () => {
      cy.get('.inventory_item').first().find('.inventory_item_name').click();
      cy.url().should('include', 'inventory-item');
      cy.get('.inventory_details_name').should('exist');
    });

    it('뒤로 가기 버튼 정상 동작', () => {
      cy.get('.inventory_item').first().find('.inventory_item_name').click();
      cy.get('#back-to-products').click();
      cy.url().should('include', 'inventory');
    });

    it('상품 추가 및 장바구니 아이콘 업데이트', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_badge').should('contain.text', '1');
    });

    it('장바구니 이동 및 상품 확인', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', 'cart');
      cy.get('.cart_item').should('have.length', 1);
    });

    it('상품 제거 기능', () => {
      cy.get('.btn_inventory').first().click();
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_button').click();
      cy.get('.cart_item').should('have.length', 0);
    });

    it('상품 정렬 (이름 A-Z)', () => {
      cy.get('.product_sort_container').select('az');
    });

    it('상품 정렬 (가격 낮은 순)', () => {
      cy.get('.product_sort_container').select('lohi');
    });

    it('상품 정렬 (가격 높은 순)', () => {
      cy.get('.product_sort_container').select('hilo');
    });

    it('햄버거 메뉴 열기', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('.bm-item.menu-item').should('be.visible');
    });

    it('About 페이지 이동', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.contains('About').click();
      cy.url().should('include', 'saucelabs.com');
    });

    it('로그아웃 기능 확인', () => {
      cy.visit('https://www.saucedemo.com/inventory.html');
      cy.get('#react-burger-menu-btn').click();
      cy.contains('Logout').click();
      cy.url().should('include', 'saucedemo.com');
    });

    // … 이 아래에 checkout 관련 테스트, 정보 입력, 주문 완료까지 이어서 총 30개 가능
  });
});
