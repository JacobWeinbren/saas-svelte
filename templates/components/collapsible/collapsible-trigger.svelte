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
	{#snippet asChild(props)}
		<button type="button" class="inline-flex appearance-none bg-transparent border-0 p-0 cursor-pointer" {...props()}>
			{#if children}
				{@render children()}
			{/if}
		</button>
	{/snippet}
</ArkCollapsible.Trigger>
