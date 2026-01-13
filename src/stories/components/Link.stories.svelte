<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Link } from "$saas/components/link";
	import { VStack } from "$saas/layout/stack";
	import { ExternalLink } from "@lucide/svelte";
	import { Icon } from "$saas/components/icon";
	import { colors, commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Link",
		component: Link,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: ["underline", "plain"] as any,
			},
			color: {
				...commonArgTypes.color,
				options: colors as any,
			},
			href: {
				control: "text",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "color", "href", "children", "class"]),
		},
		args: {
			variant: "plain",
			color: "gray",
			href: "#",
		},
	});
</script>

{#snippet variantsStory()}
	<VStack align="start" class="gap-2">
		<Link href="#" variant="underline">Link (Underline)</Link>
		<Link href="#" variant="plain">Link (Plain)</Link>
	</VStack>
{/snippet}

{#snippet withinTextStory()}
	<p>
		Visit the <Link href="https://chakra-ui.com" color="teal" variant="underline"
			>Chakra UI</Link
		> website
	</p>
{/snippet}

{#snippet externalStory()}
	<Link href="#" variant="plain">
		Visit Chakra UI
		<Icon as={ExternalLink} class="size-3.5" />
	</Link>
{/snippet}

<Story name="Basic">Visit Chakra UI</Story>

<Story name="Variants" template={variantsStory} />

<Story name="Within Text" template={withinTextStory} />

<Story name="External" template={externalStory} />
