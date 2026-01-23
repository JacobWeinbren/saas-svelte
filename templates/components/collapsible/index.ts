import Root from "./collapsible.svelte";
import Trigger from "./collapsible-trigger.svelte";
import Content from "./collapsible-content.svelte";
import Indicator from "./collapsible-indicator.svelte";

export {
	collapsibleContent,
	collapsibleIndicator,
} from "./collapsible.svelte";

export {
	Collapsible as CollapsiblePrimitive,
	type CollapsibleRootProps,
	type CollapsibleContentProps,
	type CollapsibleTriggerProps,
	type CollapsibleIndicatorProps,
} from "@ark-ui/svelte/collapsible";

export const Collapsible = Root;
export const CollapsibleTrigger = Trigger;
export const CollapsibleContent = Content;
export const CollapsibleIndicator = Indicator;

export const CollapsibleParts = {
	Root,
	Trigger,
	Content,
	Indicator,
};
