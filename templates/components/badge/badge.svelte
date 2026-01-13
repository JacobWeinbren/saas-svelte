<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColorName, generateColorVars } from "$saas/utils/colours";

	export const badge = tv({
		base: [
			"tabular-nums",
			"whitespace-nowrap",
			"select-none",
			"items-center",
			"gap-y-1",
			"gap-x-1",
			"font-medium",
			"inline-flex",
			"rounded-full",
			"antialiased",
			"border-0",
		],
		variants: {
			variant: {
				subtle: "bg-(--c-100) text-(--c-700) dark:bg-(--c-900) dark:text-(--c-300)",
				solid: "bg-(--c-600) text-white dark:bg-(--c-600) dark:text-white",
				outline:
					"text-(--c-700) dark:text-(--c-300) shadow-[inset_0_0_0_1px_var(--c-200)] dark:shadow-[inset_0_0_0_1px_var(--c-800)]",
				surface:
					"bg-(--c-50)/20 text-(--c-700) dark:bg-(--c-950)/20 dark:text-(--c-300) shadow-[inset_0_0_0_1px_var(--c-200)] dark:shadow-[inset_0_0_0_1px_var(--c-800)]",
			},
			size: {
				xs: "min-h-4 text-xs leading-3 px-1",
				sm: "min-h-5 text-xs leading-4 px-1.5",
				md: "min-h-6 text-sm leading-5 px-2",
				lg: "min-h-7 text-sm leading-5 px-2.5",
			},
			color: {},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
			color: "gray" as any,
		},
	});

	export type BadgeVariants = VariantProps<typeof badge>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	type BadgeVariants = VariantProps<typeof badge>;

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
		/**
		 * The badge content.
		 */
		children: Snippet;
		/**
		 * The visual style of the badge.
		 * @default "subtle"
		 */
		variant?: BadgeVariants["variant"];
		/**
		 * The size of the badge.
		 * @default "sm"
		 */
		size?: BadgeVariants["size"];
		/**
		 * The color palette of the badge.
		 * @default "gray"
		 */
		color?: ColorName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		variant = "subtle",
		size = "sm",
		color = "gray",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colorVars = $derived(generateColorVars(color || "gray"));

	const finalClass = $derived(badge({ variant, size, class: className }));

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
</script>

<span class={finalClass} style={finalStyle} {...restProps}>
	{@render children()}
</span>
