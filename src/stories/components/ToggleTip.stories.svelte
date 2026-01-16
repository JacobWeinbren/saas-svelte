<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
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
		<ToggleTip
			content="This is some additional information."
			triggerClass="inline-flex items-center justify-center size-8 rounded-(--radii-l2) hover:bg-bg-subtle text-(--color-fg-muted) hover:text-(--color-fg-default) transition-colors"
			triggerAriaLabel="More information"
		>
			<Icon as={Info} />
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
			<ToggleTip
				content="Extra small toggle tip"
				size="xs"
				triggerClass="px-2 py-1 text-xs rounded-(--radii-l2) hover:bg-bg-subtle"
				triggerAriaLabel="Extra small"
			>
				XS
			</ToggleTip>
			<ToggleTip
				content="Small toggle tip"
				size="sm"
				triggerClass="px-2.5 py-1 text-sm rounded-(--radii-l2) hover:bg-bg-subtle"
				triggerAriaLabel="Small"
			>
				SM
			</ToggleTip>
			<ToggleTip
				content="Medium toggle tip"
				size="md"
				triggerClass="px-3 py-1.5 text-base rounded-(--radii-l2) hover:bg-bg-subtle"
				triggerAriaLabel="Medium"
			>
				MD
			</ToggleTip>
			<ToggleTip
				content="Large toggle tip"
				size="lg"
				triggerClass="px-4 py-2 text-lg rounded-(--radii-l2) hover:bg-bg-subtle"
				triggerAriaLabel="Large"
			>
				LG
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet positioningStory()}
	{@const triggerStyle =
		"px-3 py-1.5 rounded-(--radii-l2) border border-border-default hover:bg-bg-subtle"}
	<div class="flex items-center justify-center p-8">
		<HStack class="gap-4">
			<ToggleTip
				content="Top placement"
				positioning={{ placement: "top" }}
				triggerClass={triggerStyle}
				triggerAriaLabel="Top"
			>
				Top
			</ToggleTip>
			<ToggleTip
				content="Right placement"
				positioning={{ placement: "right" }}
				triggerClass={triggerStyle}
				triggerAriaLabel="Right"
			>
				Right
			</ToggleTip>
			<ToggleTip
				content="Bottom placement"
				positioning={{ placement: "bottom" }}
				triggerClass={triggerStyle}
				triggerAriaLabel="Bottom"
			>
				Bottom
			</ToggleTip>
			<ToggleTip
				content="Left placement"
				positioning={{ placement: "left" }}
				triggerClass={triggerStyle}
				triggerAriaLabel="Left"
			>
				Left
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet customContentStory()}
	<div class="flex items-center justify-center p-8">
		<ToggleTip
			triggerClass="px-3 py-1.5 rounded-(--radii-l2) border border-border-default hover:bg-bg-subtle"
			triggerAriaLabel="Custom content"
		>
			{#snippet content()}
				<div class="flex flex-col gap-1">
					<Text size="xs" weight="semibold">Custom Content</Text>
					<Text size="xs"
						>This toggle tip has custom HTML content with multiple
						elements.</Text
					>
				</div>
			{/snippet}
			Custom Content
		</ToggleTip>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="InfoTip" template={infoTipStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Positioning" template={positioningStory} />

<Story name="CustomContent" template={customContentStory} />
