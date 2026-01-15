<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Textarea, TextareaAutoresize } from "$saas/components/textarea";
	import { Field } from "$saas/components/field";
	import { Input } from "$saas/components/input";
	import { Button } from "$saas/components/button";
	import { VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		textSizes,
		inputVariants,
		commonArgTypes,
		getControls,
	} from "../utils";

	const textareaSizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const resizeOptions = ["none", "vertical", "horizontal", "both"] as const;

	const { Story } = defineMeta({
		title: "components/Textarea",
		component: Textarea,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: inputVariants,
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				...commonArgTypes.size,
				options: textareaSizes,
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
			size: "md",
			invalid: false,
			disabled: false,
		},
	});
</script>

{#snippet variantsStory()}
	<VStack class="gap-4 w-80">
		{#each inputVariants as variant}
			<VStack class="items-center gap-2">
				<Text size="xs">{variant}</Text>
				<Textarea {variant} placeholder={variant} />
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet sizesStory()}
	<VStack class="gap-4 w-80">
		{#each textareaSizes as size}
			<VStack class="items-center gap-2">
				<Text size="xs">{size}</Text>
				<Textarea {size} placeholder="{size} size" />
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet helperTextStory()}
	<div class="flex items-center gap-10 w-full">
		<Field.Root required>
			<Field.Label>Comment</Field.Label>
			<Textarea placeholder="Start typing..." variant="subtle" />
			<Field.HelperText>Max 500 characters.</Field.HelperText>
		</Field.Root>
		<Field.Root required>
			<Field.Label>Comment</Field.Label>
			<Textarea placeholder="Start typing..." variant="outline" />
			<Field.HelperText>Max 500 characters.</Field.HelperText>
		</Field.Root>
	</div>
{/snippet}

{#snippet errorTextStory()}
	<div class="flex items-center gap-10 w-full">
		<Field.Root invalid required>
			<Field.Label>Comment</Field.Label>
			<Textarea invalid placeholder="Start typing..." variant="subtle" />
			<Field.ErrorText>Field is required</Field.ErrorText>
		</Field.Root>
		<Field.Root invalid required>
			<Field.Label>Comment</Field.Label>
			<Textarea invalid placeholder="Start typing..." variant="outline" />
			<Field.ErrorText>Field is required</Field.ErrorText>
		</Field.Root>
	</div>
{/snippet}

{#snippet fieldStory()}
	<div class="flex items-center gap-10 w-full">
		<Field.Root required>
			<Field.Label>Email</Field.Label>
			<Input placeholder="me@example.com" variant="subtle" />
		</Field.Root>
	</div>
{/snippet}

{#snippet hookFormStory()}
	<form>
		<VStack align="start" class="max-w-sm">
			<Field.Root required>
				<Field.Label>Username</Field.Label>
				<Input placeholder="@username" name="username" />
				<Field.HelperText
					>This is your public display name.</Field.HelperText
				>
			</Field.Root>
			<Field.Root required>
				<Field.Label>Profile bio</Field.Label>
				<Textarea placeholder="I am ..." name="bio" />
				<Field.HelperText
					>A short description of yourself</Field.HelperText
				>
			</Field.Root>
			<Button type="submit">Submit</Button>
		</VStack>
	</form>
{/snippet}

{#snippet resizeStory()}
	<VStack class="gap-4 w-64">
		{#each resizeOptions as resize}
			<VStack class="items-center gap-2">
				<Text size="xs">{resize}</Text>
				<Textarea {resize} placeholder="Search the docs…" />
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet autoresizeStory()}
	<TextareaAutoresize
		placeholder="Start typing..."
		minRows={1}
		maxRows={40}
	/>
{/snippet}

<Story name="Basic">
	{#snippet template(args)}
		<Textarea {...args} placeholder="Comment..." />
	{/snippet}
</Story>

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Helper Text" template={helperTextStory} />

<Story name="Error Text" template={errorTextStory} />

<Story name="Field" template={fieldStory} />

<Story name="Hook Form" template={hookFormStory} />

<Story name="Resize" template={resizeStory} />

<Story name="Autoresize" template={autoresizeStory} />
