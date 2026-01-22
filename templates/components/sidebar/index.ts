import Root from "./sidebar-root.svelte";
import Header from "./sidebar-header.svelte";
import Body from "./sidebar-body.svelte";
import Footer from "./sidebar-footer.svelte";
import Group from "./sidebar-group.svelte";
import GroupHeader from "./sidebar-group-header.svelte";
import GroupTitle from "./sidebar-group-title.svelte";
import GroupLabel from "./sidebar-group-label.svelte";
import GroupContent from "./sidebar-group-content.svelte";
import NavItem from "./sidebar-nav-item.svelte";
import NavButton from "./sidebar-nav-button.svelte";
import Item from "./sidebar-item.svelte";
import Link from "./sidebar-link.svelte";
import Toggle from "./sidebar-toggle.svelte";

export const Sidebar = {
	Root,
	Header,
	Body,
	Footer,
	Group,
	GroupHeader,
	GroupTitle,
	GroupLabel,
	GroupContent,
	NavItem,
	NavButton,
	Item,
	Link,
	Toggle,
};

export { SIDEBAR_CTX, sidebar } from "./sidebar-root.svelte";
export type { SidebarContext } from "./sidebar-root.svelte";
