<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const heading = tv({
		base: "text-(--color-fg-default) font-sans antialiased break-words",
		variants: {
			size: {
				xs: "text-xs leading-4 tracking-[0] font-semibold",
				sm: "text-sm leading-5 tracking-[0] font-semibold",
				md: "text-base leading-5 tracking-[-0.0025em] font-semibold",
				lg: "text-lg leading-6 tracking-[-0.005px] font-semibold",
				xl: "text-xl leading-6 tracking-[-0.00625em] font-semibold",
				"2xl": "text-2xl leading-7 tracking-[-0.0075em] font-semibold",
				"3xl": "text-3xl leading-9 tracking-[-0.01em] font-semibold",
				"4xl": "text-4xl leading-10 tracking-[-0.8px] font-semibold",
				"5xl": "text-5xl leading-10 tracking-[-1.6px] font-semibold",
				"6xl": "text-6xl leading-[4.125rem] tracking-[-1.6px] font-semibold",
				"7xl": "text-7xl leading-20 tracking-[-1.6px] font-semibold",
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
