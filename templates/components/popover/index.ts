export { default as PopoverRoot } from "./popover-root.svelte";
export { default as PopoverTrigger } from "./popover-trigger.svelte";
export { default as PopoverContent } from "./popover-content.svelte";
export { default as PopoverArrow } from "./popover-arrow.svelte";
export { default as PopoverHeader } from "./popover-header.svelte";
export { default as PopoverBody } from "./popover-body.svelte";
export { default as PopoverFooter } from "./popover-footer.svelte";
export { default as PopoverTitle } from "./popover-title.svelte";
export { default as PopoverDescription } from "./popover-description.svelte";
export { default as PopoverCloseTrigger } from "./popover-close-trigger.svelte";

import Root from "./popover-root.svelte";
import Trigger from "./popover-trigger.svelte";
import Content from "./popover-content.svelte";
import Arrow from "./popover-arrow.svelte";
import Header from "./popover-header.svelte";
import Body from "./popover-body.svelte";
import Footer from "./popover-footer.svelte";
import Title from "./popover-title.svelte";
import Description from "./popover-description.svelte";
import CloseTrigger from "./popover-close-trigger.svelte";

export const Popover = {
	Root,
	Trigger,
	Content,
	Arrow,
	Header,
	Body,
	Footer,
	Title,
	Description,
	CloseTrigger,
};

export {
	popover,
	type PopoverVariants,
	type PopoverContext,
} from "./popover-root.svelte";
