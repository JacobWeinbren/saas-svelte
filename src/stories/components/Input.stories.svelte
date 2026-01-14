<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Input,
		InputAddon,
		InputGroup,
		InputElement,
	} from "$saas/components/input";
	import { Group } from "$saas/layout/group";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		sizes,
		inputVariants,
		colours,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Input",
		component: Input,
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"invalid",
				"disabled",
				"placeholder",
				"class",
			]),
		},
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: inputVariants,
			},
			size: {
				...commonArgTypes.size,
				options: sizes.filter((s) => s !== "xl"),
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			placeholder: {
				control: "text",
			},
			class: commonArgTypes.class,
		},
		args: {
			placeholder: "Enter text...",
			variant: "outline",
			size: "md",
			colour: "gray",
		},
		subcomponents: {
			InputGroup: InputGroup as any,
			InputElement: InputElement as any,
			InputAddon: InputAddon as any,
		},
	});
	export { Input, InputGroup, InputElement, InputAddon };
</script>

{#snippet variantsStory()}
	<Stack class="max-w-md gap-4">
		{#each ["outline", "subtle", "flushed"] as variant}
			<HStack align="center" class="gap-4">
				<Text size="xs" class="min-w-[8ch]">{variant}</Text>
				<Input {variant} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet sizesStory()}
	<Stack class="max-w-md gap-4">
		{#each ["xs", "sm", "md", "lg"] as size}
			<HStack align="center" class="gap-4">
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<Input {size} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet withAddonsStory()}
	<Stack class="max-w-sm">
		<Group attached>
			<InputAddon>https://</InputAddon>
			<Input placeholder="website.com" />
		</Group>

		<Group attached>
			<Input placeholder="jdoe" />
			<InputAddon>@gmail.com</InputAddon>
		</Group>
	</Stack>
{/snippet}

{#snippet disabledStory()}
	<Stack class="max-w-sm">
		<Input disabled placeholder="Disabled input" />
	</Stack>
{/snippet}

{#snippet coloursStory()}
	<Stack class="max-w-sm gap-4">
		{#each colours as colour}
			<HStack align="center" class="gap-4">
				<Text size="xs" class="min-w-[8ch] capitalize">{colour}</Text>
				<Input {colour} placeholder="Focus to see {colour} ring" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet inputWithPlaceholderStyleStory()}
	<Stack class="max-w-sm">
		<Input
			colour="teal"
			placeholder="custom placeholder"
			class="text-(--c-700) placeholder:text-inherit dark:text-(--c-700)"
		/>
	</Stack>
{/snippet}

<Story name="Basic">
	<Input placeholder="Enter text..." />
</Story>

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="With Addons" template={withAddonsStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Colours" template={coloursStory} />

<Story
	name="Input With Placeholder Style"
	template={inputWithPlaceholderStyleStory}
/>
