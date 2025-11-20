import type { StorybookConfig } from "@storybook/sveltekit";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
    addons: [
        "@storybook/addon-links",
        {
            name: "@storybook/addon-essentials",
            options: {
                outline: false,
            },
        },
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-svelte-csf",
            options: {
                legacyTemplate: true,
            },
        },
        "storybook-dark-mode",
    ],
    framework: {
        name: "@storybook/sveltekit",
        options: {},
    },
    viteFinal: async (config) => {
        return mergeConfig(config, {
            server: {
                fs: {
                    allow: [".."],
                },
            },
        });
    },
};

export default config;