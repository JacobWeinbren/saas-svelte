<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		DataListRoot,
		DataListItem,
		DataListItemLabel,
		DataListItemValue,
	} from "$saas/components/data-list";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls, orientations } from "../utils";

	const dataListSizes = ["sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "components/DataList",
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
			color: {
				control: "text",
				table: { defaultValue: { summary: "gray" } },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls(["size", "orientation", "color", "class"]),
		},
		args: {
			size: "md",
			orientation: "horizontal",
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

{#snippet basicStory()}
	<DataListRoot orientation="horizontal">
		{#each stats as item}
			<DataListItem>
				<DataListItemLabel>{item.label}</DataListItemLabel>
				<DataListItemValue>{item.value}</DataListItemValue>
			</DataListItem>
		{/each}
	</DataListRoot>
{/snippet}

{#snippet sizesStory()}
	<Stack class="gap-8">
		{#each dataListSizes as size}
			<Stack class="gap-2">
				<Text>{size}</Text>

				<DataListRoot {size}>
					<DataListItem>
						<DataListItemLabel>Name</DataListItemLabel>
						<DataListItemValue>John Doe</DataListItemValue>
					</DataListItem>
				</DataListRoot>
			</Stack>
		{/each}
	</Stack>
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

{#snippet separatorStory()}
	<DataListRoot
		orientation="horizontal"
		class="gap-0 divide-y divide-gray-200 dark:divide-gray-800 max-w-md"
	>
		{#each items as item (item.label)}
			<DataListItem class="py-4 first:pt-0 last:pb-0 grow">
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

<Story name="WithSeparator" template={separatorStory} />
