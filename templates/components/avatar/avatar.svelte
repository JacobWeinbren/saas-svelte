<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { type ColourName, generateColourVars } from "$saas/utils/colours";

	export const avatar = tv({
		slots: {
			root: "align-top select-none shrink-0 justify-center items-center inline-flex relative antialiased",
			image: "object-cover w-full h-full border-none",
			fallback:
				"w-full h-full flex items-center justify-center uppercase font-medium leading-none",
		},
		variants: {
			size: {
				"2xs": {
					root: "w-4 h-4 text-[8px]",
					fallback: "text-[8px]",
				},
				xs: {
					root: "w-5 h-5 text-[10px]",
					fallback: "text-[10px]",
				},
				sm: {
					root: "w-6 h-6 text-xs",
					fallback: "text-xs",
				},
				md: {
					root: "w-9 h-9 text-lg",
					fallback: "text-lg",
				},
				lg: {
					root: "w-12 h-12 text-2xl",
					fallback: "text-2xl",
				},
				xl: {
					root: "w-16 h-16 text-3xl",
					fallback: "text-3xl",
				},
				"2xl": {
					root: "w-20 h-20 text-4xl",
					fallback: "text-4xl",
				},
				full: {
					root: "w-full h-full",
				},
			},
			variant: {
				solid: {
					root: "bg-(--c-500) text-white dark:bg-(--c-500) dark:text-white",
				},
				subtle: {
					root: "bg-(--c-100) text-(--c-900) dark:bg-(--c-800) dark:text-(--c-200)",
				},
				outline: {
					root: "bg-transparent border border-(--c-200) text-(--c-700) dark:border-(--c-800) dark:text-(--c-200)",
				},
			},
			shape: {
				square: {
					root: "",
					image: "",
					fallback: "",
				},
				rounded: {
					root: "rounded",
					image: "rounded",
					fallback: "rounded",
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
					root: "border-2 border-white dark:border-zinc-950",
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
	// const variant = $derived(groupContext?.variant ?? propVariant ?? "solid"); // Group doesn't usually enforce variant? Design doesn't say.
	// But it might be useful. For now sticking to props.
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
			? name
					.split(" ")
					.map((part) => part[0])
					.slice(0, 2)
					.join("")
					.toUpperCase()
			: "",
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
			colour: "gray" as any, // Only for type satisfaction if needed, actual colour handled by vars
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<div
	class={root({ class: className })}
	style={finalStyle}
	{...restProps}
	role="img"
	aria-label={name}
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
			<!-- Default generic fallback icon usually? Or just empty styling? 
                 The anatomy shows 'DW' or just placeholder. 
                 If no name and no src, we might show a generic user icon, but 
                 spec says 'The initials of the name can be used ...' -->
			<span class={fallbackClass()}>
				<svg
					viewBox="0 0 24 24"
					class="stroke-current fill-current stroke-0 w-[60%] h-[60%]"
				>
					<path
						d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
					></path>
				</svg>
			</span>
		{/if}
	{/if}
</div>
