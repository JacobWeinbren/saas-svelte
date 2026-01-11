<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	const checkboxGroup = tv({
		base: "flex antialiased",
		variants: {
			orientation: {
				horizontal: "flex-row gap-6",
				vertical: "flex-col gap-1.5", // gap-1.5 is 6px, matches source HTML
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	});

	type Variants = VariantProps<typeof checkboxGroup>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		orientation?: Variants["orientation"];
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
