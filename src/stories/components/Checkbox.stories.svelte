<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Checkbox, CheckboxGroup } from "$saas/components/checkbox";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import Plus from "phosphor-svelte/lib/Plus";
	import IndeterminateCheckbox from "./indeterminate-checkbox.svelte";
	import {
		colours,
		sizes,
		checkboxVariants,
		commonArgTypes,
		getControls,
		orientations,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Checkbox",
		component: Checkbox as any,
		subcomponents: { CheckboxGroup },
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
			orientation: {
				control: "select",
				options: orientations,
				table: { defaultValue: { summary: "vertical" } },
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

{#snippet variantsStory()}
	<HStack align="start" class="gap-10">
		{#each checkboxVariants as variant}
			<VStack align="start" class="flex-1 gap-2">
				<Text>
					{variant}
				</Text>
				<Checkbox
					checked={false}
					variant={variant as any}
					label="Unchecked"
				/>
				<Checkbox checked variant={variant as any} label="Checked" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet controlledStory(args: any)}
	<Checkbox bind:checked={args.checked} label="Accept terms and conditions" />
{/snippet}

{#snippet coloursStory()}
	<VStack align="start" class="gap-2">
		{#each colours as colour}
			<HStack align="center" class="w-full gap-10">
				<Text class="min-w-[8ch] text-xs">
					{colour}
				</Text>
				{#each checkboxVariants as variant}
					<Checkbox
						{variant}
						colour={colour as any}
						checked
						label="Checkbox"
					/>
				{/each}
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<Stack align="start" class="flex-1 gap-4">
		{#each sizes.filter((s) => ["sm", "md", "lg"].includes(s)) as size}
			<Checkbox size={size as any} checked label="Checkbox" />
		{/each}
	</Stack>
{/snippet}

{#snippet statesStory()}
	<Stack class="gap-2">
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
			<Icon as={Plus} size="xs" />
		{/snippet}
	</Checkbox>
{/snippet}

{#snippet indeterminateStory()}
	<IndeterminateCheckbox />
{/snippet}

{#snippet descriptionStory()}
	<Checkbox class="items-start">
		<div class="flex flex-col">
			<span class="text-gray-900 dark:text-gray-100">
				I agree to the terms and conditions
			</span>
			<span class="mt-1 font-normal text-gray-500">
				By clicking this, you agree to our Terms and Privacy Policy.
			</span>
		</div>
	</Checkbox>
{/snippet}

{#snippet linkStory()}
	<Checkbox>
		I agree to the{" "}
		<Link colour="teal" href="https://google.com">terms and conditions</Link>
	</Checkbox>
{/snippet}

<Story name="Basic" />

<Story name="Variants" template={variantsStory} />

<Story name="Controlled" template={controlledStory as any} />

<Story name="Colours" template={coloursStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="States" template={statesStory} />

<Story name="Group" template={groupStory} />

<Story name="CustomIcon" template={customIconStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Description" template={descriptionStory} />

<Story name="Link" template={linkStory} />
