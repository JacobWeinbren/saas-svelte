<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Float } from "$saas/layout/float";
	import { Circle } from "$saas/layout/circle";
	import { Avatar } from "$saas/components/avatar";
	import { Badge } from "$saas/components/badge";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls } from "../utils";

	type Args = {
		placement?:
			| "top-end"
			| "bottom-end"
			| "bottom-start"
			| "top-start"
			| "bottom-center"
			| "top-center"
			| "middle-center"
			| "middle-end"
			| "middle-start"
			| undefined;
		offsetX?: string | number;
		offsetY?: string | number;
		offset?: string | number;
		children?: any;
		class?: any;
	};

	const floatPlacements = [
		"bottom-end",
		"bottom-start",
		"top-end",
		"top-start",
		"bottom-center",
		"top-center",
		"middle-center",
		"middle-end",
		"middle-start",
	] as const;

	const { Story } = defineMeta({
		title: "layout/Float",
		component: Float,
		argTypes: {
			placement: {
				control: "select",
				options: floatPlacements,
				description: "The placement of the indicator.",
				table: { defaultValue: { summary: "top-end" } },
			},
			offsetX: {
				control: "text",
				description: "The x offset of the indicator.",
			},
			offsetY: {
				control: "text",
				description: "The y offset of the indicator.",
			},
			offset: {
				control: "text",
				description: "The x and y offset of the indicator.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"placement",
				"offsetX",
				"offsetY",
				"offset",
				"children",
				"class",
			]),
		},
		args: {
			placement: "top-end",
		},
	});
</script>

{#snippet basicStory(args: Args)}
	<div class="relative h-20 w-20 bg-bg-subtle dark:bg-bg-emphasized">
		<Float {...args}>
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</div>
{/snippet}

{#snippet placementsStory()}
	<HStack class="flex-wrap gap-x-8 gap-y-6 items-center">
		{#each floatPlacements as placement}
			<VStack class="gap-2 items-center">
				<Text size="xs">{placement}</Text>
				<div class="relative h-20 w-20 bg-bg-subtle dark:bg-bg-emphasized">
					<Float {placement}>
						<Circle size="xs" colour="red">3</Circle>
					</Float>
				</div>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet offsetXStory()}
	<div class="relative h-20 w-20 bg-bg-subtle dark:bg-bg-emphasized">
		<Float offsetX="-4">
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</div>
{/snippet}

{#snippet offsetYStory()}
	<div class="relative h-20 w-20 bg-bg-subtle dark:bg-bg-emphasized">
		<Float offsetY="-4">
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</div>
{/snippet}

{#snippet offsetStory()}
	<div class="relative h-20 w-20 bg-bg-subtle dark:bg-bg-emphasized">
		<Float offset="4">
			<Circle size="xs" colour="red">3</Circle>
		</Float>
	</div>
{/snippet}

{#snippet avatarStory()}
	<div class="relative inline-block">
		<Avatar
			size="lg"
			shape="rounded"
			src="https://bit.ly/dan-abramov"
			name="Dan Abramov"
		/>
		<Float placement="bottom-end">
			<Badge size="sm" variant="solid" colour="teal">New</Badge>
		</Float>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Placements" template={placementsStory} />
<Story name="Offset X" template={offsetXStory} />
<Story name="Offset Y" template={offsetYStory} />
<Story name="Offset" template={offsetStory} />
<Story name="With Avatar" template={avatarStory} />
