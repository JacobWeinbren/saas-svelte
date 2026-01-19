<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { BreadcrumbVariants, breadcrumb } from "./breadcrumb-root.svelte";

	interface BreadcrumbContext {
		size: BreadcrumbVariants["size"];
		variant: BreadcrumbVariants["variant"];
		separator: Snippet | string;
		styles: ReturnType<typeof breadcrumb>;
	}

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * The current page content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const context = getContext<BreadcrumbContext>("breadcrumb");
	const styles = $derived(context?.styles);
	const variant = $derived(context?.variant ?? "emphasised");

	const currentClasses = $derived(() => {
		const classes = [className];
		// Emphasised variant: current link is emphasized (stands out from gray links)
		// Muted variant: current link is default (same as other white links)
		if (variant === "emphasised") {
			classes.push("text-fg-emphasized");
		} else {
			classes.push("text-fg-default");
		}
		return classes.filter(Boolean).join(" ");
	});
</script>

<li class={styles?.item()}>
	<span role="link" aria-current="page" class={currentClasses()} {...restProps}>
		{@render children()}
	</span>
</li>
