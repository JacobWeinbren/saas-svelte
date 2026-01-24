// vite.config.js
import { sveltekit } from "file:///Users/jacobweinbren/Desktop/saas-svelte/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///Users/jacobweinbren/Desktop/saas-svelte/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///Users/jacobweinbren/Desktop/saas-svelte/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "file:///Users/jacobweinbren/Desktop/saas-svelte/node_modules/@storybook/addon-vitest/dist/vitest-plugin/index.js";
import { playwright } from "file:///Users/jacobweinbren/Desktop/saas-svelte/node_modules/@vitest/browser-playwright/dist/index.js";
var __vite_injected_original_dirname = "/Users/jacobweinbren/Desktop/saas-svelte";
var __vite_injected_original_import_meta_url = "file:///Users/jacobweinbren/Desktop/saas-svelte/vite.config.js";
var dirname = typeof __vite_injected_original_dirname !== "undefined" ? __vite_injected_original_dirname : path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    fs: {
      allow: ["."]
    }
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook")
          })
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium"
              }
            ]
          },
          setupFiles: [".storybook/vitest.setup.ts"]
        }
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFjb2J3ZWluYnJlbi9EZXNrdG9wL3NhYXMtc3ZlbHRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamFjb2J3ZWluYnJlbi9EZXNrdG9wL3NhYXMtc3ZlbHRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYWNvYndlaW5icmVuL0Rlc2t0b3Avc2Fhcy1zdmVsdGUvdml0ZS5jb25maWcuanNcIjsvLyBAdHMtbm9jaGVja1xuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSBcIkBzdmVsdGVqcy9raXQvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IHN0b3J5Ym9va1Rlc3QgfSBmcm9tIFwiQHN0b3J5Ym9vay9hZGRvbi12aXRlc3Qvdml0ZXN0LXBsdWdpblwiO1xuaW1wb3J0IHsgcGxheXdyaWdodCB9IGZyb20gXCJAdml0ZXN0L2Jyb3dzZXItcGxheXdyaWdodFwiO1xuY29uc3QgZGlybmFtZSA9XG5cdHR5cGVvZiBfX2Rpcm5hbWUgIT09IFwidW5kZWZpbmVkXCJcblx0XHQ/IF9fZGlybmFtZVxuXHRcdDogcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbi8vIE1vcmUgaW5mbyBhdDogaHR0cHM6Ly9zdG9yeWJvb2suanMub3JnL2RvY3MvbmV4dC93cml0aW5nLXRlc3RzL2ludGVncmF0aW9ucy92aXRlc3QtYWRkb25cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFt0YWlsd2luZGNzcygpLCBzdmVsdGVraXQoKV0sXG5cdHNlcnZlcjoge1xuXHRcdGZzOiB7XG5cdFx0XHRhbGxvdzogW1wiLlwiXSxcblx0XHR9LFxuXHR9LFxuXHR0ZXN0OiB7XG5cdFx0cHJvamVjdHM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXh0ZW5kczogdHJ1ZSxcblx0XHRcdFx0cGx1Z2luczogW1xuXHRcdFx0XHRcdC8vIFRoZSBwbHVnaW4gd2lsbCBydW4gdGVzdHMgZm9yIHRoZSBzdG9yaWVzIGRlZmluZWQgaW4geW91ciBTdG9yeWJvb2sgY29uZmlnXG5cdFx0XHRcdFx0Ly8gU2VlIG9wdGlvbnMgYXQ6IGh0dHBzOi8vc3Rvcnlib29rLmpzLm9yZy9kb2NzL25leHQvd3JpdGluZy10ZXN0cy9pbnRlZ3JhdGlvbnMvdml0ZXN0LWFkZG9uI3N0b3J5Ym9va3Rlc3Rcblx0XHRcdFx0XHRzdG9yeWJvb2tUZXN0KHtcblx0XHRcdFx0XHRcdGNvbmZpZ0RpcjogcGF0aC5qb2luKGRpcm5hbWUsIFwiLnN0b3J5Ym9va1wiKSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XSxcblx0XHRcdFx0dGVzdDoge1xuXHRcdFx0XHRcdG5hbWU6IFwic3Rvcnlib29rXCIsXG5cdFx0XHRcdFx0YnJvd3Nlcjoge1xuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdGhlYWRsZXNzOiB0cnVlLFxuXHRcdFx0XHRcdFx0cHJvdmlkZXI6IHBsYXl3cmlnaHQoe30pLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VzOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRicm93c2VyOiBcImNocm9taXVtXCIsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0dXBGaWxlczogW1wiLnN0b3J5Ym9vay92aXRlc3Quc2V0dXAudHNcIl0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxrQkFBa0I7QUFQM0IsSUFBTSxtQ0FBbUM7QUFBK0ksSUFBTSwyQ0FBMkM7QUFRek8sSUFBTSxVQUNMLE9BQU8scUNBQWMsY0FDbEIsbUNBQ0EsS0FBSyxRQUFRLGNBQWMsd0NBQWUsQ0FBQztBQUcvQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQ3BDLFFBQVE7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNILE9BQU8sQ0FBQyxHQUFHO0FBQUEsSUFDWjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNUO0FBQUEsUUFDQyxTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUE7QUFBQTtBQUFBLFVBR1IsY0FBYztBQUFBLFlBQ2IsV0FBVyxLQUFLLEtBQUssU0FBUyxZQUFZO0FBQUEsVUFDM0MsQ0FBQztBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNMLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxZQUNSLFNBQVM7QUFBQSxZQUNULFVBQVU7QUFBQSxZQUNWLFVBQVUsV0FBVyxDQUFDLENBQUM7QUFBQSxZQUN2QixXQUFXO0FBQUEsY0FDVjtBQUFBLGdCQUNDLFNBQVM7QUFBQSxjQUNWO0FBQUEsWUFDRDtBQUFBLFVBQ0Q7QUFBQSxVQUNBLFlBQVksQ0FBQyw0QkFBNEI7QUFBQSxRQUMxQztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
