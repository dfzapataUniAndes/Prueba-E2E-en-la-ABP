require("dotenv").config();

module.exports = {
  projectId: "ghost-e2e",
  e2e: {
    setupNodeEvents(on, config) {
      config.env.emailTest1 = process.env.CYPRESS_EMAIL_TEST1;
      config.env.passwordTest1 = process.env.CYPRESS_PASSWORD_TEST1;

      config.env.emailTest2 = process.env.CYPRESS_EMAIL_TEST2;
      config.env.passwordTest2 = process.env.CYPRESS_PASSWORD_TEST2;

      return config;
    },
  },
  video: true,
};
