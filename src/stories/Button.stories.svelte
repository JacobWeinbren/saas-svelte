<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button, ButtonGroup } from "$saas/button";
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
		title: "UI/Button",
		component: Button,
		argTypes: {
			variant: {
				control: "select",
				options: variants,
			},
			size: {
				control: "select",
				options: sizes,
			},
			color: {
				control: "select",
				options: colors,
			},
			loading: { control: "boolean" },
			loadingText: { control: "text" },
		},
		args: {
			variant: "surface",
			size: "md",
			color: "gray",
		},
	});
</script>

{#snippet sizesStory()}
	<div class="flex flex-wrap items-center gap-4">
		{#each sizes as size}
			<Button {size}>Button {size}</Button>
		{/each}
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="flex flex-wrap items-center gap-4 p-4">
		{#each variants as variant}
			<Button {variant}>{variant}</Button>
		{/each}
	</div>
{/snippet}

{#snippet iconsStory()}
	<div class="flex flex-wrap items-center gap-4">
		<Button color="teal" variant="solid">
			<Mail class="w-4 h-4" />
			Mail
		</Button>

		<Button color="teal" variant="outline">
			Call us
			<ArrowRight class="w-4 h-4" />
		</Button>
	</div>

	<br />

	<div class="flex flex-col justify-self-start gap-4">
		{#each sizes as size}
			<Button color="rose" variant="solid" {size} icon>
				<Heart />
			</Button>
		{/each}
	</div>
{/snippet}

{#snippet loadingStory()}
	<div class="flex flex-wrap items-center gap-4">
		<Button loading>Click me</Button>
		<Button loading loadingText="Saving...">Click me</Button>
	</div>
{/snippet}

{#snippet colorsStory()}
	<div class="flex flex-col gap-4">
		{#each colors as color}
			<div class="flex items-center gap-4">
				<span class="w-16 font-mono text-xs text-gray-500">{color}</span
				>
				<Button variant="solid" {color}>Solid</Button>
				<Button variant="subtle" {color}>Subtle</Button>
				<Button variant="outline" {color}>Outline</Button>
			</div>
		{/each}
	</div>
{/snippet}

{#snippet groupStory()}
	<ButtonGroup>
		<Button variant="outline" size="sm">Button</Button>
		<Button variant="outline" size="sm" icon>
			<ChevronDown />
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
