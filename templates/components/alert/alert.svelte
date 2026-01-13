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
			root: "relative w-full flex items-start p-4 rounded-md text-sm antialiased",
			iconWrapper: "shrink-0 flex items-center justify-center w-5 h-5",
			content: "flex-1 min-w-0 flex flex-col gap-1 ml-3",
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
					root: "bg-(--c-600) text-zinc-50 dark:bg-(--c-600)",
					iconWrapper: "text-current",
				},
				surface: {
					root: "bg-(--c-50) border border-(--c-200) text-(--c-900) dark:bg-(--c-950) dark:border-(--c-800) dark:text-(--c-200)",
					iconWrapper: "text-current",
				},
				outline: {
					root: "bg-transparent border border-(--c-200) text-(--c-700) dark:border-(--c-800) dark:text-(--c-200)",
					iconWrapper: "text-current",
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

	const resolvedColour = $derived(colour ?? statusColourMap[status] ?? "gray");
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
