<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { VisuallyHidden } from "$saas/utilities/visually-hidden";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

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

{#snippet inputStory()}
	<Stack class="max-w-sm">
		<label for="hidden-input">
			<VisuallyHidden>Email address</VisuallyHidden>
		</label>
		<Input id="hidden-input" placeholder="Enter your email" type="email" />
		<Text size="sm" class="text-zinc-500">
			The input label is hidden but accessible to screen readers
		</Text>
	</Stack>
{/snippet}

{#snippet skipLinkStory()}
	<Stack>
		<a
			href="#main-content"
			class="rounded bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
		>
			<VisuallyHidden>Skip to main content</VisuallyHidden>
		</a>
		<Text size="sm" class="text-zinc-500">
			Tab to see the skip link appear (try pressing Tab key)
		</Text>
		<div id="main-content" class="rounded border border-zinc-200 p-4">
			<Text size="lg" weight="semibold">Main Content</Text>
			<Text>This is the main content area.</Text>
		</div>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="With Input" template={inputStory} />
<Story name="Skip Link" template={skipLinkStory} />
