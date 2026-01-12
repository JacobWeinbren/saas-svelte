<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Kbd } from "$saas/components/kbd";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { sizes, commonArgTypes, getControls } from "../utils";

	const kbdVariants = ["raised", "outline", "subtle", "plain"] as const;

	const { Story } = defineMeta({
		title: "components/Kbd",
		component: Kbd,
		argTypes: {
			variant: {
				control: "select",
				options: kbdVariants as any,
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				control: "select",
				options: ["sm", "md", "lg"] as any,
				table: { defaultValue: { summary: "md" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "size", "children", "class"]),
		},
		args: {
			variant: "subtle",
			size: "md",
		},
	});
</script>

{#snippet combinationsStory()}
	<HStack class="gap-1">
		<Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
	</HStack>
{/snippet}

{#snippet functionKeysStory()}
	<HStack class="gap-2">
		<Kbd>⌘</Kbd>
		<Kbd>⌥</Kbd>
		<Kbd>⇧</Kbd>
		<Kbd>⌃</Kbd>
	</HStack>
{/snippet}

{#snippet variantsStory()}
	<HStack class="flex-wrap gap-4">
		{#each kbdVariants as variant}
			<Kbd {variant}>Shift + Tab</Kbd>
		{/each}
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack class="flex-wrap gap-4">
		<Kbd size="sm">Shift + Tab</Kbd>
		<Kbd size="md">Shift + Tab</Kbd>
		<Kbd size="lg">Shift + Tab</Kbd>
	</HStack>
{/snippet}

{#snippet withinTextStory()}
	<Text>
		Press <Kbd>F12</Kbd> to open DevTools
	</Text>
{/snippet}

<Story name="Basic">Shift + Tab</Story>

<Story name="Combinations" template={combinationsStory} />

<Story name="Function Keys" template={functionKeysStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Within Text" template={withinTextStory} />
