<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { BreadcrumbVariants, breadcrumb } from "./breadcrumb-root.svelte";

	interface BreadcrumbContext {
		size: BreadcrumbVariants["size"];
		variant: BreadcrumbVariants["variant"];
		separator: Snippet | string;
		styles: ReturnType<typeof breadcrumb>;
	}

	type BaseProps = {
		/**
		 * The link content.
		 */
		children: Snippet;
		/**
		 * Whether to show the separator after this link.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Render as a button instead of an anchor.
		 * @default "a"
		 */
		as?: "a" | "button";
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	};

	type Props = BaseProps & HTMLAnchorAttributes & HTMLButtonAttributes;

	let {
		children,
		showSeparator = true,
		as = "a",
		class: className,
		...restProps
	}: Props = $props();

	const context = getContext<BreadcrumbContext>("breadcrumb");
	const styles = $derived(context?.styles);
	const variant = $derived(context?.variant ?? "emphasised");

	const linkClasses = $derived(() => {
		const baseClasses = [
			"outline-0",
			"items-center",
			"inline-flex",
			"cursor-pointer",
			"rounded-(--radii-l1)",
			"focus:outline-offset-2",
			"focus:outline-1",
			"focus:outline-solid",
			"focus:outline-(--colors-neutral-focus-ring)",
		];

		// Button uses tighter gap
		if (as === "button") {
			baseClasses.push("gap-1");
		} else {
			baseClasses.push("gap-x-2", "gap-y-2");
		}

		if (variant === "emphasised") {
			// Emphasised variant: gray text (muted), no underline, hover to white
			baseClasses.push(
				"text-fg-muted",
				"no-underline",
				"hover:text-fg-default"
			);
		} else {
			// Muted variant: white text (default), no underline
			baseClasses.push(
				"text-fg-default",
				"no-underline",
				"hover:text-fg-emphasized"
			);
		}

		return [...baseClasses, className].filter(Boolean).join(" ");
	});
</script>

<li class={styles?.item()}>
	{#if as === "button"}
		<button class={linkClasses()} {...restProps}>
			{@render children()}
		</button>
	{:else}
		<a class={linkClasses()} {...restProps}>
			{@render children()}
		</a>
	{/if}
</li>

{#if showSeparator}
	<li aria-hidden="true" class={styles?.separator()}>
		{#if typeof context?.separator === "string"}
			{context.separator}
		{:else if context?.separator}
			{@render context.separator()}
		{:else}
			/
		{/if}
	</li>
{/if}
