require("dotenv").config();

module.exports = {
  projectId: "ghost-e2e",
  e2e: {
    setupNodeEvents(on, config) {
      config.env.emailTest1 = process.env.CYPRESS_EMAIL_TEST1;
      config.env.passwordTest1 = process.env.CYPRESS_PASSWORD_TEST1;

      config.env.emailTest2 = process.env.CYPRESS_EMAIL_TEST2;
      config.env.passwordTest2 = process.env.CYPRESS_PASSWORD_TEST2;

      config.env.emailTest3 = process.env.CYPRESS_EMAIL_TEST3;
      config.env.passwordTest3= process.env.CYPRESS_PASSWORD_TEST3;

      config.env.emailTest4 = process.env.CYPRESS_EMAIL_TEST4;
      config.env.passwordTest4 = process.env.CYPRESS_PASSWORD_TEST4;

      config.env.ghostRcVersionPort = process.env.GHOST_RC_VERSION_PORT;
      config.env.ghostBaseVersionPort = process.env.GHOST_BASE_VERSION_PORT;

      config.env.ghostRcVersion = process.env.GHOST_RC_VERSION;
      config.env.ghostBaseVersion = process.env.GHOST_BASE_VERSION;

      return config;
    },
  },
  video: true,
};
