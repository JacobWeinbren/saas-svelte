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
		base: "fixed inset-0 z-50 flex w-screen h-[100dvh] overflow-hidden",
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
				cover: "p-10 items-center justify-center",
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
			// Darkened background to gray-900/85
			"bg-zinc-50/95 dark:bg-gray-900/85 backdrop-blur-md",
			// Adjusted to match HTML: shadow-md, no ring
			"shadow-md",
			"mx-auto",
			"outline-none focus:outline-none",
			"antialiased",
		],
		variants: {
			size: {
				xs: "w-full max-w-sm rounded-lg",
				sm: "w-full max-w-md rounded-lg",
				md: "w-full max-w-lg rounded-lg",
				lg: "w-full max-w-2xl rounded-lg",
				xl: "w-full max-w-4xl rounded-lg",
				full: "w-full h-full",
				cover: "w-full h-full rounded-lg my-0 overflow-hidden",
			},
			scrollBehavior: {
				inside: "max-h-[calc(100vh-4rem)] my-auto",
				outside: "my-16",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});
</script>

<Portal>
	<Dialog.Backdrop
		class="fixed inset-0 z-40 transition-opacity duration-200 bg-zinc-950/50"
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
			})}
			data-motion-preset={ctx.motionPreset}
			{...rest}
		>
			{@render children()}
		</Dialog.Content>
	</Dialog.Positioner>
</Portal>

<style>
	:global([data-state-layer][data-state="open"]) {
		animation: fade-in 0.2s ease-out forwards;
	}
	:global([data-state-layer][data-state="closed"]) {
		animation: fade-out 0.2s ease-in forwards;
	}

	:global([data-part="content"][data-state="open"]) {
		animation:
			fade-in 0.2s ease-out,
			scale-in 0.2s ease-out;
	}
	:global([data-part="content"][data-state="closed"]) {
		animation:
			fade-out 0.2s ease-in,
			scale-out 0.2s ease-in;
	}

	:global(
		[data-part="content"][data-motion-preset="slide-in-bottom"][data-state="open"]
	) {
		animation:
			fade-in 0.2s ease-out,
			slide-in-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	:global(
		[data-part="content"][data-motion-preset="slide-in-bottom"][data-state="closed"]
	) {
		animation:
			fade-out 0.2s ease-in,
			slide-out-bottom 0.2s ease-in;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	@keyframes scale-in {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes scale-out {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(0.95);
		}
	}
	@keyframes slide-in-bottom {
		from {
			transform: translateY(2rem);
		}
		to {
			transform: translateY(0);
		}
	}
	@keyframes slide-out-bottom {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(2rem);
		}
	}
</style>
