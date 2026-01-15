<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import CircleNotch from "phosphor-svelte/lib/CircleNotch";

	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	export const button = tv({
		base: [
			"relative isolate inline-flex shrink-0 cursor-(--cursor-button) appearance-none items-center justify-center align-middle whitespace-nowrap outline-0 select-none",
			"rounded font-(--font-weights-medium)",
			"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring)",
			"disabled:opacity-50 disabled:cursor-not-allowed",
		],
		variants: {
			variant: {
				// GLASS: Contrast text with gradient overlay
				glass: [
					"overflow-x-clip overflow-y-clip",
					"text-(--c-contrast) bg-(--c-solid) shadow-(--shadows-inner)",
					"after:content-[''] after:absolute after:inset-0 after:opacity-20 after:pointer-events-none after:bg-[linear-gradient(#fff_40%,#0003)] after:transition-opacity after:duration-200",
					"hover:after:bg-[linear-gradient(#fffc_40%,#0009)]",
				],

				// SOLID: Contrast text with solid background
				solid: [
					"text-(--c-contrast) bg-(--c-solid) shadow-(--shadows-sm)",
					"hover:brightness-110",
				],

				// SUBTLE: Neutral text with subtle background
				subtle: [
					"text-(--c-fg) bg-(--c-muted)",
					"hover:bg-(--c-emphasized)",
				],

				// SURFACE: Neutral text with border and subtle background
				surface: [
					"text-(--c-fg) shadow-(--shadows-sm) border bg-(--c-muted)/20 border-(--c-emphasized)/90",
					"hover:bg-(--c-muted) hover:border-(--c-emphasized)",
				],

				// OUTLINE: Neutral text with thin border
				outline: [
					"text-(--c-fg) border-[0.5px] border-(--c-emphasized)",
					"hover:bg-(--c-muted)",
				],

				// GHOST: Neutral text, background on hover
				ghost: [
					"text-(--c-fg)",
					"hover:bg-(--c-emphasized)",
				],

				// PLAIN: Neutral text only
				plain: ["text-(--c-fg)"],
			},
			colour: {},
			size: {
				xs: "h-(--spacing-6) min-w-(--spacing-6) gap-x-(--spacing-1) gap-y-(--spacing-1) px-(--spacing-2) text-(length:--font-sizes-xs) leading-(--line-heights-xs) [&_svg]:size-(--spacing-2)",
				sm: "h-(--spacing-7) min-w-(--spacing-7) gap-x-(--spacing-2) gap-y-(--spacing-2) px-(--spacing-2_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-3)",
				md: "h-(--spacing-8) min-w-(--spacing-8) gap-x-(--spacing-2) gap-y-(--spacing-2) px-(--spacing-3) text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-3_5)",
				lg: "h-(--spacing-10) min-w-(--spacing-10) gap-x-(--spacing-3) gap-y-(--spacing-3) px-(--spacing-5) rounded-md text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-5)",
				xl: "h-(--spacing-12) min-w-(--spacing-12) gap-x-(--spacing-3) gap-y-(--spacing-3) px-(--spacing-6) rounded-md text-(length:--font-sizes-md) leading-(--line-heights-md) [&_svg]:size-(--spacing-6)",
			},
			icon: { true: "px-0" },
		},
		compoundVariants: [
			{
				size: "xs",
				icon: true,
				class: "w-(--spacing-6) [&_svg]:size-(--spacing-3)",
			},
			{
				size: "sm",
				icon: true,
				class: "w-(--spacing-7) [&_svg]:size-(--spacing-3_5)",
			},
			{
				size: "md",
				icon: true,
				class: "w-(--spacing-8) [&_svg]:size-(--spacing-3_5)",
			},
			{
				size: "lg",
				icon: true,
				class: "w-(--spacing-10) [&_svg]:size-(--spacing-5)",
			},
			{
				size: "xl",
				icon: true,
				class: "w-(--spacing-12) [&_svg]:size-(--spacing-6)",
			},
		],
		defaultVariants: {
			variant: "surface",
			size: "md",
			icon: false,
			colour: "gray" as any,
		},
	});

	export type ButtonVariants = VariantProps<typeof button>;
</script>

<script lang="ts">
	type ButtonVariants = VariantProps<typeof button>;

	interface Props extends HTMLButtonAttributes {
		/**
		 * The visual style of the button.
		 * @default "surface"
		 */
		variant?: ButtonVariants["variant"];
		/**
		 * The size of the button.
		 * @default "md"
		 */
		size?: ButtonVariants["size"];
		/**
		 * Whether the button is an icon-only button.
		 * @default false
		 */
		icon?: boolean;
		/**
		 * The colour palette of the button.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the button is in a loading state.
		 * @default false
		 */
		loading?: boolean;
		/**
		 * Text to display when the button is loading.
		 * @default ""
		 */
		loadingText?: string;
	}

	let {
		variant = "surface",
		size = "md",
		icon = false,
		colour = "gray",
		class: className,
		children,
		style,
		loading = false,
		loadingText = "",
		disabled,
		...restProps
	}: Props = $props();

	const colourVars = $derived(generateColourVars(colour || "gray"));

	const finalClass = $derived(
		button({
			variant,
			size,
			icon,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

	const loaderSizeMap: Record<NonNullable<ButtonVariants["size"]>, string> = {
		xs: "size-(--spacing-2_5)",
		sm: "size-(--spacing-3)",
		md: "size-(--spacing-3_5)",
		lg: "size-(--spacing-4)",
		xl: "size-(--spacing-5)",
	};

	const loaderClass = $derived(
		`${loaderSizeMap[size]} animate-spin [animation-duration:var(--durations-slow)]`,
	);
</script>

<button
	class={finalClass}
	style={finalStyle}
	disabled={disabled || loading}
	{...restProps}
>
	{#if loading && !loadingText}
		<span class="contents">
			<div class="absolute inset-0 flex items-center justify-center">
				<CircleNotch class={loaderClass} />
			</div>
			<span class="invisible contents">
				{@render children?.()}
			</span>
		</span>
	{:else if loading && loadingText}
		<span class="contents">
			<CircleNotch class={loaderClass} />
			{loadingText}
		</span>
	{:else}
		{@render children?.()}
	{/if}
</button>
