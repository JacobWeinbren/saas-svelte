<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { NumberInput } from "$saas/components/number-input";
	import { Field } from "$saas/components/field";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { commonArgTypes, getControls, colours } from "../utils";

	const numberInputSizes = ["xs", "sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "components/Number Input",
		component: NumberInput,
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"invalid",
				"disabled",
				"placeholder",
				"min",
				"max",
				"step",
				"defaultValue",
				"allowMouseWheel",
				"class",
			]),
		},
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: numberInputSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			placeholder: {
				control: "text",
				description: "Placeholder text for the input.",
			},
			min: {
				control: "number",
				description: "The minimum value allowed.",
			},
			max: {
				control: "number",
				description: "The maximum value allowed.",
			},
			step: {
				control: "number",
				description: "The step increment/decrement value.",
				table: { defaultValue: { summary: "1" } },
			},
			defaultValue: {
				control: "text",
				description: "The default value of the number input.",
			},
			allowMouseWheel: {
				control: "boolean",
				description:
					"Whether to allow mouse wheel to change the value.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		args: {
			size: "md",
			colour: "gray",
			defaultValue: "10",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="w-52">
		<NumberInput {...args} />
	</div>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4} class="max-w-52">
		{#each numberInputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<NumberInput {size} defaultValue="10" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet minMaxStory()}
	<div class="w-52">
		<NumberInput defaultValue="10" min={5} max={50} />
	</div>
{/snippet}

{#snippet stepStory()}
	<div class="w-52">
		<NumberInput defaultValue="2" step={3} />
	</div>
{/snippet}

{#snippet mouseWheelStory()}
	<div class="w-52">
		<NumberInput defaultValue="10" allowMouseWheel />
	</div>
{/snippet}

{#snippet disabledStory()}
	<div class="w-52">
		<NumberInput defaultValue="10" disabled />
	</div>
{/snippet}

{#snippet invalidStory()}
	<Field.Root invalid class="w-52">
		<Field.Label>Enter Number</Field.Label>
		<NumberInput defaultValue="10" />
		<Field.ErrorText>The entry is invalid</Field.ErrorText>
	</Field.Root>
{/snippet}

{#snippet withFieldStory()}
	<Field.Root class="w-52">
		<Field.Label>Enter Number</Field.Label>
		<NumberInput />
		<Field.HelperText>Enter a number between 1 and 10</Field.HelperText>
	</Field.Root>
{/snippet}

{#snippet formatPercentStory()}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="5"
			step={0.01}
			formatOptions={{
				style: "percent",
			}}
		/>
	</Stack>
{/snippet}

{#snippet formatCurrencyStory()}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="45"
			formatOptions={{
				style: "currency",
				currency: "EUR",
				currencyDisplay: "code",
				currencySign: "accounting",
			}}
		/>
	</Stack>
{/snippet}

{#snippet formatUnitStory()}
	<Stack gap={4} class="max-w-52">
		<NumberInput
			defaultValue="4"
			formatOptions={{
				style: "unit",
				unit: "inch",
				unitDisplay: "long",
			}}
		/>
	</Stack>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={4} class="max-w-52">
		{#each ["gray", "blue", "green", "red", "orange", "purple"] as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch] capitalize">{colour}</Text>
				<NumberInput {colour} defaultValue="10" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Min and Max" template={minMaxStory} />

<Story name="Step" template={stepStory} />

<Story name="Mouse Wheel" template={mouseWheelStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Invalid" template={invalidStory} />

<Story name="With Field" template={withFieldStory} />

<Story name="Format Percent" template={formatPercentStory} />

<Story name="Format Currency" template={formatCurrencyStory} />

<Story name="Format Unit" template={formatUnitStory} />

<Story name="Colours" template={coloursStory} />
