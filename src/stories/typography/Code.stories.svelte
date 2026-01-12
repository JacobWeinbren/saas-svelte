<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Code } from "$saas/typography/code";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { colors, commonArgTypes, getControls } from "../utils";

	const codeVariants = ["solid", "outline", "subtle", "surface"] as const;
	const codeSizes = ["xs", "sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "typography/Code",
		component: Code,
		argTypes: {
			variant: {
				control: "select",
				options: codeVariants as any,
				description: "The visual style of the code element.",
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				control: "select",
				options: codeSizes as any,
				description: "The size of the code element.",
				table: { defaultValue: { summary: "sm" } },
			},
			color: {
				...commonArgTypes.color,
				options: colors as any,
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"color",
				"children",
				"class",
			]),
		},
		args: {
			variant: "subtle",
			size: "sm",
			color: "gray",
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

{#snippet colorsStory()}
	<VStack class="gap-4">
		{#each colors as color}
			<HStack class="gap-4">
				<Text size="xs" class="w-16">{color}</Text>
				<Code variant="solid" color={color as any}>console.log()</Code>
				<Code variant="outline" color={color as any}>console.log()</Code
				>
				<Code variant="subtle" color={color as any}>console.log()</Code>
				<Code variant="surface" color={color as any}>console.log()</Code
				>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet inlineStory()}
	<Text>
		To install the package, run <Code>npm install @saas-ui/react</Code> in your
		terminal.
	</Text>
{/snippet}

<Story name="Basic">
	<Code>console.log("Hello, world!")</Code>
</Story>

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colors" template={colorsStory} />

<Story name="Inline" template={inlineStory} />
