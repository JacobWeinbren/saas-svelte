/**
 * Prop whitelist patterns for Storybook components.
 * Use these with <ArgTypes exclude={pattern} /> in .mdx files
 */

// Helper function to generate exclude pattern
const makePattern = (props: string[]): RegExp => new RegExp(`^(?!(${props.join('|')})$).*$`);

// Component-specific prop patterns
export const accordionRootPattern = makePattern(['variant', 'size', 'orientation', 'collapsible', 'multiple', 'defaultValue', 'class', 'children']);
export const accordionItemPattern = makePattern(['value', 'disabled', 'class', 'children']);
export const accordionItemTriggerPattern = makePattern(['icon', 'class', 'children']);
export const accordionItemContentPattern = makePattern(['class', 'children']);

export const alertPattern = makePattern(['status', 'variant', 'colour', 'title', 'icon', 'class', 'children']);

export const buttonPattern = makePattern(['variant', 'size', 'colour', 'loading', 'loadingText', 'icon', 'disabled', 'class', 'children']);

export const checkboxPattern = makePattern(['checked', 'size', 'variant', 'colour', 'label', 'description', 'disabled', 'invalid', 'icon', 'value', 'class', 'children']);
export const checkboxGroupPattern = makePattern(['orientation', 'class', 'children']);

export const dialogRootPattern = makePattern(['open', 'size', 'placement', 'scrollBehavior', 'motionPreset', 'role', 'initialFocusEl', 'finalFocusEl', 'restoreFocus', 'lazyMount', 'unmountOnExit', 'class', 'children']);

export const drawerRootPattern = makePattern(['open', 'size', 'placement', 'attached', 'role', 'initialFocusEl', 'finalFocusEl', 'restoreFocus', 'lazyMount', 'unmountOnExit', 'class', 'children']);

export const iconPattern = makePattern(['as', 'size', 'weight', 'mirrored', 'viewBox', 'colour', 'style', 'class', 'children']);

export const inputPattern = makePattern(['variant', 'size', 'colour', 'invalid', 'disabled', 'placeholder', 'class', 'children']);
export const inputGroupPattern = makePattern(['placement', 'class', 'children']);
export const inputElementPattern = makePattern(['placement', 'class', 'children']);

export const stackPattern = makePattern(['direction', 'align', 'justify', 'class', 'children']);

export const textPattern = makePattern(['as', 'size', 'weight', 'variant', 'truncate', 'lineClamp', 'class', 'children']);

export const tooltipPattern = makePattern(['content', 'showArrow', 'variant', 'interactive', 'openDelay', 'closeDelay', 'positioning', 'disabled', 'class', 'children']);

export const fieldPattern = makePattern(['disabled', 'invalid', 'required', 'readOnly', 'id', 'class', 'children']);
export const fieldLabelPattern = makePattern(['for', 'class', 'children']);
export const fieldHelperTextPattern = makePattern(['class', 'children']);
export const fieldErrorTextPattern = makePattern(['class', 'children']);

export const kbdPattern = makePattern(['variant', 'size', 'class', 'children']);

export const codePattern = makePattern(['variant', 'size', 'colour', 'class', 'children']);

export const visuallyHiddenPattern = makePattern(['class', 'children']);
export const badgePattern = makePattern(['variant', 'size', 'colour', 'class', 'children']);
export const avatarPattern = makePattern(['src', 'name', 'size', 'variant', 'shape', 'colour', 'borderless', 'onStatusChange', 'fallback', 'class', 'children']);
export const avatarGroupPattern = makePattern(['size', 'spaceX', 'stacking', 'borderless', 'class', 'children']);

export const groupPattern = makePattern(['orientation', 'grow', 'attached', 'class', 'children']);
export const dataListRootPattern = makePattern(['size', 'orientation', 'class', 'children']);
export const dataListItemPattern = makePattern(['class', 'children']);
export const dataListItemLabelPattern = makePattern(['class', 'children']);
export const dataListItemValuePattern = makePattern(['class', 'children']);

export const blockquotePattern = makePattern(['colour', 'justify', 'variant', 'cite', 'showDash', 'showIcon', 'icon', 'class', 'children']);

export const floatPattern = makePattern(['placement', 'offsetX', 'offsetY', 'offset', 'class', 'children']);
export const circlePattern = makePattern(['size', 'variant', 'colour', 'class', 'children']);
export const boxPattern = makePattern(['as', 'class', 'children']);

export const headingPattern = makePattern(['as', 'size', 'weight', 'fontWeight', 'class', 'children']);
export const emPattern = makePattern(['class', 'children']);
export const markPattern = makePattern(['variant', 'colour', 'class', 'children']);
export const highlightPattern = makePattern(['query', 'text', 'ignoreCase', 'matchAll', 'variant', 'colour', 'class']);

export const toastPattern = makePattern(['status', 'variant', 'colour', 'icon', 'title', 'description', 'action', 'closable', 'class', 'children']);

export const actionBarPattern = makePattern(['open', 'onOpenChange', 'closeOnInteractOutside', 'class', 'children']);
export const actionBarSelectionTriggerPattern = makePattern(['class', 'children']);
export const actionBarSeparatorPattern = makePattern(['class']);
export const actionBarCloseButtonPattern = makePattern(['aria-label', 'class']);

export const breadcrumbRootPattern = makePattern(['size', 'variant', 'separator', 'class', 'children']);
export const breadcrumbItemPattern = makePattern(['showSeparator', 'class', 'children']);
export const breadcrumbLinkPattern = makePattern(['href', 'showSeparator', 'class', 'children']);
export const breadcrumbCurrentLinkPattern = makePattern(['class', 'children']);
export const breadcrumbEllipsisPattern = makePattern(['showSeparator', 'class']);

export const menuPattern = makePattern(['size', 'colour', 'open', 'onOpenChange', 'closeOnSelect', 'loopFocus', 'positioning', 'typeahead', 'class', 'children']);
export const menuItemPattern = makePattern(['value', 'valueText', 'disabled', 'closeOnSelect', 'onSelect', 'asChild', 'class', 'children']);

export const cardRootPattern = makePattern(['variant', 'size', 'class', 'children']);
export const cardHeaderPattern = makePattern(['class', 'children']);
export const cardBodyPattern = makePattern(['class', 'children']);
export const cardFooterPattern = makePattern(['class', 'children']);
export const cardTitlePattern = makePattern(['class', 'children']);
export const cardDescriptionPattern = makePattern(['class', 'children']);

export const formPattern = makePattern(['form', 'class', 'children']);
export const formFieldPattern = makePattern(['name', 'label', 'type', 'placeholder', 'description', 'options', 'class']);
export const submitButtonPattern = makePattern(['disableIfUntouched', 'disableIfInvalid', 'variant', 'size', 'colour', 'class', 'children']);
export const displayIfPattern = makePattern(['field', 'value', 'children']);

export const checkboxCardRootPattern = makePattern(['checked', 'value', 'variant', 'size', 'colour', 'disabled', 'onCheckedChange', 'class', 'children']);
export const checkboxCardControlPattern = makePattern(['align', 'class', 'children']);
export const checkboxCardContentPattern = makePattern(['align', 'class', 'children']);
export const checkboxCardLabelPattern = makePattern(['class', 'children']);
export const checkboxCardDescriptionPattern = makePattern(['class', 'children']);
export const checkboxCardAddonPattern = makePattern(['class', 'children']);
export const checkboxCardIndicatorPattern = makePattern(['class']);

export const comboboxPattern = makePattern(['items', 'label', 'placeholder', 'emptyText', 'size', 'variant', 'invalid', 'disabled', 'colour', 'value', 'onValueChange', 'multiple', 'openOnClick', 'open', 'onOpenChange', 'allowCustomValue', 'inputBehavior', 'selectionBehavior', 'isItemDisabled', 'loading', 'loadingText', 'onInputValueChange', 'disableFilter', 'itemSnippet', 'loadingContent', 'highlightMatch', 'minCharacters', 'limit', 'startElement', 'itemDescriptionKey', 'itemPrefixKey', 'virtualised', 'virtualItemHeight', 'class']);
export const comboboxRootPattern = makePattern(['collection', 'variant', 'size', 'invalid', 'colour', 'class', 'children']);
export const comboboxControlPattern = makePattern(['class', 'children']);
export const comboboxInputPattern = makePattern(['placeholder', 'class']);
export const comboboxContentPattern = makePattern(['class', 'children']);
export const comboboxItemPattern = makePattern(['item', 'class', 'children']);
export const comboboxItemTextPattern = makePattern(['class', 'children']);
export const comboboxItemIndicatorPattern = makePattern(['class', 'children']);

export const popoverRootPattern = makePattern(['size', 'open', 'onOpenChange', 'autoFocus', 'closeOnEscape', 'closeOnInteractOutside', 'modal', 'portalled', 'lazyMount', 'unmountOnExit', 'positioning', 'initialFocusEl', 'class', 'children']);
export const popoverTriggerPattern = makePattern(['class', 'children']);
export const popoverContentPattern = makePattern(['class', 'children']);
export const popoverArrowPattern = makePattern(['class']);
export const popoverHeaderPattern = makePattern(['class', 'children']);
export const popoverBodyPattern = makePattern(['class', 'children']);
export const popoverFooterPattern = makePattern(['class', 'children']);
export const popoverTitlePattern = makePattern(['class', 'children']);
export const popoverDescriptionPattern = makePattern(['class', 'children']);
export const popoverCloseTriggerPattern = makePattern(['aria-label', 'class', 'children']);

export const navbarRootPattern = makePattern(['variant', 'position', 'bordered', 'colour', 'shouldHideOnScroll', 'parentRef', 'class', 'children']);
export const navbarContentPattern = makePattern(['maxW', 'class', 'children']);
export const navbarBrandPattern = makePattern(['class', 'children']);
export const navbarItemGroupPattern = makePattern(['gap', 'justify', 'class', 'children']);
export const navbarItemPattern = makePattern(['class', 'children']);
export const navbarLinkPattern = makePattern(['active', 'href', 'class', 'children']);

export const sidebarRootPattern = makePattern(['class', 'children']);
export const sidebarHeaderPattern = makePattern(['class', 'children']);
export const sidebarBodyPattern = makePattern(['class', 'children']);
export const sidebarFooterPattern = makePattern(['class', 'children']);
export const sidebarGroupPattern = makePattern(['class', 'children']);
export const sidebarGroupHeaderPattern = makePattern(['class', 'children']);
export const sidebarGroupTitlePattern = makePattern(['class', 'children']);
export const sidebarGroupContentPattern = makePattern(['class', 'children']);
export const sidebarNavItemPattern = makePattern(['class', 'children']);
export const sidebarNavButtonPattern = makePattern(['active', 'class', 'children']);
export const sidebarItemPattern = makePattern(['active', 'icon', 'class', 'children']);
export const sidebarLinkPattern = makePattern(['active', 'icon', 'href', 'class', 'children']);
export const sidebarTogglePattern = makePattern(['onclick', 'class', 'children']);

export const appShellPattern = makePattern(['header', 'sidebar', 'aside', 'footer', 'height', 'class', 'children']);

export const editablePattern = makePattern(['activationMode', 'autoResize', 'defaultValue', 'value', 'onValueChange', 'onValueCommit', 'onValueRevert', 'onEditChange', 'placeholder', 'maxLength', 'selectOnFocus', 'submitMode', 'disabled', 'readOnly', 'required', 'invalid', 'size', 'colour', 'name', 'form', 'class', 'children']);
export const editableAreaPattern = makePattern(['class', 'children']);
export const editablePreviewPattern = makePattern(['class']);
export const editableInputPattern = makePattern(['class']);
export const editableTextareaPattern = makePattern(['rows', 'class']);
export const editableControlPattern = makePattern(['class', 'children']);
export const editableLabelPattern = makePattern(['class', 'children']);
export const editableTriggerPattern = makePattern(['variant', 'size', 'colour', 'icon', 'class', 'style', 'children']);
