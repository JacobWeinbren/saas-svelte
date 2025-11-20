<script>
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Define the items data
	const items = [
		{ value: 'a', title: 'First Item', text: 'Some value 1...' },
		{ value: 'b', title: 'Second Item', text: 'Some value 2...' },
		{ value: 'c', title: 'Third Item', text: 'Some value 3...' }
	];

	// Svelte 5 State Rune
	// 'b' is the default open value matching your snippet
	let openValue = $state('b');

	/**
	 * Toggles the accordion item.
	 * If the clicked item is already open, it closes it (collapsible behavior).
	 * Otherwise, it opens the clicked item and closes others.
	 */
	function toggle(value) {
		if (openValue === value) {
			openValue = null;
		} else {
			openValue = value;
		}
	}
</script>

<!-- Main Container matching the preview's padding and font settings -->
<div class="w-full px-6 pt-4 pb-6 font-sans text-sm leading-normal text-black sm:p-10">
	<div class="w-full">
		{#each items as item}
			<div class="border-b border-gray-200 overflow-anchor-none">
				<h3>
					<button
						type="button"
						onclick={() => toggle(item.value)}
						aria-expanded={openValue === item.value}
						aria-controls={`accordion-content-${item.value}`}
						class="flex items-center w-full py-2 text-sm font-medium leading-5 text-left transition-colors rounded-md outline-none  gap-x-3 gap-y-3 focus-visible:outline-2 focus-visible:outline-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
					>
						{item.title}
						
						<!-- Icon Wrapper with Rotation Logic -->
						<!-- Matches the origin-[50%] and ml-auto from your preview -->
						<div 
                            class="ml-auto transition-transform duration-200 ease-out origin-center  shrink-0 text-zinc-600"
                            class:rotate-90={openValue === item.value}
                        >
							<!-- Chevron Right Icon -->
							<svg
								focusable="false"
								aria-hidden="true"
								viewBox="0 0 24 24"
								class="h-4 w-4 fill-none stroke-current stroke-[2px] stroke-linecap-round stroke-linejoin-round"
							>
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</div>
					</button>
				</h3>

				<!-- Animated Content -->
				{#if openValue === item.value}
					<div
						id={`accordion-content-${item.value}`}
						role="region"
						aria-labelledby={`accordion-trigger-${item.value}`}
						transition:slide={{ duration: 200, easing: cubicOut, axis: 'y' }}
						class="overflow-hidden text-sm leading-5 rounded-md"
					>
						<!-- Inner padding container matching the snippet -->
						<div class="pt-2 pb-4 text-zinc-600">
							{item.text}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>