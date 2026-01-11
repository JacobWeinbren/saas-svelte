<script lang="ts">
	import { type VariantProps, tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	const stack = tv({
		base: "flex",
		variants: {
			direction: {
				row: "flex-row",
				column: "flex-col",
				"row-reverse": "flex-row-reverse",
				"col-reverse": "flex-col-reverse",
			},
			align: {
				start: "items-start",
				center: "items-center",
				end: "items-end",
				stretch: "items-stretch",
				baseline: "items-baseline",
			},
			justify: {
				start: "justify-start",
				center: "justify-center",
				end: "justify-end",
				between: "justify-between",
				around: "justify-around",
			},
		},
		defaultVariants: {
			direction: "column",
			align: "stretch",
			justify: "start",
		},
	});

	type StackVariants = VariantProps<typeof stack>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		direction?: StackVariants["direction"];
		align?: StackVariants["align"];
		justify?: StackVariants["justify"];
		class?: string;
	}

	let {
		children,
		direction = "column",
		align,
		justify,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	class={twMerge(stack({ direction, align, justify }), "gap-2", className)}
	{...restProps}
>
	{@render children()}
</div>
