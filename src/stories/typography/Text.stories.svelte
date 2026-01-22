<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Text } from "$saas/typography/text";
	import { DataList } from "$saas/components/data-list";
	import { commonArgTypes, getControls, textSizes } from "../utils";

	const weights = ["light", "normal", "medium", "semibold", "bold"] as const;

	const { Story } = defineMeta({
		title: "typography/Text",
		component: Text,
		argTypes: {
			as: {
				control: "text",
				table: { defaultValue: { summary: "p" } },
			},
			size: {
				...commonArgTypes.size,
				options: textSizes,
			},
			weight: {
				control: "select",
				options: weights,
				table: { defaultValue: { summary: "normal" } },
			},
			truncate: {
				control: "boolean",
			},
			lineClamp: {
				control: "select",
				options: ["1", "2", "3", "4", "5", "6", "none"],
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
	<DataList.Root orientation="vertical">
		{#each textSizes as size}
			<DataList.Item>
				<DataList.ItemLabel>{size}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text {size}>Chakra</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet weightsStory()}
	<DataList.Root orientation="vertical">
		{#each weights as w}
			<DataList.Item>
				<DataList.ItemLabel>{w}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text weight={w}>Sphinx of black quartz, judge my vow.</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet truncateStory()}
	<div class="flex max-w-[300px]">
		<Text truncate>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</Text>
	</div>
{/snippet}

{#snippet lineClampStory()}
	<div class="flex max-w-[300px]">
		<Text lineClamp="2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</Text>
	</div>
{/snippet}

<Story name="Basic">Sphinx of black quartz, judge my vow.</Story>

<Story name="Sizes" template={sizesStory} />

<Story name="Weights" template={weightsStory} />

<Story name="Truncation" template={truncateStory} />

<Story name="Line Clamp" template={lineClampStory} />
