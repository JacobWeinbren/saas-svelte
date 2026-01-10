<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Alert } from "$saas/alert";
	import { AlarmClockPlus } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "UI/Alert",
		argTypes: {
			status: {
				control: "select",
				options: ["info", "success", "warning", "error", "neutral"],
				description: "The status of the alert.",
				table: { defaultValue: { summary: "info" } },
			},
			variant: {
				control: "select",
				options: ["subtle", "solid", "surface", "outline"],
				description: "The visual style of the alert.",
				table: { defaultValue: { summary: "subtle" } },
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
	});
</script>

<Story name="Basic">
	<Alert status="info" title="This is the alert title" />
</Story>

<Story name="WithDescription">
	<Alert status="error" title="Invalid Fields">
		Your form has some errors. Please fix them and try again.
	</Alert>
</Story>

<Story name="WithStatus">
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
</Story>

<Story name="WithVariants">
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
</Story>

<Story name="WithCustomIcon">
	<Alert
		icon={AlarmClockPlus}
		status="warning"
		title="Submitting this form will delete your account"
	/>
</Story>
