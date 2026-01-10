<script lang="ts">
	import { Accordion } from "@ark-ui/svelte";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content of the accordion item.
		 */
		children: Snippet;
		/**
		 * Additional classes to apply to the content.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext("accordion-styles") as { current: any };
	const styles = $derived(ctx.current);
</script>

<Accordion.ItemContent
	class={twMerge("rounded-md overflow-hidden", styles.content(), className)}
	{...restProps}
>
	<div class={styles.contentBody()}>
		{@render children()}
	</div>
</Accordion.ItemContent>

<style>
	/* ... keep your existing keyframes and animation classes ... */
	@keyframes slide-down {
		from {
			height: 0;
		}
		to {
			height: var(--height);
		}
	}

	@keyframes slide-up {
		from {
			height: var(--height);
		}
		to {
			height: 0;
		}
	}

	:global(
		[data-scope="accordion"][data-part="item-content"][data-state="open"]
	) {
		animation: slide-down 0.2s ease-out;
	}

	:global(
		[data-scope="accordion"][data-part="item-content"][data-state="closed"]
	) {
		animation: slide-up 0.2s ease-out;
	}
</style>
