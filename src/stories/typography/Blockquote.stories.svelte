<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Blockquote } from "$saas/typography/blockquote";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import Quotes from "phosphor-svelte/lib/Quotes";
	import { Circle } from "$saas/layout/circle";
	import { Float } from "$saas/layout/float";
	import type { ColourName } from "$saas/utils/colours";
	import { colours, commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "typography/Block Quote",
		component: Blockquote,
		argTypes: {
			variant: {
				control: "select",
				options: ["subtle", "solid", "plain"],
				description: "The visual style of the blockquote.",
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: {
				...commonArgTypes.colour,
				description: "The colour of the component.",
			},
			justify: {
				control: "select",
				options: ["start", "center", "end"],
				description: "The alignment of the content.",
				table: { defaultValue: { summary: "start" } },
			},
			cite: {
				control: "text",
				description: "The source of the quote.",
			},
			showDash: {
				control: "boolean",
				description: "Whether to show a dash before the citation.",
				table: { defaultValue: { summary: "false" } },
			},
			showIcon: {
				control: "boolean",
				description: "Whether to show the default quote icon.",
				table: { defaultValue: { summary: "false" } },
			},
			icon: commonArgTypes.icon,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"justify",
				"colour",
				"cite",
				"showDash",
				"showIcon",
				"icon",
				"children",
				"class",
			]),
		},
		args: {
			variant: "subtle",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Blockquote {...args}>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{/snippet}

{#snippet withCiteStory()}
	<Blockquote cite="Uzumaki Naruto" showDash>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{/snippet}

{#snippet coloursStory()}
	<VStack class="gap-4 w-full">
		{#each colours as colourName}
			<HStack class="gap-10 w-full px-4" align="center">
				<Text class="min-w-[8ch]">{colourName}</Text>
				<Blockquote
					colour={colourName as ColourName}
					cite="Uzumaki Naruto"
					showDash
				>
					<Text>
						If anyone thinks he is something when he is nothing, he
						deceives himself. Each one should test his own actions.
						Then he can take pride in himself, without comparing
						himself to anyone else.
					</Text>
				</Blockquote>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack class="gap-8">
		<Blockquote variant="subtle">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
		<Blockquote variant="solid">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
		<Blockquote variant="plain">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
	</VStack>
{/snippet}

{#snippet iconStory()}
	<Blockquote
		variant="plain"
		colour="teal"
		showDash
		showIcon
		cite="Uzumaki Naruto"
	>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{/snippet}

{#snippet customIconStory()}
	<Blockquote
		cite="Uzumaki Naruto"
		colour="blue"
		class="pl-8"
		icon={customIcon}
	>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{/snippet}

{#snippet customIcon()}
	<Float placement="middle-start">
		<Circle colour="blue">
			<Quotes
				class="w-4 h-4 text-white"
				color="currentColor"
				weight="regular"
				aria-hidden="true"
			/>
		</Circle>
	</Float>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="With Cite" template={withCiteStory} />
<Story name="Colors" template={coloursStory} />
<Story name="Variants" template={variantsStory} />
<Story name="Icon" template={iconStory} />
<Story name="Custom Icon" template={customIconStory} />
