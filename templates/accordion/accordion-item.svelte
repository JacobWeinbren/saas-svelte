<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	let {
		children,
		class: className,
		value,
		...restProps
	}: {
		children: Snippet;
		class?: string;
		value: string;
		[key: string]: any;
	} = $props();

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
