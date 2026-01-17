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
		 * Additional classes to apply to the content.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext("accordion-styles") as { current: any };
	const styles = $derived(ctx.current);
</script>

<Accordion.ItemContent
	class={twMerge(
		"rounded-md overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
		styles.content(),
		className,
	)}
	{...restProps}
>
	<div class={styles.contentBody()}>
		{@render children()}
	</div>
</Accordion.ItemContent>
