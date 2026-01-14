<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";
	import Quotes from "phosphor-svelte/lib/Quotes";

	export const blockquote = tv({
		base: "relative flex flex-col gap-(--spacing-2) px-(--spacing-5)",
		variants: {
			variant: {
				subtle: "border-l-4 border-l-(--c-50) dark:border-l-(--c-950)",
				solid: "border-l-4 border-l-(--c-500) dark:border-l-(--c-800)",
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

	type Props = HTMLAttributes<HTMLElement> & {
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
		children?: Snippet;
	};

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
			class="justify-center items-center inline-flex absolute inset-y-[0.5rem_auto] inset-x-[0_auto] [translate:-50%_-50%]"
		>
			<Quotes
				class="h-(--spacing-5) w-(--spacing-5) fill-current text-(--c-600) scale-[-1]"
				color="currentColor"
				weight="fill"
			/>
		</div>
	{/if}

	<blockquote class="text-sm font-normal">
		{@render children?.()}
	</blockquote>

	{#if cite}
		<figcaption class="text-sm leading-5 text-(--color-fg-muted)">
			{#if showDash}—<!-- -->
			{/if}<cite>{cite}</cite>
		</figcaption>
	{/if}
</figure>
