<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Text } from "$saas/text";
	import { commonArgTypes, getControls, textSizes } from "./utils";

	const weights = ["light", "normal", "medium", "semibold", "bold"] as const;

	const { Story } = defineMeta({
		title: "typography/Text",
		component: Text,
		argTypes: {
			as: {
				control: "text",
				description: "The HTML element to render.",
				table: { defaultValue: { summary: "p" } },
			},
			size: {
				...commonArgTypes.size,
				options: textSizes,
				description:
					"The size of the text (supports `textStyle` alias).",
			},
			weight: {
				control: "select",
				options: weights,
				description: "The font weight (supports `fontWeight` alias).",
				table: { defaultValue: { summary: "normal" } },
			},
			variant: {
				control: "select",
				options: ["primary", "secondary", "tertiary"],
				description: "The visual style of the text.",
				table: { defaultValue: { summary: "primary" } },
			},
			truncate: {
				control: "boolean",
				description: "Truncate text to a single line with ellipsis.",
			},
			lineClamp: {
				control: "select",
				options: ["1", "2", "3", "4", "5", "6", "none"],
				description: "Clamp text to a specific number of lines.",
			},
			fontWeight: {
				table: { disable: true },
			},
			textStyle: {
				table: { disable: true },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"as",
				"size",
				"weight",
				"variant",
				"truncate",
				"lineClamp",
				"class",
				"children",
			]),
		},
		args: {
			size: "md",
			weight: "normal",
			as: "p",
		},
	});
</script>

{#snippet sizesStory()}
	<div class="flex flex-col gap-2">
		{#each textSizes as size}
			<Text {size}>Chakra ({size})</Text>
		{/each}
	</div>
{/snippet}

{#snippet weightsStory()}
	<div class="flex flex-col gap-2">
		{#each weights as w}
			<Text weight={w}>Sphinx of black quartz, judge my vow.</Text>
		{/each}
	</div>
{/snippet}

{#snippet truncateStory()}
	<Text truncate>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</Text>
{/snippet}

{#snippet lineClampStory()}
	<Text lineClamp="2">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
		commodo consequat.
	</Text>
{/snippet}

<Story name="Basic">Sphinx of black quartz, judge my vow.</Story>

<Story name="Sizes" template={sizesStory} />

<Story name="Weights" template={weightsStory} />

<Story name="Truncation" template={truncateStory} />

<Story name="Line Clamp" template={lineClampStory} />
