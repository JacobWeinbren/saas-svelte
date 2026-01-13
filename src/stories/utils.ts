import { availableColors } from "../../templates/utils/colours";

export const colors = availableColors;
export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const textSizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
] as const;
export const variants = [
    "solid",
    "outline",
    "subtle",
    "ghost",
    "surface",
    "plain",
    "glass",
    "enclosed",
] as const;
export const buttonVariants = [
    "solid",
    "outline",
    "subtle",
    "ghost",
    "surface",
    "plain",
    "glass",
] as const;
export const checkboxVariants = ["outline", "subtle", "solid"] as const;
export const inputVariants = ["outline", "subtle", "flushed"] as const;
export const alertStatuses = [
    "info",
    "success",
    "warning",
    "error",
    "neutral",
] as const;
export const orientations = ["vertical", "horizontal"] as const;
export const placements = ["top", "bottom", "left", "right", "center"] as const;

export const commonArgTypes = {
    variant: {
        control: "select",
        options: variants,
        description: "The visual style of the component.",
        table: { defaultValue: { summary: "solid" } },
    },
    size: {
        control: "select",
        options: sizes,
        description: "The size of the component.",
        table: { defaultValue: { summary: "md" } },
    },
    color: {
        control: "select",
        options: colors,
        description: "The color theme of the component.",
        table: { defaultValue: { summary: "gray" } },
    },
    disabled: {
        control: "boolean",
        description: "Whether the component is disabled.",
        table: { defaultValue: { summary: "false" } },
    },
    invalid: {
        control: "boolean",
        description: "Whether the component is in an invalid state.",
        table: { defaultValue: { summary: "false" } },
    },
    children: {
        control: false,
        description: "The content to be rendered inside the component.",
        table: { type: { summary: "Snippet" } },
    },
    class: {
        control: "text",
        description: "Additional CSS classes to apply.",
    },
    icon: {
        control: "boolean",
        description: "The icon to display.",
    },
} as const;

// Re-export from hide-inherited-props
import { generateExcludePattern as genExcludePattern } from "./hide-inherited-props";
export { generateExcludePattern } from "./hide-inherited-props";

// Re-export all patterns from exclude-patterns
export {
    accordionRootPattern,
    accordionItemPattern,
    accordionItemTriggerPattern,
    accordionItemContentPattern,
    alertPattern,
    buttonPattern,
    checkboxPattern,
    checkboxGroupPattern,
    dialogRootPattern,
    iconPattern,
    inputPattern,
    inputGroupPattern,
    inputElementPattern,
    stackPattern,
    textPattern,
    tooltipPattern,
    fieldPattern,
    kbdPattern,
    codePattern,
    visuallyHiddenPattern,
    badgePattern,
    avatarPattern,
    avatarGroupPattern,
} from "./exclude-patterns";

export const getControls = (allowedProps: string[]) => {
    return {
        exclude: genExcludePattern(allowedProps),
    };
};
