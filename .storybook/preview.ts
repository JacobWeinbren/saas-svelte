import type { Preview } from "@storybook/svelte";
import { themes } from "@storybook/theming";
import "../src/app.css";

const preview: Preview = {
    parameters: {
        backgrounds: {
            disable: true,
        },
        darkMode: {
            current: 'light',
            classTarget: 'html',
            darkClass: 'dark',
            lightClass: 'light',
            stylePreview: true,
            dark: {
                ...themes.dark,
            },
            light: {
                ...themes.normal,
            }
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

if (typeof window !== "undefined") {
    // Added optional chaining and checks to prevent SSR errors
    const docHtml = document.documentElement;
    let isDark = docHtml.classList.contains('dark');

    const observer = new MutationObserver(() => {
        const currentlyDark = docHtml.classList.contains('dark');

        if (currentlyDark !== isDark) {
            isDark = currentlyDark;

            docHtml.classList.add("no-transitions");

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    docHtml.classList.remove("no-transitions");
                });
            });
        }
    });

    observer.observe(docHtml, {
        attributes: true,
        attributeFilter: ["class"],
    });
}

export default preview;