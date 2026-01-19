<script lang="ts">
	import {
		Toaster as ArkToaster,
		type CreateToasterReturn,
	} from "@ark-ui/svelte/toast";
	import type { Snippet } from "svelte";
	import Toast, { type ToastStatus } from "./toast.svelte";

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
		 * The content to render for each toast. If not provided, renders a default Toast.
		 */
		children?: Snippet<[() => any]>;
		[key: string]: any;
	}

	let { toaster, class: className, children, ...restProps }: Props = $props();
</script>

<ArkToaster {toaster} class={className} {...restProps}>
	{#snippet children(toast)}
		{#if children}
			{@render children(toast)}
		{:else}
			<Toast
				title={toast().title}
				description={toast().description}
				status={toast().type as ToastStatus}
				action={toast().action}
			/>
		{/if}
	{/snippet}
</ArkToaster>
