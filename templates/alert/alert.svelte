<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { Info, CircleCheck, TriangleAlert, CircleX } from "@lucide/svelte";
	import type { Snippet, Component } from "svelte";

	import { type ColorName, generateColorVars } from "$saas/utils/colours";
	import { Icon } from "$saas/icon";

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
					root: "bg-(--c-100) text-(--c-700) dark:bg-(--c-900)/50 dark:text-(--c-200)",
					iconWrapper: "text-current",
				},
				solid: {
					root: "bg-(--c-600) text-white dark:bg-(--c-600)",
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
		class?: string;
		variant?: AlertVariants["variant"];
		status?: Status;
		color?: ColorName;
		icon?: boolean | Component<any>;
		title?: string | Snippet;
		children?: Snippet;
		style?: string;
		[key: string]: any;
	}

	let {
		class: className,
		variant = "subtle",
		status = "info",
		color,
		icon,
		title,
		children,
		style,
		...restProps
	}: Props = $props();

	const statusColorMap: Record<Status, ColorName> = {
		info: "blue",
		success: "green",
		warning: "orange",
		error: "red",
		neutral: "gray",
	};

	const resolvedColor = $derived(color ?? statusColorMap[status] ?? "gray");
	const colorVars = $derived(generateColorVars(resolvedColor));

	const statusIconMap = {
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		error: CircleX,
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

	const finalStyle = $derived([colorVars, style].filter(Boolean).join("; "));
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
				{#if typeof title === "string"}
					{title}
				{:else}
					{@render title()}
				{/if}
			</div>
		{/if}

		{#if children}
			<div class={description()}>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
