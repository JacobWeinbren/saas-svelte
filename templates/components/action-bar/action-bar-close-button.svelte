<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import X from "phosphor-svelte/lib/X";
	import { Icon } from "$saas/components/icon";
	import { actionBar } from "./action-bar.svelte";

	interface Props extends HTMLButtonAttributes {
		/**
		 * Accessible label for the close button.
		 * @default "Close"
		 */
		"aria-label"?: string;
	}

	let {
		"aria-label": ariaLabel = "Close",
		class: className,
		...restProps
	}: Props = $props();

	const styles = actionBar();
</script>

<button
	type="button"
	class={styles.closeButton({ class: className })}
	data-part="action-bar-close-button"
	aria-label={ariaLabel}
	{...restProps}
>
	<Icon as={X} size="sm" />
</button>
