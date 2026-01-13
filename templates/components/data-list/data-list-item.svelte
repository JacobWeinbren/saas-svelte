<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content of the data list item.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply to the item.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext("data-list-styles") as { current: any };
	const styles = $derived(ctx.current);
</script>

<div class={twMerge(styles.item(), className)} {...restProps}>
	{@render children()}
</div>
