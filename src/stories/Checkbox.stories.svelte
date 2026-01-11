<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Checkbox, CheckboxGroup } from "$saas/checkbox";
	import { hideInheritedProps } from "../../.storybook/hide-inherited-props";

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

	const { Story } = defineMeta({
		title: "components/Checkbox",
		component: Checkbox as any,
		subcomponents: { CheckboxGroup },
		argTypes: {
			checked: {
				control: "boolean",
				description: "Checked state (supports 'indeterminate').",
				table: { type: { summary: "boolean | 'indeterminate'" } },
			},
			group: {
				control: false,
				description: "Array of selected values when used in a group.",
				table: { type: { summary: "string[]" } },
			},
			value: {
				control: "text",
				description: "The value of the checkbox when used in a group.",
			},
			size: {
				control: "select",
				options: sizes,
				description: "The size of the checkbox.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: variants,
				description: "The visual style of the checkbox.",
				table: { defaultValue: { summary: "solid" } },
			},
			color: {
				control: "select",
				options: colors,
				description: "The color scheme of the checkbox.",
				table: { defaultValue: { summary: "indigo" } },
			},
			label: {
				control: "text",
				description: "Label text.",
			},
			description: {
				control: "text",
				description: "Helper description text.",
			},
			disabled: {
				control: "boolean",
				description: "Disabled state.",
			},
			invalid: {
				control: "boolean",
				description: "Visual invalid state.",
			},
			class: {
				control: "text",
				description: "Additional CSS classes.",
			},
			children: {
				control: false,
				description: "The content to render inside the checkbox label.",
				table: { type: { summary: "Snippet" } },
			},
			...hideInheritedProps(),
		},
		args: {
			size: "md",
			variant: "solid",
			color: "indigo",
			label: "Accept terms and conditions",
			checked: false,
			disabled: false,
			invalid: false,
		},
	});
</script>

{#snippet sizesStory()}
	<div class="flex flex-col gap-4">
		{#each sizes as size}
			<Checkbox {size} checked label={`Checkbox ${size}`} />
		{/each}
	</div>
{/snippet}

{#snippet colorsStory()}
	<div class="flex flex-wrap gap-6">
		{#each colors as color}
			<div class="flex flex-col gap-2">
				<span class="font-mono text-xs text-gray-400">{color}</span>
				<Checkbox {color} checked label="Checkbox" />
			</div>
		{/each}
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="flex gap-10">
		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-gray-500">Outline</span>
			<Checkbox variant="outline" checked label="Checkbox" />
		</div>
		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-gray-500">Subtle</span>
			<Checkbox variant="subtle" checked label="Checkbox" />
		</div>
		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-gray-500">Solid</span>
			<Checkbox variant="solid" checked label="Checkbox" />
		</div>
	</div>
{/snippet}

{#snippet statesStory()}
	<div class="flex flex-col gap-4">
		<Checkbox label="Default" />
		<Checkbox checked label="Checked" />
		<Checkbox checked="indeterminate" label="Indeterminate" />
		<Checkbox disabled label="Disabled Unchecked" />
		<Checkbox disabled checked label="Disabled Checked" />
		<Checkbox invalid label="Invalid State" />
	</div>
{/snippet}

{#snippet descriptionStory()}
	<div class="flex flex-col max-w-sm gap-6">
		<Checkbox
			label="Subscribe to newsletter"
			description="We will send you weekly updates about our product."
		/>
		<Checkbox
			checked
			size="lg"
			label="Enable Notifications"
			description="Receive push notifications on your desktop immediately."
		/>
	</div>
{/snippet}

{#snippet groupStory()}
	<div class="space-y-10">
		<CheckboxGroup label="Select Frameworks (Vertical)">
			<Checkbox value="svelte" label="Svelte" />
			<Checkbox value="react" label="React" />
			<Checkbox value="vue" label="Vue" />
		</CheckboxGroup>

		<div class="w-full h-px bg-gray-200 dark:bg-zinc-800"></div>

		<CheckboxGroup
			orientation="horizontal"
			label="Select Tier (Horizontal)"
		>
			<Checkbox value="free" label="Free" />
			<Checkbox value="pro" label="Pro" />
			<Checkbox value="enterprise" label="Enterprise" />
		</CheckboxGroup>
	</div>
{/snippet}

{#snippet controlledStory(args: any)}
	<Checkbox bind:checked={args.checked} label="Bindable State" />
	<div
		class="p-2 mt-3 font-mono text-sm text-gray-500 rounded bg-gray-50 dark:bg-zinc-900"
	>
		State: {args.checked}
	</div>
{/snippet}

<Story name="Basic" />

<Story name="Controlled" template={controlledStory as any} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colors" template={colorsStory} />

<Story name="Variants" template={variantsStory} />

<Story name="States" template={statesStory} />

<Story name="WithDescription" template={descriptionStory} />

<Story name="Group" template={groupStory} />
