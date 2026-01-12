<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const kbd = tv({
		base: [
			"inline-flex items-center shrink-0 select-none whitespace-nowrap [word-spacing:-0.5em]",
			"font-medium rounded px-1",
			"antialiased",
		],
		variants: {
			variant: {
				raised:
					"border-t border-b-2 border-x border-gray-50 bg-gray-100 text-gray-900 dark:border-gray-950 dark:bg-gray-900 dark:text-gray-200",
				outline:
					"border border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-200",
				subtle:
					"bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200",
				plain: "text-gray-900 dark:text-gray-200",
			},
			size: {
				sm: "h-5 text-xs leading-4",
				md: "h-5 text-xs leading-4",
				lg: "h-6 text-[13px] leading-5",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "md",
		},
	});

	export type KbdVariants = VariantProps<typeof kbd>;
</script>

<script lang="ts">
	type KbdVariants = VariantProps<typeof kbd>;

	interface Props extends HTMLAttributes<HTMLElement> {
		variant?: KbdVariants["variant"];
		size?: KbdVariants["size"];
	}

	let {
		variant = "subtle",
		size = "md",
		class: className,
		children,
		...restProps
	}: Props = $props();

	const finalClass = $derived(
		kbd({
			variant,
			size,
			class: `${className || ""}`,
		}),
	);
</script>

<kbd class={finalClass} {...restProps}>
	{@render children?.()}
</kbd>
