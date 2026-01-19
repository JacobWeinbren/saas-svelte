<script lang="ts">
	import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The content of the trigger.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<ArkCollapsible.Trigger class={className}>
	{#if children}
		{@render children()}
	{/if}
</ArkCollapsible.Trigger>
