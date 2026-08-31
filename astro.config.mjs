import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://home.talbot.us",
  // base: '/<repository-name>',
  output: 'static',
  trailingSlash: "always",
});
