const Environment = require("jest-environment-jsdom");

/**
 * A custom environment to set the TextEncoder and decoder that is required by the MSW mock server
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === "undefined") {
      const { TextEncoder } = require("util");
      this.global.TextEncoder = TextEncoder;
    }
    if (typeof this.global.TextDecoder === "undefined") {
      const { TextDecoder } = require("util");
      this.global.TextDecoder = TextDecoder;
    }
  }
};
