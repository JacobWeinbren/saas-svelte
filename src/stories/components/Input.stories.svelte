<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Input,
		InputAddon,
		InputGroup,
		InputElement,
	} from "$saas/components/input";
	import { Group } from "$saas/components/group";
	import { Stack } from "$saas/layout/stack";
	import {
		commonArgTypes,
		getControls,
		sizes,
		inputVariants,
		colors,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Input",
		component: Input,
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"color",
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
			color: {
				...commonArgTypes.color,
				options: colors as any,
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
			color: "gray",
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
	<Stack class="max-w-sm">
		<Input variant="outline" placeholder="Outline (Default)" />
		<Input variant="subtle" placeholder="Subtle" />
		<Input variant="flushed" placeholder="Flushed" />
	</Stack>
{/snippet}

{#snippet sizesStory()}
	<Stack class="max-w-sm">
		<Input size="xs" placeholder="Size xs" />
		<Input size="sm" placeholder="Size sm" />
		<Input size="md" placeholder="Size md" />
		<Input size="lg" placeholder="Size lg" />
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

{#snippet colorsStory()}
	<Stack class="max-w-sm">
		<Input color="indigo" placeholder="Indigo focus ring" />
		<Input color="rose" placeholder="Rose focus ring" />
		<Input color="emerald" placeholder="Emerald focus ring" />
	</Stack>
{/snippet}

{#snippet inputWithPlaceholderStyleStory()}
	<Stack class="max-w-sm">
		<Input
			color="teal"
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

<Story name="Colors" template={colorsStory} />

<Story
	name="Input With Placeholder Style"
	template={inputWithPlaceholderStyleStory}
/>
