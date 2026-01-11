<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { LoaderCircle } from "@lucide/svelte";

	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	const button = tv({
		base: [
			"relative isolate inline-flex h-8 min-w-8 shrink-0 cursor-pointer appearance-none items-center justify-center gap-x-2 rounded border border-solid border-(--c-300)/90 bg-(--c-50)/20 px-3 align-middle text-sm leading-5 font-medium whitespace-nowrap text-(--c-900) shadow-sm outline-0 select-none hover:border-(--c-300) hover:bg-(--c-50) focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-(--c-600) focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 [-webkit-tap-highlight-color:transparent] dark:border-(--c-700)/90 dark:bg-(--c-950)/20 dark:hover:border-(--c-700) dark:hover:bg-(--c-950) dark:focus-visible:outline-(--c-600) dark:text-(--c-200)",
		],
		variants: {
			variant: {
				glass: "overflow-hidden border-0 dark:border-(--c-200) bg-(--c-500) dark:bg-(--c-500) text-white shadow-inner [text-shadow:0_1px_2px_#0000004d] hover:bg-(--c-500) dark:hover:bg-(--c-500)",
				solid: "border-0 dark:border-(--c-200) bg-(--c-500) dark:bg-(--c-500) text-(--c-100) dark:text-white shadow hover:bg-(--c-500)/90 dark:hover:bg-(--c-500)/90",
				subtle: "border-0 bg-(--c-50) hover:bg-(--c-100) shadow-none dark:border-(--c-800) dark:text-(--c-200) dark:bg-(--c-950)  dark:focus-visible:outline-(--c-600) dark:hover:bg-(--c-900)",
				surface: "",
				outline:
					"border-[0.5px] border-(--c-300) shadow-none dark:border-(--c-700) dark:text-(--c-200) dark:hover:bg-(--c-950) ",
				ghost: "shadow-none border-0 hover:bg-(--c-100) dark:border-(--c-800) dark:text-(--c-200) dark:hover:bg-(--c-900) dark:focus-visible:outline-(--c-600)",
				plain: "shadow-none border-0 text-(--c-900) hover:bg-transparent bg-transparent dark:border-(--c-800) dark:text-(--c-200)",
			},
			color: {},
			size: {
				xs: "h-6 min-w-6 gap-x-1 px-2 text-xs leading-4 [&_svg]:size-2",
				sm: "h-7 min-w-7 px-2.5 text-sm leading-5 [&_svg]:size-3",
				md: "[&_svg]:size-4",
				lg: "h-10 min-w-10 gap-x-3 rounded-md px-5 [&_svg]:size-5",
				xl: "h-12 min-w-12 gap-x-3 rounded-md px-6 text-base leading-6 [&_svg]:size-6",
			},
			icon: { true: "px-0" },
		},
		compoundVariants: [
			{ size: "xs", icon: true, class: "w-6 [&_svg]:size-3" },
			{ size: "sm", icon: true, class: "w-7 [&_svg]:size-3.5" },
			{ size: "md", icon: true, class: "w-8 [&_svg]:size-4" },
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

	const glassOverlay =
		"pointer-events-none absolute inset-0 border-0 border-solid border-(--c-200) bg-[linear-gradient(#fff_40%,#0003)] opacity-20 duration-200 hover:bg-(--c-500) group-hover:bg-[linear-gradient(#fffc_40%,#0009)]";

	type ButtonVariants = VariantProps<typeof button>;

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		icon?: boolean;
		color?: ColorName;
		loading?: boolean;
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
