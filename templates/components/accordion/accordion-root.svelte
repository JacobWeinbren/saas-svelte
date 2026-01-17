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
				"flex items-center gap-3 w-full",
				"rounded-md",
				"outline-none",
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-border-emphasized",
				"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",
			],
			content:
				"overflow-hidden text-(length:--font-sizes-sm) text-fg-subtle",
			contentBody: "",
			indicator:
				"flex items-center justify-center text-fg-muted shrink-0 transition-transform duration-(--durations-moderate)",
			icon: "shrink-0 text-fg-muted",
		},
		variants: {
			size: {
				sm: {
					trigger:
						"text-(length:--font-sizes-sm) py-2 font-(--font-weights-medium)",
					content: "text-(length:--font-sizes-sm)",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				md: {
					trigger:
						"text-(length:--font-sizes-sm) py-2 font-(--font-weights-medium)",
					content: "text-(length:--font-sizes-sm)",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				lg: {
					trigger:
						"text-(length:--font-sizes-md) py-2.5 font-(--font-weights-medium)",
					content: "text-(length:--font-sizes-md)",
					contentBody: "pt-2.5 pb-5",
					indicator: "size-4",
					icon: "size-4",
				},
			},
			variant: {
				outline: {
					item: "border-b border-border-default",
				},
				subtle: {
					item: "rounded-md data-[state=open]:bg-bg-subtle",
					trigger: "px-4",
					contentBody: "px-4",
				},
				enclosed: {
					root: "border border-border-default rounded-md",
					item: "border-b border-border-default last:border-b-0 data-[state=open]:bg-bg-subtle",
					trigger: "px-4",
					contentBody: "px-4",
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
		"text-fg-default leading-normal antialiased",
		classes.root(),
		className,
	)}
	{...restProps}
>
	{@render children()}
</Accordion.Root>
