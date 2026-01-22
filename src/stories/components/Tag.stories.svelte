<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Tag } from "$saas/components/tag";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Avatar } from "$saas/components/avatar";
	import { commonArgTypes, colours, getControls } from "../utils";
	import Plus from "phosphor-svelte/lib/Plus";
	import Check from "phosphor-svelte/lib/Check";

	const { Story } = defineMeta({
		title: "components/Tag",
		component: Tag,
		argTypes: {
			variant: {
				control: "select",
				options: ["subtle", "solid", "outline", "surface"],
				description: "The visual style of the tag.",
				table: { defaultValue: { summary: "surface" } },
			},
			size: {
				control: "select",
				options: ["sm", "md", "lg", "xl"],
				description: "The size of the tag.",
				table: { defaultValue: { summary: "md" } },
			},
			colour: {
				control: "select",
				options: colours,
				description: "The colour palette of the tag.",
				table: { defaultValue: { summary: "gray" } },
			},
			closable: {
				control: "boolean",
				description: "Whether the tag is closable.",
				table: { defaultValue: { summary: "false" } },
			},
			maxWidth: {
				control: "text",
				description:
					"Maximum width of the tag. Content exceeding this width will be truncated.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"closable",
				"maxWidth",
				"class",
			]),
		},
		args: {
			variant: "surface",
			size: "md",
			colour: "gray",
			closable: false,
		},
	});

	const variants = ["subtle", "solid", "outline", "surface"] as const;
	const sizes = ["sm", "md", "lg"] as const;
</script>

{#snippet basicStory(args: any)}
	<Tag
		variant={args.variant}
		size={args.size}
		colour={args.colour}
		closable={args.closable}
		maxWidth={args.maxWidth}
		class={args.class}
	>
		Tag
	</Tag>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants">
	<VStack gap={4}>
		{#each variants as variant}
			<HStack gap={2}>
				<Tag {variant}>Gray</Tag>
				<Tag {variant} closable>Gray</Tag>
			</HStack>
		{/each}
	</VStack>
</Story>

<Story name="Sizes">
	<VStack gap={2}>
		{#each sizes as size}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{size}</Text>
				<Tag {size}>Gray</Tag>
				<Tag {size} closable>Gray</Tag>
				<Tag {size}>
					{#snippet endElement()}
						<Check class="w-full h-full" weight="bold" aria-hidden="true" />
					{/snippet}
					Gray
				</Tag>
			</HStack>
		{/each}
	</VStack>
</Story>

<Story name="Colours">
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={10} align="center" class="px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Tag {colour} size="sm">Content</Tag>
				<Tag {colour} size="sm">
					{#snippet startElement()}
						<Plus class="w-4/5 h-4/5 fill-current stroke-current" aria-hidden="true" />
					{/snippet}
					Content
				</Tag>
				<Tag {colour} size="sm" variant="solid" closable>Content</Tag>
			</HStack>
		{/each}
	</VStack>
</Story>

<Story name="Closable">
	<HStack gap={2}>
		<Tag closable onClose={() => console.log("Close Tag 1")}>Tag 1</Tag>
		<Tag closable onClose={() => console.log("Close Tag 2")}>Tag 2</Tag>
	</HStack>
</Story>

<Story name="Overflow">
	<Tag colour="blue" size="sm" maxWidth="200px" closable>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
		molestias, laboriosam, quod, quia quidem quae voluptatem natus
		exercitationem autem quibusdam
	</Tag>
</Story>

<Story name="Avatar">
	<HStack gap={2} align="center">
		<Tag size="sm">
			{#snippet startElement()}
				<Avatar
					src="https://i.pravatar.cc/300?u=1"
					name="Emily"
					size="full"
					class="-ml-0.5"
				/>
			{/snippet}
			Emily (sm)
		</Tag>
		<Tag size="md">
			{#snippet startElement()}
				<Avatar
					src="https://i.pravatar.cc/300?u=1"
					name="Emily"
					size="full"
					class="-ml-1"
				/>
			{/snippet}
			Emily (md)
		</Tag>
		<Tag size="lg">
			{#snippet startElement()}
				<Avatar
					src="https://i.pravatar.cc/300?u=1"
					name="Emily"
					size="full"
					class="-ml-1.5"
				/>
			{/snippet}
			Emily (lg)
		</Tag>
		<Tag size="xl">
			{#snippet startElement()}
				<Avatar
					src="https://i.pravatar.cc/300?u=1"
					name="Emily"
					size="full"
					class="-ml-2"
				/>
			{/snippet}
			Emily (xl)
		</Tag>
	</HStack>
</Story>

<Story name="As Button">
	<button class="contents">
		<Tag variant="solid">
			{#snippet endElement()}
				<Check class="w-full h-full" aria-hidden="true" />
			{/snippet}
			Fish
		</Tag>
	</button>
</Story>
