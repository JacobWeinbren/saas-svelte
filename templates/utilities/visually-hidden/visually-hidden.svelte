<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The content to be visually hidden
		 */
		children: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<span
	class="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 {className}"
	style="clip: rect(0, 0, 0, 0); clip-path: inset(50%);"
>
	{@render children()}
</span>
