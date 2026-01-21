<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The trigger element.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Popover.Trigger class={className} asChild={children} {...rest} />
