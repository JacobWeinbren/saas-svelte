<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		AccordionRoot,
		AccordionItem,
		AccordionItemTrigger,
		AccordionItemContent,
	} from "$saas/accordion";

	const { Story } = defineMeta({
		title: "UI/Accordion",
		component: AccordionRoot as any,
		subcomponents: {
			Item: AccordionItem,
			ItemTrigger: AccordionItemTrigger,
			ItemContent: AccordionItemContent,
		},
	});

	// Export named components for ArgTypes
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

<Story name="Basic">
	<AccordionRoot defaultValue={["b"]}>
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
</Story>

<Story name="Controlled">
	<AccordionRoot defaultValue={["b"]}>
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
</Story>

<Story name="WithIcon">
	<AccordionRoot defaultValue={["account"]}>
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
</Story>

<Story name="Multiple">
	<AccordionRoot multiple defaultValue={["a", "b"]}>
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
</Story>

<Story name="Small">
	<AccordionRoot size="sm" defaultValue={["b"]}>
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
</Story>

<Story name="Medium">
	<AccordionRoot size="md" defaultValue={["b"]}>
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
</Story>

<Story name="Large">
	<AccordionRoot size="lg" defaultValue={["b"]}>
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
</Story>

<Story name="Outline">
	<AccordionRoot variant="outline" defaultValue={["b"]}>
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
</Story>

<Story name="Subtle">
	<AccordionRoot variant="subtle" defaultValue={["b"]}>
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
</Story>

<Story name="Enclosed">
	<AccordionRoot variant="enclosed" defaultValue={["b"]}>
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
</Story>

<Story name="Plain">
	<AccordionRoot variant="plain" defaultValue={["b"]}>
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
</Story>

<Story name="DisabledItem">
	<AccordionRoot defaultValue={["a"]}>
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
</Story>
