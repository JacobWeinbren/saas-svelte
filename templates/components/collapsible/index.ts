export { default as Collapsible } from "./collapsible.svelte";
export { default as CollapsibleTrigger } from "./collapsible-trigger.svelte";
export { default as CollapsibleContent } from "./collapsible-content.svelte";
export { default as CollapsibleIndicator } from "./collapsible-indicator.svelte";

export {
	collapsibleContent,
	collapsibleIndicator,
} from "./collapsible.svelte";

// Re-export Ark UI primitives for advanced usage
export {
	Collapsible as CollapsiblePrimitive,
	type CollapsibleRootProps,
	type CollapsibleContentProps,
	type CollapsibleTriggerProps,
	type CollapsibleIndicatorProps,
} from "@ark-ui/svelte/collapsible";
