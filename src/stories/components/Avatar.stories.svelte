<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Avatar, AvatarGroup } from "$saas/components/avatar";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Avatar",
		component: Avatar,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: ["solid", "subtle", "outline"],
			},
			colour: commonArgTypes.colour,
			size: {
				...commonArgTypes.size,
				options: ["xs", "sm", "md", "lg", "xl", "2xl", "full"],
			},
			shape: {
				control: "select",
				options: ["full", "square", "rounded"],
				description: "The shape of the avatar.",
				table: { defaultValue: { summary: "full" } },
			},
			ring: {
				control: "boolean",
				description: "Whether to show a ring around the avatar.",
				table: { defaultValue: { summary: "false" } },
			},
			src: {
				control: "text",
				description: "The source for the avatar image.",
				table: { defaultValue: { summary: "" } },
			},
			name: {
				control: "text",
				description:
					"The name to use for alt text and fallback initials.",
				table: { defaultValue: { summary: "" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"src",
				"name",
				"size",
				"variant",
				"shape",
				"colour",
				"borderless",
				"ring",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			shape: "full",
			colour: "gray",
			name: "David Wilson",
			src: "/avatars/1.png",
		},
	});

	const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
	const shapes = ["square", "rounded", "full"] as const;
</script>

{#snippet basicStory()}
	<Avatar name="David Wilson" src="/avatars/1.png" />
{/snippet}

{#snippet sizesStory()}
	<Stack gap={6} class="flex-row items-start">
		{#each sizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Avatar {size} name="David Wilson" src="/avatars/1.png" />
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet shapeStory()}
	<Stack gap={8} class="flex-row items-start">
		{#each shapes as shape}
			<VStack gap={2} class="items-center">
				<Text size="xs">{shape}</Text>
				<Avatar
					{shape}
					size="lg"
					name="David Wilson"
					src="/avatars/1.png"
				/>
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet fallbackStory()}
	<Stack gap={4} class="flex-row items-center">
		<Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
		<Avatar
			name="Sasuke Uchiha"
			src="https://bit.ly/broken-link"
			colour="teal"
		/>
		<Avatar src="https://bit.ly/broken-link" colour="red" />
	</Stack>
{/snippet}

{#snippet ringStory()}
	<Stack gap={4} class="flex-row items-center">
		<Avatar name="David Wilson" colour="pink" src="/avatars/1.png" ring />
		<Avatar name="Marcus Chen" colour="green" src="/avatars/2.png" ring />
		<Avatar name="Sarah Johnson" colour="blue" src="/avatars/3.png" ring />
	</Stack>
{/snippet}

{#snippet groupStory()}
	<AvatarGroup size="lg">
		<Avatar name="David Wilson" src="/avatars/1.png" />
		<Avatar name="Marcus Chen" src="/avatars/2.png" />
		<Avatar name="Sarah Johnson" src="/avatars/3.png" />
		<Avatar fallback={moreFallback} variant="solid" />
	</AvatarGroup>
{/snippet}

{#snippet moreFallback()}
	+3
{/snippet}

{#snippet stackingStory()}
	<Stack gap={8}>
		<AvatarGroup size="lg" stacking="last-on-top">
			<Avatar name="David Wilson" src="/avatars/1.png" />
			<Avatar name="Marcus Chen" src="/avatars/2.png" />
			<Avatar name="Sarah Johnson" src="/avatars/3.png" />
			<Avatar fallback={moreFallback} />
		</AvatarGroup>

		<AvatarGroup size="lg" stacking="first-on-top">
			<Avatar name="David Wilson" src="/avatars/1.png" />
			<Avatar name="Marcus Chen" src="/avatars/2.png" />
			<Avatar name="Sarah Johnson" src="/avatars/3.png" />
			<Avatar fallback={moreFallback} />
		</AvatarGroup>

		<AvatarGroup size="lg" spaceX="1" borderless>
			<Avatar name="David Wilson" src="/avatars/1.png" />
			<Avatar name="Marcus Chen" src="/avatars/2.png" />
			<Avatar name="Sarah Johnson" src="/avatars/3.png" />
			<Avatar fallback={moreFallback} />
		</AvatarGroup>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Shape" template={shapeStory} />
<Story name="Fallback" template={fallbackStory} />
<Story name="With Ring" template={ringStory} />
<Story name="Group" template={groupStory} />
<Story name="Stacking" template={stackingStory} />
