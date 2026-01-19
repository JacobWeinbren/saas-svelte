<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { tv } from "tailwind-variants";

	const checkboxCardDescription = tv({
		base: [
			"opacity-64",
			"text-(length:--font-sizes-sm)",
			"leading-(--line-heights-sm)",
		],
	});

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The description content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const finalClass = $derived(checkboxCardDescription({ class: className }));
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
