<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import type { Snippet } from "svelte";
	import { tv } from "tailwind-variants";

	const dialogTitle = tv({
		base: [
			// Typography
			"wrap-break-word text-md leading-md font-semibold",
			// Text color using semantic token
			"text-fg-default",
			// Font rendering
			"antialiased",
		],
	});

	interface Props {
		children: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Dialog.Title class={dialogTitle({ class: className })} {...rest}>
	{@render children()}
</Dialog.Title>
