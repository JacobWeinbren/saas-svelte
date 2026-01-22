<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The trigger element. Receives trigger props that must be spread onto an interactive element.
		 */
		children: Snippet<[() => Record<string, unknown>]>;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Popover.Trigger class={className} {...rest}>
	{#snippet asChild(props)}
		{@render children(props)}
	{/snippet}
</Popover.Trigger>
