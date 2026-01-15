<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const heading = tv({
		base: "text-(--color-fg-default) font-sans antialiased break-words",
		variants: {
			size: {
				xs: "text-(length:--font-sizes-xs) leading-(--line-heights-xs) tracking-[0] font-semibold",
				sm: "text-(length:--font-sizes-sm) leading-(--line-heights-sm) tracking-[0] font-semibold",
				md: "text-(length:--font-sizes-md) leading-(--line-heights-md) tracking-[-0.0025em] font-semibold",
				lg: "text-(length:--font-sizes-lg) leading-(--line-heights-lg) tracking-[-0.005px] font-semibold",
				xl: "text-(length:--font-sizes-xl) leading-(--line-heights-xl) tracking-[-0.00625em] font-semibold",
				"2xl": "text-(length:--font-sizes-2xl) leading-(--line-heights-2xl) tracking-[-0.0075em] font-semibold",
				"3xl": "text-(length:--font-sizes-3xl) leading-(--line-heights-3xl) tracking-[-0.01em] font-semibold",
				"4xl": "text-(length:--font-sizes-4xl) leading-(--line-heights-4xl) tracking-[-0.8px] font-semibold",
				"5xl": "text-(length:--font-sizes-5xl) leading-(--line-heights-5xl) tracking-[-1.6px] font-semibold",
				"6xl": "text-(length:--font-sizes-6xl) leading-(--line-heights-6xl) tracking-[-1.6px] font-semibold",
				"7xl": "text-(length:--font-sizes-7xl) leading-(--line-heights-7xl) tracking-[-1.6px] font-semibold",
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
		},
		defaultVariants: {
			size: "xl",
			weight: "semibold",
		},
	});

	type HeadingVariants = VariantProps<typeof heading>;

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The HTML element to render.
		 * @default "h2"
		 */
		as?: string;
		/**
		 * The size of the heading.
		 * @default "xl"
		 */
		size?: HeadingVariants["size"];
		/**
		 * The font weight of the heading.
		 * @default "semibold"
		 */
		weight?: HeadingVariants["weight"];
		/**
		 * Alias for `weight`.
		 */
		fontWeight?: HeadingVariants["weight"];
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		as = "h2",
		size,
		weight,
		fontWeight,
		class: className,
		children,
		...rest
	}: Props = $props();

	const finalWeight = $derived(fontWeight || weight);
</script>

<svelte:element
	this={as}
	class={heading({
		size,
		weight: finalWeight,
		class: className,
	})}
	{...rest}
>
	{@render children?.()}
</svelte:element>
