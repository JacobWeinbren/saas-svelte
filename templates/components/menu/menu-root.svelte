<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export type MenuContext = {
		size: "sm" | "md";
		styles: ReturnType<typeof menu>;
		colourStyle: string;
	};

	export const menu = tv({
		slots: {
			positioner: "z-(--z-indices-dropdown)",
			content: [
				"flex flex-col",
				"min-w-[128px]",
				"max-h-[370px]",
				"py-1 px-1",
				"rounded-lg",
				"bg-bg-overlay backdrop-blur-lg",
				"border border-border-default",
				"shadow-(--shadow-overlay)",
				"outline-none",
			],
			item: [
				"flex items-center gap-2",
				"relative",
				"min-h-7 px-2",
				"rounded",
				"text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				"text-fg-default",
				"cursor-(--cursor-button)",
				"select-none",
				"outline-none",
				"data-highlighted:bg-(--c-solid) data-highlighted:text-(--c-contrast)",
				"data-disabled:opacity-50 data-disabled:cursor-not-allowed",
			],
			itemCommand: [
				"text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				"text-fg-default opacity-60",
				"ps-4 ml-auto",
				"tracking-(--letter-spacings-wider)",
				"font-(family-name:--fonts-mono)",
			],
			itemIndicator: "flex items-center justify-center w-4 h-4",
			separator: ["my-1", "border-b border-border-default"],
			itemGroup: "flex flex-col",
			itemGroupLabel: [
				"flex items-center",
				"min-h-7 px-2",
				"text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				"text-fg-muted",
				"select-none",
			],
			triggerItem: [
				"flex items-center justify-between gap-2",
				"relative",
				"min-h-7 px-2",
				"rounded",
				"text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				"text-fg-default",
				"cursor-(--cursor-button)",
				"select-none",
				"outline-none",
				"data-highlighted:bg-(--c-solid) data-highlighted:text-(--c-contrast)",
				"data-[state=open]:bg-(--c-solid) data-[state=open]:text-(--c-contrast)",
			],
			contextTrigger: "",
		},
		variants: {
			size: {
				sm: {
					content: "",
					item: "min-h-6 px-1.5 gap-1 text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
					itemCommand: [
						"text-(length:--font-sizes-2xs) leading-(--line-heights-2xs)",
						"pl-3",
					],
					triggerItem:
						"min-h-6 px-1.5 gap-1 text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
					itemGroupLabel:
						"min-h-6 px-1.5 text-(length:--font-sizes-xs) leading-(--line-heights-xs)",
				},
				md: {},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type MenuVariants = VariantProps<typeof menu>;

	export const MENU_CTX = Symbol("MENU_CTX");
</script>

<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuRootProps } from "@ark-ui/svelte/menu";
	import { setContext, type Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<MenuRootProps, "id"> {
		/**
		 * The menu content.
		 */
		children: Snippet;
		/**
		 * The unique identifier for the menu.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The size of the menu.
		 * @default "md"
		 */
		size?: MenuVariants["size"];
		/**
		 * The colour palette for highlighted items.
		 * @default "indigo"
		 */
		colour?: ColourName;
	}

	let {
		children,
		id,
		size = "md",
		colour = "indigo",
		...restProps
	}: Props = $props();

	const uniqueId = $derived(
		id || `menu-${Math.random().toString(36).substring(2, 9)}`,
	);

	const ctx: MenuContext = {
		get size() {
			return size;
		},
		get styles() {
			return menu({ size });
		},
		get colourStyle() {
			return getColourStyle(colour);
		},
	};

	setContext(MENU_CTX, ctx);
</script>

<Menu.Root id={uniqueId} {...restProps}>
	{@render children?.()}
</Menu.Root>
