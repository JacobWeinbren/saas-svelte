<script module lang="ts">
	import { Text } from "$saas/typography/text";
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { NativeSelect } from "$saas/components/native-select";
	import { Field } from "$saas/components/field";
	import { Button } from "$saas/components/button";
	import { VStack } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const nativeSelectSizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const nativeSelectVariants = ["outline", "subtle", "plain"] as const;

	const { Story } = defineMeta({
		title: "components/Native Select",
		component: NativeSelect,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: nativeSelectVariants,
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				...commonArgTypes.size,
				options: nativeSelectSizes,
				table: { defaultValue: { summary: "md" } },
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"invalid",
				"disabled",
				"class",
			]),
		},
		args: {
			variant: "outline",
			size: "sm",
			invalid: false,
			disabled: false,
			value: "",
		},
	});
</script>

<script lang="ts">
	let hookFormState = $state({ framework: "", submitted: false });
</script>

{#snippet sizesStory()}
	<HStack align="start" class="gap-4">
		{#each nativeSelectSizes as size}
			<VStack class="gap-2 w-60">
				<Text size="xs">{size}</Text>
				<NativeSelect {size} value="">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet variantsStory()}
	<HStack align="start" class="gap-4">
		{#each nativeSelectVariants as variant}
			<VStack class="gap-2 w-60">
				<Text size="xs">{variant}</Text>
				<NativeSelect {variant} value="">
					<option value="">Select option</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
					<option value="svelte">Svelte</option>
				</NativeSelect>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet itemsStory()}
	<NativeSelect size="sm" class="w-60">
		<option value="">Select option</option>
		<option value="react">React</option>
		<option value="vue">Vue</option>
		<option value="angular">Angular</option>
		<option value="svelte">Svelte</option>
	</NativeSelect>
{/snippet}

{#snippet controlledStory()}
	<NativeSelect size="sm" class="w-60">
		<option value="">Select option</option>
		<option value="react">React</option>
		<option value="vue">Vue</option>
		<option value="angular">Angular</option>
		<option value="svelte">Svelte</option>
	</NativeSelect>
{/snippet}

{#snippet hookFormStory()}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			hookFormState.submitted = true;
		}}
	>
		<Field.Root
			invalid={hookFormState.submitted && !hookFormState.framework}
		>
			<Field.Label>Framework</Field.Label>
			<NativeSelect
				size="sm"
				invalid={hookFormState.submitted && !hookFormState.framework}
				class="w-60"
				name="framework"
				bind:value={hookFormState.framework}
			>
				<option value="">Select framework</option>
				<option value="react">React</option>
				<option value="vue">Vue</option>
				<option value="angular">Angular</option>
				<option value="svelte">Svelte</option>
			</NativeSelect>
			{#if hookFormState.submitted && !hookFormState.framework}
				<Field.ErrorText>Framework is required</Field.ErrorText>
			{/if}
		</Field.Root>

		<Button size="sm" type="submit" class="mt-4">Submit</Button>
	</form>
{/snippet}

{#snippet basicStory()}
	<NativeSelect size="sm" class="w-60" value="">
		<option value="">Select option</option>
		<option value="react">React</option>
		<option value="vue">Vue</option>
		<option value="angular">Angular</option>
		<option value="svelte">Svelte</option>
	</NativeSelect>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Items Prop" template={itemsStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Hook Form" template={hookFormStory} />
