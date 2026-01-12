<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		AccordionRoot,
		AccordionItem,
		AccordionItemTrigger,
		AccordionItemContent,
	} from "$saas/accordion";
	import { Stack } from "$saas/stack";
	import { Text } from "$saas/text";
	import {
		commonArgTypes,
		getControls,
		variants,
		orientations,
	} from "./utils";

	const accordionSizes = ["sm", "md", "lg"] as const;

	const { Story } = defineMeta({
		title: "components/Accordion",
		component: AccordionRoot as any,
		subcomponents: {
			Item: AccordionItem,
			ItemTrigger: AccordionItemTrigger,
			ItemContent: AccordionItemContent,
		},
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: variants.filter((v) =>
					["outline", "subtle", "enclosed", "plain"].includes(v),
				),
			},
			size: {
				...commonArgTypes.size,
				accordionSizes,
			},
			orientation: {
				control: "select",
				options: orientations,
				description: "The orientation of the accordion.",
				table: { defaultValue: { summary: "vertical" } },
			},
			collapsible: {
				control: "boolean",
				description: "Whether accordion items can be collapsed.",
				table: { defaultValue: { summary: "false" } },
			},
			multiple: {
				control: "boolean",
				description:
					"Whether multiple accordion items can be open at once.",
				table: { defaultValue: { summary: "false" } },
			},
			defaultValue: {
				control: "object",
				description: "The default open accordion items.",
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
				"children",
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

<script lang="ts">
	import { User, Settings, CreditCard } from "@lucide/svelte";
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
			<AccordionItemTrigger icon={User}>
				Account Details
			</AccordionItemTrigger>
			<AccordionItemContent>
				Manage your profile information and email preferences here.
			</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="billing">
			<AccordionItemTrigger icon={CreditCard}>
				Billing & Plan
			</AccordionItemTrigger>
			<AccordionItemContent>
				View your invoice history and manage your subscription plan.
			</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="preferences">
			<AccordionItemTrigger icon={Settings}>
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

{#snippet outlineStory()}
	<AccordionRoot collapsible variant="outline" defaultValue={["b"]}>
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

{#snippet subtleStory()}
	<AccordionRoot collapsible variant="subtle" defaultValue={["b"]}>
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

{#snippet enclosedStory()}
	<AccordionRoot collapsible variant="enclosed" defaultValue={["b"]}>
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

{#snippet plainStory()}
	<AccordionRoot collapsible variant="plain" defaultValue={["b"]}>
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

{#snippet disabledItemStory()}
	<AccordionRoot collapsible defaultValue={["a"]}>
		<AccordionItem value="a">
			<AccordionItemTrigger>First Item</AccordionItemTrigger>
			<AccordionItemContent>Some value 1...</AccordionItemContent>
		</AccordionItem>

		<AccordionItem value="b" disabled>
			<AccordionItemTrigger>Second Item (Disabled)</AccordionItemTrigger>
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

<Story name="Outline" template={outlineStory} />

<Story name="Subtle" template={subtleStory} />

<Story name="Enclosed" template={enclosedStory} />

<Story name="Plain" template={plainStory} />

<Story name="DisabledItem" template={disabledItemStory} />
