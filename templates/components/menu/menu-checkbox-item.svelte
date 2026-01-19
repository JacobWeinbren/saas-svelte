<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuCheckboxItemProps } from "@ark-ui/svelte/menu";
	import { getContext, type Snippet } from "svelte";
	import { MENU_CTX, type MenuContext } from "./menu-root.svelte";

	interface Props extends MenuCheckboxItemProps {
		/**
		 * The checkbox item content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Element to render at the start of the item (typically MenuItemIndicator).
		 */
		startElement?: Snippet;
	}

	let { children, class: className, startElement, ...rest }: Props = $props();

	const ctx = getContext<MenuContext>(MENU_CTX);
</script>

<Menu.CheckboxItem
	class={ctx?.styles?.item({ class: className })}
	style={ctx?.colourStyle}
	{...rest}
>
	{#if startElement}
		<span class="flex items-center justify-center w-4 shrink-0">
			{@render startElement()}
		</span>
	{/if}
	<Menu.ItemText class="flex-1">
		{@render children()}
	</Menu.ItemText>
</Menu.CheckboxItem>
