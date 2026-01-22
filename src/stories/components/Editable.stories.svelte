<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Editable, EditableRoot } from "$saas/components/editable";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import PencilSimple from "phosphor-svelte/lib/PencilSimple";
	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import { commonArgTypes, getControls, colours } from "../utils";

	const { Story } = defineMeta({
		title: "components/Editable",
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"disabled",
				"invalid",
				"activationMode",
				"class",
			]),
		},
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: ["xs", "sm", "md", "lg"],
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			disabled: commonArgTypes.disabled,
			invalid: commonArgTypes.invalid,
			activationMode: {
				control: "select",
				options: ["focus", "dblclick", "click", "none"],
			},
			class: commonArgTypes.class,
		},
		args: {
			size: "md",
			colour: "gray",
			activationMode: "focus",
		},
	});
</script>

<script lang="ts">
	let name = $state("");
</script>

<Story name="Basic">
	<Editable.Root defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="Controlled">
	<Editable.Root
		value={name}
		onValueChange={(e) => (name = e.value)}
		placeholder="Click to edit"
	>
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="With Double Click">
	<Editable.Root defaultValue="Double click to edit" activationMode="dblclick">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="Disabled">
	<Editable.Root disabled defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="Invalid">
	<Editable.Root invalid defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="Textarea">
	<Editable.Root defaultValue="Click to edit" autoResize class="w-full">
		<Editable.Area>
			<Editable.Preview class="min-h-14 items-start" />
			<Editable.Textarea class="min-h-14" />
		</Editable.Area>
	</Editable.Root>
</Story>

<Story name="With Controls">
	<Editable.Root defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
		<Editable.Control>
			<Editable.EditTrigger icon aria-label="Edit">
				<PencilSimple class="size-3.5" weight="bold" />
			</Editable.EditTrigger>
			<Editable.CancelTrigger icon aria-label="Cancel">
				<X class="size-3.5" weight="bold" />
			</Editable.CancelTrigger>
			<Editable.SubmitTrigger icon aria-label="Submit">
				<Check class="size-3.5" weight="bold" />
			</Editable.SubmitTrigger>
		</Editable.Control>
	</Editable.Root>
</Story>

<Story name="Colours">
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Editable.Root defaultValue="Click to edit" {colour} class="w-full">
					<Editable.Area>
						<Editable.Preview />
						<Editable.Input />
					</Editable.Area>
				</Editable.Root>
			</HStack>
		{/each}
	</VStack>
</Story>
