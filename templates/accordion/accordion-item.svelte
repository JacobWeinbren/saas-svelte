<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content of the accordion item.
		 */
		children: Snippet;
		/**
		 * Additional classes to apply to the item.
		 */
		class?: string;
		/**
		 * The unique value of the item.
		 */
		value: string;
		[key: string]: any;
	}

	let { children, class: className, value, ...restProps }: Props = $props();

	const ctx = getContext("accordion-styles") as { current: any };
	const styles = $derived(ctx.current);
</script>

<Accordion.Item
	class={twMerge(styles.item(), className)}
	{value}
	{...restProps}
>
	{@render children()}
</Accordion.Item>
