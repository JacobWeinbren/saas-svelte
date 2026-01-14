<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import Info from "phosphor-svelte/lib/Info";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import Warning from "phosphor-svelte/lib/Warning";
	import XCircle from "phosphor-svelte/lib/XCircle";
	import type { Snippet, Component } from "svelte";

	import { type ColourName, generateColourVars } from "$saas/utils/colours";
	import { Icon } from "$saas/components/icon";

	const alert = tv({
		slots: {
			root: "relative w-full flex items-start p-(--spacing-4) rounded-(--radius-md) text-sm leading-5 antialiased gap-y-(--spacing-3) gap-x-(--spacing-3) font-sans",
			iconWrapper:
				"shrink-0 inline-flex items-center justify-center w-(--spacing-5) h-(--spacing-5) text-lg leading-7",
			content: "flex-1 min-w-0 flex flex-col gap-(--spacing-1)",
			title: "font-medium leading-5",
			description: "leading-5 opacity-90",
		},
		variants: {
			variant: {
				subtle: {
					root: "bg-(--c-100) text-(--c-700) dark:bg-(--c-900) dark:text-(--c-300)",
					iconWrapper: "text-current",
				},
				solid: {
					root: "bg-(--c-solid) text-(--c-contrast)",
					iconWrapper: "text-(--c-contrast)",
				},
				surface: {
					root: "bg-(--c-100) text-(--c-700) dark:bg-(--c-900) dark:text-(--c-300) shadow-[inset_0_0_0_1px_var(--c-500)]",
					iconWrapper: "text-(--c-700) dark:text-(--c-300)",
				},
				outline: {
					root: "bg-transparent text-(--c-700) dark:text-(--c-300) shadow-[inset_0_0_0_1px_var(--c-100)] dark:shadow-[inset_0_0_0_1px_var(--c-800)]",
					iconWrapper: "text-(--c-700) dark:text-(--c-300)",
				},
			},
		},
		defaultVariants: {
			variant: "subtle",
		},
	});

	type AlertVariants = VariantProps<typeof alert>;
	type Status = "info" | "success" | "warning" | "error" | "neutral";

	interface Props {
		/**
		 * Additional CSS classes to apply to the alert.
		 */
		class?: string;
		/**
		 * The visual style of the alert.
		 * @default "subtle"
		 */
		variant?: AlertVariants["variant"];
		/**
		 * The status of the alert, which controls the color and icon.
		 * @default "info"
		 */
		status?: Status;
		/**
		 * The colour palette of the alert.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Override the default icon. Pass `false` to hide the icon.
		 */
		icon?: boolean | Component<any>;
		/**
		 * The title of the alert.
		 */
		title?: string;
		/**
		 * The content to be rendered inside the alert.
		 */
		children?: Snippet;
		/**
		 * Inline styles to apply to the alert.
		 */
		style?: string;
		[key: string]: any;
	}

	let {
		class: className,
		variant = "subtle",
		status = "info",
		colour,
		icon,
		title,
		children,
		style,
		...restProps
	}: Props = $props();

	const statusColourMap: Record<Status, ColourName> = {
		info: "blue",
		success: "green",
		warning: "orange",
		error: "red",
		neutral: "gray",
	};

	const resolvedColour = $derived(
		colour ?? statusColourMap[status] ?? "gray",
	);
	const colourVars = $derived(generateColourVars(resolvedColour));

	const statusIconMap = {
		info: Info,
		success: CheckCircle,
		warning: Warning,
		error: XCircle,
		neutral: Info,
	};

	const IconToRender = $derived.by(() => {
		if (icon === false) return null;
		if (icon && typeof icon !== "boolean") return icon;
		return statusIconMap[status];
	});

	const {
		root,
		iconWrapper,
		content,
		title: titleClass,
		description,
	} = $derived(alert({ variant }));

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<div
	role="alert"
	class={root({ class: className })}
	style={finalStyle}
	{...restProps}
>
	{#if IconToRender}
		<span class={iconWrapper()}>
			<Icon as={IconToRender} size="md" />
		</span>
	{/if}

	<div class={content()}>
		{#if title}
			<div class={titleClass()}>
				{title}
			</div>
		{/if}

		{#if children}
			<div class={description()}>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
