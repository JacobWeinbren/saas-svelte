<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const toast = tv({
		slots: {
			root: [
				"w-[calc(100%-var(--spacing-4))] md:w-(--sizes-sm) flex items-start gap-x-(--spacing-2) gap-y-(--spacing-2) py-(--spacing-3) ps-(--spacing-3) pe-(--spacing-6)",
				"rounded-(--radii-l2) border border-border-muted shadow-md",
				"bg-bg-panel text-fg-default",
				"z-(--z-index) pointer-events-auto",
				"[--computed-y:calc(var(--lift)*var(--fixed-index,var(--index))*(var(--first-height)+var(--gap)))]",
				// Mobile: fixed positioning to center on viewport; Desktop: absolute within group
				"fixed! md:absolute!",
				"left-1/2! md:left-auto!",
				"right-auto! md:right-[unset]!",
				"bottom-4! md:bottom-0!",
				// Mobile: fixed -50% X, Y changes for stacking; Desktop: both X and Y from Ark UI
				"[translate:-50%_var(--computed-y)] md:[translate:var(--x)_var(--computed-y)]",
				// Transitions for stacking movement
				"will-change-[translate,opacity,scale,height]",
				"transition-[translate,scale,opacity,height,box-shadow]",
				"duration-(--durations-moderate) ease-(--easings-ease-out)",
				// Entry/exit animations
				"animate-[toast-slide-in_var(--durations-moderate)_var(--easings-bounce-in)]",
				"data-[state=closed]:opacity-0",
				// Top placement: ensure proper height
				"[[data-placement^=top]_&]:min-h-(--sizes-12)",
			],
			icon: "shrink-0 size-(--sizes-5) stroke-current fill-current stroke-0",
			spinner: [
				"shrink-0 size-(--sizes-4) mt-(--spacing-0_5)",
				"inline-block rounded-(--radius-full)",
				"border-2 border-solid",
				"border-t-current border-r-current border-b-transparent border-l-transparent",
				"animate-spin [animation-duration:var(--durations-slowest)] text-accent-solid",
			],
			content: "flex flex-col flex-1 max-w-full",
			title: "text-(length:--font-sizes-sm) font-(--font-weights-medium) leading-(--line-heights-md) me-(--spacing-2)",
			description:
				"text-(length:--font-sizes-sm) leading-(--line-heights-md) opacity-80 inline",
			descriptionOnly:
				"text-(length:--font-sizes-sm) leading-(--line-heights-md) flex-1",
			action: [
				"[appearance:auto] cursor-pointer h-(--sizes-6) self-start",
				"text-(length:--font-sizes-sm) font-(--font-weights-medium) leading-(--line-heights-md)",
				"transition-[color,background-color] duration-(--durations-moderate)",
				"-ms-(--spacing-3) px-(--spacing-3) rounded-(--radii-l1)",
				"text-accent-fg/80 hover:text-accent-fg hover:bg-bg-subtle",
			],
			close: [
				"absolute top-(--spacing-2) end-2",
				"appearance-none select-none whitespace-nowrap align-middle cursor-pointer isolate",
				"shrink-0 justify-center items-center gap-(--spacing-1) min-w-(--sizes-6) h-(--sizes-6)",
				"text-(length:--font-sizes-xs) font-(--font-weights-medium) leading-(--line-heights-xs)",
				"inline-flex rounded-(--radii-l1)",
				"text-fg-default outline-0",
				"transition-[color,background-color] duration-(--durations-moderate)",
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-border-emphasized",
				"disabled:opacity-50 disabled:cursor-not-allowed",
				"hover:bg-bg-subtle",
			],
		},
		variants: {
			status: {
				info: {
					icon: "",
					descriptionOnly: "font-(--font-weights-medium)",
				},
				success: {
					icon: "text-fg-success",
					descriptionOnly: "font-(--font-weights-medium)",
				},
				warning: {
					icon: "text-fg-warning",
					descriptionOnly: "font-(--font-weights-medium)",
				},
				error: {
					icon: "text-fg-error",
					descriptionOnly: "font-(--font-weights-medium)",
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
			const toasts = group.querySelectorAll('[data-part="root"][data-state="open"]');
			toasts.forEach((toast, i) => (toast as HTMLElement).style.setProperty("--fixed-index", String(i)));
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
				<span class={styles.spinner()}></span>
			{:else if resolvedIcon}
				<Icon as={resolvedIcon} class={styles.icon()} />
			{/if}
			<ArkToast.Description class={styles.descriptionOnly()}
				>{description}</ArkToast.Description
			>
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
