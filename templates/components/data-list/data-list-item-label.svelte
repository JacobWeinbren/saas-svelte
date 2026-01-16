<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import type { DataListContext } from "./types";

	interface Props {
		/**
		 * The content of the data list item label.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply to the label.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<DataListContext>("data-list-styles");
	const styles = $derived(ctx.current);
</script>

<dt class={twMerge(styles.label(), className)} {...restProps}>
	{@render children()}
</dt>
