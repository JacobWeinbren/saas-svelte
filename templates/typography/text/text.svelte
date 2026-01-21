<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	const text = tv({
		base: "text-fg-default antialiased wrap-break-word",
		variants: {
			size: {
				xs: "text-xs leading-xs",
				sm: "text-sm leading-sm",
				md: "text-md leading-md",
				lg: "text-lg leading-lg",
				xl: "text-xl leading-xl",
				"2xl": "text-2xl leading-2xl",
				"3xl": "text-3xl leading-3xl tracking-tight",
				"4xl": "text-4xl leading-4xl tracking-tight",
				"5xl": "text-5xl leading-5xl tracking-tighter",
				"6xl": "text-6xl leading-6xl tracking-tighter",
				"7xl": "text-7xl leading-7xl tracking-tighter",
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
				primary: "text-fg-default",
				secondary: "text-fg-subtle",
				tertiary: "text-fg-emphasized",
			},
		},
		defaultVariants: {
			size: "sm",
			weight: "normal",
			variant: "primary",
		},
	});

	type TextVariants = VariantProps<typeof text>;

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The HTML element to render.
		 * @default "p"
		 */
		as?: string;
		/**
		 * The size of the text.
		 * @default "md"
		 */
		size?: TextVariants["size"];
		/**
		 * The font weight of the text.
		 * @default "normal"
		 */
		weight?: TextVariants["weight"];
		/**
		 * The color variant of the text.
		 * @default "primary"
		 */
		variant?: TextVariants["variant"];
		/**
		 * Whether to truncate the text with an ellipsis.
		 */
		truncate?: boolean;
		/**
		 * The number of lines to clamp the text to.
		 */
		lineClamp?: TextVariants["lineClamp"]; // Supports "1" | "2" etc.
		// Compatibility props from Saas/Chakra patterns
		/**
		 * Alias for `weight`.
		 */
		fontWeight?: TextVariants["weight"];
		/**
		 * Alias for `size`.
		 */
		textStyle?: TextVariants["size"];
		/**
		 * Additional CSS classes to apply.
		 */
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
