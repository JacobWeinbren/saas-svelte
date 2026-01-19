<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { tv } from "tailwind-variants";
	import {
		CHECKBOX_CARD_CTX,
		type CheckboxCardVariants,
	} from "./checkbox-card-root.svelte";

	const checkboxCardLabel = tv({
		base: [
			"items-center gap-2 font-medium flex",
			"text-fg-default",
			"peer-disabled:opacity-50",
		],
		variants: {
			size: {
				sm: "text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				md: "text-(length:--font-sizes-sm) leading-(--line-heights-sm)",
				lg: "text-(length:--font-sizes-md) leading-(--line-heights-md)",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * The label content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<{
		size: CheckboxCardVariants["size"];
		disabled: boolean;
	}>(CHECKBOX_CARD_CTX);
	const size = $derived(ctx?.size ?? "md");
	const disabled = $derived(ctx?.disabled ?? false);

	const finalClass = $derived(checkboxCardLabel({ size, class: className }));
</script>

<span class={finalClass} class:opacity-50={disabled} {...restProps}>
	{@render children()}
</span>
