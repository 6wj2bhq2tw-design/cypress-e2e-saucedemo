# Cypress E2E 자동화 테스트 – SauceDemo

## 프로젝트 개요  
이 프로젝트는 [SauceDemo](https://www.saucedemo.com/) 사이트를 대상으로 한 **엔드투엔드(E2E) 자동화 테스트**입니다.  
Cypress를 이용해 주요 사용자 시나리오를 자동으로 검증하고, GitHub Actions를 통해 코드가 변경될 때마다 테스트가 자동 실행되도록 설정했습니다.  

---

## 목표 및 결과  
| 목표 | 결과 |
|------|------|
| Cypress로 E2E 테스트 구축 | 주요 사용자 흐름 자동화 완료 |
| GitHub Actions로 CI 구성 | push 시 자동 테스트 실행 |
| 테스트 안정성 확인 | 모든 테스트 통과 (15/15) |

---

## 사용 기술  
| 구분 | 내용 |
|------|------|
| 테스트 프레임워크 | Cypress|
| CI/CD | GitHub Actions |
| 언어 | JavaScript (Node.js 20) |
| 브라우저 | Chrome|

---

## 주요 테스트 시나리오  

### 로그인  
- 정상 로그인 시 메인 페이지 진입 확인  
- 잘못된 비밀번호, 없는 사용자, 입력 누락 등 예외 케이스 처리  

### 상품 및 장바구니  
- 상품 목록 로드 및 상세 페이지 이동 확인  
- 장바구니 담기/삭제 기능 검증  
- 상품 정렬 (이름순, 가격순) 테스트  

### 메뉴 및 로그아웃  
- 햄버거 메뉴 클릭 시 각 메뉴 정상 이동  
- 외부 링크(`About` 페이지) cross-origin 허용  
- 로그아웃 기능 확인  

### 결제 플로우  
- 상품 선택 → 장바구니 → 결제 폼 입력 → 주문 완료까지 전체 플로우 자동화  

---

## 테스트 자동화 결과  

GitHub Actions를 통해 **main 브랜치에 코드가 푸시될 때마다 Cypress 테스트가 자동으로 실행**됩니다.  
테스트는 실제 Chrome(headless 모드) 환경에서 돌아가며,  
**로그 / 스크린샷 / 테스트 영상**이 자동으로 저장됩니다.

- 자동 실행: main 브랜치 push 시  
- 결과: 모든 테스트 통과  
- 기록: 로그, 스크린샷, 비디오 자동 생성  


### 📸 테스트 실행 예시

| 구분 | 이미지 |
|------|--------|
| **Cypress 실행 화면** | ![Cypress 실행 화면](https://github.com/6wj2bhq2tw-design/cypress-e2e-saucedemo/blob/main/assets/cypress-run.png?raw=true) |
| **GitHub Actions 로그 화면** | ![GitHub Actions 로그 화면](https://github.com/6wj2bhq2tw-design/cypress-e2e-saucedemo/blob/main/assets/github-actions-log.png?raw=true) |

> 테스트 실행 결과는 `cypress/videos/` 및 `cypress/screenshots/` 폴더에 자동으로 저장됩니다.
