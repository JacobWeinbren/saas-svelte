<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { VisuallyHidden } from "$saas/utilities/visually-hidden";
	import { Button } from "$saas/components/button";

	const { Story } = defineMeta({
		title: "utilities/VisuallyHidden",
		component: VisuallyHidden,
		argTypes: {
			children: {
				control: false,
				description: "The content to be visually hidden.",
				table: { type: { summary: "Snippet" } },
			},
			class: {
				control: "text",
				description: "Additional CSS classes to apply.",
			},
		},
	});
</script>

<script lang="ts">
	import { Bell } from "@lucide/svelte";
</script>

{#snippet basicStory()}
	<Button>
		<Bell class="h-4 w-4" />
		3
		<VisuallyHidden>Notifications</VisuallyHidden>
	</Button>
{/snippet}

<Story name="Basic" template={basicStory} />
