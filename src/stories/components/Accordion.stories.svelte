<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Accordion } from "$saas/components/accordion";
	import { Stack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import User from "phosphor-svelte/lib/User";
	import Gear from "phosphor-svelte/lib/Gear";
	import CreditCard from "phosphor-svelte/lib/CreditCard";
	import { commonArgTypes, getControls, variants, orientations } from "../utils";

	const accordionSizes = ["sm", "md", "lg"] as const;

	const createItems = (prefix: string) => [
		{ value: `${prefix}-first-item`, content: "Some value 1..." },
		{ value: `${prefix}-second-item`, content: "Some value 2..." },
		{ value: `${prefix}-third-item`, content: "Some value 3..." },
	];

	const createDisabledItems = (prefix: string) => [
		{ value: `${prefix}-first-item`, content: "Some value 1..." },
		{ value: `${prefix}-second-item`, content: "Some value 2...", disabled: true },
		{ value: `${prefix}-third-item`, content: "Some value 3..." },
	];

	const { Story } = defineMeta({
		title: "components/Accordion",
		component: Accordion.Root,
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
</script>

{#snippet basicStory()}
	<Accordion.Root items={createItems("basic")} collapsible defaultValue={["basic-second-item"]} />
{/snippet}

{#snippet controlledStory()}
	<Accordion.Root items={createItems("controlled")} collapsible defaultValue={["controlled-second-item"]} />
{/snippet}

{#snippet withIconStory()}
	<Accordion.Root collapsible defaultValue={["icon-account"]} id="icon">
		<Accordion.Item value="icon-account">
			<Accordion.ItemTrigger>
				<Icon as={User} size="sm" colour="gray" />
				Account Details
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				Manage your profile information and email preferences here.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="icon-billing">
			<Accordion.ItemTrigger>
				<Icon as={CreditCard} size="sm" colour="gray" />
				Billing & Plan
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				View your invoice history and manage your subscription plan.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="icon-preferences">
			<Accordion.ItemTrigger>
				<Icon as={Gear} size="sm" colour="gray" />
				Preferences
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				Adjust your notification settings and application theme.
			</Accordion.ItemContent>
		</Accordion.Item>
	</Accordion.Root>
{/snippet}

{#snippet multipleStory()}
	<Accordion.Root items={createItems("multiple")} collapsible multiple defaultValue={["multiple-first-item", "multiple-second-item"]} />
{/snippet}

{#snippet sizesStory()}
	<Stack gap={8}>
		{#each accordionSizes as size}
			<Stack gap={2}>
				<Text size="xs">{size}</Text>
				<Accordion.Root items={createItems(`size-${size}`)} {size} collapsible defaultValue={[`size-${size}-second-item`]} />
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack gap={8}>
		{#each ["outline", "subtle", "enclosed", "plain"] as const as variant}
			<Stack gap={2}>
				<Text size="xs">{variant}</Text>
				<Accordion.Root items={createItems(`variant-${variant}`)} {variant} collapsible defaultValue={[`variant-${variant}-second-item`]} />
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet disabledItemStory()}
	<Accordion.Root items={createDisabledItems("disabled")} collapsible defaultValue={["disabled-first-item"]} />
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Disabled Item" template={disabledItemStory} />
