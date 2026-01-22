<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		MenuRoot,
		MenuButton,
		MenuContent,
		MenuItem,
		MenuItemLink,
		MenuItemCommand,
		MenuItemGroup,
		MenuSeparator,
		MenuTriggerItem,
		MenuContextTrigger,
		MenuCheckboxItem,
		MenuRadioItemGroup,
		MenuRadioItem,
		MenuItemIndicator,
	} from "$saas/components/menu";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import Scissors from "phosphor-svelte/lib/Scissors";
	import Copy from "phosphor-svelte/lib/Copy";
	import ClipboardText from "phosphor-svelte/lib/ClipboardText";
	import SortAscending from "phosphor-svelte/lib/SortAscending";
	import Funnel from "phosphor-svelte/lib/Funnel";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import Translate from "phosphor-svelte/lib/Translate";
	import ShareNetwork from "phosphor-svelte/lib/ShareNetwork";
	import { colours, commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "components/Menu",
		component: MenuRoot,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: ["sm", "md"],
				table: { defaultValue: { summary: "md" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "indigo" } },
			},
			open: {
				control: "boolean",
				description: "Whether the menu is open.",
			},
			closeOnSelect: {
				control: "boolean",
				description:
					"Whether to close the menu when an option is selected.",
				table: { defaultValue: { summary: "true" } },
			},
			loopFocus: {
				control: "boolean",
				description: "Whether to loop the keyboard navigation.",
				table: { defaultValue: { summary: "false" } },
			},
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"open",
				"closeOnSelect",
				"loopFocus",
				"children",
			]),
		},
		args: {
			size: "md",
			colour: "indigo",
		},
	});

	const sizes = ["sm", "md"] as const;
</script>

{#snippet basicStory()}
	<div>
		<MenuRoot>
			<MenuButton>Open</MenuButton>
			<MenuContent>
				<MenuItem value="new-txt">New Text File</MenuItem>
				<MenuItem value="new-file">New File...</MenuItem>
				<MenuItem value="new-win">New Window</MenuItem>
				<MenuItem value="open-file">Open File...</MenuItem>
				<MenuItem value="export">Export</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet sizesStory()}
	<div>
		<HStack align="start" gap={8}>
			{#each sizes as size}
				<VStack gap={2} class="items-center">
					<Text size="xs">{size}</Text>
					<MenuRoot {size}>
						<MenuButton>Open</MenuButton>
						<MenuContent>
							<MenuItem value="new-txt">New Text File</MenuItem>
							<MenuItem value="new-file">New File...</MenuItem>
							<MenuItem value="new-win">New Window</MenuItem>
							<MenuItem value="open-file">Open File...</MenuItem>
							<MenuItem value="export">Export</MenuItem>
						</MenuContent>
					</MenuRoot>
				</VStack>
			{/each}
		</HStack>
	</div>
{/snippet}

{#snippet commandStory()}
	<div>
		<MenuRoot>
			<MenuButton>Open</MenuButton>
			<MenuContent>
				<MenuItem value="new-txt">
					New Text File <MenuItemCommand>⌘E</MenuItemCommand>
				</MenuItem>
				<MenuItem value="new-file">
					New File... <MenuItemCommand>⌘N</MenuItemCommand>
				</MenuItem>
				<MenuItem value="new-win">
					New Window <MenuItemCommand>⌘⇧N</MenuItemCommand>
				</MenuItem>
				<MenuItem value="open-file">
					Open File... <MenuItemCommand>⌘O</MenuItemCommand>
				</MenuItem>
				<MenuItem value="export">
					Export <MenuItemCommand>⌘S</MenuItemCommand>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet contextMenuStory()}
	<div>
		<MenuRoot>
			<MenuContextTrigger>
				<div
					class="flex items-center justify-center w-64 h-32 border-2 border-dashed border-border-default rounded-(--radii-l2) text-fg-muted select-none"
				>
					Right click here
				</div>
			</MenuContextTrigger>
			<MenuContent>
				<MenuItem value="new-txt">New Text File</MenuItem>
				<MenuItem value="new-file">New File...</MenuItem>
				<MenuItem value="new-win">New Window</MenuItem>
				<MenuItem value="open-file">Open File...</MenuItem>
				<MenuItem value="export">Export</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet groupStory()}
	<div>
		<MenuRoot>
			<MenuButton>Edit</MenuButton>
			<MenuContent>
				<MenuItemGroup title="Styles">
					<MenuItem value="bold">Bold</MenuItem>
					<MenuItem value="underline">Underline</MenuItem>
				</MenuItemGroup>
				<MenuSeparator />
				<MenuItemGroup title="Align">
					<MenuItem value="left">Left</MenuItem>
					<MenuItem value="middle">Middle</MenuItem>
					<MenuItem value="right">Right</MenuItem>
				</MenuItemGroup>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet submenuStory()}
	<div>
		<MenuRoot>
			<MenuButton>Open</MenuButton>
			<MenuContent>
				<MenuItem value="new-txt">New Text File</MenuItem>
				<MenuItem value="new-file">New File...</MenuItem>
				<MenuRoot positioning={{ placement: "right-start", gutter: -4 }}>
					<MenuTriggerItem value="open-recent"
						>Open Recent</MenuTriggerItem
					>
					<MenuContent>
						<MenuItem value="panda">Panda</MenuItem>
						<MenuItem value="ark">Ark UI</MenuItem>
						<MenuItem value="chakra">Chakra v3</MenuItem>
					</MenuContent>
				</MenuRoot>
				<MenuItem value="open-file">Open File...</MenuItem>
				<MenuItem value="export">Export</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet linksStory()}
	<div>
		<MenuRoot>
			<MenuButton>Select Anime</MenuButton>
			<MenuContent>
				<MenuItemLink
					value="naruto"
					href="https://www.crunchyroll.com/naruto"
					target="_blank"
					rel="noreferrer"
				>
					Naruto
				</MenuItemLink>
				<MenuItemLink
					value="one-piece"
					href="https://www.crunchyroll.com/one-piece"
					target="_blank"
					rel="noreferrer"
				>
					One Piece
				</MenuItemLink>
				<MenuItemLink
					value="attack-on-titan"
					href="https://www.crunchyroll.com/attack-on-titan"
					target="_blank"
					rel="noreferrer"
				>
					Attack on Titan
				</MenuItemLink>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet radioStory()}
	<div>
		<MenuRoot>
			<MenuButton>
				<Icon as={SortAscending} size="sm" /> Sort
			</MenuButton>
			<MenuContent>
				<MenuRadioItemGroup value="asc">
					<MenuRadioItem value="asc">
						{#snippet startElement()}
							<MenuItemIndicator />
						{/snippet}
						Ascending
					</MenuRadioItem>
					<MenuRadioItem value="desc">
						{#snippet startElement()}
							<MenuItemIndicator />
						{/snippet}
						Descending
					</MenuRadioItem>
				</MenuRadioItemGroup>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet checkboxStory()}
	<div>
		<MenuRoot closeOnSelect={false}>
			<MenuButton>
				<Icon as={Funnel} size="sm" /> Status
			</MenuButton>
			<MenuContent>
				<MenuCheckboxItem checked={false} value="open">
					{#snippet startElement()}
						<MenuItemIndicator />
					{/snippet}
					Open
				</MenuCheckboxItem>
				<MenuCheckboxItem checked={true} value="closed">
					{#snippet startElement()}
						<MenuItemIndicator />
					{/snippet}
					Closed
				</MenuCheckboxItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet iconAndCommandStory()}
	<div>
		<MenuRoot>
			<MenuButton>Edit</MenuButton>
			<MenuContent>
				<MenuItem value="cut" valueText="cut">
					<Icon as={Scissors} size="xs" />
					<span class="flex-1">Cut</span>
					<MenuItemCommand>⌘X</MenuItemCommand>
				</MenuItem>
				<MenuItem value="copy" valueText="copy">
					<Icon as={Copy} size="xs" />
					<span class="flex-1">Copy</span>
					<MenuItemCommand>⌘C</MenuItemCommand>
				</MenuItem>
				<MenuItem value="paste" valueText="paste">
					<Icon as={ClipboardText} size="xs" />
					<span class="flex-1">Paste</span>
					<MenuItemCommand>⌘V</MenuItemCommand>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet placementStory()}
	<div>
		<MenuRoot positioning={{ placement: "right-start" }}>
			<MenuButton>Open</MenuButton>
			<MenuContent>
				<MenuItem value="new-txt">New Text File</MenuItem>
				<MenuItem value="new-file">New File...</MenuItem>
				<MenuItem value="new-win">New Window</MenuItem>
				<MenuItem value="open-file">Open File...</MenuItem>
				<MenuItem value="export">Export</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

{#snippet mixedLayoutStory()}
	<div>
		<MenuRoot>
			<MenuButton>Open</MenuButton>
			<MenuContent>
				<div class="flex grow gap-0">
					<MenuItem
						value="cut"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={Scissors} size="xs" />
						Cut
					</MenuItem>
					<MenuItem
						value="copy"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={Copy} size="xs" />
						Copy
					</MenuItem>
					<MenuItem
						value="paste"
						class="w-14 gap-1 flex-col justify-center"
					>
						<Icon as={ClipboardText} size="xs" />
						Paste
					</MenuItem>
				</div>
				<MenuItem value="look-up">
					<span class="flex-1">Look Up</span>
					<Icon as={MagnifyingGlass} size="xs" />
				</MenuItem>
				<MenuItem value="translate">
					<span class="flex-1">Translate</span>
					<Icon as={Translate} size="xs" />
				</MenuItem>
				<MenuItem value="share">
					<span class="flex-1">Share</span>
					<Icon as={ShareNetwork} size="xs" />
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Command" template={commandStory} />

<Story name="ContextMenu" template={contextMenuStory} />

<Story name="Group" template={groupStory} />

<Story name="Submenu" template={submenuStory} />

<Story name="Links" template={linksStory} />

<Story name="Radio" template={radioStory} />

<Story name="Checkbox" template={checkboxStory} />

<Story name="Icon And Command" template={iconAndCommandStory} />

<Story name="Placement" template={placementStory} />

<Story name="Mixed Layout" template={mixedLayoutStory} />
