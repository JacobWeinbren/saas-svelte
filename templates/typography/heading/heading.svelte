<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const heading = tv({
		base: "text-fg-default antialiased wrap-break-word",
		variants: {
			size: {
				xs: "text-(length:--font-sizes-xs) leading-(--line-heights-xs) tracking-[0] font-(--font-weights-semibold)",
				sm: "text-(length:--font-sizes-sm) leading-(--line-heights-sm) tracking-[0] font-(--font-weights-semibold)",
				md: "text-(length:--font-sizes-md) leading-(--line-heights-md) tracking-[-0.0025em] font-(--font-weights-semibold)",
				lg: "text-(length:--font-sizes-lg) leading-(--line-heights-lg) tracking-[-0.005px] font-(--font-weights-semibold)",
				xl: "text-(length:--font-sizes-xl) leading-(--line-heights-xl) tracking-[-0.00625em] font-(--font-weights-semibold)",
				"2xl": "text-(length:--font-sizes-2xl) leading-(--line-heights-2xl) tracking-[-0.0075em] font-(--font-weights-semibold)",
				"3xl": "text-(length:--font-sizes-3xl) leading-(--line-heights-3xl) tracking-[-0.01em] font-(--font-weights-semibold)",
				"4xl": "text-(length:--font-sizes-4xl) leading-(--line-heights-4xl) tracking-[-0.8px] font-(--font-weights-semibold)",
				"5xl": "text-(length:--font-sizes-5xl) leading-(--line-heights-5xl) tracking-[-1.6px] font-(--font-weights-semibold)",
				"6xl": "text-(length:--font-sizes-6xl) leading-(--line-heights-6xl) tracking-[-1.6px] font-(--font-weights-semibold)",
				"7xl": "text-(length:--font-sizes-7xl) leading-(--line-heights-7xl) tracking-[-1.6px] font-(--font-weights-semibold)",
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
