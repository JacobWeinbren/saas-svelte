<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import CircleNotch from "phosphor-svelte/lib/CircleNotch";

	import type { ColourName } from "$saas/utils/colours";

	export const button = tv({
		base: [
			"relative isolate inline-flex shrink-0 cursor-(--cursor-button) appearance-none items-center justify-center align-middle whitespace-nowrap outline-0 select-none",
			"rounded-(--radii-l1) font-(--font-weights-medium)",
			"transition-colors duration-(--durations-moderate)",
			"focus-visible:outline-offset-[var(--spacing-0_5)] focus-visible:outline-1 focus-visible:outline-solid",
			"disabled:opacity-50 disabled:cursor-not-allowed",
		],
		variants: {
			variant: {
				// GLASS: Contrast text with gradient overlay and glossy effect
				glass: [
					"overflow-clip",
					"[color:var(--c-contrast)] bg-(--c-solid)",
					"focus-visible:outline-(--c-focus-ring)",
					"[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
					// Light mode: inset shadow for depth + subtle outer shadow
					"shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25),inset_0_2px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(0,0,0,0.05),0_0_2px_0_rgba(0,0,0,0.05)]",
					// Dark mode: simpler inset highlight + outer shadow
					"dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(0,0,0,0.3),inset_0_0_1px_0_rgba(255,255,255,0.05)]",
					// Gradient overlay pseudo-element
					"after:content-[''] after:absolute after:inset-0 after:[border-radius:inherit] after:opacity-20 after:pointer-events-none",
					"after:bg-[linear-gradient(180deg,white_40%,rgba(0,0,0,0.2))]",
					"after:transition-opacity after:duration-(--durations-moderate)",
					"hover:after:bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_40%,rgba(0,0,0,0.6))]",
				],

				// SOLID: Contrast text with solid background
				solid: [
					"[color:var(--c-contrast)] bg-(--c-solid) shadow-sm",
					"focus-visible:outline-(--c-focus-ring)",
					"hover:brightness-110",
				],

				// SUBTLE: Accent text with subtle background
				subtle: [
					"[color:var(--c-fg)] bg-(--c-muted)",
					"focus-visible:outline-(--c-focus-ring)",
					"hover:bg-(--c-subtle)",
				],

				// SURFACE: Accent text with border and subtle background
				surface: [
					"[color:var(--c-fg)] shadow-sm border bg-(--c-muted)/20 border-(--c-emphasized)/90",
					"focus-visible:outline-(--c-focus-ring)",
					"hover:bg-(--c-muted) hover:border-(--c-emphasized)",
				],

				// OUTLINE: Accent text with thin border
				outline: [
					"[color:var(--c-fg)] border-[0.5px] border-(--c-emphasized)",
					"focus-visible:outline-(--c-focus-ring)",
					"hover:bg-(--c-muted)",
				],

				// GHOST: Accent text, background on hover
				ghost: [
					"[color:var(--c-fg)]",
					"focus-visible:outline-(--c-focus-ring)",
					"hover:bg-(--c-subtle)",
				],

				// PLAIN: Accent text only
				plain: [
					"[color:var(--c-fg)]",
					"focus-visible:outline-(--c-focus-ring)",
				],
			},
			size: {
				xs: "h-(--spacing-6) min-w-(--spacing-6) gap-x-(--spacing-1) gap-y-(--spacing-1) px-(--spacing-2) text-(length:--font-sizes-xs) leading-(--line-heights-xs) [&_svg]:size-(--spacing-2)",
				sm: "h-(--spacing-7) min-w-(--spacing-7) gap-x-(--spacing-2) gap-y-(--spacing-2) px-(--spacing-2_5) text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-3)",
				md: "h-(--spacing-8) min-w-(--spacing-8) gap-x-(--spacing-2) gap-y-(--spacing-2) px-(--spacing-3) text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-3_5)",
				lg: "h-(--spacing-10) min-w-(--spacing-10) gap-x-(--spacing-3) gap-y-(--spacing-3) px-(--spacing-5) rounded-(--radius-md) text-(length:--font-sizes-sm) leading-(--line-heights-sm) [&_svg]:size-(--spacing-5)",
				xl: "h-(--spacing-12) min-w-(--spacing-12) gap-x-(--spacing-3) gap-y-(--spacing-3) px-(--spacing-6) rounded-(--radius-md) text-(length:--font-sizes-md) leading-(--line-heights-md) [&_svg]:size-(--spacing-6)",
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
		},
	});

	export type ButtonVariants = VariantProps<typeof button>;
</script>

<script lang="ts">
	import { getColourStyle } from "$saas/utils/colours";

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

	const colourStyle = $derived(getColourStyle(colour || "gray"));
	const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));

	const finalClass = $derived(
		button({
			variant,
			size,
			icon,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);

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
			<div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
				<CircleNotch class={loaderClass} />
			</div>
			<span class="sr-only">
				{@render children?.()}
			</span>
		</span>
	{:else if loading && loadingText}
		<span class="contents">
			<CircleNotch class={loaderClass} aria-hidden="true" />
			{loadingText}
		</span>
	{:else}
		{@render children?.()}
	{/if}
</button>
