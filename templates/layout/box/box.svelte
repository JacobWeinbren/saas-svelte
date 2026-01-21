<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The HTML element to render.
		 * @default "div"
		 */
		as?: keyof HTMLElementTagNameMap;
		children?: Snippet;
		class?: string;
		[key: string]: unknown;
	}

	let {
		as = "div",
		children,
		...restProps
	}: Props = $props();
</script>

<svelte:element this={as} {...restProps}>
	{@render children?.()}
</svelte:element>
