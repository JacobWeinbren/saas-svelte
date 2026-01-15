<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";
	import Quotes from "phosphor-svelte/lib/Quotes";

	export const blockquote = tv({
		base: "relative flex flex-col items-start gap-y-(--spacing-2) gap-x-(--spacing-2) px-(--spacing-5)",
		variants: {
			variant: {
				subtle: "border-l-4 border-l-(--c-muted)",
				solid: "border-l-4 border-l-(--c-solid)",
				plain: "",
			},
			justify: {
				start: "items-start",
				center: "items-center",
				end: "items-end",
			},
		},
		defaultVariants: {
			variant: "subtle",
			justify: "start",
		},
	});

	export type BlockquoteVariants = VariantProps<typeof blockquote>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The colour palette of the component.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * The alignment of the content.
		 * @default "start"
		 */
		justify?: BlockquoteVariants["justify"];
		/**
		 * The visual style of the blockquote.
		 * @default "subtle"
		 */
		variant?: BlockquoteVariants["variant"];
		/**
		 * The source of the quote.
		 * @default undefined
		 */
		cite?: string;
		/**
		 * Whether to show a dash before the citation.
		 * @default false
		 */
		showDash?: boolean;
		/**
		 * Whether to show the default quote icon.
		 * @default false
		 */
		showIcon?: boolean;
		/**
		 * Custom icon snippet.
		 * @default undefined
		 */
		icon?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		children?: Snippet;
	}

	let {
		colour = "gray",
		justify = "start",
		variant = "subtle",
		cite,
		showDash = false,
		showIcon = false,
		icon,
		children,
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(generateColourVars(colour));
	const finalClass = $derived(
		blockquote({ variant, justify, class: className }),
	);
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<figure class={finalClass} style={finalStyle} {...restProps}>
	{#if icon}
		{@render icon()}
	{:else if showIcon}
		<div
			class="justify-center items-center inline-flex absolute [inset-block:0.5rem_auto] [inset-inline:0_auto] [translate:-50%_-50%]"
		>
			<Quotes
				class="size-(--sizes-5) fill-current text-(--c-solid) scale-[-1]"
				color="currentColor"
				weight="fill"
			/>
		</div>
	{/if}

	<blockquote>
		{@render children?.()}
	</blockquote>

	{#if cite}
		<figcaption class="text-(length:--font-sizes-sm) leading-(--line-heights-sm) text-(--color-fg-muted)">
			{#if showDash}— {/if}<cite>{cite}</cite>
		</figcaption>
	{/if}
</figure>
