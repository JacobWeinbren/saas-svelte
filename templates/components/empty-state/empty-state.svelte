<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { Snippet, Component } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { Icon } from "$saas/components/icon";

	const emptyState = tv({
		slots: {
			root: "flex w-full h-full px-8 py-12 antialiased",
			content: "flex flex-col text-sm leading-5",
			iconWrapper: "flex items-center justify-center mb-3 text-3xl leading-9 tracking-tight",
			title: "break-words font-semibold text-base leading-6",
			description: "break-words text-fg-muted text-sm leading-5",
			actions: "flex gap-2 mt-3",
		},
		variants: {
			size: {
				sm: {
					root: "px-4 py-6",
					iconWrapper: "text-2xl mb-2",
					title: "text-sm",
					description: "text-xs",
					actions: "mt-2",
				},
				md: {
					root: "px-8 py-12",
					iconWrapper: "text-3xl mb-3",
					title: "text-base",
					description: "text-sm",
					actions: "mt-3",
				},
				lg: {
					root: "px-12 py-16",
					iconWrapper: "text-4xl mb-4",
					title: "text-lg",
					description: "text-base",
					actions: "mt-4",
				},
			},
			align: {
				centre: {
					root: "flex-col justify-center items-center",
					content: "text-center justify-center items-center gap-1",
				},
				start: {
					root: "flex-col justify-start items-start",
					content: "text-left justify-start items-start gap-1",
				},
				end: {
					root: "flex-col justify-end items-end",
					content: "text-right justify-end items-end gap-1",
				},
			},
		},
		defaultVariants: {
			size: "md",
			align: "centre",
		},
	});

	type EmptyStateVariants = VariantProps<typeof emptyState>;

	interface Props {
		/**
		 * Additional CSS classes to apply to the empty state container.
		 */
		class?: string;
		/**
		 * The size of the empty state component.
		 * @default "md"
		 */
		size?: EmptyStateVariants["size"];
		/**
		 * The alignment of the empty state content.
		 * @default "centre"
		 */
		align?: EmptyStateVariants["align"];
		/**
		 * The colour palette of the empty state icon.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * The icon to display. Pass a Phosphor icon component.
		 */
		icon?: Component<any>;
		/**
		 * The title text to display.
		 */
		title?: string;
		/**
		 * The description text to display.
		 */
		description?: string;
		/**
		 * The content to be rendered inside the empty state (e.g., action buttons).
		 */
		children?: Snippet;
		/**
		 * Inline styles to apply to the empty state.
		 */
		style?: string;
		[key: string]: any;
	}

	let {
		class: className,
		size = "md",
		align = "centre",
		colour = "gray",
		icon,
		title,
		description,
		children,
		style,
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const {
		root,
		content,
		iconWrapper,
		title: titleClass,
		description: descriptionClass,
		actions,
	} = $derived(emptyState({ size, align }));
</script>

<div class={root({ class: className })} style={finalStyle} {...restProps}>
	<div class={content()}>
		{#if icon}
			<div class={iconWrapper()} style="color: var(--c-solid)">
				<Icon as={icon} size="2xl" />
			</div>
		{/if}

		{#if title}
			<h3 class={titleClass()}>
				{title}
			</h3>
		{/if}

		{#if description}
			<p class={descriptionClass()}>
				{description}
			</p>
		{/if}

		{#if children}
			<div class={actions()}>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
