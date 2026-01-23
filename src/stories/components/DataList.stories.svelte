<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		DataListRoot,
		DataListItem,
		DataListItemLabel,
		DataListItemValue,
	} from "$saas/components/data-list";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		orientations,
		dataListSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Data List",
		component: DataListRoot,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: dataListSizes,
				table: { defaultValue: { summary: "md" } },
			},
			orientation: {
				control: "select",
				options: orientations,
				table: { defaultValue: { summary: "horizontal" } },
			},
			divider: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			colour: commonArgTypes.colour,
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"size",
				"orientation",
				"divider",
				"colour",
				"class",
			]),
		},
		args: {
			size: "md",
			orientation: "horizontal",
			divider: false,
		},
	});

	export { DataListRoot, DataListItem, DataListItemLabel, DataListItemValue };

	const stats = [
		{ label: "New Users", value: "234" },
		{ label: "Sales", value: "£12,340" },
		{ label: "Revenue", value: "3,450" },
	];

	const items = [
		{ label: "First Name", value: "Jassie" },
		{ label: "Last Name", value: "Bhatia" },
		{ label: "Email", value: "jassie@jassie.dev" },
		{ label: "Phone", value: "1234567890" },
		{ label: "Address", value: "1234 Main St, Anytown, USA" },
	];
</script>

{#snippet basicStory(args: any)}
	<DataListRoot {...args}>
		{#each stats as item}
			<DataListItem>
				<DataListItemLabel>{item.label}</DataListItemLabel>
				<DataListItemValue>{item.value}</DataListItemValue>
			</DataListItem>
		{/each}
	</DataListRoot>
{/snippet}

{#snippet sizesStory()}
	<VStack align="start" gap={4}>
		{#each dataListSizes as size}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<DataListRoot {size}>
					<DataListItem>
						<DataListItemLabel>Name</DataListItemLabel>
						<DataListItemValue>John Doe</DataListItemValue>
					</DataListItem>
				</DataListRoot>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet orientationStory()}
	<DataListRoot orientation="horizontal">
		{#each stats as item}
			<DataListItem>
				<DataListItemLabel>{item.label}</DataListItemLabel>
				<DataListItemValue>{item.value}</DataListItemValue>
			</DataListItem>
		{/each}
	</DataListRoot>
{/snippet}

{#snippet verticalStory()}
	<DataListRoot orientation="vertical">
		{#each stats.slice(0, 2) as item}
			<DataListItem>
				<DataListItemLabel>{item.label}</DataListItemLabel>
				<DataListItemValue>{item.value}</DataListItemValue>
			</DataListItem>
		{/each}
	</DataListRoot>
{/snippet}

{#snippet dividerStory()}
	<DataListRoot orientation="horizontal" divider class="max-w-md">
		{#each items as item (item.label)}
			<DataListItem>
				<DataListItemLabel>{item.label}</DataListItemLabel>
				<DataListItemValue>{item.value}</DataListItemValue>
			</DataListItem>
		{/each}
	</DataListRoot>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Orientation" template={orientationStory} />

<Story name="Vertical" template={verticalStory} />

<Story name="With Divider" template={dividerStory} />
