<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import { ChevronRight } from "@lucide/svelte";
	import { getContext, type Component, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	let {
		children,
		class: className,
		icon: Icon,
		...restProps
	}: {
		children: Snippet;
		class?: string;
		icon?: Component;
		[key: string]: any;
	} = $props();

	const ctx = getContext("accordion-styles") as { current: any };
	const styles = $derived(ctx.current);
</script>

<Accordion.ItemTrigger
	class={twMerge(styles.trigger(), className)}
	{...restProps}
>
	{#if Icon}
		<Icon class={styles.icon()} />
	{/if}

	{@render children()}

	<Accordion.ItemIndicator
		class={twMerge(
			styles.indicator(),
			"ml-auto data-[state=open]:rotate-90 origin-[50%]",
		)}
	>
		<ChevronRight
			class="text-current inline-block fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round] w-full h-full"
		/>
	</Accordion.ItemIndicator>
</Accordion.ItemTrigger>
