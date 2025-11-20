<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Accordion } from "$saas/accordion";
	import { User, Settings, CreditCard } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "UI/Accordion",
		component: Accordion,
		argTypes: {
			variant: {
				control: "select",
				options: ["outline", "subtle", "enclosed", "plain"],
				description: "The visual style of the accordion",
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				control: "radio",
				options: ["sm", "md", "lg"],
				description: "The size of the accordion triggers and content",
				table: { defaultValue: { summary: "md" } },
			},
			multiple: {
				control: "boolean",
				description: "Allow multiple items to be open at once",
			},
			collapsible: {
				control: "boolean",
				description:
					"Allow closing the last open item (if single mode)",
			},
			orientation: {
				control: "radio",
				options: ["vertical", "horizontal"],
			},
			items: {
				control: "object",
			},
		},
	});
</script>

<script lang="ts">
	// --- Data Definitions ---
	const basicItems = [
		{
			value: "info",
			title: "Product Info",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
		},
		{
			value: "stats",
			title: "Statistics",
			text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
		},
		{
			value: "settings",
			title: "Configuration",
			text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		},
	];

	const iconItems = [
		{
			value: "account",
			title: "Account Details",
			text: "Manage your profile information and email preferences here.",
			icon: User,
		},
		{
			value: "billing",
			title: "Billing & Plan",
			text: "View your invoice history and manage your subscription plan.",
			icon: CreditCard,
		},
		{
			value: "settings",
			title: "Preferences",
			text: "Adjust your notification settings and application theme.",
			icon: Settings,
		},
	];
</script>

<Story name="Default" args={{ items: basicItems }} />

<Story name="Subtle" args={{ items: basicItems, variant: "subtle" }} />

<Story name="Enclosed" args={{ items: basicItems, variant: "enclosed" }} />

<Story name="Plain" args={{ items: basicItems, variant: "plain" }} />

<Story name="Small" args={{ items: basicItems, size: "sm" }} />

<Story name="Large" args={{ items: basicItems, size: "lg" }} />

<Story
	name="Multiple"
	args={{
		items: basicItems,
		multiple: true,
		defaultValue: ["info", "stats"],
	}}
/>

<Story name="WithIcons" args={{ items: iconItems }} />

<Story
	name="Disabled"
	args={{
		items: basicItems,
		disabled: true,
		defaultValue: "info",
	}}
/>
