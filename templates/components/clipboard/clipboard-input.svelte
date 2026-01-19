<script lang="ts">
	import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
	import { clipboardInput } from "./clipboard.svelte";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<ArkClipboard.Input class={clipboardInput({ class: className })} />
