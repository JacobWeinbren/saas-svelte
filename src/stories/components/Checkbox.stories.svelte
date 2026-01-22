<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Checkbox, CheckboxGroup } from "$saas/components/checkbox";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import Plus from "phosphor-svelte/lib/Plus";
	import {
		colours,
		sizes,
		checkboxVariants,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Checkbox",
		component: Checkbox,
		argTypes: {
			checked: {
				control: "boolean",
				table: { type: { summary: "boolean | 'indeterminate'" } },
			},
			size: {
				...commonArgTypes.size,
				options: sizes.filter((s) => ["sm", "md", "lg"].includes(s)),
			},
			variant: {
				...commonArgTypes.variant,
				options: checkboxVariants,
				table: { defaultValue: { summary: "solid" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "indigo" } },
			},
			label: {
				control: "text",
			},
			description: {
				control: "text",
			},
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			icon: commonArgTypes.icon,
			value: {
				control: "text",
			},
			group: {
				control: false,
				table: { disable: true },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"checked",
				"size",
				"variant",
				"colour",
				"label",
				"description",
				"disabled",
				"invalid",
				"icon",
				"value",
				"orientation",
				"class",
				"children",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			colour: "indigo",
			label: "Accept terms and conditions",
			checked: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Checkbox
		checked={args.checked}
		size={args.size}
		variant={args.variant}
		colour={args.colour}
		label={args.label}
		description={args.description}
		disabled={args.disabled}
		invalid={args.invalid}
		value={args.value}
		class={args.class}
	/>
{/snippet}

{#snippet variantsStory()}
	<HStack align="start" gap={10}>
		{#each checkboxVariants as variant}
			<VStack gap={2} class="flex-1 items-center">
				<Text size="xs">
					{variant}
				</Text>
				<Checkbox checked={false} {variant} label="Unchecked" />
				<Checkbox checked {variant} label="Checked" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet controlledStory(args: any)}
	<Checkbox bind:checked={args.checked} label="Accept terms and conditions" />
{/snippet}

{#snippet coloursStory()}
	<VStack align="start" gap={2}>
		{#each colours as colour}
			<HStack align="center" gap={10} class="w-full">
				<Text size="xs" class="min-w-[8ch]">
					{colour}
				</Text>
				{#each checkboxVariants as variant}
					<Checkbox {variant} {colour} checked label="Checkbox" />
				{/each}
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={12} class="flex-1">
		{#each ["sm", "md", "lg"] as const as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Checkbox {size} checked label="Checkbox" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet statesStory()}
	<Stack gap={2}>
		<Checkbox disabled label="Disabled" />
		<Checkbox checked disabled label="Disabled Checked" />
		<Checkbox invalid label="Invalid" />
	</Stack>
{/snippet}

{#snippet groupStory()}
	<CheckboxGroup label="Select framework">
		<Checkbox value="react" label="React" />
		<Checkbox value="svelte" label="Svelte" />
		<Checkbox value="vue" label="Vue" />
		<Checkbox value="angular" label="Angular" />
	</CheckboxGroup>
{/snippet}

{#snippet customIconStory()}
	<Checkbox checked label="With Custom Icon">
		{#snippet icon()}
			<Icon as={Plus} size="xs" aria-hidden="true" />
		{/snippet}
	</Checkbox>
{/snippet}

{#snippet indeterminateStory()}
	{@const items = [
		{ label: "Monday", value: "monday" },
		{ label: "Tuesday", value: "tuesday" },
		{ label: "Wednesday", value: "wednesday" },
		{ label: "Thursday", value: "thursday" },
	]}
	<CheckboxGroup
		selectAllLabel="Weekdays"
		allValues={items.map((i) => i.value)}
		defaultValue={["monday"]}
	>
		{#each items as item}
			<Checkbox value={item.value} label={item.label} />
		{/each}
	</CheckboxGroup>
{/snippet}

{#snippet descriptionStory()}
	<Checkbox class="items-start">
		<div class="flex flex-col">
			<span class="text-fg-default">
				I agree to the terms and conditions
			</span>
			<span class="mt-1 font-normal text-fg-muted">
				By clicking this, you agree to our Terms and Privacy Policy.
			</span>
		</div>
	</Checkbox>
{/snippet}

{#snippet linkStory()}
	<Checkbox>
		I agree to the{" "}
		<Link colour="teal" href="https://google.com">terms and conditions</Link
		>
	</Checkbox>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="States" template={statesStory} />

<Story name="Group" template={groupStory} />

<Story name="Custom Icon" template={customIconStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Description" template={descriptionStory} />

<Story name="Link" template={linkStory} />
