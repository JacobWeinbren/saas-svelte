<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import Star from "phosphor-svelte/lib/Star";
	import Heart from "phosphor-svelte/lib/Heart";
	import User from "phosphor-svelte/lib/User";
	import Gear from "phosphor-svelte/lib/Gear";
	import { commonArgTypes, getControls, sizes } from "../utils";

	const { Story } = defineMeta({
		title: "components/Icon",
		component: Icon as any,
		argTypes: {
			as: {
				control: false,
				description:
					"The icon component to render (e.g. from phosphor-svelte or custom).",
				table: { type: { summary: "Component" } },
			},
			size: {
				...commonArgTypes.size,
				description: "The size of the icon.",
				options: [...sizes, "2xl"],
				table: {
					type: { summary: "IconSize" },
					defaultValue: { summary: "md" },
				},
			},
			weight: {
				control: "select",
				description:
					"The weight/style of the icon (for Phosphor icons).",
				options: [
					"thin",
					"light",
					"regular",
					"bold",
					"fill",
					"duotone",
				],
				table: {
					type: {
						summary:
							'"thin" | "light" | "regular" | "bold" | "fill" | "duotone"',
					},
					defaultValue: { summary: "regular" },
				},
			},
			mirrored: {
				control: "boolean",
				description:
					"Whether to flip the icon horizontally (for Phosphor icons).",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			color: {
				...commonArgTypes.color,
				description: "The color theme of the icon.",
				table: {
					type: { summary: "ColorName" },
					defaultValue: { summary: "currentColor" },
				},
			},
			viewBox: {
				control: "text",
				description: "The SVG viewBox attribute (for custom icons).",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "0 0 24 24" },
				},
			},
			style: {
				control: "text",
				description: "Inline CSS styles to apply to the icon.",
				table: { type: { summary: "string" } },
			},
			children: {
				...commonArgTypes.children,
				description:
					"SVG path elements for custom icons (if `as` is not provided).",
			},
			class: {
				...commonArgTypes.class,
				description: "Additional CSS classes to apply to the icon.",
			},
		},
		parameters: {
			controls: getControls([
				"as",
				"size",
				"weight",
				"mirrored",
				"color",
				"viewBox",
				"style",
				"children",
				"class",
			]),
		},
		args: {
			size: "lg",
			weight: "fill",
			color: "pink",
		},
	});
</script>

<Story name="Basic">
	{#snippet template(args)}
		<Icon as={Heart} color="yellow" {...args} />
	{/snippet}
</Story>

<Story name="Colours">
	{#snippet template(args)}
		<div class="flex gap-4">
			<Icon as={Heart} color="rose" size={args.size} />
			<Icon as={User} color="blue" size={args.size} />
			<Icon as={Gear} color="gray" size={args.size} />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-end gap-4">
			{#each sizes as size}
				<Icon as={Star} color="yellow" weight="fill" {size} />
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Weights">
	{#snippet template()}
		<div class="flex items-center gap-6">
			<div class="flex flex-col items-center gap-2">
				<Text>thin</Text>
				<Icon as={Heart} color="rose" size="xl" weight="thin" />
			</div>
			<div class="flex flex-col items-center gap-2">
				<Text>light</Text>
				<Icon as={Heart} color="rose" size="xl" weight="light" />
			</div>
			<div class="flex flex-col items-center gap-2">
				<Text>regular (default)</Text>
				<Icon as={Heart} color="rose" size="xl" weight="regular" />
			</div>
			<div class="flex flex-col items-center gap-2">
				<Text>bold</Text>
				<Icon as={Heart} color="rose" size="xl" weight="bold" />
			</div>
			<div class="flex flex-col items-center gap-2">
				<Text>fill</Text>
				<Icon as={Heart} color="rose" size="xl" weight="fill" />
			</div>
			<div class="flex flex-col items-center gap-2">
				<Text>duotone</Text>
				<Icon as={Heart} color="rose" size="xl" weight="duotone" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Custom SVG">
	{#snippet template()}
		<Icon size="xl" color="blue" viewBox="0 0 32 32">
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
