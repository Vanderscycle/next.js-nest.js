import { defineConfig } from "cypress";

export default defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1800,
  e2e: {
    setupNodeEvents(on, config) {
      config.excludeSpecPattern = "**/2-advanced-examples/*.{cy,spec}.js";
      return config 
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
