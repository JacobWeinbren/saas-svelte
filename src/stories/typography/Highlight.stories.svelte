<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Highlight } from "$saas/typography/highlight";
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "typography/Highlight",
		component: Highlight,
		argTypes: {
			query: {
				control: "text",
			},
			text: {
				control: "text",
			},
			ignoreCase: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			matchAll: {
				control: "boolean",
				table: { defaultValue: { summary: "true" } },
			},
			variant: {
				control: "select",
				options: ["subtle", "solid", "text", "plain"],
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: commonArgTypes.colour,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"query",
				"text",
				"ignoreCase",
				"matchAll",
				"variant",
				"colour",
				"class",
			]),
		},
		args: {
			query: "spotlight",
			text: "With the Highlight component, you can spotlight words.",
			ignoreCase: false,
			matchAll: true,
			variant: "subtle",
			colour: "gray",
		},
	});
</script>

{#snippet multipleStory()}
	<Heading size="lg">
		<Highlight
			query={["spotlight", "emphasise", "accentuate"]}
			text="With the Highlight component, you can spotlight, emphasise and accentuate words."
		/>
	</Heading>
{/snippet}

{#snippet customStyleStory()}
	<Highlight
		query="component"
		variant="text"
		text="With the Highlight component, you can spotlight words."
	/>
{/snippet}

{#snippet searchQueryStory()}
	{@const query = "spot"}
	{@const results = ["Spotlight bulb", "Spot cleaner", "Spot ceiling"]}
	<Stack>
		<Text>Search result for: spot</Text>
		<Stack>
			{#each results as item}
				<Text>
					<Highlight ignoreCase {query} variant="text" text={item} />
				</Text>
			{/each}
		</Stack>
	</Stack>
{/snippet}

{#snippet basicStory()}
	<Highlight
		query="spotlight"
		variant="subtle"
		colour="orange"
		text="With the Highlight component, you can spotlight words."
	/>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="CustomStyle" template={customStyleStory} />

<Story name="SearchQuery" template={searchQueryStory} />
