<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		BreadcrumbRoot,
		BreadcrumbLink,
		BreadcrumbCurrentLink,
		BreadcrumbEllipsis,
		BreadcrumbMenu,
	} from "$saas/components/breadcrumb";
	import {
		MenuRoot,
		MenuButton,
		MenuContent,
		MenuItem,
	} from "$saas/components/menu";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import House from "phosphor-svelte/lib/House";
	import TShirt from "phosphor-svelte/lib/TShirt";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Breadcrumb",
		component: BreadcrumbRoot,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: ["plain", "underline"],
				table: { defaultValue: { summary: "plain" } },
			},
			size: {
				...commonArgTypes.size,
				options: ["sm", "md", "lg"],
				table: { defaultValue: { summary: "md" } },
			},
			separator: {
				control: "text",
				description: "The separator between breadcrumb items.",
				table: { defaultValue: { summary: "/" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"separator",
				"children",
				"class",
			]),
		},
		args: {
			variant: "plain",
			size: "md",
			separator: "/",
		},
	});

	const sizes = ["sm", "md", "lg"] as const;
	const variants = ["plain", "underline"] as const;
</script>

{#snippet basicStory()}
	<BreadcrumbRoot>
		<BreadcrumbLink href="#">Docs</BreadcrumbLink>
		<BreadcrumbLink href="#">Components</BreadcrumbLink>
		<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
	</BreadcrumbRoot>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={2}>
		{#each sizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-8">{size}</Text>
				<BreadcrumbRoot {size}>
					<BreadcrumbLink href="#">Docs</BreadcrumbLink>
					<BreadcrumbLink href="#">Components</BreadcrumbLink>
					<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
				</BreadcrumbRoot>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={4}>
		{#each variants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="w-20">{variant}</Text>
				<BreadcrumbRoot {variant}>
					<BreadcrumbLink href="#">Docs</BreadcrumbLink>
					<BreadcrumbLink href="#">Components</BreadcrumbLink>
					<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
				</BreadcrumbRoot>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet slashSeparator()}
	<svg
		stroke-width="0"
		viewBox="0 0 32 32"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
		class="fill-current stroke-current w-3.5 h-3.5"
	>
		<path
			d="M 26.28125 4.28125 L 4.28125 26.28125 L 5.71875 27.71875 L 27.71875 5.71875 Z"
		/>
	</svg>
{/snippet}

{#snippet separatorStory()}
	<BreadcrumbRoot separator={slashSeparator}>
		<BreadcrumbLink href="#">Docs</BreadcrumbLink>
		<BreadcrumbLink href="#">Components</BreadcrumbLink>
		<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
	</BreadcrumbRoot>
{/snippet}

{#snippet withIconStory()}
	<BreadcrumbRoot>
		<BreadcrumbLink href="#">
			<House class="h-3.5" weight="regular" />
			Home
		</BreadcrumbLink>
		<BreadcrumbLink href="#">
			<TShirt class="h-3.5" weight="regular" />
			Men Wear
		</BreadcrumbLink>
		<BreadcrumbCurrentLink>Trousers</BreadcrumbCurrentLink>
	</BreadcrumbRoot>
{/snippet}

{#snippet ellipsisStory()}
	<BreadcrumbRoot>
		<BreadcrumbLink href="#">Docs</BreadcrumbLink>
		<BreadcrumbLink href="#">Components</BreadcrumbLink>
		<BreadcrumbEllipsis />
		<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
	</BreadcrumbRoot>
{/snippet}

{#snippet withMenuStory()}
	<div class="p-1">
		<BreadcrumbRoot separatorGap={4}>
			<BreadcrumbLink href="#">Docs</BreadcrumbLink>
			<BreadcrumbMenu>
				<MenuRoot size="sm">
					<MenuButton variant="breadcrumb">Components</MenuButton>
					<MenuContent>
						<MenuItem value="theme">Theme</MenuItem>
						<MenuItem value="props">Props</MenuItem>
						<MenuItem value="custom">Customization</MenuItem>
					</MenuContent>
				</MenuRoot>
			</BreadcrumbMenu>
			<BreadcrumbCurrentLink>Props</BreadcrumbCurrentLink>
		</BreadcrumbRoot>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="WithSeparator" template={separatorStory} />

<Story name="WithIcon" template={withIconStory} />

<Story name="WithEllipsis" template={ellipsisStory} />

<Story
	name="WithMenu"
	template={withMenuStory}
	parameters={{ docs: { story: { inline: true } } }}
/>
