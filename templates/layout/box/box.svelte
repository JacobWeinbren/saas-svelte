<script module lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Component } from "svelte";
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div'">
	import type { Snippet } from "svelte";

	type Props = HTMLAttributes<HTMLElementTagNameMap[T]> & {
		/**
		 * The HTML element to render.
		 * @default "div"
		 */
		as?: T | Component;
		children?: Snippet;
	};

	let {
		as = "div" as T,
		children,
		...restProps
	}: Props = $props();
</script>

<svelte:element this={as} {...restProps}>
	{@render children?.()}
</svelte:element>
