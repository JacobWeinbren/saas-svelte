<script module>
	export const DIALOG_CTX = Symbol("DIALOG_CTX");
</script>

<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { setContext, type Snippet } from "svelte";

	interface Props {
		/**
		 * The dialog content.
		 */
		children: Snippet;
		/**
		 * Whether the dialog is open.
		 * @default false
		 */
		open?: boolean;
		/**
		 * Handler called when the open state changes.
		 */
		onOpenChange?: (details: { open: boolean }) => void;
		/**
		 * The size of the dialog.
		 * @default "md"
		 */
		size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full";
		/**
		 * The placement of the dialog.
		 * @default "center"
		 */
		placement?: "center" | "top" | "bottom";
		/**
		 * The scroll behavior of the dialog.
		 * @default "outside"
		 */
		scrollBehavior?: "inside" | "outside";
		/**
		 * The motion preset of the dialog.
		 * @default "scale"
		 */
		motionPreset?: "scale" | "slide-in-bottom" | "none";
		/**
		 * The role of the dialog.
		 * @default "dialog"
		 */
		role?: "dialog" | "alertdialog";
		/**
		 * Whether to lazily mount the dialog content.
		 */
		lazyMount?: boolean;
		/**
		 * Whether to unmount the dialog on exit.
		 */
		unmountOnExit?: boolean;
		[key: string]: any;
	}

	let {
		children,
		open = $bindable(false),
		onOpenChange,
		size = "md",
		placement = "center",
		scrollBehavior = "outside",
		motionPreset = "scale",
		role = "dialog",
		lazyMount,
		unmountOnExit,
		...restProps
	}: Props = $props();

	// Reactive context state
	let contextState = $state({
		size,
		placement,
		scrollBehavior,
		motionPreset,
	});

	$effect(() => {
		contextState.size = size;
		contextState.placement = placement;
		contextState.scrollBehavior = scrollBehavior;
		contextState.motionPreset = motionPreset;
	});

	setContext(DIALOG_CTX, contextState);
</script>

<Dialog.Root
	bind:open
	onOpenChange={(e) => onOpenChange?.(e)}
	{role}
	{lazyMount}
	{unmountOnExit}
	{...restProps}
>
	{@render children?.()}
</Dialog.Root>
