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
		// Position & Shape
		"absolute right-(--spacing-4) top-(--spacing-4) rounded-md transition-colors cursor-(--cursor-button) min-w-(--spacing-7) h-(--spacing-7)",
		// Layout
		"flex items-center justify-center shrink-0 gap-(--spacing-2)",
		// Colors - light: gray-900 text, dark: gray-200 text
		"text-(--color-fg-default)",
		// Hover - light: gray-100 bg, dark: gray-900 bg
		"hover:bg-(--color-bg-subtle)",
		// Typography
		"text-sm font-medium leading-5",
		// Focus ring
		"focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-(--color-accent-focus-ring)",
		// Disabled state
		"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",
		className,
	)}
	{...rest}
>
	<X class="size-(--spacing-4)" weight="bold" />
	<span class="sr-only">Close</span>
</Dialog.CloseTrigger>
