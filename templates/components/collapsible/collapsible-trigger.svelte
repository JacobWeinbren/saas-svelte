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
		/**
		 * When true, passes trigger behavior to the child element instead of rendering a button.
		 * Use this to avoid nested interactive controls when using a Button as the trigger.
		 * @default true
		 */
		asChild?: boolean;
	}

	let { children, class: className, asChild = true }: Props = $props();
</script>

<ArkCollapsible.Trigger class={className} asChild={asChild ? children : undefined}>
	{#if !asChild && children}
		{@render children()}
	{/if}
</ArkCollapsible.Trigger>
