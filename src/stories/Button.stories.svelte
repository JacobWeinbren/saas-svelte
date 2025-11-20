<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button, ButtonGroup } from "$saas/button";
	import { Mail } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "UI/Button",
		component: Button,
		// tags: ["autodocs"],  <-- REMOVE THIS LINE
		argTypes: {
			variant: {
				control: "select",
				options: [
					"solid",
					"glass",
					"subtle",
					"surface",
					"outline",
					"ghost",
					"plain",
				],
				description: "The visual style of the button",
				table: { defaultValue: { summary: "surface" } },
			},
			size: {
				control: "select",
				options: ["xs", "sm", "md", "lg", "xl"],
				description: "The size of the button",
				table: { defaultValue: { summary: "md" } },
			},
			colorPalette: {
				control: "select",
				options: [
					"gray",
					"blue",
					"red",
					"green",
					"amber",
					"purple",
					"indigo",
					"teal",
					"rose",
				],
				description: "The dynamic color theme",
			},
			loading: {
				control: "boolean",
				description: "Shows a loading spinner",
			},
			loadingText: {
				control: "text",
				description: "Text to show next to spinner when loading",
			},
			children: {
				control: "text",
				name: "Label",
			},
		},
		args: {
			variant: "surface",
			size: "md",
			colorPalette: "gray",
			children: "Button",
		},
	});
</script>

<!-- Basic Single Button Template -->
{#snippet buttonTemplate(args)}
	{@const { children, ...rest } = args}
	<Button {...rest}>
		{children}
	</Button>
{/snippet}

<!-- Icon Button Template -->
{#snippet iconTemplate(args)}
	{@const { children, ...rest } = args}
	<Button {...rest}>
		<Mail class="w-4 h-4" />
		{children}
	</Button>
{/snippet}

<!-- Showcase: Sizes -->
{#snippet sizesTemplate(args)}
	<div class="flex flex-wrap items-center gap-4">
		{#each ["xs", "sm", "md", "lg", "xl"] as size}
			<Button {...args} {size}>Button {size}</Button>
		{/each}
	</div>
{/snippet}

<!-- Showcase: Variants -->
{#snippet variantsTemplate(args)}
	<div
		class="flex flex-wrap items-center gap-4 p-4 bg-white rounded-md dark:bg-gray-900"
	>
		{#each ["solid", "subtle", "outline", "ghost", "plain", "surface"] as variant}
			<Button {...args} {variant} colorPalette="blue">{variant}</Button>
		{/each}
		<div class="p-2 bg-gray-800 rounded">
			<Button {...args} variant="glass" colorPalette="blue">glass</Button>
		</div>
	</div>
{/snippet}

<!-- Showcase: Colors -->
{#snippet colorsTemplate(args)}
	<div class="flex flex-col gap-4">
		{#each ["blue", "red", "green", "amber", "purple", "gray"] as color}
			<div class="flex items-center gap-4">
				<span class="w-16 font-mono text-xs text-gray-500">{color}</span
				>
				<Button {...args} variant="solid" colorPalette={color}
					>Solid</Button
				>
				<Button {...args} variant="subtle" colorPalette={color}
					>Subtle</Button
				>
				<Button {...args} variant="outline" colorPalette={color}
					>Outline</Button
				>
			</div>
		{/each}
	</div>
{/snippet}

<!-- Showcase: Button Group -->
{#snippet groupTemplate(args)}
	<ButtonGroup>
		<Button variant="outline">Save</Button>
		<Button variant="outline">Cancel</Button>
		<Button variant="outline">Export</Button>
	</ButtonGroup>
{/snippet}

<!-- 
  STORIES
-->

<Story name="Basic" template={buttonTemplate} />

<Story
	name="With Icon"
	args={{ children: "Email Login", variant: "outline" }}
	template={iconTemplate}
/>

<Story
	name="Loading"
	args={{ loading: true, children: "Saving..." }}
	template={buttonTemplate}
/>

<Story
	name="Sizes"
	template={sizesTemplate}
	parameters={{ controls: { exclude: ["size"] } }}
/>

<Story
	name="Variants"
	template={variantsTemplate}
	parameters={{ controls: { exclude: ["variant"] } }}
/>

<Story
	name="Colors"
	template={colorsTemplate}
	parameters={{ controls: { exclude: ["colorPalette", "variant"] } }}
/>

<Story name="Group" template={groupTemplate} />
