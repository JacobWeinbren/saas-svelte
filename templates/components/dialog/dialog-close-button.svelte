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
		// Changed absolute position from right-4 top-4 to right-6 top-6
		// This matches the px-6 pt-6 padding of the Dialog Header for proper alignment.
		"absolute right-6 top-6 opacity-70 transition-opacity hover:opacity-100",
		"disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		"cursor-pointer text-gray-500 dark:text-gray-400",
		"rounded-sm",
		// Focus styles preserved from previous steps
		"focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-950 dark:focus-visible:outline-gray-100",
		className,
	)}
	{...rest}
>
	<X class="size-4" weight="bold" />
	<span class="sr-only">Close</span>
</Dialog.CloseTrigger>
