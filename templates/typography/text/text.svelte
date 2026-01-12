<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	const text = tv({
		base: "text-black dark:text-gray-50 font-sans antialiased wrap-break-word",
		variants: {
			size: {
				xs: "text-xs leading-4",
				sm: "text-sm leading-5",
				md: "text-base leading-6",
				lg: "text-lg leading-7",
				xl: "text-xl leading-7",
				"2xl": "text-2xl leading-8",
				"3xl": "text-3xl leading-9 tracking-[-0.4px]",
				"4xl": "text-4xl leading-10 tracking-[-0.4px]",
				"5xl": "text-5xl leading-[3.45rem] -tracking-wide",
				"6xl": "text-6xl leading-[4.125rem] -tracking-wider",
				"7xl": "text-7xl leading-[5rem] -tracking-wider",
			},
			weight: {
				thin: "font-thin",
				extralight: "font-extralight",
				light: "font-light",
				normal: "font-normal",
				medium: "font-medium",
				semibold: "font-semibold",
				bold: "font-bold",
				extrabold: "font-extrabold",
				black: "font-black",
			},
			truncate: {
				true: "truncate", // Sets overflow-hidden, text-ellipsis, whitespace-nowrap
			},
			lineClamp: {
				"1": "line-clamp-1",
				"2": "line-clamp-2",
				"3": "line-clamp-3",
				"4": "line-clamp-4",
				"5": "line-clamp-5",
				"6": "line-clamp-6",
				none: "line-clamp-none",
			},
			variant: {
				primary: "text-black dark:text-gray-50",
				secondary: "text-gray-500 dark:text-gray-400",
				tertiary: "text-gray-400 dark:text-gray-500",
			},
		},
		defaultVariants: {
			size: "md",
			weight: "normal",
			variant: "primary",
		},
	});

	type TextVariants = VariantProps<typeof text>;

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		as?: string;
		size?: TextVariants["size"];
		weight?: TextVariants["weight"];
		variant?: TextVariants["variant"];
		truncate?: boolean;
		lineClamp?: TextVariants["lineClamp"]; // Supports "1" | "2" etc.
		// Compatibility props from Saas/Chakra patterns
		fontWeight?: TextVariants["weight"];
		textStyle?: TextVariants["size"];
		class?: ClassNameValue;
	}

	let {
		as = "p",
		size,
		weight,
		variant,
		truncate,
		lineClamp,
		fontWeight,
		textStyle,
		class: className,
		children,
		...rest
	}: Props = $props();

	// Resolve aliases
	const finalSize = $derived(textStyle || size);
	const finalWeight = $derived(fontWeight || weight);
</script>

<svelte:element
	this={as}
	class={text({
		size: finalSize,
		weight: finalWeight,
		variant,
		truncate,
		lineClamp,
		class: className,
	})}
	{...rest}
>
	{@render children?.()}
</svelte:element>
