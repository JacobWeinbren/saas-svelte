<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button, ButtonGroup } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Heart, Mail, ArrowRight, ChevronDown } from "@lucide/svelte";
	import {
		colors,
		sizes,
		buttonVariants,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Button",
		component: Button,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: buttonVariants,
			},
			size: {
				...commonArgTypes.size,
				options: sizes,
			},
			color: {
				...commonArgTypes.color,
				options: colors,
			},
			loading: {
				control: "boolean",
				description: "Whether the button is in a loading state.",
				table: { defaultValue: { summary: "false" } },
			},
			loadingText: {
				control: "text",
				description: "Text to display when localing.",
			},
			icon: commonArgTypes.icon,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"color",
				"loading",
				"loadingText",
				"icon",
				"children",
				"class",
			]),
		},
		args: {
			variant: "surface",
			size: "md",
			color: "gray",
		},
	});
</script>

{#snippet sizesStory()}
	<HStack class="flex-wrap gap-4">
		{#each sizes as size}
			<Button {size}>Button {size}</Button>
		{/each}
	</HStack>
{/snippet}

{#snippet buttonVariantsStory()}
	<HStack class="flex-wrap gap-4 p-4">
		{#each buttonVariants as variant}
			<Button {variant}>{variant}</Button>
		{/each}
	</HStack>
{/snippet}

{#snippet iconsStory()}
	<HStack class="flex-wrap gap-4">
		<Button color="teal" variant="solid">
			<Icon as={Mail} class="size-4" />
			Mail
		</Button>

		<Button color="teal" variant="outline">
			Call us
			<Icon as={ArrowRight} class="size-4" />
		</Button>
	</HStack>

	<br />

	<VStack align="start" class="gap-4">
		{#each sizes as size}
			<Button color="rose" variant="solid" {size} icon>
				<Icon as={Heart} />
			</Button>
		{/each}
	</VStack>
{/snippet}

{#snippet loadingStory()}
	<HStack class="flex-wrap gap-4">
		<Button loading>Click me</Button>
		<Button loading loadingText="Saving...">Click me</Button>
	</HStack>
{/snippet}

{#snippet colorsStory()}
	<VStack class="gap-4">
		{#each colors as color}
			<HStack class="gap-4">
				<Text size="xs" class="w-16">{color}</Text>
				<Button variant="solid" color={color as any}>Solid</Button>
				<Button variant="subtle" color={color as any}>Subtle</Button>
				<Button variant="outline" color={color as any}>Outline</Button>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet groupStory()}
	<ButtonGroup>
		<Button variant="outline" size="sm">Button</Button>
		<Button variant="outline" size="sm" icon>
			<Icon as={ChevronDown} />
		</Button>
	</ButtonGroup>
{/snippet}

<Story name="Basic">Button</Story>

<Story name="With Icon" template={iconsStory} />

<Story name="Loading" template={loadingStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={buttonVariantsStory} />

<Story name="Colors" template={colorsStory} />

<Story name="Group" template={groupStory} />
