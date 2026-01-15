<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Stack,
		HStack,
		VStack,
		Divider,
		DecorativeBox,
	} from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Stack",
		component: Stack,
		subcomponents: {
			HStack,
			VStack,
			Divider,
			DecorativeBox,
		},
		argTypes: {
			direction: {
				control: "select",
				options: ["row", "column", "row-reverse", "col-reverse"],
				table: { defaultValue: { summary: "column" } },
			},
			align: {
				control: "select",
				options: ["start", "center", "end", "stretch", "baseline"],
				table: { defaultValue: { summary: "stretch" } },
			},
			justify: {
				control: "select",
				options: ["start", "center", "end", "between", "around"],
				table: { defaultValue: { summary: "start" } },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"direction",
				"align",
				"justify",
				"class",
				"children",
			]),
		},
	});

	export { Stack, HStack, VStack, Divider, DecorativeBox };
</script>

{#snippet basicStory()}
	<Stack>
		<DecorativeBox class="h-(--sizes-20)" />
		<DecorativeBox class="h-(--sizes-20)" />
		<DecorativeBox class="h-(--sizes-20)" />
	</Stack>
{/snippet}

{#snippet horizontalStory()}
	<div class="flex justify-center">
		<Stack direction="row" class="h-(--sizes-20)">
			<DecorativeBox class="w-(--sizes-40)!" />
			<DecorativeBox class="w-(--sizes-40)!" />
			<DecorativeBox class="w-(--sizes-40)!" />
		</Stack>
	</div>
{/snippet}

{#snippet hStackStory()}
	<div class="flex justify-center">
		<HStack>
			<DecorativeBox class="h-(--sizes-10) w-(--sizes-40)!" />
			<DecorativeBox class="h-(--sizes-5) w-(--sizes-40)!" />
			<DecorativeBox class="h-(--sizes-20) w-(--sizes-40)!" />
		</HStack>
	</div>
{/snippet}

{#snippet vStackStory()}
	<VStack>
		<DecorativeBox class="w-1/2 h-(--sizes-20)" />
		<DecorativeBox class="w-1/4 h-(--sizes-20)" />
		<DecorativeBox class="w-full h-(--sizes-20)" />
	</VStack>
{/snippet}

{#snippet separatorStory()}
	<Stack>
		<DecorativeBox class="h-(--sizes-20)" />
		<Divider />
		<DecorativeBox class="h-(--sizes-20)" />
		<Divider />
		<DecorativeBox class="h-(--sizes-20)" />
	</Stack>
{/snippet}

{#snippet responsiveStory()}
	<div class="flex justify-center">
		<Stack class="flex-col gap-(--spacing-10) md:flex-row">
			<DecorativeBox class="size-(--sizes-20)!" />
			<DecorativeBox class="size-(--sizes-20)!" />
			<DecorativeBox class="size-(--sizes-20)!" />
		</Stack>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Horizontal" template={horizontalStory} />

<Story name="WithHStack" template={hStackStory} />

<Story name="WithVStack" template={vStackStory} />

<Story name="WithSeparator" template={separatorStory} />

<Story name="Responsive" template={responsiveStory} />
