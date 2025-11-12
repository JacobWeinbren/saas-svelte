<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLButtonAttributes } from "svelte/elements";

	const colors = [
		"accent",
		"gray",
		"zinc",
		"neutral",
		"stone",
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	] as const;

	const generateColorVariants = (
		variant: string,
		template: (color: string) => string,
	) =>
		colors.map((color) => ({
			variant: variant as any,
			colorScheme: color as any,
			class: template(color),
		}));

	const button = tv({
		base: [
			"relative isolate inline-flex h-8 min-w-8 shrink-0 cursor-pointer appearance-none items-center justify-center gap-x-2 gap-y-2 rounded border border-solid border-gray-300/90 bg-gray-50/20 px-3 align-middle text-sm leading-5 font-medium wrap-break-words whitespace-nowrap text-gray-900 shadow-sm outline-0 transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] duration-200 select-none before:border-solid after:border-solid hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 [-webkit-tap-highlight-color:transparent]",
		],
		variants: {
			variant: {
				glass: "overflow-x-clip overflow-y-clip border-0 border-solid border-gray-200 bg-zinc-500 text-white shadow-inner [text-shadow:0_1px_2px_#0000004d] before:border-0 before:border-gray-200 hover:bg-zinc-500",
				solid: "border-0 border-gray-200 bg-zinc-500 text-white shadow before:border-0 before:border-gray-200 after:border-0 after:border-gray-200 hover:bg-zinc-500/90",
				subtle: "border-0 border-solid border-gray-200 bg-gray-50 before:border-0 before:border-gray-200 after:border-0 after:border-gray-200 hover:bg-gray-100 shadow-none dark:border-gray-800 dark:before:border-gray-800 dark:after:border-gray-800 dark:text-gray-200 dark:bg-gray-950  dark:focus-visible:outline-zinc-600 dark:hover:bg-gray-900",
				surface: "",
				outline: "",
				ghost: "",
				plain: "",
			},
			colorScheme: Object.fromEntries(colors.map((c) => [c, ""])) as any,
			size: {
				xs: "h-6 min-w-6 gap-x-1 gap-y-1 px-2 text-xs leading-4",
				sm: "h-7 min-w-7 px-2.5 text-sm leading-5",
				md: "",
				lg: "h-10 min-w-10 gap-x-3 gap-y-3 rounded-md px-5",
				xl: "h-12 min-w-12 gap-x-3 gap-y-3 rounded-md px-6 text-base leading-6",
			},
		},
		compoundVariants: [
			/*	...generateColorVariants(
				"solid",
				(c) => `bg-${c}-solid text-${c}-contrast hover:opacity-90`,
			),
			...generateColorVariants(
				"outline",
				(c) =>
					`border border-${c}-fg text-${c}-fg hover:bg-${c}-subtle`,
			),
			...generateColorVariants(
				"ghost",
				(c) => `text-${c}-fg hover:bg-${c}-subtle`,
			),
			...generateColorVariants(
				"subtle",
				(c) => `bg-${c}-subtle text-${c}-fg hover:bg-${c}-muted`,
			),*/
		],
		defaultVariants: {
			variant: "surface",
			size: "md",
			colorScheme: "accent",
		},
	});

	const glassOverlay =
		"pointer-events-none absolute inset-0 border-0 border-solid border-gray-200 bg-[linear-gradient(#fff_40%,#0003)] opacity-20 transition-opacity duration-200 hover:bg-zinc-500 group-hover:bg-[linear-gradient(#fffc_40%,#0009)]";

	// Props type definition
	type ButtonVariants = VariantProps<typeof button>;

	interface Props extends HTMLButtonAttributes {
		variant?: ButtonVariants["variant"];
		size?: ButtonVariants["size"];
		colorScheme?: ButtonVariants["colorScheme"];
	}

	let {
		variant,
		size,
		colorScheme,
		class: className,
		children,
		...restProps
	}: Props = $props();

	// Computed class string
	const buttonClass = $derived(
		button({ variant, size, colorScheme, class: className as string }),
	);

	// Add group class for glass variant hover effects
	const finalButtonClass = $derived(
		variant === "glass" ? `${buttonClass} group` : buttonClass,
	);
</script>

<button class={finalButtonClass} {...restProps}>
	{#if variant === "glass"}
		<span class={glassOverlay} aria-hidden="true"></span>
	{/if}
	{@render children?.()}
</button>
