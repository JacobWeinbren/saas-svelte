<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Code } from "$saas/typography/code";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { colours, commonArgTypes, getControls } from "../utils";

	const codeVariants = ["solid", "outline", "subtle", "surface"] as const;
	const codeSizes = ["xs", "sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "typography/Code",
		component: Code,
		argTypes: {
			variant: {
				control: "select",
				options: codeVariants as any,
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				control: "select",
				options: codeSizes as any,
				table: { defaultValue: { summary: "sm" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours as any,
			},
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

{#snippet sizesStory()}
	<VStack align="start" class="gap-4">
		{#each codeSizes as size}
			<Code {size}>console.log()</Code>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack align="start" class="gap-4">
		{#each codeVariants as variant}
			<Code {variant}>console.log()</Code>
		{/each}
	</VStack>
{/snippet}

{#snippet coloursStory()}
	<VStack class="gap-4">
		{#each colours as colour}
			<HStack class="gap-4">
				<Text size="xs" class="w-16">{colour}</Text>
				<Code variant="solid" colour={colour as any}>console.log()</Code>
				<Code variant="outline" colour={colour as any}>console.log()</Code
				>
				<Code variant="subtle" colour={colour as any}>console.log()</Code>
				<Code variant="surface" colour={colour as any}>console.log()</Code
				>
			</HStack>
		{/each}
	</VStack>
{/snippet}

<Story name="Basic">
	<Code>console.log("Hello, world!")</Code>
</Story>

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colours" template={coloursStory} />
