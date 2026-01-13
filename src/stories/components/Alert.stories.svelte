<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Alert } from "$saas/components/alert";
	import { Stack } from "$saas/layout/stack";
	import { AlarmClockPlus } from "@lucide/svelte";
	import {
		commonArgTypes,
		getControls,
		variants,
		alertStatuses,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Alert",
		component: Alert,
		argTypes: {
			status: {
				control: "select",
				options: alertStatuses,
				table: { defaultValue: { summary: "info" } },
			},
			variant: {
				...commonArgTypes.variant,
				options: variants.filter((v) =>
					["subtle", "solid", "surface", "outline"].includes(v),
				),
				table: { defaultValue: { summary: "subtle" } },
			},
			color: {
				control: "text",
				table: { defaultValue: { summary: "gray" } },
			},
			title: {
				control: "text",
			},
			icon: {
				control: "boolean",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"status",
				"variant",
				"color",
				"title",
				"icon",
				"children",
				"class",
			]),
		},
		args: {
			status: "info",
			variant: "subtle",
			title: "This is the alert title",
		},
	});
</script>

{#snippet descriptionStory()}
	<Alert status="error" title="Invalid Fields">
		Your form has some errors. Please fix them and try again.
	</Alert>
{/snippet}

{#snippet statusStory()}
	<Stack class="w-full gap-2">
		<Alert
			status="error"
			title="There was an error processing your request"
		/>
		<Alert
			status="info"
			title="Chakra is going live on August 30th. Get ready!"
		/>
		<Alert
			status="warning"
			title="Seems your account is about expire, upgrade now"
		/>
		<Alert status="success" title="Data uploaded to the server. Fire on!" />
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack class="w-full gap-3">
		<Alert
			status="success"
			variant="subtle"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="solid"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="surface"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="outline"
			title="Data uploaded to the server. Fire on!"
		/>
	</Stack>
{/snippet}

{#snippet customIconStory()}
	<Alert
		status="warning"
		title="Submitting this form will delete your account"
		icon={AlarmClockPlus}
	/>
{/snippet}

<Story name="Basic" />

<Story name="Description" template={descriptionStory} />

<Story name="Status" template={statusStory} />

<Story name="Variants" template={variantsStory} />

<Story name="CustomIcon" template={customIconStory} />
