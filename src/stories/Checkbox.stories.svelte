<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Checkbox, CheckboxGroup } from "$saas/checkbox";
	import { Stack, HStack, VStack } from "$saas/stack";
	import { Icon } from "$saas/icon";
	import { hideInheritedProps } from "../../.storybook/hide-inherited-props";
	import { Plus } from "@lucide/svelte";
	import IndeterminateCheckbox from "./indeterminate-checkbox.svelte";

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
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	] as const;

	const sizes = ["sm", "md", "lg"] as const;
	const variants = ["outline", "subtle", "solid"] as const;

	// List of HTML input attributes to hide from controls
	const inputPropsToHide = [
		"accept",
		"alt",
		"autocomplete",
		"autocorrect",
		"capture",
		"dirname",
		"form",
		"formaction",
		"formenctype",
		"formmethod",
		"formnovalidate",
		"formtarget",
		"height",
		"list",
		"max",
		"maxlength",
		"min",
		"minlength",
		"multiple",
		"name",
		"pattern",
		"placeholder",
		"readonly",
		"required",
		"src",
		"step",
		"type",
		"width",
		"webkitdirectory",
		"indeterminate",
		"defaultchecked",
		"defaultValue",
		"defaultvalue",
	].reduce((acc: Record<string, any>, prop) => {
		acc[prop] = { table: { disable: true } };
		return acc;
	}, {});

	const { Story } = defineMeta({
		title: "components/Checkbox",
		component: Checkbox as any,
		subcomponents: { CheckboxGroup },
		argTypes: {
			checked: {
				control: "boolean",
				description: "The controlled checked state of the checkbox.",
				table: { type: { summary: "boolean | 'indeterminate'" } },
			},
			size: {
				control: "select",
				options: sizes,
				description: "The size of the component.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: variants,
				description: "The variant of the component.",
				table: { defaultValue: { summary: "solid" } },
			},
			color: {
				control: "select",
				options: colors,
				description: "The color palette of the component.",
				table: { defaultValue: { summary: "indigo" } },
			},
			label: {
				control: "text",
				description: "The label text displayed next to the checkbox.",
			},
			description: {
				control: "text",
				description:
					"Additional description text displayed below the label.",
			},
			disabled: {
				control: "boolean",
				description: "Whether the checkbox is disabled.",
			},
			invalid: {
				control: "boolean",
				description: "Whether the checkbox is invalid.",
			},
			icon: {
				control: "boolean",
				description: "Custom icon snippet to render when checked.",
			},
			value: {
				control: "text",
				description:
					"The value of checkbox input. Useful for form submission.",
			},
			group: {
				control: false,
				description: "Group context value (internal use).",
				table: { disable: true },
			},
			// Added orientation for CheckboxGroup
			orientation: {
				control: "select",
				options: ["vertical", "horizontal"],
				description: "The layout orientation of the CheckboxGroup.",
				table: { defaultValue: { summary: "vertical" } },
			},
			...hideInheritedProps(),
			...inputPropsToHide,
		},
		args: {
			size: "md",
			variant: "solid",
			color: "indigo",
			label: "Accept terms and conditions",
			checked: false,
		},
	});
</script>

{#snippet variantsStory()}
	<HStack align="start" class="gap-10">
		{#each variants as variant}
			<VStack align="start" class="flex-1 gap-2">
				<span class="text-sm font-medium">{variant}</span>
				<Checkbox checked={false} {variant} label="Unchecked" />
				<Checkbox checked {variant} label="Checked" />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet controlledStory(args: any)}
	<Checkbox bind:checked={args.checked} label="Accept terms and conditions" />
{/snippet}

{#snippet colorsStory()}
	<VStack align="start" class="gap-2">
		{#each colors as color}
			<HStack align="center" class="w-full gap-10">
				<span class="min-w-[8ch] text-xs font-mono text-gray-500">
					{color}
				</span>
				{#each variants as variant}
					<Checkbox {variant} {color} checked label="Checkbox" />
				{/each}
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<Stack align="start" class="flex-1 gap-4">
		{#each sizes as size}
			<Checkbox {size} checked label="Checkbox" />
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
		I agree to the <a
			href="https://google.com"
			class="text-indigo-600 hover:underline">terms and conditions</a
		>
	</Checkbox>
{/snippet}

<Story name="Basic" />

<Story name="Variants" template={variantsStory} />

<Story name="Controlled" template={controlledStory as any} />

<Story name="Colors" template={colorsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="States" template={statesStory} />

<Story name="Group" template={groupStory} />

<Story name="CustomIcon" template={customIconStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Description" template={descriptionStory} />

<Story name="Link" template={linkStory} />
