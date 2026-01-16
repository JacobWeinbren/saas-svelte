<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";
	import User from "phosphor-svelte/lib/User";

	export const avatar = tv({
		slots: {
			root: "align-top select-none shrink-0 justify-center items-center inline-flex relative antialiased font-(--font-weights-medium)",
			image: "object-cover w-full h-full border-none",
			fallback:
				"uppercase font-(--font-weights-medium) leading-none rounded-full flex items-center justify-center [font-size:inherit]",
		},
		variants: {
			size: {
				xs: {
					root: "w-(--spacing-5) h-(--spacing-5) text-[10px]!",
				},
				sm: {
					root: "w-(--spacing-6) h-(--spacing-6) text-(length:--font-sizes-xs)",
				},
				md: {
					root: "w-(--spacing-9) h-(--spacing-9) text-(length:--font-sizes-lg)",
				},
				lg: {
					root: "w-(--spacing-12) h-(--spacing-12) text-(length:--font-sizes-2xl)",
				},
				xl: {
					root: "w-(--spacing-16) h-(--spacing-16) text-(length:--font-sizes-3xl)",
				},
				"2xl": {
					root: "w-(--spacing-20) h-(--spacing-20) text-(length:--font-sizes-4xl)",
				},
				full: {
					root: "w-full h-full",
				},
			},
			variant: {
				solid: {
					root: "bg-(--c-solid) [color:var(--c-contrast)]",
				},
				subtle: {
					root: "bg-(--c-muted) [color:var(--c-fg)]",
				},
				outline: {
					root: "bg-transparent border border-(--c-subtle) [color:var(--c-fg)]",
				},
			},
			shape: {
				square: {
					root: "",
					image: "",
					fallback: "",
				},
				rounded: {
					root: "rounded-(--radii-l2)",
					image: "rounded-(--radii-l2)",
					fallback: "rounded-(--radii-l2)",
				},
				full: {
					root: "rounded-full",
					image: "rounded-full",
					fallback: "rounded-full",
				},
			},
			borderless: {
				true: {
					root: "",
				},
				false: {
					root: "border-2 border-(--color-bg-default) dark:border-(--color-bg-default)",
				},
			},
			ring: {
				true: {
					root: "outline-2 outline-offset-[var(--spacing-0_5)] outline-solid outline-(--c-solid)",
				},
			},
			colour: {},
		},
		defaultVariants: {
			size: "md",
			variant: "solid",
			shape: "full",
			borderless: true,
			colour: "gray" as any,
		},
	});

	export type AvatarVariants = VariantProps<typeof avatar>;
</script>

<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import type { AvatarGroupContext } from "./avatar-group.svelte";

	type AvatarVariants = VariantProps<typeof avatar>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The image source of the avatar.
		 */
		src?: string;
		/**
		 * The name of the person in the avatar. Used for the alt text and fallback initials.
		 */
		name?: string;
		/**
		 * The size of the avatar.
		 * @default "md"
		 */
		size?: AvatarVariants["size"];
		/**
		 * The visual style of the avatar.
		 * @default "solid"
		 */
		variant?: AvatarVariants["variant"];
		/**
		 * The shape of the avatar.
		 * @default "full"
		 */
		shape?: AvatarVariants["shape"];
		/**
		 * The colour palette of the avatar.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether to show a ring around the avatar using the colour palette.
		 * @default false
		 */
		ring?: boolean;
		/**
		 * Use the provided child snippet as the fallback content.
		 */
		fallback?: Snippet;
		/**
		 * Event handler called when the image loading status changes (e.g. error or load).
		 */
		onStatusChange?: (status: "loaded" | "error") => void;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Inline styles to apply via the style attribute.
		 */
		style?: string;
		/**
		 * Any children to render (rarely used directly, usually fallback).
		 */
		children?: Snippet;
	}

	let {
		src,
		name,
		size: propSize,
		variant: propVariant,
		shape = "full",
		colour = "gray",
		ring = false,
		fallback,
		onStatusChange,
		class: className,
		style,
		children,
		...restProps
	}: Props = $props();

	// Get context from AvatarGroup if available
	const groupContext = getContext<AvatarGroupContext>("avatar-group");

	const size = $derived(groupContext?.size ?? propSize ?? "md");
	const variant = propVariant ?? "solid";
	const borderless = groupContext?.borderless ?? true;

	let status: "loaded" | "error" | "pending" = $state("pending");

	function handleLoad() {
		status = "loaded";
		onStatusChange?.("loaded");
	}

	function handleError() {
		status = "error";
		onStatusChange?.("error");
	}

	const initials = $derived(
		name
			?.split(" ")
			.map((part) => part[0])
			.slice(0, 2)
			.join("")
			.toUpperCase(),
	);

	const colourVars = $derived(generateColourVars(colour || "gray"));

	const {
		root,
		image,
		fallback: fallbackClass,
	} = $derived(
		avatar({
			size,
			variant,
			shape,
			borderless,
			ring,
			colour: "gray" as any,
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<div
	class={root({ class: className })}
	style={finalStyle}
	{...restProps}
	role="img"
	aria-label={name || "Avatar"}
>
	{#if src && status !== "error"}
		<img
			{src}
			alt={name}
			class={image()}
			onload={handleLoad}
			onerror={handleError}
			hidden={status !== "loaded"}
		/>
	{/if}

	{#if status === "error" || !src || status === "pending"}
		{#if fallback}
			{@render fallback()}
		{:else if initials}
			<span class={fallbackClass()}>
				{initials}
			</span>
		{:else if children}
			<span class={fallbackClass()}>
				{@render children()}
			</span>
		{:else}
			<span class={fallbackClass()}>
				<User
					class="size-(--spacing-5)"
					weight="regular"
					aria-hidden="true"
				/>
			</span>
		{/if}
	{/if}
</div>
