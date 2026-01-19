export { default as BreadcrumbRoot } from "./breadcrumb-root.svelte";
export { default as BreadcrumbItem } from "./breadcrumb-item.svelte";
export { default as BreadcrumbLink } from "./breadcrumb-link.svelte";
export { default as BreadcrumbCurrentLink } from "./breadcrumb-current-link.svelte";
export { default as BreadcrumbEllipsis } from "./breadcrumb-ellipsis.svelte";

// Re-export types
export type { BreadcrumbVariants } from "./breadcrumb-root.svelte";

// Namespace export for compound component pattern
export const Breadcrumb = {
	Root: null as unknown as typeof import("./breadcrumb-root.svelte").default,
	Item: null as unknown as typeof import("./breadcrumb-item.svelte").default,
	Link: null as unknown as typeof import("./breadcrumb-link.svelte").default,
	CurrentLink:
		null as unknown as typeof import("./breadcrumb-current-link.svelte").default,
	Ellipsis:
		null as unknown as typeof import("./breadcrumb-ellipsis.svelte").default,
};

// Initialize the namespace
import Root from "./breadcrumb-root.svelte";
import Item from "./breadcrumb-item.svelte";
import Link from "./breadcrumb-link.svelte";
import CurrentLink from "./breadcrumb-current-link.svelte";
import Ellipsis from "./breadcrumb-ellipsis.svelte";

Breadcrumb.Root = Root;
Breadcrumb.Item = Item;
Breadcrumb.Link = Link;
Breadcrumb.CurrentLink = CurrentLink;
Breadcrumb.Ellipsis = Ellipsis;
