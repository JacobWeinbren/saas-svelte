<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Toast, Toaster, createToaster } from "$saas/components/toast";
	import { Stack } from "$saas/layout/stack";
	import { Button } from "$saas/components/button";
	import Alarm from "phosphor-svelte/lib/Alarm";
	import { commonArgTypes, getControls, variants } from "../utils";

	const { Story } = defineMeta({
		title: "components/Toast",
		component: Toast,
		argTypes: {
			status: {
				control: "select",
				options: ["info", "success", "warning", "error", "loading"],
				description: "The status of the toast.",
				table: { defaultValue: { summary: "info" } },
			},
			variant: {
				...commonArgTypes.variant,
				options: variants.filter((v) =>
					["subtle", "solid", "surface", "outline"].includes(v),
				),
				table: { defaultValue: { summary: "surface" } },
			},
			colour: commonArgTypes.colour,
			title: {
				control: "text",
				description: "The title of the toast.",
			},
			description: {
				control: "text",
				description: "The description of the toast.",
			},
			icon: commonArgTypes.icon,
			closable: {
				control: "boolean",
				description: "Whether to show the close button.",
				table: { defaultValue: { summary: "true" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"status",
				"variant",
				"colour",
				"title",
				"description",
				"icon",
				"closable",
				"class",
			]),
		},
		args: {
			status: "info",
			variant: "surface",
			title: "Toast Title",
			description: "This is a toast description.",
		},
	});

	const basicToaster = createToaster({
		placement: "bottom-end",
		overlap: true,
		gap: 16,
	});

	const statusToaster = createToaster({
		placement: "bottom-end",
		overlap: true,
		gap: 16,
	});

	const variantToaster = createToaster({
		placement: "bottom-end",
		overlap: true,
		gap: 16,
	});

	const actionToaster = createToaster({
		placement: "bottom-end",
		overlap: true,
		gap: 16,
	});

	const durationToaster = createToaster({
		placement: "bottom-end",
		overlap: true,
		gap: 16,
	});

	const placementToaster = createToaster({
		placement: "top",
		overlap: true,
		gap: 16,
	});

	const stackingToaster = createToaster({
		placement: "bottom-end",
		overlap: false,
		gap: 16,
	});

	let stackCount = $state(0);
</script>

{#snippet basicStory()}
	<div class="min-h-[400px]">
		<Button
			onclick={() =>
				basicToaster.create({
					title: "Toast Title",
					description: "This is a toast notification.",
					type: "info",
				})}
		>
			Show Toast
		</Button>
		<Toaster toaster={basicToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet statusStory()}
	<div class="min-h-[400px]">
		<Stack direction="horizontal" class="gap-2 flex-wrap">
			<Button
				colour="blue"
				onclick={() =>
					statusToaster.create({
						title: "Information",
						description: "Here is some useful information.",
						type: "info",
					})}
			>
				Info
			</Button>
			<Button
				colour="green"
				onclick={() =>
					statusToaster.create({
						title: "Success!",
						description: "Your changes have been saved.",
						type: "success",
					})}
			>
				Success
			</Button>
			<Button
				colour="orange"
				onclick={() =>
					statusToaster.create({
						title: "Warning",
						description: "This action cannot be undone.",
						type: "warning",
					})}
			>
				Warning
			</Button>
			<Button
				colour="red"
				onclick={() =>
					statusToaster.create({
						title: "Error occurred",
						description: "Something went wrong. Please try again.",
						type: "error",
					})}
			>
				Error
			</Button>
			<Button
				colour="gray"
				onclick={() =>
					statusToaster.create({
						title: "Loading...",
						description:
							"Please wait while we process your request.",
						type: "loading",
					})}
			>
				Loading
			</Button>
		</Stack>
		<Toaster toaster={statusToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet variantsStory()}
	<div class="min-h-[400px]">
		<Stack direction="horizontal" class="gap-2 flex-wrap">
			<Button
				variant="subtle"
				onclick={() =>
					variantToaster.create({
						title: "Subtle Toast",
						description: "This is a subtle variant.",
						type: "info",
						meta: { variant: "subtle" },
					})}
			>
				Subtle
			</Button>
			<Button
				variant="solid"
				onclick={() =>
					variantToaster.create({
						title: "Solid Toast",
						description: "This is a solid variant.",
						type: "info",
						meta: { variant: "solid" },
					})}
			>
				Solid
			</Button>
			<Button
				variant="surface"
				onclick={() =>
					variantToaster.create({
						title: "Surface Toast",
						description: "This is a surface variant.",
						type: "info",
						meta: { variant: "surface" },
					})}
			>
				Surface
			</Button>
			<Button
				variant="outline"
				onclick={() =>
					variantToaster.create({
						title: "Outline Toast",
						description: "This is an outline variant.",
						type: "info",
						meta: { variant: "outline" },
					})}
			>
				Outline
			</Button>
		</Stack>
		<Toaster toaster={variantToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
					variant={toast().meta?.variant as
						| "subtle"
						| "solid"
						| "surface"
						| "outline"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet actionStory()}
	<div class="min-h-[400px]">
		<Button
			onclick={() =>
				actionToaster.create({
					title: "Update successful",
					description: "File saved successfully to the server",
					type: "success",
					action: {
						label: "Undo",
						onClick: () => console.log("Undo clicked"),
					},
				})}
		>
			Show Toast with Action
		</Button>
		<Toaster toaster={actionToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
					action={toast().action}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet durationStory()}
	<div class="min-h-[400px]">
		<Stack direction="horizontal" class="gap-2 flex-wrap">
			<Button
				onclick={() =>
					durationToaster.create({
						title: "Quick Toast (1s)",
						description: "This will disappear quickly.",
						type: "info",
						duration: 1000,
					})}
			>
				1 Second
			</Button>
			<Button
				onclick={() =>
					durationToaster.create({
						title: "Default Toast (5s)",
						description: "This uses the default duration.",
						type: "info",
						duration: 5000,
					})}
			>
				5 Seconds
			</Button>
			<Button
				onclick={() =>
					durationToaster.create({
						title: "Persistent Toast",
						description: "This will stay until dismissed.",
						type: "info",
						duration: Infinity,
					})}
			>
				Persistent
			</Button>
		</Stack>
		<Toaster toaster={durationToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet placementStory()}
	<div class="min-h-[400px]">
		<Button
			onclick={() =>
				placementToaster.create({
					title: "Top Placement",
					description: "This toast appears at the top.",
					type: "info",
				})}
		>
			Show Top Toast
		</Button>
		<Toaster toaster={placementToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

{#snippet stackingStory()}
	<div class="min-h-[500px]">
		<Stack direction="horizontal" class="gap-2 flex-wrap">
			<Button
				onclick={() => {
					stackCount++;
					stackingToaster.create({
						description: "File saved successfully",
						type: ["info", "success", "warning", "error"][
							stackCount % 4
						] as "info" | "success" | "warning" | "error",
						duration: 10000,
					});
				}}
			>
				Add Toast
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					for (let i = 0; i < 5; i++) {
						stackCount++;
						stackingToaster.create({
							description: "File saved successfully",
							type: ["info", "success", "warning", "error"][
								stackCount % 4
							] as "info" | "success" | "warning" | "error",
							duration: 15000,
						});
					}
				}}
			>
				Add 5 Toasts
			</Button>
		</Stack>
		<Toaster toaster={stackingToaster}>
			{#snippet children(toast)}
				<Toast
					title={toast().title}
					description={toast().description}
					status={toast().type as
						| "info"
						| "success"
						| "warning"
						| "error"
						| "loading"}
				/>
			{/snippet}
		</Toaster>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Status" template={statusStory} />

<Story name="Variants" template={variantsStory} />

<Story name="WithAction" template={actionStory} />

<Story name="Duration" template={durationStory} />

<Story name="Placement" template={placementStory} />

<Story name="Stacking" template={stackingStory} />
