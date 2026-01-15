<script lang="ts">
	import { getLocaleContext } from "$saas/utilities/locale-provider";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const context = getLocaleContext();
	const displayData = $derived({
		locale: context?.locale || "en-US",
		dir: context?.dir || "ltr",
	});
</script>

<div class="flex flex-col gap-(--spacing-2)">
	<pre class="rounded bg-(--color-bg-subtle) p-(--spacing-4) text-(length:--font-sizes-sm) leading-(--line-heights-sm) font-mono">{JSON.stringify(
			displayData,
			null,
			2,
		)}</pre>
	{#if children}
		{@render children()}
	{/if}
</div>
