<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const breadcrumb = tv({
		slots: {
			root: "[word-break:break-word] text-fg-muted items-center flex",
			item: "items-center inline-flex",
			separator: "text-fg-muted opacity-80",
			ellipsis: "justify-center items-center inline-flex",
		},
		variants: {
			size: {
				sm: {
					root: "text-xs leading-4 gap-x-1 gap-y-1",
				},
				md: {
					root: "text-sm leading-5 gap-x-1.5 gap-y-1.5",
				},
				lg: {
					root: "text-sm leading-5 gap-x-2 gap-y-2",
				},
			},
			variant: {
				plain: {},
				underline: {},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "plain",
		},
	});

	export type BreadcrumbVariants = VariantProps<typeof breadcrumb>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { setContext } from "svelte";

	type BreadcrumbVariants = VariantProps<typeof breadcrumb>;

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The breadcrumb items.
		 */
		children: Snippet;
		/**
		 * The size of the breadcrumb.
		 * @default "md"
		 */
		size?: BreadcrumbVariants["size"];
		/**
		 * The visual style of the breadcrumb links.
		 * @default "plain"
		 */
		variant?: BreadcrumbVariants["variant"];
		/**
		 * The separator element between breadcrumb items.
		 * @default "/"
		 */
		separator?: Snippet | string;
		/**
		 * The gap around separators (in spacing units).
		 */
		separatorGap?: string | number;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		size = "md",
		variant = "plain",
		separator = "/",
		separatorGap,
		class: className,
		...restProps
	}: Props = $props();

	const styles = $derived(breadcrumb({ size, variant }));
	const separatorGapClass = $derived(
		separatorGap ? `gap-${separatorGap}` : undefined,
	);

	// Provide context to child components
	setContext("breadcrumb", {
		get size() {
			return size;
		},
		get variant() {
			return variant;
		},
		get separator() {
			return separator;
		},
		get styles() {
			return styles;
		},
	});
</script>

<nav aria-label="breadcrumb" {...restProps}>
	<ol class={styles.root({ class: [separatorGapClass, className].filter(Boolean).join(" ") })}>
		{@render children()}
	</ol>
</nav>
