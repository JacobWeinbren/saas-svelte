<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";

	const { Story } = defineMeta({
		title: "components/Toggle Tip",
	});
</script>

{#snippet basicStory()}
	<div class="flex items-center justify-center p-8">
		<ToggleTip content="This is some additional information.">
			<Button size="sm" variant="ghost">
				<Icon as={Info} />
			</Button>
		</ToggleTip>
	</div>
{/snippet}

{#snippet infoTipStory()}
	<div class="flex items-center justify-center p-8">
		<HStack justify="center">
			<Text size="lg">File size: 1.45kb</Text>
			<InfoTip>The file size for content.tsx is 1.45kb</InfoTip>
		</HStack>
	</div>
{/snippet}

{#snippet sizesStory()}
	<div class="flex items-center justify-center p-8">
		<HStack class="gap-4">
			<ToggleTip content="Extra small toggle tip" size="xs">
				<Button size="xs" variant="ghost">XS</Button>
			</ToggleTip>
			<ToggleTip content="Small toggle tip" size="sm">
				<Button size="sm" variant="ghost">SM</Button>
			</ToggleTip>
			<ToggleTip content="Medium toggle tip" size="md">
				<Button size="md" variant="ghost">MD</Button>
			</ToggleTip>
			<ToggleTip content="Large toggle tip" size="lg">
				<Button size="lg" variant="ghost">LG</Button>
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet positioningStory()}
	<div class="flex items-center justify-center p-8">
		<HStack class="gap-4">
			<ToggleTip content="Top placement" positioning={{ placement: "top" }}>
				<Button variant="outline">Top</Button>
			</ToggleTip>
			<ToggleTip
				content="Right placement"
				positioning={{ placement: "right" }}
			>
				<Button variant="outline">Right</Button>
			</ToggleTip>
			<ToggleTip
				content="Bottom placement"
				positioning={{ placement: "bottom" }}
			>
				<Button variant="outline">Bottom</Button>
			</ToggleTip>
			<ToggleTip content="Left placement" positioning={{ placement: "left" }}>
				<Button variant="outline">Left</Button>
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet customContentStory()}
	<div class="flex items-center justify-center p-8">
		<ToggleTip>
			{#snippet content()}
				<div class="flex flex-col gap-1">
					<Text size="xs" weight="semibold">Custom Content</Text>
					<Text size="xs"
						>This toggle tip has custom HTML content with multiple
						elements.</Text
					>
				</div>
			{/snippet}
			<Button variant="outline">Custom Content</Button>
		</ToggleTip>
	</div>
{/snippet}

<Story name="Basic">
	{@render basicStory()}
</Story>

<Story name="InfoTip">
	{@render infoTipStory()}
</Story>

<Story name="Sizes">
	{@render sizesStory()}
</Story>

<Story name="Positioning">
	{@render positioningStory()}
</Story>

<Story name="CustomContent">
	{@render customContentStory()}
</Story>
