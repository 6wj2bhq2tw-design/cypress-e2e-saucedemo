const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: true, // ✅ 비디오 녹화 켜기
    screenshotOnRunFailure: true, // ✅ 실패 시 스크린샷 찍기
  },
  videoCompression: 32, // 용량 최적화
  videosFolder: "cypress/videos", // 기본 위치
  screenshotsFolder: "cypress/screenshots", // 기본 위치
});
