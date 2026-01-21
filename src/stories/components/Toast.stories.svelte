<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Toast,
		Toaster,
		createToaster,
		type ToastStatus,
	} from "$saas/components/toast";
	import { HStack } from "$saas/layout/stack";
	import { Button } from "$saas/components/button";
	import { commonArgTypes, getControls } from "../utils";

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
			title: "Toast Title",
			description: "This is a toast description.",
		},
	});

	const defaultToasterConfig = {
		placement: "bottom-end" as const,
		overlap: true,
		gap: 16,
	};

	// Use a single shared toaster so all stories stack together properly
	const toaster = createToaster(defaultToasterConfig);
	const placementToaster = createToaster({
		...defaultToasterConfig,
		placement: "top",
	});
	const stackingToaster = createToaster({
		...defaultToasterConfig,
		overlap: false,
	});

	let stackCount = $state(0);
</script>

{#snippet basicStory()}
	<div class="h-auto">
		<Button
			onclick={() =>
				toaster.create({
					description: "This is a toast notification.",
					type: "info",
				})}
		>
			Show Toast
		</Button>
		<Toaster {toaster} />
	</div>
{/snippet}

{#snippet statusStory()}
	<div class="h-auto">
		<HStack gap={2} class="flex-wrap">
			<Button
				colour="blue"
				onclick={() =>
					toaster.create({
						description: "Here is some useful information.",
						type: "info",
					})}
			>
				Info
			</Button>
			<Button
				colour="green"
				onclick={() =>
					toaster.create({
						description: "Your changes have been saved.",
						type: "success",
					})}
			>
				Success
			</Button>
			<Button
				colour="orange"
				onclick={() =>
					toaster.create({
						description: "This action cannot be undone.",
						type: "warning",
					})}
			>
				Warning
			</Button>
			<Button
				colour="red"
				onclick={() =>
					toaster.create({
						description: "Something went wrong. Please try again.",
						type: "error",
					})}
			>
				Error
			</Button>
			<Button
				colour="gray"
				onclick={() =>
					toaster.create({
						description:
							"Please wait while we process your request.",
						type: "loading",
					})}
			>
				Loading
			</Button>
		</HStack>
		<Toaster {toaster} />
	</div>
{/snippet}

{#snippet actionStory()}
	<div class="h-auto">
		<Button
			onclick={() =>
				toaster.create({
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
		<Toaster {toaster} />
	</div>
{/snippet}

{#snippet durationStory()}
	<div class="h-auto">
		<HStack gap={2} class="flex-wrap">
			<Button
				onclick={() =>
					toaster.create({
						description: "This will disappear quickly.",
						type: "info",
						duration: 1000,
					})}
			>
				1 Second
			</Button>
			<Button
				onclick={() =>
					toaster.create({
						description: "This uses the default duration.",
						type: "info",
						duration: 5000,
					})}
			>
				5 Seconds
			</Button>
			<Button
				onclick={() =>
					toaster.create({
						description: "This will stay until dismissed.",
						type: "info",
						duration: Infinity,
					})}
			>
				Persistent
			</Button>
		</HStack>
		<Toaster {toaster} />
	</div>
{/snippet}

{#snippet placementStory()}
	<div class="h-auto">
		<Button
			onclick={() =>
				placementToaster.create({
					description: "This toast appears at the top.",
					type: "info",
				})}
		>
			Show Top Toast
		</Button>
		<Toaster toaster={placementToaster} />
	</div>
{/snippet}

{#snippet stackingStory()}
	<div class="h-auto">
		<HStack gap={2} class="flex-wrap">
			<Button
				onclick={() => {
					stackCount++;
					stackingToaster.create({
						description: "File saved successfully",
						type: ["info", "success", "warning", "error"][
							stackCount % 4
						] as ToastStatus,
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
							] as ToastStatus,
							duration: 15000,
						});
					}
				}}
			>
				Add 5 Toasts
			</Button>
		</HStack>
		<Toaster toaster={stackingToaster} />
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Status" template={statusStory} />

<Story name="With Action" template={actionStory} />

<Story name="Duration" template={durationStory} />

<Story name="Placement" template={placementStory} />

<Story name="Stacking" template={stackingStory} />
