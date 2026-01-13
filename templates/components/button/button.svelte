<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import CircleNotch from "phosphor-svelte/lib/CircleNotch";

	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	export const button = tv({
		base: [
			"relative isolate inline-flex h-8 min-w-8 shrink-0 cursor-pointer appearance-none items-center justify-center gap-x-2 rounded border border-solid border-(--c-300)/90 bg-(--c-50)/20 px-3 align-middle text-sm leading-5 font-medium whitespace-nowrap shadow-sm outline-0 select-none hover:border-(--c-300) hover:bg-(--c-50) focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-(--c-600) focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-(--c-300)/90 disabled:hover:bg-(--c-50)/20 [-webkit-tap-highlight-color:transparent] dark:border-zinc-700/90 dark:bg-(--c-950)/20 dark:hover:border-zinc-700 dark:hover:bg-(--c-950) dark:disabled:hover:border-zinc-700/90 dark:disabled:hover:bg-(--c-950)/20 dark:focus-visible:outline-(--c-600)",
			// BASE TEXT COLOR (Neutral High Contrast)
			"text-(--c-900) dark:text-(--c-200)",
			"antialiased",
		],
		variants: {
			variant: {
				// GLASS: Always White Text
				glass: "overflow-hidden border-0 bg-(--c-500) dark:bg-(--c-500) text-zinc-50 dark:text-zinc-50 shadow-inner [text-shadow:0_1px_2px_#0000004d] hover:bg-(--c-500) dark:hover:bg-(--c-500) dark:shadow-inner disabled:hover:bg-(--c-500) dark:disabled:hover:bg-(--c-500)",

				// SOLID: Always White Text
				solid: "border-0 bg-(--c-500) dark:bg-(--c-500) text-zinc-50 dark:text-zinc-50 shadow shadow-sm hover:bg-(--c-500)/90 dark:hover:bg-(--c-500)/90 disabled:hover:bg-(--c-500) dark:disabled:hover:bg-(--c-500)",

				// SUBTLE: Neutral Text (Inherits Base)
				subtle: "border-0 bg-(--c-50) hover:bg-(--c-100) shadow-none dark:bg-(--c-950) dark:hover:bg-(--c-900) disabled:hover:bg-(--c-50) dark:disabled:hover:bg-(--c-950)",

				// SURFACE: Neutral Text (Inherits Base)
				surface:
					"disabled:hover:bg-(--c-50)/20 dark:disabled:hover:bg-(--c-950)/20",

				// OUTLINE: Neutral Text (Inherits Base in Light, Colored in Dark)
				outline:
					"shadow-none border-[0.5px] border-(--c-300) hover:bg-(--c-50) dark:border-zinc-700 dark:text-(--c-200) dark:hover:bg-(--c-950) disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",

				// GHOST: Neutral Text (Inherits Base in Light, Colored in Dark)
				ghost: "shadow-none border-0 hover:bg-(--c-100) dark:hover:bg-(--c-900) dark:text-(--c-200) disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",

				// PLAIN: Neutral Text (Inherits Base)
				plain: "shadow-none border-0 bg-transparent hover:bg-transparent disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",
			},
			color: {},
			size: {
				xs: "h-6 min-w-6 gap-x-1 px-2 text-xs leading-4 [&_svg]:size-2",
				sm: "h-7 min-w-7 px-2.5 text-sm leading-5 [&_svg]:size-3",
				md: "[&_svg]:size-3.5",
				lg: "h-10 min-w-10 gap-x-3 rounded-md px-5 [&_svg]:size-5",
				xl: "h-12 min-w-12 gap-x-3 rounded-md px-6 text-base leading-6 [&_svg]:size-6",
			},
			icon: { true: "px-0" },
		},
		compoundVariants: [
			{ size: "xs", icon: true, class: "w-6 [&_svg]:size-3" },
			{ size: "sm", icon: true, class: "w-7 [&_svg]:size-3.5" },
			{ size: "md", icon: true, class: "w-8 [&_svg]:size-3.5" },
			{ size: "lg", icon: true, class: "w-10 [&_svg]:size-5" },
			{ size: "xl", icon: true, class: "w-12 [&_svg]:size-6" },
		],
		defaultVariants: {
			variant: "surface",
			size: "md",
			icon: false,
			color: "gray" as any,
		},
	});

	export type ButtonVariants = VariantProps<typeof button>;
</script>

<script lang="ts">
	const glassOverlay =
		"pointer-events-none absolute inset-0 border-0 border-solid border-(--c-200) bg-[linear-gradient(#fff_40%,#0003)] opacity-20 duration-200 hover:bg-(--c-500) group-hover:bg-[linear-gradient(#fffc_40%,#0009)]";

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
		 * The color palette of the button.
		 * @default "gray"
		 */
		color?: ColorName;
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
		color = "gray",
		class: className,
		children,
		style,
		loading = false,
		loadingText = "",
		disabled,
		...restProps
	}: Props = $props();

	const colorVars = $derived(generateColorVars(color || "gray"));

	const finalClass = $derived(
		button({
			variant,
			size,
			icon,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));

	const loaderSizeMap = {
		xs: "size-2.5",
		sm: "size-3",
		md: "size-3.5",
		lg: "size-4",
		xl: "size-5",
	} as const;

	const loaderClass = $derived(
		`${loaderSizeMap[size]} animate-spin [animation-duration:0.5s]`,
	);
</script>

<button
	class={finalClass}
	style={finalStyle}
	disabled={disabled || loading}
	{...restProps}
>
	{#if variant === "glass"}
		<span class={glassOverlay} aria-hidden="true"></span>
	{/if}

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
