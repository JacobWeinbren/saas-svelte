<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { ToggleTip, InfoTip } from "$saas/components/toggle-tip";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Info from "phosphor-svelte/lib/Info";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Toggle Tip",
		component: ToggleTip,
		argTypes: {
			content: {
				control: "text",
				description: "The content of the toggle tip.",
			},
			size: {
				...commonArgTypes.size,
				options: ["xs", "sm", "md", "lg"],
				table: { defaultValue: { summary: "sm" } },
			},
			placement: {
				control: "select",
				options: ["top", "bottom", "left", "right"],
				description: "The placement of the toggle tip.",
				table: { defaultValue: { summary: "top" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["content", "size", "placement", "class"]),
		},
		args: {
			content: "This is some additional information.",
			size: "sm",
			placement: "top",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="flex items-center justify-center p-8">
		<ToggleTip content={args.content} size={args.size} placement={args.placement} class={args.class}>
			{#snippet children(props)}
				<Button
					size="xs"
					variant="ghost"
					icon
					aria-label="More information"
					{...props()}
				>
					<Icon as={Info} aria-hidden="true" />
				</Button>
			{/snippet}
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
				{#snippet children(props)}
					<Button size="xs" variant="ghost" {...props()}>XS</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Small toggle tip" size="sm">
				{#snippet children(props)}
					<Button size="sm" variant="ghost" {...props()}>SM</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Medium toggle tip" size="md">
				{#snippet children(props)}
					<Button size="md" variant="ghost" {...props()}>MD</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Large toggle tip" size="lg">
				{#snippet children(props)}
					<Button size="lg" variant="ghost" {...props()}>LG</Button>
				{/snippet}
			</ToggleTip>
		</HStack>
	</div>
{/snippet}

{#snippet positioningStory()}
	<div class="flex items-center justify-center p-8">
		<HStack gap={4}>
			<ToggleTip content="Top placement" placement="top">
				{#snippet children(props)}
					<Button variant="outline" size="sm" {...props()}>Top</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Right placement" placement="right">
				{#snippet children(props)}
					<Button variant="outline" size="sm" {...props()}>Right</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Bottom placement" placement="bottom">
				{#snippet children(props)}
					<Button variant="outline" size="sm" {...props()}>Bottom</Button>
				{/snippet}
			</ToggleTip>
			<ToggleTip content="Left placement" placement="left">
				{#snippet children(props)}
					<Button variant="outline" size="sm" {...props()}>Left</Button>
				{/snippet}
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
			{#snippet children(props)}
				<Button variant="outline" size="sm" {...props()}>Custom Content</Button>
			{/snippet}
		</ToggleTip>
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Info Tip" template={infoTipStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Positioning" template={positioningStory} />

<Story name="Custom Content" template={customContentStory} />
