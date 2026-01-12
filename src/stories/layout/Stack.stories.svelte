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
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Stack>
{/snippet}

{#snippet horizontalStory()}
	<Stack direction="row" class="h-20">
		<DecorativeBox />
		<DecorativeBox />
		<DecorativeBox />
	</Stack>
{/snippet}

{#snippet hStackStory()}
	<HStack>
		<DecorativeBox class="h-10" />
		<DecorativeBox class="h-5" />
		<DecorativeBox class="h-20" />
	</HStack>
{/snippet}

{#snippet vStackStory()}
	<VStack>
		<DecorativeBox class="w-1/2 h-20" />
		<DecorativeBox class="w-1/4 h-20" />
		<DecorativeBox class="w-full h-20" />
	</VStack>
{/snippet}

{#snippet separatorStory()}
	<Stack>
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
	</Stack>
{/snippet}

{#snippet responsiveStory()}
	<Stack class="flex-col gap-10 md:flex-row">
		<DecorativeBox class="size-20" />
		<DecorativeBox class="size-20" />
		<DecorativeBox class="size-20" />
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Horizontal" template={horizontalStory} />

<Story name="WithHStack" template={hStackStory} />

<Story name="WithVStack" template={vStackStory} />

<Story name="WithSeparator" template={separatorStory} />

<Story name="Responsive" template={responsiveStory} />
