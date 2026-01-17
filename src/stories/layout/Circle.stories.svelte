<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Circle } from "$saas/layout/circle";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Circle",
		component: Circle,
		argTypes: {
			size: {
				control: "select",
				options: ["xs", "sm", "md", "lg", "xl"],
				description: "The size of the circle.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: ["solid", "subtle", "outline", "plain"],
				description: "The visual style of the circle.",
				table: { defaultValue: { summary: "solid" } },
			},
			colour: {
				...commonArgTypes.colour,
				description: "The colour of the component.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"colour",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Circle {...args}>1</Circle>
{/snippet}

<Story name="Basic" template={basicStory} />
