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

	const items = [
		{ value: "a", title: "First Item", content: "Some value 1..." },
		{ value: "b", title: "Second Item", content: "Some value 2..." },
		{ value: "c", title: "Third Item", content: "Some value 3..." },
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
	<Accordion.Root collapsible defaultValue={["b"]}>
		{#each items as item}
			<Accordion.Item value={item.value}>
				<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
				<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/snippet}

{#snippet controlledStory()}
	<Accordion.Root collapsible defaultValue={["b"]}>
		{#each items as item}
			<Accordion.Item value={item.value}>
				<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
				<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/snippet}

{#snippet withIconStory()}
	<Accordion.Root collapsible defaultValue={["account"]}>
		<Accordion.Item value="account">
			<Accordion.ItemTrigger>
				<Icon as={User} size="sm" colour="gray" />
				Account Details
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				Manage your profile information and email preferences here.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="billing">
			<Accordion.ItemTrigger>
				<Icon as={CreditCard} size="sm" colour="gray" />
				Billing & Plan
			</Accordion.ItemTrigger>
			<Accordion.ItemContent>
				View your invoice history and manage your subscription plan.
			</Accordion.ItemContent>
		</Accordion.Item>

		<Accordion.Item value="preferences">
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
	<Accordion.Root collapsible multiple defaultValue={["a", "b"]}>
		{#each items as item}
			<Accordion.Item value={item.value}>
				<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
				<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={8}>
		{#each accordionSizes as size}
			<Stack gap={2}>
				<Text size="xs">{size}</Text>

				<Accordion.Root {size} collapsible defaultValue={[`${size}-b`]} id="accordion-size-{size}">
					{#each items as item}
						<Accordion.Item value="{size}-{item.value}">
							<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
							<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack gap={8}>
		{#each ["outline", "subtle", "enclosed", "plain"] as const as variant}
			<Stack gap={2}>
				<Text size="xs">{variant}</Text>

				<Accordion.Root {variant} collapsible defaultValue={[`${variant}-b`]} id="accordion-variant-{variant}">
					{#each items as item}
						<Accordion.Item value="{variant}-{item.value}">
							<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
							<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet disabledItemStory()}
	<Accordion.Root collapsible defaultValue={["a"]}>
		{#each items as item, i}
			<Accordion.Item value={item.value} disabled={i === 1}>
				<Accordion.ItemTrigger>{item.title}</Accordion.ItemTrigger>
				<Accordion.ItemContent>{item.content}</Accordion.ItemContent>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="With Icon" template={withIconStory} />

<Story name="Multiple" template={multipleStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Disabled Item" template={disabledItemStory} />
