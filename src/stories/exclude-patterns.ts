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

export const headingPattern = makePattern(['as', 'size', 'weight', 'fontWeight', 'class', 'children']);
export const emPattern = makePattern(['class', 'children']);
export const markPattern = makePattern(['variant', 'colour', 'class', 'children']);
export const highlightPattern = makePattern(['query', 'text', 'ignoreCase', 'matchAll', 'variant', 'colour', 'class']);

export const toastPattern = makePattern(['status', 'variant', 'colour', 'icon', 'title', 'description', 'action', 'closable', 'class', 'children']);

