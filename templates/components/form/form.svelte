<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import type { FormApi } from "./use-form.svelte";
	import { FORM_CTX } from "./types";

	interface Props extends Omit<HTMLFormAttributes, "onsubmit"> {
		form: FormApi;
		children: Snippet;
		class?: string;
	}

	let { form, children, class: className, ...restProps }: Props = $props();

	$effect(() => {
		setContext(FORM_CTX, form);
	});
</script>

<form class={className} onsubmit={form.handleSubmit} novalidate {...restProps}>
	{@render children()}
</form>
