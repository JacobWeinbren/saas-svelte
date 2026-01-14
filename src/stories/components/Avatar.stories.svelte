<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Avatar, AvatarGroup } from "$saas/components/avatar";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Avatar",
		component: Avatar as any,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: ["solid", "subtle", "outline"],
			},
			colour: commonArgTypes.colour,
			size: {
				...commonArgTypes.size,
				options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "full"],
			},
			shape: {
				control: "select",
				options: ["full", "square", "rounded"],
				description: "The shape of the avatar.",
				table: { defaultValue: { summary: "full" } },
			},
			borderless: {
				control: "boolean",
				description: "Whether the avatar should have a border.",
				table: { defaultValue: { summary: "true" } },
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
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			shape: "full",
			colour: "gray",
			borderless: true,
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
	<Stack class="flex-row items-start gap-6">
		{#each sizes as size}
			<VStack class="gap-2 items-center">
				<Text size="xs">{size}</Text>
				<Avatar {size} name="David Wilson" src="/avatars/1.png" />
			</VStack>
		{/each}
	</Stack>
{/snippet}

{#snippet shapeStory()}
	<Stack class="flex-row items-start gap-8">
		{#each shapes as shape}
			<VStack class="gap-2 items-center">
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
	<Stack class="flex-row items-center gap-4">
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
	<Stack class="flex-row items-center gap-4">
		<Avatar
			name="David Wilson"
			colour="pink"
			src="/avatars/1.png"
			class="outline-offset-2 outline-2 outline-solid outline-pink-500"
		/>
		<Avatar
			name="Marcus Chen"
			colour="green"
			src="/avatars/2.png"
			class="outline-offset-2 outline-2 outline-solid outline-green-500"
		/>
		<Avatar
			name="Sarah Johnson"
			colour="blue"
			src="/avatars/3.png"
			class="outline-offset-2 outline-2 outline-solid outline-blue-500"
		/>
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
	<Stack class="gap-8">
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
<Story name="WithRing" template={ringStory} />
<Story name="Group" template={groupStory} />
<Story name="Stacking" template={stackingStory} />
