<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const checkboxGroup = tv({
		base: "flex antialiased",
		variants: {
			orientation: {
				horizontal: "flex-row gap-6",
				vertical: "flex-col gap-1.5",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	});

	type Variants = VariantProps<typeof checkboxGroup>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The layout orientation of the group.
		 * @default "vertical"
		 */
		orientation?: Variants["orientation"];
		/**
		 * The label displayed above the group.
		 */
		label?: string;
	}

	let {
		orientation = "vertical",
		label,
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<div
	role="group"
	class={checkboxGroup({ orientation, class: className as string })}
	{...rest}
>
	{#if label}
		<span class="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
			{label}
		</span>
	{/if}
	{@render children?.()}
</div>
