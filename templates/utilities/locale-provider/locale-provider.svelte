<script lang="ts">
	import type { Snippet } from "svelte";
	import { setLocaleContext, type LocaleContext } from "./context.svelte";

	interface Props {
		/**
		 * The locale to use for the application
		 */
		locale: string;
		/**
		 * The content to wrap
		 */
		children: Snippet;
	}

	let { locale, children }: Props = $props();

	// Determine text direction based on locale
	const rtlLocales = ["ar", "he", "fa", "ur"];
	const lang = locale.split("-")[0];
	const dir: "ltr" | "rtl" = rtlLocales.includes(lang) ? "rtl" : "ltr";

	// Set context immediately (not in an effect)
	const context: LocaleContext = {
		locale,
		dir,
	};

	setLocaleContext(context);
</script>

{@render children()}
