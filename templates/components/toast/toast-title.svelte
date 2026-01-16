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

<ArkToast.Title
	class="font-(--font-weights-medium) text-(length:--font-sizes-md) leading-(--line-heights-md) {className ?? ''}"
	{...restProps}
>
	{@render children?.()}
</ArkToast.Title>
