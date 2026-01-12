<script module>
	export const DIALOG_CTX = Symbol("DIALOG_CTX");
</script>

<script lang="ts">
	import { Dialog } from "@ark-ui/svelte";
	import { setContext, type Snippet } from "svelte";

	interface Props {
		children: Snippet;
		open?: boolean;
		onOpenChange?: (details: { open: boolean }) => void;
		size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full";
		placement?: "center" | "top" | "bottom";
		scrollBehavior?: "inside" | "outside";
		motionPreset?: "scale" | "slide-in-bottom" | "none";
		role?: "dialog" | "alertdialog";
		lazyMount?: boolean;
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
