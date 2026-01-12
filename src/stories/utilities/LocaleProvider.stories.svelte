<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		LocaleProvider,
		getLocaleContext,
	} from "$saas/utilities/locale-provider";
	import { FormatNumber } from "$saas/utilities/format-number";
	import { Text } from "$saas/typography/text";

	const { Story } = defineMeta({
		title: "utilities/LocaleProvider",
		component: LocaleProvider,
		argTypes: {
			locale: {
				control: "text",
				description: "The locale to use for the application.",
				table: { defaultValue: { summary: "en-US" } },
			},
			children: {
				control: false,
				description: "The content to be rendered inside the provider.",
				table: { type: { summary: "Snippet" } },
			},
		},
		args: {
			locale: "en-US",
		},
	});
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import LocaleDisplay from "./LocaleDisplay.svelte";
</script>

{#snippet basicStory()}
	<div class="flex items-center justify-center p-8">
		<LocaleProvider locale="ar-BH">
			<LocaleDisplay />
		</LocaleProvider>
	</div>
{/snippet}

{#snippet settingLocaleStory()}
	<div class="flex flex-col items-center gap-6 p-8">
		<div class="w-full max-w-md">
			<Text size="md" weight="medium" class="mb-2">English (US)</Text>
			<LocaleProvider locale="en-US">
				<LocaleDisplay>
					{#snippet children()}
						<Text size="lg">
							<FormatNumber value={1234.56} style="currency" currency="USD" />
						</Text>
					{/snippet}
				</LocaleDisplay>
			</LocaleProvider>
		</div>

		<div class="w-full max-w-md">
			<Text size="md" weight="medium" class="mb-2">German (Germany)</Text>
			<LocaleProvider locale="de-DE">
				<LocaleDisplay>
					{#snippet children()}
						<Text size="lg">
							<FormatNumber value={1234.56} style="currency" currency="EUR" />
						</Text>
					{/snippet}
				</LocaleDisplay>
			</LocaleProvider>
		</div>

		<div class="w-full max-w-md">
			<Text size="md" weight="medium" class="mb-2">Arabic (Bahrain)</Text>
			<LocaleProvider locale="ar-BH">
				<LocaleDisplay>
					{#snippet children()}
						<Text size="lg">
							<FormatNumber value={1234.56} style="currency" currency="BHD" />
						</Text>
					{/snippet}
				</LocaleDisplay>
			</LocaleProvider>
		</div>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Setting Locale" template={settingLocaleStory} />
