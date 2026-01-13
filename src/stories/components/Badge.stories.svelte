<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Badge } from "$saas/components/badge";
	import { commonArgTypes, getControls, colors } from "../utils";

	const { Story } = defineMeta({
		title: "components/Badge",
		component: Badge as any,
		argTypes: {
			variant: {
				control: "select",
				options: ["subtle", "solid", "outline", "surface"],
				description: "The visual style of the badge.",
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				control: "select",
				options: ["xs", "sm", "md", "lg"],
				description: "The size of the badge.",
				table: { defaultValue: { summary: "sm" } },
			},
			color: {
				control: "select",
				options: colors,
				description: "The color palette of the badge.",
				table: { defaultValue: { summary: "gray" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"color",
				"children",
				"class",
			]),
		},
		args: {
			variant: "subtle",
			size: "sm",
			color: "gray",
		},
	});

	const variants = ["subtle", "solid", "outline", "surface"] as const;
	const sizes = ["xs", "sm", "md", "lg"] as const;
</script>

{#snippet basicStory()}
	<div class="flex gap-2">
		<Badge>Default</Badge>
		<Badge color="green">Success</Badge>
		<Badge color="red">Removed</Badge>
		<Badge color="purple">New</Badge>
	</div>
{/snippet}

{#snippet withIconStory()}
	<div class="flex flex-col items-start gap-2">
		<Badge variant="solid" color="blue">
			<svg
				stroke-width="0"
				viewBox="0 0 20 20"
				aria-hidden="true"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				class="h-3 fill-current stroke-current"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				></path>
			</svg>
			New
		</Badge>
		<Badge variant="solid" color="green">
			New
			<svg
				stroke-width="0"
				viewBox="0 0 20 20"
				aria-hidden="true"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				class="h-3 fill-current stroke-current"
			>
				<path
					fill-rule="evenodd"
					d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
					clip-rule="evenodd"
				></path>
			</svg>
		</Badge>
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="flex gap-2">
		{#each variants as variant}
			<Badge {variant}>{variant}</Badge>
		{/each}
	</div>
{/snippet}

{#snippet sizesStory()}
	<div class="flex items-center gap-2">
		{#each sizes as size}
			<Badge {size}>New</Badge>
		{/each}
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="WithIcon" template={withIconStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />
