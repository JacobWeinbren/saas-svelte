import Root from "./accordion-root.svelte";
import Item from "./accordion-item.svelte";
import ItemTrigger from "./accordion-item-trigger.svelte";
import ItemContent from "./accordion-item-content.svelte";

export type { AccordionItem } from "./accordion-root.svelte";

export const AccordionRoot = Root;
export const AccordionItem = Item;
export const AccordionItemTrigger = ItemTrigger;
export const AccordionItemContent = ItemContent;

export const Accordion = {
	Root,
	Item,
	ItemTrigger,
	ItemContent,
};
