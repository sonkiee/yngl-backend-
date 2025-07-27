import { UAParser } from "ua-parser-js";

export const ua = (ua) => {
  const result = UAParser(ua);

  return {
    os: result.os, // { name: "iOS", version: "16.5" }
    device: result.device, // { model: "iPhone", type: "mobile", vendor: "Apple" }
    browser: result.browser, // { name: "Safari", version: "16.5" }
  };
};
