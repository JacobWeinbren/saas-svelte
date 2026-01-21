<script lang="ts">
	import {
		Toaster as ArkToaster,
		type CreateToasterReturn,
	} from "@ark-ui/svelte/toast";
	import { Portal } from "@ark-ui/svelte/portal";
	import type { Snippet } from "svelte";
	import Toast, { type ToastStatus } from "./toast.svelte";

	interface Props {
		toaster: CreateToasterReturn;
		class?: string;
		children?: Snippet<[() => any]>;
		[key: string]: any;
	}

	let { toaster, class: className, children, ...restProps }: Props = $props();
</script>

<Portal>
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
</Portal>
