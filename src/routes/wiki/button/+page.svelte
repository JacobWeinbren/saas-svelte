<script lang="ts">
	import { Button } from "$saas/button";

	const variants = [
		"solid",
		"outline",
		"ghost",
		"subtle",
		"surface",
		"glass",
		"plain",
	] as const;

	const colors = [
		"accent",
		"gray",
		"red",
		"green",
		"blue",
		"yellow",
		"purple",
		"pink",
	] as const;

	const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

	let variant = $state<(typeof variants)[number]>("solid");
	let color = $state<(typeof colors)[number]>("accent");
	let size = $state<(typeof sizes)[number]>("md");
	let disabled = $state(false);

	const needsColor = $derived(
		["solid", "outline", "ghost", "subtle"].includes(variant),
	);
</script>

<div
	class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
>
	<div class="max-w-4xl p-8 mx-auto">
		<h1 class="mb-8 text-3xl font-semibold text-gray-900 dark:text-white">
			Button Playground
		</h1>

		<div class="bg-white rounded-2xl dark:bg-gray-800">
			<!-- Preview Area -->
			<div class="p-12 border-b dark:border-gray-700">
				<div class="flex items-center justify-center">
					<Button
						{variant}
						colorScheme={needsColor ? color : undefined}
						{size}
						{disabled}
					>
						Button Text
					</Button>
				</div>
			</div>

			<!-- Controls -->
			<div class="p-6 space-y-6">
				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
								Color
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
								<option value={s}>{s.toUpperCase()}</option>
							{/each}
						</select>
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
</div>
