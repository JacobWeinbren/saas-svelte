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

<ArkToast.ActionTrigger
	class="text-(length:--font-sizes-sm) font-(--font-weights-medium) underline underline-offset-2 hover:no-underline cursor-pointer {className ?? ''}"
	{...restProps}
>
	{@render children?.()}
</ArkToast.ActionTrigger>
