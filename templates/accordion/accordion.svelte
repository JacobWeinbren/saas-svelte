<script lang="ts">
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { ChevronRight } from "@lucide/svelte";

	let { items }: { items: { value: string; title: string; text: string }[] } =
		$props();

	let openValue = $state(items?.[0]?.value || null);

	function toggle(value: string) {
		if (openValue === value) {
			openValue = null;
		} else {
			openValue = value;
		}
	}
</script>

<div
	class="w-full px-6 pt-4 pb-6 text-sm leading-normal text-black sm:p-10"
	dir="ltr"
	role="tabpanel"
>
	<div dir="ltr" class="w-full">
		{#each items as item (item.value)}
			<div class="border-b [overflow-anchor:none]">
				<button
					type="button"
					dir="ltr"
					onclick={() => toggle(item.value)}
					aria-expanded={openValue === item.value}
					aria-controls={`accordion-content-${item.value}`}
					class="flex items-center w-full py-2 text-sm font-medium leading-5 rounded-md outline-0 gap-x-3 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-zinc-600"
				>
					{item.title}

					<div
						dir="ltr"
						aria-hidden="true"
						class="text-zinc-600 transition-all duration-200 ml-auto"
						class:rotate-90={openValue === item.value}
					>
						<ChevronRight
							focusable="false"
							aria-hidden="true"
							viewBox="0 0 24 24"
							class="text-current shrink-0 w-4 h-4 fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"
						/>
					</div>
				</button>

				{#if openValue === item.value}
					<div
						id={`accordion-content-${item.value}`}
						role="region"
						aria-labelledby={`accordion-trigger-${item.value}`}
						transition:slide={{
							duration: 200,
							easing: cubicOut,
							axis: "y",
						}}
						class="overflow-hidden"
					>
						<div class="pt-2 pb-4">
							{item.text}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
