<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import X from "phosphor-svelte/lib/X";
	import { twMerge } from "tailwind-merge";

	interface Props {
		class?: string;
		[key: string]: any;
	}

	let { class: className, ...rest }: Props = $props();
</script>

<Dialog.CloseTrigger
	class={twMerge(
		"absolute right-(--spacing-4) top-(--spacing-4) rounded-(--radius-md) transition-colors cursor-(--cursor-button) min-w-(--spacing-7) h-(--spacing-7)", // Position & Shape
		"text-(--color-fg-default) hover:bg-(--color-bg-subtle)", // Colors & Hover
		"flex items-center justify-center rounded p-(--spacing-1)", // Layout
		"focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--color-accent-focus-ring)",
		className,
	)}
	{...rest}
>
	<X class="size-(--spacing-4)" weight="bold" />
	<span class="sr-only">Close</span>
</Dialog.CloseTrigger>
