<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { FormatByte } from "$saas/utilities/format-byte";
	import { LocaleProvider } from "$saas/utilities/locale-provider";
	import { Text } from "$saas/typography/text";

	const { Story } = defineMeta({
		title: "utilities/FormatByte",
		component: FormatByte,
		argTypes: {
			value: {
				control: "number",
				description: "The byte size to format.",
			},
			unit: {
				control: "select",
				options: ["byte", "bit"],
				description: "The unit granularity to display.",
				table: { defaultValue: { summary: "byte" } },
			},
			unitDisplay: {
				control: "select",
				options: ["long", "short", "narrow"],
				description: "The unit display format.",
				table: { defaultValue: { summary: "short" } },
			},
			locale: {
				control: "text",
				description:
					"The locale to use for formatting. If not provided, uses the locale from LocaleProvider context.",
			},
		},
		args: {
			value: 1450.45,
			unit: "byte",
			unitDisplay: "short",
		},
	});
</script>

{#snippet basicStory()}
	<div class="flex items-center justify-center p-8">
		<Text size="lg">
			File size: <FormatByte value={1450.45} />
		</Text>
	</div>
{/snippet}

{#snippet sizesStory()}
	<div class="flex flex-col items-center gap-2 p-8">
		<Text size="lg">
			<FormatByte value={50} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000000} />
		</Text>
		<Text size="lg">
			<FormatByte value={5000000000} />
		</Text>
	</div>
{/snippet}

{#snippet bitsStory()}
	<div class="flex items-center justify-center p-8">
		<Text size="lg">
			File size: <FormatByte value={1450.45} unit="bit" />
		</Text>
	</div>
{/snippet}

{#snippet localeStory()}
	<div class="flex flex-col items-center gap-3 p-8">
		<div class="flex items-center gap-4">
			<Text size="md" weight="medium" class="w-16">de-DE</Text>
			<LocaleProvider locale="de-DE">
				<Text size="lg">
					<FormatByte value={1450.45} />
				</Text>
			</LocaleProvider>
		</div>

		<div class="flex items-center gap-4">
			<Text size="md" weight="medium" class="w-16">zh-CN</Text>
			<LocaleProvider locale="zh-CN">
				<Text size="lg">
					<FormatByte value={1450.45} />
				</Text>
			</LocaleProvider>
		</div>
	</div>
{/snippet}

{#snippet unitDisplayStory()}
	<div class="flex flex-col items-center gap-2 p-8">
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="narrow" />
		</Text>
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="short" />
		</Text>
		<Text size="lg">
			<FormatByte value={50345.53} unitDisplay="long" />
		</Text>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Format Bits" template={bitsStory} />
<Story name="Locale" template={localeStory} />
<Story name="Unit Display" template={unitDisplayStory} />
