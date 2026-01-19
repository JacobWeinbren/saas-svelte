<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const CARD_CTX = Symbol("CARD_CTX");

	export const cardRoot = tv({
		base: [
			"flex flex-col relative",
			"rounded-lg",
			"text-fg-default",
			"wrap-break-word",
			"antialiased",
		],
		variants: {
			variant: {
				subtle: "bg-bg-subtle",
				outline: "bg-bg-panel border border-border-default",
				elevated: "bg-bg-panel shadow-xs border-[0.5px] border-border-default",
			},
			size: {
				sm: "",
				md: "",
				lg: "",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type CardVariants = VariantProps<typeof cardRoot>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { setContext } from "svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The card content.
		 */
		children: Snippet;
		/**
		 * The visual style of the card.
		 * @default "outline"
		 */
		variant?: CardVariants["variant"];
		/**
		 * The size of the card.
		 * @default "md"
		 */
		size?: CardVariants["size"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		variant = "outline",
		size = "md",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const finalClass = $derived(cardRoot({ variant, size, class: className }));

	// Set context for child components
	let contextState = $state({ size, variant });

	$effect(() => {
		contextState.size = size;
		contextState.variant = variant;
	});

	setContext(CARD_CTX, contextState);
</script>

<div class={finalClass} {style} {...restProps}>
	{@render children()}
</div>
