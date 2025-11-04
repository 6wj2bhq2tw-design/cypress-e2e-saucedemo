# 🧪 Cypress E2E Automation – SauceDemo Test Suite

## 📘 프로젝트 개요
이 프로젝트는 [SauceDemo](https://www.saucedemo.com/) 웹사이트를 대상으로 한 **엔드투엔드(E2E) 자동화 테스트 프로젝트**입니다.  
Cypress를 사용하여 사용자 주요 시나리오를 자동화하고, **GitHub Actions를 통한 CI/CD 파이프라인**을 구축하여  
테스트가 코드 변경 시마다 자동으로 실행되도록 구현했습니다.

---

## 🎯 목표 및 성과
| 목표 | 결과 |
|------|------|
| Cypress를 통한 E2E 테스트 구축 | ✅ 주요 사용자 흐름 전부 자동화 성공 |
| GitHub Actions를 이용한 CI 구성 | ✅ push 시 자동으로 테스트 실행 |
| 테스트 안정성 확보 | ✅ All Tests Passed (15/15) |

---

## ⚙️ 기술 스택
| 구분 | 사용 기술 |
|------|------------|
| **E2E Framework** | Cypress 15.5.0 |
| **CI/CD** | GitHub Actions |
| **Language** | JavaScript (Node.js 20) |
| **Test Browser** | Chrome (headless) |

---

## 🧩 주요 테스트 시나리오

### 🔐 로그인 및 인증
- 로그인 성공 시 대시보드 진입 확인  
- 잘못된 비밀번호, 사용자 없음, 입력 누락 등 실패 케이스 검증  

### 🛒 상품 및 장바구니 기능
- 상품 목록 로드 및 개별 상품 상세 확인  
- 상품 추가/삭제 후 장바구니 반영 확인  
- 정렬 기능 (이름순, 가격순) 정상 동작 확인  

### 🧭 내비게이션 및 로그아웃
- 햄버거 메뉴 동작 및 각 메뉴 이동 검증  
- `About` 페이지(외부 링크) cross-origin 허용 처리  
- 로그아웃 기능 정상 작동 확인  

### 💳 결제 플로우
- 상품 선택 → 장바구니 → 결제 폼 입력 → 주문 완료까지 전체 프로세스 자동화

---

## 🧪 테스트 결과

이 프로젝트는 GitHub Actions를 이용해 **코드가 main 브랜치로 푸시될 때마다 자동으로 Cypress 테스트가 실행**됩니다.  
테스트는 실제 브라우저(Chrome, headless 모드)에서 동작하며,  
**로그, 스크린샷, 테스트 영상**이 자동으로 저장되도록 설정했습니다.

✅ **자동 실행:** main 브랜치에 코드 푸시 시  
✅ **결과:** 모든 테스트 통과 (All Pass)  
✅ **기록:** 테스트 로그, 스크린샷, 비디오 자동 생성  

---

### 📸 테스트 실행 예시

| 구분 | 이미지 |
|------|--------|
| **Cypress 실행 화면** | ![Cypress 실행 화면](https://github.com/6wj2bhq2tw-design/cypress-e2e-saucedemo/blob/main/assets/cypress-run.png?raw=true) |
| **GitHub Actions 로그 화면** | ![GitHub Actions 로그 화면](https://github.com/6wj2bhq2tw-design/cypress-e2e-saucedemo/blob/main/assets/github-actions-log.png?raw=true) |

> 테스트 실행 결과는 `cypress/videos/` 및 `cypress/screenshots/` 폴더에 자동으로 저장됩니다.
