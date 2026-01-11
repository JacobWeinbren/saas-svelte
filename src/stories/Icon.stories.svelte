<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Icon } from "$saas/icon";
	import { Heart, User, Settings } from "@lucide/svelte";
	import { hideInheritedProps } from "../../.storybook/hide-inherited-props";

	const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

	const { Story } = defineMeta({
		title: "components/Icon",
		component: Icon as any,
		argTypes: {
			as: {
				control: false,
				description: "The icon component to render.",
				table: { type: { summary: "Component" } },
			},
			size: {
				control: "select",
				options: sizes,
				description: "The size of the icon.",
				table: { defaultValue: { summary: "md" } },
			},
			strokeWidth: {
				control: "number",
				description:
					"The stroke width of the icon (when using stroke-based icons).",
				table: { type: { summary: "number | string" } },
			},
			viewBox: {
				control: "text",
				description: "The SVG viewBox attribute for custom icons.",
				table: { defaultValue: { summary: "0 0 24 24" } },
			},
			children: {
				control: false,
				description: "SVG path elements for custom icons.",
				table: { type: { summary: "Snippet" } },
			},
			class: {
				control: "text",
				description: "Additional CSS classes.",
			},
			...hideInheritedProps(),
			// Override color to show it (it's hidden by hideInheritedProps)
			color: {
				control: "text",
				description: "Colour from the theme palette.",
				table: {
					defaultValue: { summary: "currentColor" },
					disable: false,
				},
			},
		},
		args: {
			size: "md",
			color: "rose",
		},
	});
</script>

<Story name="Basic">
	{#snippet template(args)}
		<Icon as={Heart} strokeWidth="4" {...args} />
	{/snippet}
</Story>

<Story name="Colored">
	{#snippet template(args)}
		<div class="flex gap-4">
			<Icon as={Heart} color="rose" size={args.size} />
			<Icon as={User} color="blue" size={args.size} />
			<Icon as={Settings} color="gray" size={args.size} />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-end gap-4">
			{#each sizes as size}
				<Icon as={Heart} color="rose" {size} />
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="StrokeWidth">
	{#snippet template()}
		<div class="flex items-center gap-6">
			<div class="flex flex-col items-center gap-2">
				<Icon as={Heart} color="rose" size="xl" strokeWidth={1} />
				<span class="text-xs text-gray-500">strokeWidth: 1</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon as={Heart} color="rose" size="xl" strokeWidth={2} />
				<span class="text-xs text-gray-500"
					>strokeWidth: 2 (default)</span
				>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon as={Heart} color="rose" size="xl" strokeWidth={3} />
				<span class="text-xs text-gray-500">strokeWidth: 3</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Icon as={Heart} color="rose" size="xl" strokeWidth={4} />
				<span class="text-xs text-gray-500">strokeWidth: 4</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="CustomSVG">
	{#snippet template()}
		<Icon size="xl" color="red" viewBox="0 0 32 32">
			<path
				fill="currentColor"
				d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z"
			/>
			<path
				fill="currentColor"
				d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z"
			/>
		</Icon>
	{/snippet}
</Story>
