<script lang="ts">
	import { Toaster as ArkToaster, type CreateToasterReturn } from "@ark-ui/svelte/toast";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The toaster instance from createToaster.
		 */
		toaster: CreateToasterReturn;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The content to render for each toast.
		 */
		children?: Snippet<[() => any]>;
		[key: string]: any;
	}

	let { toaster, class: className, children, ...restProps }: Props = $props();
</script>

<ArkToaster {toaster} class={className} {...restProps}>
	{#snippet children(toast)}
		{@render children?.(toast)}
	{/snippet}
</ArkToaster>
