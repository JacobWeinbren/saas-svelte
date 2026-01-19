<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import type { FormApi } from "./use-form.svelte";
	import { FORM_CTX } from "./types";

	interface Props extends Omit<HTMLFormAttributes, "onsubmit"> {
		/**
		 * The form instance from useForm.
		 */
		form: FormApi;
		/**
		 * The form content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
	}

	let { form, children, class: className, ...restProps }: Props = $props();

	// Provide form context to child components
	setContext(FORM_CTX, form);
</script>

<form
	class={className}
	onsubmit={form.handleSubmit}
	novalidate
	{...restProps}
>
	{@render children()}
</form>
