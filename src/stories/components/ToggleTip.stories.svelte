<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";

	const { Story } = defineMeta({
		title: "components/Toggle Tip",
	});
</script>

{#snippet basicStory()}
	<div class="flex items-center justify-center p-8">
		<ToggleTip content="This is some additional information.">
			<Button
				size="xs"
				variant="ghost"
				icon
				aria-label="More information"
			>
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
		<HStack gap={4}>
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
		<HStack gap={4}>
			<ToggleTip content="Top placement" placement="top">
				<Button variant="outline" size="sm">Top</Button>
			</ToggleTip>
			<ToggleTip content="Right placement" placement="right">
				<Button variant="outline" size="sm">Right</Button>
			</ToggleTip>
			<ToggleTip content="Bottom placement" placement="bottom">
				<Button variant="outline" size="sm">Bottom</Button>
			</ToggleTip>
			<ToggleTip content="Left placement" placement="left">
				<Button variant="outline" size="sm">Left</Button>
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet customContentStory()}
	<HStack align="center" justify="center" class="p-8">
		<ToggleTip>
			{#snippet content()}
				<VStack gap={1}>
					<Text size="xs" weight="semibold">Custom Content</Text>
					<Text size="xs">
						This toggle tip has custom HTML content with multiple
						elements.
					</Text>
				</VStack>
			{/snippet}
			<Button variant="outline" size="sm">Custom Content</Button>
		</ToggleTip>
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Info Tip" template={infoTipStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Positioning" template={positioningStory} />

<Story name="Custom Content" template={customContentStory} />
