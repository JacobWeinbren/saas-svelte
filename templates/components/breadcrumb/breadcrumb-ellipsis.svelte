<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { BreadcrumbVariants, breadcrumb } from "./breadcrumb-root.svelte";
	import DotsThree from "phosphor-svelte/lib/DotsThree";

	interface BreadcrumbContext {
		size: BreadcrumbVariants["size"];
		variant: BreadcrumbVariants["variant"];
		separator: Snippet | string;
		styles: ReturnType<typeof breadcrumb>;
	}

	interface Props extends HTMLAttributes<HTMLLIElement> {
		/**
		 * Whether to show the separator after the ellipsis.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		showSeparator = true,
		class: className,
		...restProps
	}: Props = $props();

	const context = getContext<BreadcrumbContext>("breadcrumb");
	const styles = $derived(context?.styles);
</script>

<li
	role="presentation"
	aria-hidden="true"
	class={styles?.ellipsis({ class: className })}
	{...restProps}
>
	<DotsThree class="size-3.5" weight="bold" aria-hidden="true" />
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
