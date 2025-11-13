<script lang="ts">
	import { Button } from "$saas/button";
	import { Mail, ArrowRight } from "@lucide/svelte";

	const variants = [
		"glass",
		"solid",
		"subtle",
		"surface",
		"outline",
		"ghost",
		"plain",
	] as const;

	const colors = [
		"gray",
		"zinc",
		"neutral",
		"stone",
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
	] as const;

	const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

	let variant = $state<(typeof variants)[number]>("solid");
	let color = $state<(typeof colors)[number]>("gray");
	let size = $state<(typeof sizes)[number]>("md");
	let disabled = $state(false);
	let loading = $state(false);
	let withIcons = $state(false);

	const needsColor = $derived(
		["solid", "outline", "surface"].includes(variant),
	);
</script>

<div class="max-w-4xl p-8 mx-auto">
	<h1 class="mb-8 text-3xl font-semibold text-black dark:text-white">
		Button Playground
	</h1>

	<div class="bg-white rounded-2xl dark:bg-black">
		<!-- Preview Area -->
		<div class="p-12 border-b dark:border-gray-700">
			<div class="flex items-center justify-center gap-4">
				<Button
					{variant}
					colorPalette={needsColor ? color : undefined}
					{size}
					{disabled}
					{loading}
				>
					{#if withIcons && !loading}
						<Mail class="h-3.5 w-3.5 shrink-0" />
					{/if}
					Click me!
					{#if withIcons && !loading}
						<ArrowRight class="h-3.5 w-3.5 shrink-0" />
					{/if}
				</Button>

				{#if loading}
					<Button
						{variant}
						colorPalette={needsColor ? color : undefined}
						{size}
						{disabled}
						loading
						loadingText="Loading..."
					>
						Button
					</Button>
				{/if}
			</div>
		</div>

		<!-- Controls -->
		<div class="p-6 space-y-6">
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
				<!-- Variant -->
				<div>
					<label
						class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
					>
						Variant
					</label>
					<select
						bind:value={variant}
						class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					>
						{#each variants as v}
							<option value={v}>{v}</option>
						{/each}
					</select>
				</div>

				<!-- Color -->
				{#if needsColor}
					<div>
						<label
							class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
						>
							Colour
						</label>
						<select
							bind:value={color}
							class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						>
							{#each colors as c}
								<option value={c}>{c}</option>
							{/each}
						</select>
					</div>
				{/if}

				<!-- Size -->
				<div>
					<label
						class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
					>
						Size
					</label>
					<select
						bind:value={size}
						class="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					>
						{#each sizes as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				</div>

				<!-- Loading -->
				<div>
					<label
						class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
					>
						Loading
					</label>
					<button
						onclick={() => (loading = !loading)}
						class="w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg {loading
							? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
							: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}"
					>
						{loading ? "Loading" : "Normal"}
					</button>
				</div>

				<!-- Icons -->
				<div>
					<label
						class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
					>
						Icons
					</label>
					<button
						onclick={() => (withIcons = !withIcons)}
						class="w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg {withIcons
							? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
							: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}"
					>
						{withIcons ? "With Icons" : "No Icons"}
					</button>
				</div>

				<!-- Disabled -->
				<div>
					<label
						class="block mb-2 text-xs font-medium text-gray-600 dark:text-gray-400"
					>
						State
					</label>
					<button
						onclick={() => (disabled = !disabled)}
						class="w-full px-3 py-2 text-sm font-medium transition-colors rounded-lg {disabled
							? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
							: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}"
					>
						{disabled ? "Disabled" : "Enabled"}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
