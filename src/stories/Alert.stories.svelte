<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Alert } from "$saas/alert";
	import { AlarmClockPlus } from "@lucide/svelte";

	const statuses = [
		"info",
		"success",
		"warning",
		"error",
		"neutral",
	] as const;
	const variants = ["subtle", "solid", "surface", "outline"] as const;
	const colors = [
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	] as const;

	const { Story } = defineMeta({
		title: "components/Alert",
		component: Alert,
		argTypes: {
			status: {
				control: "select",
				options: statuses,
				description: "The status of the alert.",
				table: { defaultValue: { summary: "info" } },
			},
			variant: {
				control: "select",
				options: variants,
				description: "The visual style of the alert.",
				table: { defaultValue: { summary: "subtle" } },
			},
			color: {
				control: "select",
				options: colors,
				description:
					"The color theme of the alert (overrides status color).",
				table: { defaultValue: { summary: "gray" } },
			},
			title: {
				control: "text",
				description: "The title content.",
			},
			icon: {
				control: "boolean",
				description: "Show/hide icon or pass a custom component.",
			},
		},
		args: {
			status: "info",
			variant: "subtle",
			title: "Alert Title",
		},
	});
</script>

{#snippet descriptionStory()}
	<Alert status="error" title="Invalid Fields">
		Your form has some errors. Please fix them and try again.
	</Alert>
{/snippet}

{#snippet statusStory()}
	<div class="flex flex-col w-full gap-2">
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
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="flex flex-col w-full gap-3">
		<Alert
			status="success"
			variant="subtle"
			title="Subtle: Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="solid"
			title="Solid: Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="surface"
			title="Surface: Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="outline"
			title="Outline: Data uploaded to the server. Fire on!"
		/>
	</div>
{/snippet}

{#snippet customIconStory()}
	<Alert
		icon={AlarmClockPlus}
		status="warning"
		title="Submitting this form will delete your account"
	/>
{/snippet}

<Story name="Basic" />

<Story name="WithDescription" template={descriptionStory} />

<Story name="WithStatus" template={statusStory} />

<Story name="WithVariants" template={variantsStory} />

<Story name="WithCustomIcon" template={customIconStory} />
