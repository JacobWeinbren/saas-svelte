<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import tailwindColors from "tailwindcss/colors";
	import { LoaderCircle } from "@lucide/svelte";

	const validColors = Object.keys(tailwindColors).filter(
		(color) =>
			typeof tailwindColors[color as keyof typeof tailwindColors] ===
				"object" &&
			!["inherit", "current", "transparent", "black", "white"].includes(
				color,
			),
	) as Array<keyof typeof tailwindColors>;

	type ColorName = (typeof validColors)[number];

	const button = tv({
		base: [
			"relative isolate inline-flex h-8 min-w-8 shrink-0 cursor-pointer appearance-none items-center justify-center gap-x-2 gap-y-2 rounded border border-solid border-(--c-300)/90 bg-(--c-50)/20 px-3 align-middle text-sm leading-5 font-medium wrap-break-words whitespace-nowrap text-(--c-900) shadow-sm outline-0 transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] duration-200 select-none hover:border-(--c-300) hover:bg-(--c-50) focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-(--c-600) focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 [-webkit-tap-highlight-color:transparent] dark:border-(--c-700)/90 dark:bg-(--c-950)/20 dark:hover:border-(--c-700) dark:hover:bg-(--c-950) dark:focus-visible:outline-(--c-600) dark:text-(--c-200)",
		],
		variants: {
			variant: {
				glass: "overflow-x-clip overflow-y-clip border-0 border-(--c-200) dark:border-(--c-200) bg-(--c-500) dark:bg-(--c-500) text-white shadow-inner [text-shadow:0_1px_2px_#0000004d] hover:bg-(--c-500) dark:hover:bg-(--c-500)",
				solid: "border-0 border-(--c-200) dark:border-(--c-200) bg-(--c-500) dark:bg-(--c-500) text-(--c-100) dark:text-white shadow hover:bg-(--c-500)/90 dark:hover:bg-(--c-500)/90",
				subtle: "border-0 border-(--c-200) bg-(--c-50) hover:bg-(--c-100) shadow-none dark:border-(--c-800) dark:text-(--c-200) dark:bg-(--c-950)  dark:focus-visible:outline-(--c-600) dark:hover:bg-(--c-900)",
				surface: "",
				outline:
					"border-[0.5px] border-(--c-300) shadow-none dark:border-(--c-700) dark:text-(--c-200) dark:hover:bg-(--c-950) ",
				ghost: "shadow-none border-0 border-(--c-200)  hover:bg-(--c-100) dark:border-(--c-800) dark:text-(--c-200) dark:hover:bg-(--c-900) dark:focus-visible:outline-(--c-600)",
				plain: "shadow-none border-0 border-(--c-200) text-(--c-900) hover:bg-transparent bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:border-(--c-800) dark:text-(--c-200)",
			},
			colorPalette: Object.fromEntries(
				validColors.map((c) => [c, ""]),
			) as any,
			size: {
				xs: "h-6 min-w-6 gap-x-1 gap-y-1 px-2 text-xs leading-4",
				sm: "h-7 min-w-7 px-2.5 text-sm leading-5",
				md: "",
				lg: "h-10 min-w-10 gap-x-3 gap-y-3 rounded-md px-5",
				xl: "h-12 min-w-12 gap-x-3 gap-y-3 rounded-md px-6 text-base leading-6",
			},
		},
		defaultVariants: {
			variant: "surface",
			size: "md",
			colorPalette: "gray",
		},
	});

	const glassOverlay =
		"pointer-events-none absolute inset-0 border-0 border-solid border-(--c-200) bg-[linear-gradient(#fff_40%,#0003)] opacity-20 transition-opacity duration-200 hover:bg-(--c-500) group-hover:bg-[linear-gradient(#fffc_40%,#0009)]";

	// Props type definition
	type ButtonVariants = VariantProps<typeof button>;
	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		colorPalette?: ColorName;
		loading?: boolean;
		loadingText?: string;
	}

	let {
		variant,
		size,
		colorPalette = "gray",
		class: className,
		children,
		style,
		loading = false,
		loadingText,
		disabled,
		...restProps
	}: Props = $props();

	const colorVars = $derived(
		(() => {
			const paletteName = colorPalette || "gray";

			if (!paletteName) return "";

			const palette = tailwindColors[paletteName];

			if (typeof palette !== "object" || !palette) {
				return "";
			}

			const shades = [
				"50",
				"100",
				"200",
				"300",
				"400",
				"500",
				"600",
				"700",
				"800",
				"900",
				"950",
			] as const;

			return shades
				.map((shade) => {
					const color = (palette as any)[shade];
					return color ? `--c-${shade}: ${color}` : null;
				})
				.filter(Boolean)
				.join("; ");
		})(),
	);

	const finalClass = $derived(
		button({
			variant,
			size,
			colorPalette,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
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
				<LoaderCircle
					class="h-3.5 w-3.5 animate-spin [animation-duration:0.5s]"
				/>
			</div>
			<span class="invisible contents">
				{@render children?.()}
			</span>
		</span>
	{:else if loading && loadingText}
		<span class="contents">
			<LoaderCircle
				class="h-3.5 w-3.5 animate-spin [animation-duration:0.5s]"
			/>
			{loadingText}
		</span>
	{:else}
		{@render children?.()}
	{/if}
</button>
