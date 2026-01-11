<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button, ButtonGroup } from "$saas/button";
	import { Icon } from "$saas/icon";
	import { Text } from "$saas/text";
	import { HStack, VStack } from "$saas/stack";
	import { Heart, Mail, ArrowRight, ChevronDown } from "@lucide/svelte";

	const colors = [
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	] as const;

	const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const variants = [
		"glass",
		"solid",
		"subtle",
		"surface",
		"outline",
		"ghost",
		"plain",
	] as const;

	const { Story } = defineMeta({
		title: "components/Button",
		component: Button,
		argTypes: {
			variant: {
				control: "select",
				options: variants,
				description: "The visual style of the button.",
				table: { defaultValue: { summary: "surface" } },
			},
			size: {
				control: "select",
				options: sizes,
				description: "The size of the button.",
				table: { defaultValue: { summary: "md" } },
			},
			color: {
				control: "select",
				options: colors,
				description: "The color scheme of the button.",
				table: { defaultValue: { summary: "gray" } },
			},
			loading: {
				control: "boolean",
				description: "Whether the button is in a loading state.",
			},
			loadingText: {
				control: "text",
				description: "Text to display when the button is loading.",
			},
			icon: {
				control: "boolean",
				description: "Whether the button is icon-only.",
			},
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

{#snippet variantsStory()}
	<HStack class="flex-wrap gap-4 p-4">
		{#each variants as variant}
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
				<Button variant="solid" {color}>Solid</Button>
				<Button variant="subtle" {color}>Subtle</Button>
				<Button variant="outline" {color}>Outline</Button>
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

<Story name="Variants" template={variantsStory} />

<Story name="Colors" template={colorsStory} />

<Story name="Group" template={groupStory} />
