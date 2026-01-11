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
				"flex items-center gap-3 w-full font-medium",
				"rounded-md",
				"outline-none",
				"focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-zinc-600",
				"dark:focus-visible:outline-zinc-400",
				"disabled:opacity-50 disabled:cursor-not-allowed",
			],
			content: "overflow-hidden text-sm dark:text-zinc-300",
			contentBody: "",
			indicator:
				"flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 transition-transform duration-200",
			icon: "shrink-0 text-zinc-600 dark:text-zinc-400",
		},
		variants: {
			size: {
				sm: {
					trigger: "text-sm py-2",
					content: "text-sm",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				md: {
					trigger: "text-sm py-2",
					content: "text-sm",
					contentBody: "pt-2 pb-4",
					indicator: "size-3.5",
					icon: "size-3.5",
				},
				lg: {
					trigger: "text-base py-2.5",
					content: "text-base",
					contentBody: "pt-2.5 pb-5",
					indicator: "size-4",
					icon: "size-4",
				},
			},
			variant: {
				outline: {
					item: "border-b border-gray-200 dark:border-gray-800",
				},
				subtle: {
					item: "rounded-md data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800",
					trigger: "px-4",
					contentBody: "px-4",
				},
				enclosed: {
					root: "border border-gray-200 dark:border-gray-800 rounded-md",
					item: "border-b border-gray-200 dark:border-gray-800 last:border-b-0 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800",
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
	{multiple}
	{orientation}
	class={twMerge(
		"text-black dark:text-white leading-normal font-[Inter,Inter_Fallback]",
		classes.root(),
		className,
	)}
	{...restProps}
>
	{@render children()}
</Accordion.Root>
