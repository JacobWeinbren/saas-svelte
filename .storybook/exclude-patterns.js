/**
 * Prop whitelist patterns for Storybook components.
 * Use these with <ArgTypes exclude={pattern} /> in .mdx files
 */

// Helper function to generate exclude pattern
const makePattern = (props) => new RegExp(`^(?!(${props.join('|')})$).*$`);

// Component-specific prop patterns
export const accordionRootPattern = makePattern(['variant', 'size', 'orientation', 'collapsible', 'multiple', 'defaultValue', 'class', 'children']);
export const accordionItemPattern = makePattern(['value', 'disabled', 'class', 'children']);
export const accordionItemTriggerPattern = makePattern(['icon', 'class', 'children']);
export const accordionItemContentPattern = makePattern(['class', 'children']);

export const alertPattern = makePattern(['status', 'variant', 'color', 'title', 'icon', 'class', 'children']);

export const buttonPattern = makePattern(['variant', 'size', 'color', 'loading', 'loadingText', 'icon', 'disabled', 'class', 'children']);

export const checkboxPattern = makePattern(['checked', 'size', 'variant', 'color', 'label', 'description', 'disabled', 'invalid', 'icon', 'value', 'class', 'children']);
export const checkboxGroupPattern = makePattern(['orientation', 'class', 'children']);

export const dialogRootPattern = makePattern(['open', 'size', 'placement', 'scrollBehavior', 'motionPreset', 'role', 'class', 'children']);

export const iconPattern = makePattern(['as', 'size', 'strokeWidth', 'viewBox', 'color', 'class', 'children']);

export const inputPattern = makePattern(['variant', 'size', 'color', 'invalid', 'disabled', 'placeholder', 'class', 'children']);
export const inputGroupPattern = makePattern(['placement', 'class', 'children']);
export const inputElementPattern = makePattern(['placement', 'class', 'children']);

export const stackPattern = makePattern(['direction', 'align', 'justify', 'class', 'children']);

export const textPattern = makePattern(['as', 'size', 'weight', 'variant', 'truncate', 'lineClamp', 'class', 'children']);
