<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { SIDEBAR_CTX, type SidebarContext, sidebar } from "./sidebar-root.svelte";

	interface Props extends HTMLAnchorAttributes {
		/**
		 * Whether this link is currently active
		 * @default false
		 */
		active?: boolean;
		/**
		 * Icon to display before the label
		 */
		icon?: Snippet;
		/**
		 * The label text or content
		 */
		children?: Snippet;
	}

	let { active = false, icon, children, class: className, href, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const styles = $derived(ctx?.styles ?? sidebar());
	const finalClass = $derived(styles.item({ active, class: className }));
	const iconClass = $derived(styles.itemIcon());
	const labelClass = $derived(styles.itemLabel());
</script>

<a
	{href}
	class={finalClass}
	aria-current={active ? "page" : undefined}
	data-active={active || undefined}
	{...restProps}
>
	{#if icon}
		<span class={iconClass}>
			{@render icon()}
		</span>
	{/if}
	<span class={labelClass}>
		{@render children?.()}
	</span>
</a>
