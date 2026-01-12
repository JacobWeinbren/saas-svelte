<script lang="ts">
	import { Checkbox } from "$saas/components/checkbox";
	import { Stack } from "$saas/layout/stack";

	let values = $state([true, false, false, false]);

	let allChecked = $derived(values.every((v) => v));
	let isIndeterminate = $derived(values.some((v) => v) && !allChecked);

	function toggleAll(
		e: Event & { currentTarget: EventTarget & HTMLInputElement },
	) {
		const nextState = e.currentTarget.checked;
		values = values.map(() => nextState);
	}
</script>

<Stack align="start" class="gap-2">
	<Checkbox
		checked={isIndeterminate ? "indeterminate" : allChecked}
		onchange={toggleAll}
		label="Weekdays"
	/>
	<Stack class="gap-2 ps-6">
		<Checkbox bind:checked={values[0]} label="Monday" />
		<Checkbox bind:checked={values[1]} label="Tuesday" />
		<Checkbox bind:checked={values[2]} label="Wednesday" />
		<Checkbox bind:checked={values[3]} label="Thursday" />
	</Stack>
</Stack>
