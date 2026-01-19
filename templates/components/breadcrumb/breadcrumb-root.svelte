<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	export const breadcrumb = tv({
		slots: {
			root: "wrap-break-word text-fg-muted items-center inline-flex",
			list: "flex items-center gap-x-1.5 gap-y-1.5",
			item: "items-center inline-flex",
			separator: "text-fg-muted opacity-80",
			ellipsis: "justify-center items-center inline-flex",
		},
		variants: {
			size: {
				sm: {
					root: "text-(length:--font-sizes-xs) leading-(--line-heights-xs) gap-x-1 gap-y-1",
					list: "gap-x-1 gap-y-1",
				},
				md: {
					root: "text-(length:--font-sizes-sm) leading-(--line-heights-sm) gap-x-1.5 gap-y-1.5",
					list: "gap-x-1.5 gap-y-1.5",
				},
				lg: {
					root: "text-(length:--font-sizes-md) leading-(--line-heights-md) gap-x-2 gap-y-2",
					list: "gap-x-2 gap-y-2",
				},
			},
			variant: {
				muted: {},
				emphasised: {},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "emphasised",
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
		 * @default "emphasised"
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
		variant = "emphasised",
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

<nav
	aria-label="breadcrumb"
	class={styles.root({ class: className })}
	{...restProps}
>
	<ol class={styles.list({ class: separatorGapClass })}>
		{@render children()}
	</ol>
</nav>
