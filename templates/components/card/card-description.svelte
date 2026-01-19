<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { tv } from "tailwind-variants";

	const cardDescription = tv({
		base: [
			"wrap-break-word",
			"text-(length:--font-sizes-sm)",
			"leading-(--line-heights-sm)",
			"text-fg-muted",
		],
	});

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
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

	const finalClass = $derived(cardDescription({ class: className }));
</script>

<p class={finalClass} {...restProps}>
	{@render children()}
</p>
