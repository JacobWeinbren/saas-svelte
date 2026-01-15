<script lang="ts">
	import { Dialog, Portal } from "@ark-ui/svelte";
	import { tv } from "tailwind-variants";
	import { getContext, type Snippet } from "svelte";
	import { DIALOG_CTX } from "./dialog-root.svelte";

	interface Props {
		children: Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();

	type DialogContext = {
		size: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "cover";
		placement: "center" | "top" | "bottom";
		scrollBehavior: "inside" | "outside";
		motionPreset: "scale" | "slide-in-bottom" | "none";
	};

	const ctx = getContext(DIALOG_CTX) as DialogContext;

	const positionerStyles = tv({
		base: "fixed inset-0 z-(--z-indices-modal) flex w-screen h-dvh overflow-hidden",
		variants: {
			placement: {
				center: "items-start justify-center",
				top: "items-start justify-center",
				bottom: "items-end justify-center",
			},
			scrollBehavior: {
				inside: "overflow-hidden",
				outside: "overflow-y-auto",
			},
			size: {
				xs: "",
				sm: "",
				md: "",
				lg: "",
				xl: "",
				full: "",
				cover: "p-(--spacing-10) items-center justify-center",
			},
		},
		defaultVariants: {
			placement: "center",
			scrollBehavior: "outside",
		},
	});

	const contentStyles = tv({
		base: [
			"relative flex flex-col",
			// Background with translucency and blur
			"bg-white/95 dark:bg-gray-900/85 backdrop-blur-md",
			// Text color
			"text-(--color-fg-default)",
			// Shadow
			"shadow-(--shadow-lg)",
			"mx-auto",
			"outline-none focus:outline-none",
			"antialiased",
			// Typography
			"text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
		],
		variants: {
			size: {
				xs: "w-full max-w-sm rounded-(--radius-lg)",
				sm: "w-full max-w-md rounded-(--radius-lg)",
				md: "w-full max-w-lg rounded-(--radius-lg)",
				lg: "w-full max-w-2xl rounded-(--radius-lg)",
				xl: "w-full max-w-4xl rounded-(--radius-lg)",
				full: "w-full h-full",
				cover: "w-full h-full rounded-(--radius-lg) my-0 overflow-hidden",
			},
			scrollBehavior: {
				inside: "max-h-[calc(100vh-4rem)] my-auto",
				outside: "my-(--spacing-16)",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});
</script>

<Portal>
	<Dialog.Backdrop
		class="fixed inset-0 z-(--z-indices-overlay) transition-opacity duration-(--durations-moderate) bg-(--color-bg-backdrop) data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
		data-state-layer
	/>

	<Dialog.Positioner
		class={positionerStyles({
			placement: ctx.placement === "center" ? "top" : ctx.placement,
			scrollBehavior:
				ctx.size === "cover" ? "inside" : ctx.scrollBehavior,
			size: ctx.size,
		})}
	>
		<Dialog.Content
			tabindex={-1}
			class={contentStyles({
				size: ctx.size,
				scrollBehavior: ctx.scrollBehavior,
				class: className,
			}) +
				(ctx.motionPreset === "slide-in-bottom"
					? " data-[state=open]:animate-dialog-slide-in data-[state=closed]:animate-dialog-slide-out"
					: " data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out")}
			data-motion-preset={ctx.motionPreset}
			{...rest}
		>
			{@render children()}
		</Dialog.Content>
	</Dialog.Positioner>
</Portal>
