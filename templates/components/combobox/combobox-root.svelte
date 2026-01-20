<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export type ComboboxContext = {
		size: "xs" | "sm" | "md" | "lg";
		variant: "outline" | "subtle" | "flushed";
		styles: ReturnType<typeof combobox>;
		colourStyle: string;
	};

	export const combobox = tv({
		slots: {
			root: "flex flex-col gap-1.5 w-full",
			label: [
				"text-fg-default font-medium",
				"text-sm leading-sm",
			],
			control: "relative flex items-center",
			input: [
				"appearance-none outline-0 w-full",
				"border",
				"antialiased",
				"text-fg-default",
				"placeholder:text-fg-muted placeholder:select-none",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"focus-visible:outline-solid focus-visible:outline-(--c-focus-ring) focus-visible:border-(--c-focus-ring)",
			],
			indicatorGroup: "absolute right-0 top-0 bottom-0 flex items-center justify-center",
			trigger: [
				"flex items-center justify-center",
				"text-fg-muted",
				"cursor-pointer",
				"hover:text-fg-default",
				"disabled:cursor-not-allowed disabled:opacity-50",
			],
			clearTrigger: [
				"flex items-center justify-center",
				"text-fg-muted",
				"cursor-pointer",
				"hover:text-fg-default",
				"disabled:cursor-not-allowed disabled:opacity-50",
			],
			positioner: "",
			content: [
				"flex flex-col",
				"antialiased",
				"min-w-32",
				"max-h-xs",
				"overflow-y-auto",
				"bg-bg-panel",
				"border border-border-default",
				"shadow-overlay",
				"outline-none",
			],
			item: [
				"flex items-center gap-2",
				"relative",
				"antialiased",
				"text-fg-default",
				"cursor-pointer",
				"select-none",
				"outline-none",
				"data-highlighted:bg-bg-subtle",
				"data-disabled:opacity-50 data-disabled:cursor-not-allowed",
			],
			itemText: "flex-1 truncate",
			itemIndicator: "flex items-center justify-center size-4 ml-auto",
			itemGroup: "flex flex-col",
			itemGroupLabel: [
				"flex items-center",
				"text-fg-muted font-medium",
				"select-none",
			],
			empty: [
				"flex items-center justify-center",
				"min-h-10 px-2",
				"text-sm leading-sm",
				"text-fg-muted",
			],
			startElement: [
				"absolute left-0 top-0 bottom-0 flex items-center justify-center",
				"text-fg-muted",
				"pointer-events-none",
			],
			itemDescription: [
				"text-fg-muted",
				"ml-2",
			],
			itemPrefix: "mr-2",
		},
		variants: {
			size: {
				xs: {
					input: "h-6 px-2 rounded-sm text-xs leading-xs",
					indicatorGroup: "gap-1 px-2",
					trigger: "size-3.5 [&_svg]:size-3.5",
					clearTrigger: "size-3.5 [&_svg]:size-3.5",
					content: "rounded-sm p-0.5",
					item: "h-5 py-0.5 px-1 gap-1 rounded-xs text-xs leading-xs",
					itemGroupLabel: "min-h-5 px-1 text-xs leading-xs",
					startElement: "px-2 [&_svg]:size-3",
				},
				sm: {
					input: "h-7 px-2.5 rounded-sm text-sm leading-sm",
					indicatorGroup: "gap-1 px-2.5",
					trigger: "size-4 [&_svg]:size-4",
					clearTrigger: "size-4 [&_svg]:size-4",
					content: "rounded-md p-1",
					item: "h-6 py-1 px-1.5 gap-1.5 rounded-sm text-xs leading-xs",
					itemGroupLabel: "min-h-6 px-1.5 text-xs leading-xs",
					startElement: "px-2.5 [&_svg]:size-3.5",
				},
				md: {
					input: "h-8 px-3 rounded-sm text-sm leading-sm",
					indicatorGroup: "gap-1 px-3",
					trigger: "size-4 [&_svg]:size-4",
					clearTrigger: "size-4 [&_svg]:size-4",
					content: "rounded-lg p-1",
					item: "h-7.5 py-1.5 px-2 gap-2 rounded-sm text-sm leading-sm",
					itemGroupLabel: "min-h-7.5 px-2 text-sm leading-sm",
					startElement: "px-3 [&_svg]:size-4",
				},
				lg: {
					input: "h-10 px-4 rounded-sm text-md leading-md",
					indicatorGroup: "gap-1 px-4",
					trigger: "size-5 [&_svg]:size-5",
					clearTrigger: "size-5 [&_svg]:size-5",
					content: "rounded-lg p-1",
					item: "h-9 py-2 px-3 gap-2 rounded-sm text-md leading-md",
					itemGroupLabel: "min-h-9 px-3 text-md leading-md",
					startElement: "px-4 [&_svg]:size-5",
				},
			},
			variant: {
				outline: {
					input: [
						"bg-transparent",
						"border-border-default",
						"enabled:hover:border-border-emphasized",
						"enabled:hover:focus-visible:border-(--c-focus-ring)",
					],
				},
				subtle: {
					input: ["border-transparent", "bg-bg-subtle"],
				},
				flushed: {
					input: [
						"rounded-none border-t-0 border-x-0 border-b",
						"bg-transparent shadow-none px-0",
						"border-border-default",
						"focus-visible:outline-0 focus-visible:shadow focus-visible:border-(--c-focus-ring)",
					],
				},
			},
			invalid: {
				true: {
					input: [
						"border-border-error!",
						"focus-visible:border-border-error! focus-visible:outline-border-error!",
						"enabled:hover:border-border-emphasized",
					],
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
		},
	});

	export type ComboboxVariants = VariantProps<typeof combobox>;

	export const COMBOBOX_CTX = Symbol("COMBOBOX_CTX");
</script>

<script lang="ts">
	import { Combobox, type ComboboxRootProps } from "@ark-ui/svelte/combobox";
	import type {
		CollectionItem,
		ListCollection,
	} from "@ark-ui/svelte/combobox";
	import { setContext, type Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props
		extends Omit<ComboboxRootProps<CollectionItem>, "id" | "collection"> {
		children: Snippet;
		id?: string;
		collection: ListCollection<CollectionItem>;
		size?: ComboboxVariants["size"];
		variant?: ComboboxVariants["variant"];
		invalid?: boolean;
		colour?: ColourName;
		class?: string;
	}

	let {
		children,
		id,
		collection,
		size = "md",
		variant = "outline",
		invalid = false,
		colour = "gray",
		class: className,
		...restProps
	}: Props = $props();

	const uniqueId = $derived(
		id || `combobox-${Math.random().toString(36).substring(2, 9)}`,
	);

	const ctx: ComboboxContext = {
		get size() {
			return size ?? "md";
		},
		get variant() {
			return variant ?? "outline";
		},
		get styles() {
			return combobox({ size, variant, invalid });
		},
		get colourStyle() {
			return getColourStyle(colour);
		},
	};

	setContext(COMBOBOX_CTX, ctx);
</script>

<Combobox.Root
	id={uniqueId}
	{collection}
	class={ctx.styles.root({ class: className })}
	{...restProps}
>
	{@render children?.()}
</Combobox.Root>
