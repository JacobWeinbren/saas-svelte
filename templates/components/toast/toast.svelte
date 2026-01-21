<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const toast = tv({
		slots: {
			root: [
				// Layout
				"w-full",
				"md:w-96",
				"flex",
				"items-start",
				"gap-y-2",
				"gap-x-2",
				"pl-3",
				"pr-6",
				"py-3",
				// Appearance
				"rounded-md",
				"border",
				"border-border-muted",
				"shadow-lg",
				"bg-bg-overlay",
				"text-fg-default",
				"antialiased",
				// Positioning
				"z-(--z-index)",
				"pointer-events-auto",
				"[--computed-y:calc(var(--lift)*var(--fixed-index,var(--index))*(var(--first-height)+var(--gap)))]",
				// Mobile: fixed positioning to center on viewport; Desktop: absolute within group
				"fixed!",
				"md:absolute!",
				"left-1/2!",
				"md:left-auto!",
				"right-auto!",
				"md:right-[unset]!",
				"bottom-4!",
				"md:bottom-0!",
				// Mobile: fixed -50% X, Y changes for stacking; Desktop: both X and Y from Ark UI
				"[translate:-50%_var(--computed-y)]",
				"md:[translate:var(--x)_var(--computed-y)]",
				// Transitions for stacking movement
				"will-change-[translate,opacity,scale,height]",
				"transition-all",
				"duration-moderate",
				"ease-(--easings-ease-out)",
				// Overflow
				"overflow-x-hidden",
				"overflow-y-hidden",
				// Entry/exit animations
				"animate-[toast-slide-in_var(--durations-moderate)_var(--easings-bounce-in)]",
				"data-[state=closed]:opacity-0",
			],
			icon: "shrink-0 w-5 h-5 stroke-current fill-current stroke-0",
			spinner: [
				"shrink-0",
				"w-4",
				"h-4",
				"mt-0.5",
				"animate-spin",
				"[animation-duration:var(--durations-slow)]",
				"text-accent-solid",
			],
			content: "flex flex-col flex-1 max-w-full",
			title: "text-sm font-medium leading-sm me-2",
			description: "opacity-80 text-sm leading-sm inline",
			descriptionOnly: "text-sm leading-sm flex-1",
			action: [
				"appearance-auto",
				"cursor-pointer",
				"h-6",
				"self-start",
				"text-sm",
				"font-medium",
				"leading-sm",
				"transition-all",
				"duration-moderate",
				"-ms-3",
				"px-3",
				"rounded",
				"text-accent-fg/80",
				"hover:text-accent-fg",
				"hover:bg-bg-subtle",
			],
			close: [
				"absolute",
				"top-2",
				"end-2",
				"appearance-none",
				"select-none",
				"whitespace-nowrap",
				"align-middle",
				"cursor-pointer",
				"isolate",
				"shrink-0",
				"justify-center",
				"items-center",
				"gap-y-1",
				"gap-x-1",
				"min-w-6",
				"h-6",
				"text-xs",
				"font-medium",
				"leading-xs",
				"inline-flex",
				"rounded",
				"text-fg-default",
				"outline-0",
				"transition-all",
				"duration-moderate",
				"focus-visible:outline-offset-2",
				"focus-visible:outline-1",
				"focus-visible:outline-solid",
				"focus-visible:outline-border-emphasized",
				"disabled:opacity-50",
				"disabled:cursor-not-allowed",
				"hover:bg-bg-subtle",
			],
		},
		variants: {
			status: {
				info: {
					icon: "",
					descriptionOnly: "font-medium",
				},
				success: {
					icon: "text-fg-success",
					descriptionOnly: "font-medium",
				},
				warning: {
					icon: "text-fg-warning",
					descriptionOnly: "font-medium",
				},
				error: {
					icon: "text-fg-error",
					descriptionOnly: "font-medium",
				},
				loading: {
					icon: "text-accent-fg",
					descriptionOnly: "opacity-80",
				},
			},
		},
		defaultVariants: {
			status: "info",
		},
	});

	export type ToastVariants = VariantProps<typeof toast>;
	export type ToastStatus = "info" | "success" | "warning" | "error" | "loading";
</script>

<script lang="ts">
	import { Toast as ArkToast } from "@ark-ui/svelte/toast";
	import type { Snippet, Component } from "svelte";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import WarningCircle from "phosphor-svelte/lib/WarningCircle";
	import X from "phosphor-svelte/lib/X";
	import { Icon } from "$saas/components/icon";
	import { Spinner } from "$saas/components/spinner";

	interface Props {
		class?: string;
		status?: ToastStatus;
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

	const ICONS: Record<ToastStatus, Component<any> | null> = {
		info: null,
		success: CheckCircle,
		warning: WarningCircle,
		error: WarningCircle,
		loading: null,
	};

	const resolvedIcon = $derived(
		typeof icon !== "boolean" && icon
			? icon
			: icon === false
				? null
				: ICONS[status],
	);

	// Single-line toast: description only, no title or action, and not loading
	const isSingleLine = $derived(
		description && !title && !action && status !== "loading",
	);

	// Fix Ark UI bug: --index doesn't update properly when toasts are removed
	function fixIndex(node: HTMLElement) {
		const group = node.closest('[data-part="group"]');
		if (!group) return;

		const update = () => {
			const toasts = group.querySelectorAll(
				'[data-part="root"][data-state="open"]',
			);
			toasts.forEach((toast, i) =>
				(toast as HTMLElement).style.setProperty(
					"--fixed-index",
					String(i),
				),
			);
		};

		const observer = new MutationObserver(update);
		observer.observe(group, { childList: true });
		update();

		return { destroy: () => observer.disconnect() };
	}

	const styles = $derived(toast({ status }));
</script>

<div use:fixIndex class="contents">
	<ArkToast.Root
		class={styles.root({ class: className })}
		{style}
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else if isSingleLine}
			{#if status === "loading"}
				<Spinner size="sm" colour="indigo" class="shrink-0 mt-0.5" />
			{:else if resolvedIcon}
				<Icon as={resolvedIcon} class={styles.icon()} />
			{/if}
			<ArkToast.Description class={styles.descriptionOnly()}
				>{description}</ArkToast.Description
			>
		{:else}
			{#if status === "loading"}
				<Spinner size="sm" colour="indigo" class="shrink-0 mt-0.5" />
			{:else if resolvedIcon}
				<Icon as={resolvedIcon} class={styles.icon()} />
			{/if}

			<div class={styles.content()}>
				{#if title}
					<ArkToast.Title class={styles.title()}
						>{title}</ArkToast.Title
					>
				{/if}
				{#if description}
					<ArkToast.Description class={styles.description()}
						>{description}</ArkToast.Description
					>
				{/if}
				{#if action}
					<ArkToast.ActionTrigger
						class={styles.action()}
						onclick={action.onClick}
					>
						{action.label}
					</ArkToast.ActionTrigger>
				{/if}
			</div>
		{/if}

		{#if closable}
			<ArkToast.CloseTrigger
				class={styles.close()}
				aria-label="Dismiss notification"
			>
				<Icon as={X} size="xs" />
			</ArkToast.CloseTrigger>
		{/if}
	</ArkToast.Root>
</div>

<style>
	/* Prevent ghost elements from causing overflow on toast exit */
	:global(
		[data-scope="toast"][data-part="root"][data-first] [data-ghost="before"]
	) {
		scale: 1 1 !important;
	}
</style>
