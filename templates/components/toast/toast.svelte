<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const toast = tv({
		slots: {
			root: [
				"w-(--sizes-sm) flex items-start gap-x-(--spacing-2) gap-y-(--spacing-2) py-(--spacing-3) ps-(--spacing-3) pe-(--spacing-6)",
				"rounded-(--radii-l2) overflow-hidden border border-border-muted shadow-md",
				"bg-bg-panel text-fg-default",
				"absolute z-(--z-index) pointer-events-auto",
				"[--computed-y:calc(var(--lift)*var(--fixed-index,var(--index))*(var(--first-height)+var(--gap)))]",
				"inset-auto",
				"[translate:var(--x)_var(--computed-y)]",
				// Transitions for stacking movement - 500ms with bouncy easing
				"will-change-[translate,opacity,scale,height]",
				"transition-[translate,scale,opacity,height,box-shadow]",
				"duration-500 ease-(--easings-bounce-in)",
				// Entry/exit animations with bounce
				"animate-[toast-slide-in_300ms_cubic-bezier(0.34,1.24,0.64,1)]",
				"data-[state=closed]:animate-[toast-slide-out_200ms_ease-in_forwards]",
			],
			icon: "shrink-0 size-(--sizes-5) stroke-current fill-current stroke-0",
			spinner: [
				"shrink-0 size-(--sizes-4) mt-0.5",
				"inline-block rounded-full",
				"border-2 border-solid",
				"border-t-current border-r-current border-b-transparent border-l-transparent",
				"animate-spin [animation-duration:0.5s] text-accent-fg",
			],
			content: "flex flex-col flex-1 max-w-full",
			title: "text-(length:--font-sizes-sm) font-(--font-weights-medium) leading-(--line-heights-md) me-(--spacing-2)",
			description: "text-(length:--font-sizes-sm) leading-(--line-heights-md) opacity-80 inline",
			action: [
				"[appearance:auto] cursor-pointer h-(--sizes-6) self-start",
				"text-(length:--font-sizes-sm) font-(--font-weights-medium) leading-(--line-heights-md)",
				"transition-all duration-(--durations-moderate)",
				"-ms-(--spacing-3) px-(--spacing-3) rounded-(--radii-l1)",
				"text-accent-fg/80 hover:text-accent-fg hover:bg-bg-subtle",
			],
			close: [
				"absolute top-(--spacing-2) [inset-inline-end:0.5rem]",
				"appearance-none select-none whitespace-nowrap align-middle cursor-pointer isolate",
				"shrink-0 justify-center items-center gap-(--spacing-1) min-w-(--sizes-6) h-(--sizes-6)",
				"text-(length:--font-sizes-xs) font-(--font-weights-medium) leading-(--line-heights-xs)",
				"inline-flex rounded-(--radii-l1)",
				"text-fg-default outline-0",
				"transition-colors duration-(--durations-moderate)",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-neutral-solid",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"hover:bg-bg-subtle",
			],
		},
		variants: {
			status: {
				info: { icon: "" },
				success: { icon: "text-fg-success" },
				warning: { icon: "text-fg-warning" },
				error: { icon: "text-fg-error" },
				loading: { icon: "text-accent-fg" },
			},
		},
		defaultVariants: {
			status: "info",
		},
	});

	export type ToastVariants = VariantProps<typeof toast>;
</script>

<script lang="ts">
	import { Toast as ArkToast } from "@ark-ui/svelte/toast";
	import type { Snippet, Component } from "svelte";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import WarningCircle from "phosphor-svelte/lib/WarningCircle";
	import X from "phosphor-svelte/lib/X";
	import { Icon } from "$saas/components/icon";

	type Status = "info" | "success" | "warning" | "error" | "loading";

	interface Props {
		class?: string;
		status?: Status;
		icon?: boolean | Component<any>;
		title?: string;
		description?: string;
		action?: { label: string; onClick?: () => void };
		closable?: boolean;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		class: className,
		status = "info",
		icon,
		title,
		description,
		action,
		closable = true,
		style,
		children,
		...restProps
	}: Props = $props();

	const ICONS: Record<Status, Component<any> | null> = {
		info: null,
		success: CheckCircle,
		warning: WarningCircle,
		error: WarningCircle,
		loading: null,
	};

	const resolvedIcon = $derived(
		typeof icon !== "boolean" && icon ? icon : icon === false ? null : ICONS[status]
	);

	// Fix Ark UI bugs: --index doesn't increment properly in overlap:false mode
	// and height is calculated incorrectly
	function fixIndex(node: HTMLElement) {
		const root = node.querySelector<HTMLElement>('[data-part="root"]');
		const group = node.closest('[data-part="group"]');

		if (!root || !group) return;

		let rafId: number | null = null;

		const update = () => {
			const toasts = Array.from(group.querySelectorAll('[data-part="root"][data-state="open"]'));
			const index = toasts.indexOf(root);
			if (index >= 0) {
				root.style.setProperty("--fixed-index", String(index));
			}
		};

		const debouncedUpdate = () => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				update();
				rafId = null;
			});
		};

		// Only observe childList changes (toasts added/removed), not attributes
		const observer = new MutationObserver(debouncedUpdate);
		observer.observe(group, { childList: true });
		update();

		return {
			destroy() {
				if (rafId) cancelAnimationFrame(rafId);
				observer.disconnect();
			},
		};
	}

	const styles = $derived(toast({ status }));
</script>

<div use:fixIndex class="contents">
	<ArkToast.Root class={styles.root({ class: className })} {style} {...restProps}>
		{#if children}
			{@render children()}
		{:else}
			{#if status === "loading"}
				<span class={styles.spinner()}></span>
			{:else if resolvedIcon}
				<Icon as={resolvedIcon} class={styles.icon()} />
			{/if}

			<div class={styles.content()}>
				{#if title}
					<ArkToast.Title class={styles.title()}>{title}</ArkToast.Title>
				{/if}
				{#if description}
					<ArkToast.Description class={styles.description()}>{description}</ArkToast.Description>
				{/if}
				{#if action}
					<ArkToast.ActionTrigger class={styles.action()} onclick={action.onClick}>
						{action.label}
					</ArkToast.ActionTrigger>
				{/if}
			</div>
		{/if}

		{#if closable}
			<ArkToast.CloseTrigger class={styles.close()} aria-label="Dismiss notification">
				<Icon as={X} size="xs" />
			</ArkToast.CloseTrigger>
		{/if}
	</ArkToast.Root>
</div>
