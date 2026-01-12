<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Tooltip } from "$saas/tooltip";
	import { Button } from "$saas/button";
	import { Icon } from "$saas/icon";
	import { Info, HelpCircle } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "components/Tooltip",
		component: Tooltip,
		argTypes: {
			content: {
				control: "text",
				description: "The content to display inside the tooltip.",
			},
			openDelay: {
				control: "number",
				description:
					"The delay in milliseconds before the tooltip opens.",
			},
		},
		args: {
			content: "This is a tooltip",
			openDelay: 0,
			closeDelay: 0,
			positioning: { placement: "top" },
		},
	});
</script>

{#snippet basicStory()}
	<div class="flex items-center justify-center p-8">
		<Tooltip content="Add to library">
			<Button variant="outline">Hover me</Button>
		</Tooltip>
	</div>
{/snippet}

{#snippet placementsStory()}
	<div class="flex flex-col items-center gap-4 p-8">
		<div class="flex gap-4">
			<Tooltip content="Tooltip top" positioning={{ placement: "top" }}>
				<Button variant="outline" size="sm">Top</Button>
			</Tooltip>
			<Tooltip
				content="Tooltip bottom"
				positioning={{ placement: "bottom" }}
			>
				<Button variant="outline" size="sm">Bottom</Button>
			</Tooltip>
		</div>
	</div>
{/snippet}

{#snippet delaysStory()}
	<div class="flex items-center justify-center gap-4 p-8">
		<Tooltip content="Instant tooltip" openDelay={0}>
			<Button variant="ghost">Instant</Button>
		</Tooltip>
		<Tooltip content="Delayed tooltip (700ms)" openDelay={700}>
			<Button variant="ghost">Delayed</Button>
		</Tooltip>
	</div>
{/snippet}

{#snippet contentSlotStory()}
	<div class="flex items-center justify-center p-8">
		<Tooltip>
			{#snippet content()}
				<div class="flex items-center gap-2">
					<Icon as={Info} class="size-3.5" />
					<span>Search query info</span>
				</div>
			{/snippet}
			<Button variant="surface" size="sm" icon>
				<Icon as={HelpCircle} />
			</Button>
		</Tooltip>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Placements" template={placementsStory} />
<Story name="Delays" template={delaysStory} />
<Story name="Custom Content" template={contentSlotStory} />
