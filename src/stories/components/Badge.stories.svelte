<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Text } from "$saas/typography/text";
	import Star from "phosphor-svelte/lib/Star";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Badge } from "$saas/components/badge";
	import { commonArgTypes, getControls } from "../utils";

	const badgeVariants = ["subtle", "solid", "outline", "surface"] as const;
	const badgeSizes = ["xs", "sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "components/Badge",
		component: Badge,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: badgeVariants,
			},
			size: {
				...commonArgTypes.size,
				options: badgeSizes,
				table: { defaultValue: { summary: "sm" } },
			},
			colour: commonArgTypes.colour,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"children",
				"class",
			]),
		},
		args: {
			variant: "subtle",
			size: "sm",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Badge {...args}>Badge</Badge>
{/snippet}

{#snippet withIconStory()}
	<VStack align="start" gap={2}>
		<Badge variant="solid" colour="blue">
			<Star class="h-3" aria-hidden="true" />
			New
		</Badge>
		<Badge variant="solid" colour="green">
			New
			<CheckCircle class="h-3" aria-hidden="true" />
		</Badge>
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<HStack align="start" gap={4}>
		{#each badgeVariants as variant}
			<VStack gap={2}>
				<Text size="xs">{variant}</Text>
				<Badge {variant}>Badge</Badge>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={4}>
		{#each badgeSizes as size}
			<VStack gap={2}>
				<Text size="xs">{size}</Text>
				<Badge {size}>New</Badge>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<HStack gap={2}>
		<Badge>Default</Badge>
		<Badge colour="green">Success</Badge>
		<Badge colour="red">Removed</Badge>
		<Badge colour="purple">New</Badge>
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />
