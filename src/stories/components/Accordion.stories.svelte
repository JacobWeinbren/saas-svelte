<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		AccordionRoot,
		AccordionItem,
		AccordionItemTrigger,
		AccordionItemContent,
	} from "$saas/components/accordion";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import User from "phosphor-svelte/lib/User";
	import Gear from "phosphor-svelte/lib/Gear";
	import CreditCard from "phosphor-svelte/lib/CreditCard";
	import {
		commonArgTypes,
		getControls,
		variants,
		orientations,
	} from "../utils";

	const accordionSizes = ["sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "components/Accordion",
		component: AccordionRoot,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: variants.filter((v) =>
					["outline", "subtle", "enclosed", "plain"].includes(v),
				),
			},
			size: {
				...commonArgTypes.size,
				options: accordionSizes,
			},
			orientation: {
				control: "select",
				options: orientations,
				table: { defaultValue: { summary: "vertical" } },
			},
			collapsible: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			multiple: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			defaultValue: {
				control: "object",
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"orientation",
				"collapsible",
				"multiple",
				"defaultValue",
				"class",
			]),
		},
		args: {
			variant: "outline",
			size: "md",
			orientation: "vertical",
			collapsible: true,
			multiple: false,
		},
	});
	export {
		AccordionRoot,
		AccordionItem,
		AccordionItemTrigger,
		AccordionItemContent,
	};
</script>

{#snippet basicStory()}
	<AccordionRoot collapsible defaultValue={["b"]}>
		<AccordionItem value="a">
			<AccordionItemTrigger>First Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 1...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="b">
			<AccordionItemTrigger>Second Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 2...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="c">
			<AccordionItemTrigger>Third Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 3...</AccordionItemContent>
		</AccordionItem>
	</AccordionRoot>
{/snippet}

{#snippet controlledStory()}
	<AccordionRoot collapsible defaultValue={["b"]}>
		<AccordionItem value="a">
			<AccordionItemTrigger>First Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 1...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="b">
			<AccordionItemTrigger>Second Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 2...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="c">
			<AccordionItemTrigger>Third Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 3...</AccordionItemContent>
		</AccordionItem>
	</AccordionRoot>
{/snippet}

{#snippet withIconStory()}
	<AccordionRoot collapsible defaultValue={["account"]}>
		<AccordionItem value="account">
			<AccordionItemTrigger>
				<Icon as={User} size="sm" colour="gray" />
				Account Details
			</AccordionItemTrigger>
			<AccordionItemContent>
				Manage your profile information and email preferences here.
			</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="billing">
			<AccordionItemTrigger>
				<Icon as={CreditCard} size="sm" colour="gray" />
				Billing & Plan
			</AccordionItemTrigger>
			<AccordionItemContent>
				View your invoice history and manage your subscription plan.
			</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="preferences">
			<AccordionItemTrigger>
				<Icon as={Gear} size="sm" colour="gray" />
				Preferences
			</AccordionItemTrigger>
			<AccordionItemContent>
				Adjust your notification settings and application theme.
			</AccordionItemContent>
		</AccordionItem>
	</AccordionRoot>
{/snippet}

{#snippet multipleStory()}
	<AccordionRoot collapsible multiple defaultValue={["a", "b"]}>
		<AccordionItem value="a">
			<AccordionItemTrigger>First Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 1...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="b">
			<AccordionItemTrigger>Second Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 2...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="c">
			<AccordionItemTrigger>Third Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 3...</AccordionItemContent>
		</AccordionItem>
	</AccordionRoot>
{/snippet}

{#snippet sizesStory()}
	<Stack class="gap-8">
		{#each accordionSizes as size}
			<Stack class="gap-2">
				<Text>{size}</Text>

				<AccordionRoot {size} collapsible defaultValue={["b"]}>
					<AccordionItem value="a">
						<AccordionItemTrigger>First Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 1...</AccordionItemContent
						>
					</AccordionItem>

					<AccordionItem value="b">
						<AccordionItemTrigger>Second Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 2...</AccordionItemContent
						>
					</AccordionItem>

					<AccordionItem value="c">
						<AccordionItemTrigger>Third Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 3...</AccordionItemContent
						>
					</AccordionItem>
				</AccordionRoot>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack class="gap-8">
		{#each ["outline", "subtle", "enclosed", "plain"] as const as variant}
			<Stack class="gap-2">
				<Text>{variant}</Text>

				<AccordionRoot {variant} collapsible defaultValue={["b"]}>
					<AccordionItem value="a">
						<AccordionItemTrigger>First Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 1...</AccordionItemContent
						>
					</AccordionItem>

					<AccordionItem value="b">
						<AccordionItemTrigger>Second Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 2...</AccordionItemContent
						>
					</AccordionItem>

					<AccordionItem value="c">
						<AccordionItemTrigger>Third Item</AccordionItemTrigger>
						<AccordionItemContent
							>Some value 3...</AccordionItemContent
						>
					</AccordionItem>
				</AccordionRoot>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet disabledItemStory()}
	<AccordionRoot collapsible defaultValue={["a"]}>
		<AccordionItem value="a">
			<AccordionItemTrigger>First Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 1...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="b" disabled>
			<AccordionItemTrigger>Second Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 2...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="c">
			<AccordionItemTrigger>Third Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 3...</AccordionItemContent>
		</AccordionItem>
	</AccordionRoot>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="WithIcon" template={withIconStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Disabled Item" template={disabledItemStory} />
