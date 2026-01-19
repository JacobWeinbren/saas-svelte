<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { BreadcrumbVariants, breadcrumb } from "./breadcrumb-root.svelte";

	interface BreadcrumbContext {
		size: BreadcrumbVariants["size"];
		variant: BreadcrumbVariants["variant"];
		separator: Snippet | string;
		styles: ReturnType<typeof breadcrumb>;
	}

	interface Props extends HTMLAttributes<HTMLLIElement> {
		/**
		 * The breadcrumb item content.
		 */
		children: Snippet;
		/**
		 * Whether to show the separator after this item.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		showSeparator = true,
		class: className,
		...restProps
	}: Props = $props();

	const context = getContext<BreadcrumbContext>("breadcrumb");
	const styles = $derived(context?.styles);
</script>

<li class={styles?.item({ class: className })} {...restProps}>
	{@render children()}
</li>

{#if showSeparator}
	<li aria-hidden="true" class={styles?.separator()}>
		{#if typeof context?.separator === "string"}
			{context.separator}
		{:else if context?.separator}
			{@render context.separator()}
		{:else}
			/
		{/if}
	</li>
{/if}
