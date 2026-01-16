<script lang="ts">
	import { Toast as ArkToast } from "@ark-ui/svelte/toast";
	import type { Snippet } from "svelte";
	import { toast } from "./toast.svelte";

	interface Props {
		class?: string;
		style?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className, style, children, ...restProps }: Props = $props();

	// Fix Ark UI bug: --index doesn't increment properly in overlap:false mode
	function fixIndex(node: HTMLElement) {
		const root = node.querySelector<HTMLElement>('[data-part="root"]');
		const group = node.closest('[data-part="group"]');

		if (!root || !group) return;

		let rafId: number | null = null;

		const update = () => {
			const toasts = Array.from(group.querySelectorAll('[data-part="root"][data-state="open"]'));
			const index = toasts.indexOf(root);
			if (index >= 0) {
				root.style.setProperty("--fixed-index", String(index));
			}
		};

		const debouncedUpdate = () => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				update();
				rafId = null;
			});
		};

		// Only observe childList changes (toasts added/removed), not attributes
		const observer = new MutationObserver(debouncedUpdate);
		observer.observe(group, { childList: true });
		update();

		return {
			destroy() {
				if (rafId) cancelAnimationFrame(rafId);
				observer.disconnect();
			},
		};
	}

	const styles = toast();
</script>

<div use:fixIndex class="contents">
	<ArkToast.Root class={styles.root({ class: className })} {style} {...restProps}>
		{@render children?.()}
	</ArkToast.Root>
</div>
