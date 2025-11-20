<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Accordion } from "$saas/accordion";

	const { Story } = defineMeta({
		title: "UI/Accordion",
		component: Accordion,
		argTypes: {
			items: {
				control: "object",
				description:
					"Array of accordion items: { value: string, title: string, text: string }[]",
			},
		},
	});
</script>

<script lang="ts">
	const defaultItems = [
		{
			value: "a",
			title: "Introduction to Accordion",
			text: "An accordion is a vertically stacked list of items where each item can be expanded or collapsed to reveal content. It's perfect for FAQs and sections requiring space management.",
		},
		{
			value: "b",
			title: "The Role of Props",
			text: "The Accordion component accepts an `items` array prop, which structures the titles and content for each collapsible section.",
		},
		{
			value: "c",
			title: "Styling and Transitions",
			text: "This component uses Svelte's built-in `slide` transition for smooth opening/closing effects and Tailwind CSS utility classes for responsive styling.",
		},
	];

	const themedItems = [
		{
			value: "x",
			title: "Data Item One",
			text: "This is the first piece of collapsible content for the themed story.",
		},
		{
			value: "y",
			title: "Data Item Two",
			text: "This is the second, shorter piece of information for the themed story.",
		},
		{
			value: "z",
			title: "Data Item Three",
			text: "A third item to show how the list handles multiple elements.",
		},
	];
</script>

{#snippet defaultStory()}
	<Accordion items={defaultItems} />
{/snippet}

{#snippet themedStory()}
	<Accordion items={themedItems} />
{/snippet}

<!-- Changed "Different Data" to "Themed" to match MDX reference -->
<Story name="Default" template={defaultStory} />
<Story name="Themed" template={themedStory} />
