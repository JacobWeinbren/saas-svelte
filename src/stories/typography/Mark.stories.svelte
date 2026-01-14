<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Mark } from "$saas/typography/mark";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const variants = ["subtle", "solid", "text", "plain"] as const;

	const { Story } = defineMeta({
		title: "typography/Mark",
		component: Mark,
		argTypes: {
			variant: {
				control: "select",
				options: variants,
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: commonArgTypes.colour,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "colour", "class", "children"]),
		},
		args: {
			variant: "subtle",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory()}
	<Text>
		The <Mark>design system</Mark> is a collection of UI elements
	</Text>
{/snippet}

{#snippet variantsStory()}
	<Stack>
		{#each variants as variant}
			<Text>
				The <Mark {variant} colour="blue">design system</Mark> is a collection of UI
				elements
			</Text>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />
