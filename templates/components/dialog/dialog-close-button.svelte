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
		// Updated to match HTML output
		"absolute right-4 top-4 rounded-md transition-colors", // Position & Shape
		"text-gray-900 hover:bg-gray-100", // Colors & Hover
		"flex items-center justify-center rounded p-1", // Layout
		"focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-950 dark:focus-visible:outline-gray-100",
		className,
	)}
	{...rest}
>
	<X class="size-4" weight="bold" />
	<span class="sr-only">Close</span>
</Dialog.CloseTrigger>
