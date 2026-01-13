<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Avatar, AvatarGroup } from "$saas/components/avatar";
	import { commonArgTypes, getControls, colors } from "../utils";
	import { Stack } from "$saas/layout/stack";

	const { Story } = defineMeta({
		title: "components/Avatar",
		component: Avatar as any,
		argTypes: {
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
			size: {
				control: "select",
				options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "full"],
				description: "The size of the avatar.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: ["solid", "subtle", "outline"],
				description: "The visual style of the avatar.",
				table: { defaultValue: { summary: "solid" } },
			},
			shape: {
				control: "select",
				options: ["full", "square", "rounded"],
				description: "The shape of the avatar.",
				table: { defaultValue: { summary: "full" } },
			},
			color: {
				control: "select",
				options: colors,
				description: "The color palette of the avatar.",
				table: { defaultValue: { summary: "gray" } },
			},
			borderless: {
				control: "boolean",
				description: "Whether the avatar should have a border.",
				table: { defaultValue: { summary: "false" } },
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
				"color",
				"borderless",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			shape: "full",
			color: "gray",
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
	<Stack class="flex-row items-center gap-3">
		{#each sizes as size}
			<Avatar {size} name="David Wilson" src="/avatars/1.png" />
		{/each}
	</Stack>
{/snippet}

{#snippet shapeStory()}
	<Stack class="flex-row items-center gap-4">
		{#each shapes as shape}
			<Avatar
				{shape}
				size="lg"
				name="David Wilson"
				src="/avatars/1.png"
			/>
		{/each}
	</Stack>
{/snippet}

{#snippet fallbackStory()}
	<Stack class="flex-row items-center gap-4">
		<Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
		<Avatar
			name="Sasuke Uchiha"
			src="https://bit.ly/broken-link"
			color="teal"
		/>
		<Avatar src="https://bit.ly/broken-link" color="red" />
	</Stack>
{/snippet}

{#snippet ringStory()}
	<Stack class="flex-row items-center gap-4">
		<Avatar
			name="David Wilson"
			color="pink"
			src="/avatars/1.png"
			class="outline-offset-2 outline-2 outline-solid outline-pink-500"
		/>
		<Avatar
			name="Marcus Chen"
			color="green"
			src="/avatars/2.png"
			class="outline-offset-2 outline-2 outline-solid outline-green-500"
		/>
		<Avatar
			name="Sarah Johnson"
			color="blue"
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
