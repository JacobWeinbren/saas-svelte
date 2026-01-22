export { default as HoverCardRoot } from "./hover-card-root.svelte";
export { default as HoverCardTrigger } from "./hover-card-trigger.svelte";
export { default as HoverCardContent } from "./hover-card-content.svelte";
export { default as HoverCardArrow } from "./hover-card-arrow.svelte";

import Root from "./hover-card-root.svelte";
import Trigger from "./hover-card-trigger.svelte";
import Content from "./hover-card-content.svelte";
import Arrow from "./hover-card-arrow.svelte";

export const HoverCard = {
	Root,
	Trigger,
	Content,
	Arrow,
};

export {
	hoverCard,
	type HoverCardVariants,
	type HoverCardContext,
} from "./hover-card-root.svelte";
