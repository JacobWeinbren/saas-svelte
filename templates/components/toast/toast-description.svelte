<script lang="ts">
	import { Toast as ArkToast } from "@ark-ui/svelte/toast";
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<ArkToast.Description
	class="text-(length:--font-sizes-sm) leading-(--line-heights-md) text-fg-muted {className ?? ''}"
	{...restProps}
>
	{@render children?.()}
</ArkToast.Description>
