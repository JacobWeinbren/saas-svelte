<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The content of the trigger (usually a button).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<Steps.PrevTrigger class={className as string} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</Steps.PrevTrigger>
