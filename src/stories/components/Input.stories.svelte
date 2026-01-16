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
	import { Kbd } from "$saas/components/kbd";
	import User from "phosphor-svelte/lib/User";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
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
	});
</script>

{#snippet variantsStory()}
	<Stack class="max-w-md gap-4">
		{#each ["outline", "subtle", "flushed"] as const as variant}
			<HStack align="center" class="gap-4">
				<Text size="xs" class="min-w-[8ch]">{variant}</Text>
				<Input {variant} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet sizesStory()}
	<Stack class="max-w-md gap-4">
		{#each ["xs", "sm", "md", "lg"] as const as size}
			<HStack align="center" class="gap-4">
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<Input {size} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet leftElementStory()}
	<HStack class="gap-4 w-full">
		<InputGroup class="flex-1">
			<InputElement placement="left">
				<User class="size-3.5" aria-hidden="true" />
			</InputElement>
			<Input placeholder="Username" class="pl-(--spacing-8)" />
		</InputGroup>

		<InputGroup class="flex-1">
			<InputElement placement="left">https://</InputElement>
			<Input placeholder="yoursite.com" class="pl-(--spacing-16)" />
		</InputGroup>
	</HStack>
{/snippet}

{#snippet leftAndRightElementStory()}
	<HStack class="gap-4 w-full">
		<InputGroup class="flex-1">
			<InputElement placement="left">
				<MagnifyingGlass class="size-3.5" aria-hidden="true" />
			</InputElement>
			<Input placeholder="Search contacts" class="px-(--spacing-8)" />
			<InputElement placement="right" class="pointer-events-auto">
				<Kbd>⌘K</Kbd>
			</InputElement>
		</InputGroup>

		<InputGroup class="flex-1">
			<InputElement placement="left">https://</InputElement>
			<Input placeholder="yoursite.com" class="pl-(--spacing-16)" />
		</InputGroup>
	</HStack>
{/snippet}

{#snippet withAddonsStory()}
	<Stack class="max-w-sm gap-4">
		<Group attached>
			<InputAddon>https://</InputAddon>
			<Input placeholder="website.com" class="-ml-px focus-visible:z-1" />
		</Group>

		<Group attached>
			<Input placeholder="jdoe" class="-mr-px focus-visible:z-1" />
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
				<Input
					{colour}
					placeholder="Focus to see {colour} ring"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet inputWithPlaceholderStyleStory()}
	<Stack class="max-w-sm">
		<Input
			colour="teal"
			placeholder="custom placeholder"
			class="text-(--c-fg) placeholder:text-inherit"
		/>
	</Stack>
{/snippet}

<Story name="Basic">
	<Input placeholder="Enter text..." />
</Story>

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Left Element" template={leftElementStory} />

<Story name="Left And Right Element" template={leftAndRightElementStory} />

<Story name="With Addons" template={withAddonsStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Colours" template={coloursStory} />

<Story
	name="Input With Placeholder Style"
	template={inputWithPlaceholderStyleStory}
/>
