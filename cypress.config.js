const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    screenshotOnRunFailure: true, // 실패 시 스크린샷 저장
    video: true, // 테스트 실행 시 자동 녹화
  },
});
