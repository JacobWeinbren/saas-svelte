<script lang="ts">
	import { Toast as ArkToast } from "@ark-ui/svelte/toast";
	import type { Snippet } from "svelte";
	import X from "phosphor-svelte/lib/X";
	import { Icon } from "$saas/components/icon";

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<ArkToast.CloseTrigger
	class="absolute top-2 right-2 p-0.5 rounded-(--radii-l1) text-fg-muted hover:text-fg-default hover:bg-bg-subtle transition-[background,color] duration-(--durations-moderate) cursor-pointer {className ?? ''}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon as={X} size="sm" />
	{/if}
</ArkToast.CloseTrigger>
