<script lang="ts">
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { BreadcrumbVariants, breadcrumb } from "./breadcrumb-root.svelte";

	interface BreadcrumbContext {
		size: BreadcrumbVariants["size"];
		variant: BreadcrumbVariants["variant"];
		separator: Snippet | string;
		styles: ReturnType<typeof breadcrumb>;
	}

	interface Props {
		/**
		 * The menu content (MenuRoot with MenuButton, MenuContent, etc.).
		 */
		children: Snippet;
		/**
		 * Whether to show the separator after this menu.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, showSeparator = true, class: className }: Props = $props();

	const context = getContext<BreadcrumbContext>("breadcrumb");
	const styles = $derived(context?.styles);
</script>

<li class={styles?.item({ class: className })}>
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
