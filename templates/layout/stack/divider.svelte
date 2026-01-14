<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const divider = tv({
		base: "shrink-0 border-(--color-border-default)",
		variants: {
			orientation: {
				horizontal: "h-px w-full border-b",
				vertical: "h-full w-px border-l min-h-[1em]",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	});

	type DividerVariants = VariantProps<typeof divider>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The orientation of the divider.
		 * @default "horizontal"
		 */
		orientation?: DividerVariants["orientation"];

		/**
		 * Additional CSS classes to apply to the divider.
		 */
		class?: string;
	}

	let {
		orientation = "horizontal",
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	class={divider({ orientation, class: className })}
	{...restProps}
></div>
