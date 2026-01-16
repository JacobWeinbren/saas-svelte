<script lang="ts">
	import ToggleTip from "./toggle-tip.svelte";
	import type { ToggleTipVariants } from "./toggle-tip.svelte";
	import type { PopoverRootProps } from "@ark-ui/svelte/popover";
	import { Icon } from "$saas/components/icon";
	import Info from "phosphor-svelte/lib/Info";
	import type { Snippet } from "svelte";

	interface Props extends Omit<PopoverRootProps, "id" | "children"> {
		/**
		 * The unique identifier for the info tip.
		 */
		id?: string;
		/**
		 * The content to display in the info tip.
		 */
		children: string | Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the info tip.
		 * @default "xs"
		 */
		size?: ToggleTipVariants["size"];
		/**
		 * The positioning options for the info tip.
		 */
		positioning?: PopoverRootProps["positioning"];
		/**
		 * Accessible label for the info button.
		 * @default "More information"
		 */
		"aria-label"?: string;
	}

	let {
		id,
		children,
		class: className,
		size = "xs",
		positioning = { placement: "top", gutter: 8 },
		"aria-label": ariaLabel = "More information",
		...rest
	}: Props = $props();
</script>

<ToggleTip
	content={children}
	{size}
	{id}
	{positioning}
	class={className}
	{...rest}
>
	<button
		type="button"
		aria-label={ariaLabel}
		class="inline-flex items-center justify-center align-middle p-0 border-0 bg-transparent h-(--spacing-4) w-(--spacing-4) cursor-(--cursor-button) rounded-(--radii-l1) outline-0 transition-[color,background-color] duration-(--durations-moderate) hover:bg-bg-subtle focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized"
	>
		<Icon as={Info} size="sm" />
	</button>
</ToggleTip>
