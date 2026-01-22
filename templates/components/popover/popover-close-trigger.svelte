<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import { getContext, type Snippet } from "svelte";
	import X from "phosphor-svelte/lib/X";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * Custom content for the close trigger. Receives trigger props that must be spread onto an interactive element.
		 */
		children?: Snippet<[() => Record<string, unknown>]>;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Accessible label for the close button.
		 * @default "Close"
		 */
		"aria-label"?: string;
		[key: string]: unknown;
	}

	let { children, class: className, "aria-label": ariaLabel = "Close", ...rest }: Props = $props();

	const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

{#if children}
	<Popover.CloseTrigger aria-label={ariaLabel} {...rest}>
		{#snippet asChild(props)}
			{@render children(props)}
		{/snippet}
	</Popover.CloseTrigger>
{:else}
	<Popover.CloseTrigger
		class={ctx?.styles?.closeTrigger({ class: className })}
		aria-label={ariaLabel}
		{...rest}
	>
		<X class="size-4" aria-hidden="true" />
	</Popover.CloseTrigger>
{/if}
