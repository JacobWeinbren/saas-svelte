<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import type { DataListContext } from "./types";

	interface Props {
		children: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<DataListContext>("data-list-styles");
	const styles = $derived(ctx.current);
</script>

<dd class={twMerge(styles.value(), className)} {...restProps}>
	{@render children()}
</dd>
