<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { tv } from "tailwind-variants";
	import { CARD_CTX, type CardVariants } from "./card-root.svelte";

	const cardBody = tv({
		base: ["flex flex-col flex-1"],
		variants: {
			size: {
				sm: "px-2.5 pt-1.5 pb-2.5",
				md: "px-4 pt-2 pb-4",
				lg: "px-6 pt-3 pb-6",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The body content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<{ size: CardVariants["size"] }>(CARD_CTX);
	const size = $derived(ctx?.size ?? "md");

	const finalClass = $derived(cardBody({ size, class: className }));
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
