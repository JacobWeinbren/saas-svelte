<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { tv, type VariantProps } from "tailwind-variants";

	const accordion = tv({
		slots: {
			root: "w-full",
			item: "overflow-anchor-none",
			trigger: [
				"flex items-center gap-(--spacing-3) w-full font-(--font-weights-medium) font-sans",
				"rounded-(--radius-md)",
				"outline-none",
				"focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-(--color-accent-focus-ring)",
				"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",
			],
			content: "overflow-hidden text-(length:--font-sizes-sm) text-(--color-fg-muted)",
			contentBody: "",
			indicator:
				"flex items-center justify-center text-(--color-fg-muted) shrink-0 transition-transform duration-(--durations-moderate)",
			icon: "shrink-0 text-(--color-fg-muted)",
		},
		variants: {
			size: {
				sm: {
					trigger: "text-(length:--font-sizes-sm) py-(--spacing-2)",
					content: "text-(length:--font-sizes-sm)",
					contentBody: "pt-(--spacing-2) pb-(--spacing-4)",
					indicator: "size-(--spacing-3_5)",
					icon: "size-(--spacing-3_5)",
				},
				md: {
					trigger: "text-(length:--font-sizes-sm) py-(--spacing-2)",
					content: "text-(length:--font-sizes-sm)",
					contentBody: "pt-(--spacing-2) pb-(--spacing-4)",
					indicator: "size-(--spacing-3_5)",
					icon: "size-(--spacing-3_5)",
				},
				lg: {
					trigger: "text-(length:--font-sizes-md) py-(--spacing-2_5)",
					content: "text-(length:--font-sizes-md)",
					contentBody: "pt-(--spacing-2_5) pb-(--spacing-5)",
					indicator: "size-(--spacing-4)",
					icon: "size-(--spacing-4)",
				},
			},
			variant: {
				outline: {
					item: "border-b border-(--color-border-default)",
				},
				subtle: {
					item: "rounded-(--radius-md) data-[state=open]:bg-(--color-bg-subtle)",
					trigger: "px-(--spacing-4)",
					contentBody: "px-(--spacing-4)",
				},
				enclosed: {
					root: "border border-(--color-border-default) rounded-(--radius-md)",
					item: "border-b border-(--color-border-default) last:border-b-0 data-[state=open]:bg-(--color-bg-subtle)",
					trigger: "px-(--spacing-4)",
					contentBody: "px-(--spacing-4)",
				},
				plain: {
					item: "border-0",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
		},
	});

	type AccordionVariants = VariantProps<typeof accordion>;

	interface Props {
		children: Snippet;
		class?: string;
		/**
		 * Whether accordion items can be collapsed.
		 * @default false
		 */
		collapsible?: boolean;
		/**
		 * The default value(s) of the accordion items to open.
		 */
		defaultValue?: string[];
		/**
		 * Whether multiple accordion items can be open at once.
		 * @default false
		 */
		multiple?: boolean;
		/**
		 * The orientation of the accordion.
		 * @default "vertical"
		 */
		orientation?: "horizontal" | "vertical";
		/**
		 * The size of the accordion.
		 * @default "md"
		 */
		size?: AccordionVariants["size"];
		/**
		 * The visual style of the accordion.
		 * @default "outline"
		 */
		variant?: AccordionVariants["variant"];
		[key: string]: any;
	}

	let {
		children,
		class: className,
		collapsible = false,
		defaultValue,
		multiple = false,
		orientation = "vertical",
		size = "md",
		variant = "outline",
		...restProps
	}: Props = $props();

	const classes = $derived(accordion({ size, variant }));

	setContext("accordion-styles", {
		get current() {
			return classes;
		},
	});
</script>

<Accordion.Root
	{collapsible}
	{defaultValue}
	{multiple}
	{orientation}
	class={twMerge(
		"text-(--color-fg-default) leading-normal antialiased font-sans",
		classes.root(),
		className,
	)}
	{...restProps}
>
	{@render children()}
</Accordion.Root>
