<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const clipboardButton = tv({
		base: [
			"relative isolate inline-flex shrink-0 cursor-(--cursor-button) appearance-none items-center justify-center align-middle whitespace-nowrap outline-0 select-none",
			"h-8 min-w-8 gap-x-2 px-3 text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
			"rounded-(--radii-l1) font-(--font-weights-medium)",
			"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized",
			"disabled:opacity-50 disabled:cursor-not-allowed",
			"text-fg-default",
			"shadow-sm border",
			"bg-bg-default border-border-emphasized",
			"hover:bg-bg-subtle",
		],
		variants: {
			icon: { true: "px-0 w-8" },
		},
		defaultVariants: {
			icon: false,
		},
	});

	export const clipboardInput = tv({
		base: [
			"appearance-none outline-0 w-full relative",
			"h-8 min-w-8 px-3 text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
			"rounded-(--radii-l1) border",
			"antialiased",
			"text-fg-default",
			"bg-transparent",
			"border-border-default",
			"disabled:opacity-50 disabled:cursor-(--cursor-disabled)",
			"focus-visible:outline-solid focus-visible:outline-border-emphasized focus-visible:border-border-emphasized",
			"enabled:hover:border-border-emphasized",
		],
	});
</script>

<script lang="ts">
	import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
	import type { ClipboardRootProps } from "@ark-ui/svelte/clipboard";
	import type { Snippet } from "svelte";
	import Check from "phosphor-svelte/lib/Check";
	import CopySimple from "phosphor-svelte/lib/CopySimple";

	interface Props extends Omit<ClipboardRootProps, "id"> {
		/**
		 * The unique identifier for the clipboard.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The value to be copied to the clipboard.
		 */
		value: string;
		/**
		 * The timeout for showing the "copied" state (in ms).
		 * @default 3000
		 */
		timeout?: number;
		/**
		 * Custom trigger content. If not provided, shows an icon button.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply to the root.
		 */
		class?: string;
	}

	let {
		id,
		value,
		timeout = 3000,
		children,
		class: className,
		...rest
	}: Props = $props();

	const uniqueId = $derived(
		id || `clipboard-${Math.random().toString(36).substring(2, 9)}`,
	);
</script>

<ArkClipboard.Root id={uniqueId} {value} {timeout} class={className} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		<ArkClipboard.Trigger
			class={clipboardButton({ icon: true })}
			aria-label="Copy to clipboard"
		>
			<ArkClipboard.Indicator>
				<CopySimple class="size-3.5" weight="bold" />
				{#snippet copied()}
					<Check class="size-3.5" weight="bold" />
				{/snippet}
			</ArkClipboard.Indicator>
		</ArkClipboard.Trigger>
	{/if}
</ArkClipboard.Root>
