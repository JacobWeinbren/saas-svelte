<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";

	const text = tv({
		base: "text-(--color-fg-default) font-sans antialiased break-words",
		variants: {
			size: {
				xs: "text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				sm: "text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "text-(length:--font-sizes-md) leading-(--line-heights-md)",
				lg: "text-(length:--font-sizes-lg) leading-(--line-heights-lg)",
				xl: "text-(length:--font-sizes-xl) leading-(--line-heights-xl)",
				"2xl": "text-(length:--font-sizes-2xl) leading-(--line-heights-2xl)",
				"3xl": "text-(length:--font-sizes-3xl) leading-(--line-heights-3xl) tracking-[-0.4px]",
				"4xl": "text-(length:--font-sizes-4xl) leading-(--line-heights-4xl) tracking-[-0.4px]",
				"5xl": "text-(length:--font-sizes-5xl) leading-(--line-heights-5xl) -tracking-wide",
				"6xl": "text-(length:--font-sizes-6xl) leading-(--line-heights-6xl) -tracking-wider",
				"7xl": "text-(length:--font-sizes-7xl) leading-(--line-heights-7xl) -tracking-wider",
			},
			weight: {
				thin: "font-(--font-weights-thin)",
				extralight: "font-(--font-weights-extralight)",
				light: "font-(--font-weights-light)",
				normal: "font-(--font-weights-normal)",
				medium: "font-(--font-weights-medium)",
				semibold: "font-(--font-weights-semibold)",
				bold: "font-(--font-weights-bold)",
				extrabold: "font-(--font-weights-extrabold)",
				black: "font-(--font-weights-black)",
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
				primary: "text-(--color-fg-default)",
				secondary: "text-(--color-fg-muted)",
				tertiary: "text-(--color-fg-subtle)",
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
