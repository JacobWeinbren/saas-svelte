import { availableColours } from "../../templates/utils/colours";

export const colours = availableColours;
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
export const badgeVariants = ["subtle", "solid", "outline", "surface"] as const;
export const badgeSizes = ["xs", "sm", "md", "lg"] as const;
export const alertVariants = ["subtle", "solid", "surface", "outline"] as const;
export const iconWeights = [
	"thin",
	"light",
	"regular",
	"bold",
	"fill",
	"duotone",
] as const;
export const textWeights = [
	"light",
	"normal",
	"medium",
	"semibold",
	"bold",
] as const;
export const alertStatuses = [
    "info",
    "success",
    "warning",
    "error",
    "neutral",
] as const;
export const orientations = ["vertical", "horizontal"] as const;
export const placements = ["top", "bottom", "left", "right", "center"] as const;

// Typography
export const codeVariants = ["solid", "outline", "subtle", "surface"] as const;
export const codeSizes = ["xs", "sm", "md", "lg"] as const;
export const headingWeights = ["normal", "medium", "semibold", "bold"] as const;
export const markVariants = ["subtle", "solid", "text", "plain"] as const;

// Components
export const accordionSizes = ["sm", "md", "lg"] as const;
export const avatarSizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const avatarShapes = ["square", "rounded", "full"] as const;
export const breadcrumbSizes = ["sm", "md", "lg"] as const;
export const breadcrumbVariants = ["plain", "underline"] as const;
export const cardVariants = ["subtle", "outline", "elevated"] as const;
export const cardSizes = ["sm", "md", "lg"] as const;
export const checkboxSizes = ["sm", "md", "lg"] as const;
export const checkboxCardVariants = ["subtle", "surface", "outline"] as const;
export const checkboxCardSizes = ["sm", "md", "lg"] as const;
export const comboboxSizes = ["xs", "sm", "md", "lg"] as const;
export const comboboxVariants = ["outline", "subtle", "flushed"] as const;
export const comboboxColours = ["gray", "red", "orange", "green", "blue", "purple"] as const;
export const dataListSizes = ["sm", "md", "lg"] as const;
export const emptyStateSizes = ["sm", "md", "lg"] as const;
export const emptyStateAlignOptions = ["centre", "start", "end"] as const;
export const kbdVariants = ["raised", "outline", "subtle", "plain"] as const;
export const menuSizes = ["sm", "md"] as const;
export const nativeSelectSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const nativeSelectVariants = ["outline", "subtle", "plain"] as const;
export const navbarVariants = ["default", "glass", "solid"] as const;
export const numberInputSizes = ["xs", "sm", "md", "lg"] as const;
export const paginationSizes = ["xs", "sm", "md", "lg"] as const;
export const paginationVariants = ["ghost", "outline", "solid"] as const;
export const passwordInputSizes = ["xs", "sm", "md", "lg"] as const;
export const personaSizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export const presenceOptions = ["online", "offline", "busy", "dnd", "away"] as const;
export const pinInputSizes = ["xs", "sm", "md", "lg"] as const;
export const popoverSizes = ["xs", "sm", "md", "lg"] as const;
export const spinnerSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const tagVariants = ["subtle", "solid", "outline", "surface"] as const;
export const tagSizes = ["sm", "md", "lg", "xl"] as const;
export const textareaSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export const textareaResizeOptions = ["none", "vertical", "horizontal", "both"] as const;
export const imageRoundedOptions = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const;
export const imageFitOptions = ["contain", "cover", "fill", "none", "scale-down"] as const;
export const floatPlacements = [
	"top-start",
	"top-center",
	"top-end",
	"bottom-start",
	"bottom-center",
	"bottom-end",
	"middle-start",
	"middle-center",
	"middle-end",
] as const;

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
    colour: {
        control: "select",
        options: colours,
        description: "The colour theme of the component.",
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
    drawerRootPattern,
    iconPattern,
    inputPattern,
    inputGroupPattern,
    inputElementPattern,
    stackPattern,
    textPattern,
    tooltipPattern,
    fieldPattern,
    fieldLabelPattern,
    fieldHelperTextPattern,
    fieldErrorTextPattern,
    kbdPattern,
    codePattern,
    visuallyHiddenPattern,
    badgePattern,
    avatarPattern,
    avatarGroupPattern,
    groupPattern,
    dataListRootPattern,
    dataListItemPattern,
    dataListItemLabelPattern,
    dataListItemValuePattern,
    blockquotePattern,
    floatPattern,
    circlePattern,
    boxPattern,
    headingPattern,
    emPattern,
    markPattern,
    highlightPattern,
    toastPattern,
    actionBarPattern,
    actionBarSelectionTriggerPattern,
    actionBarSeparatorPattern,
    actionBarCloseButtonPattern,
    breadcrumbRootPattern,
    breadcrumbItemPattern,
    breadcrumbLinkPattern,
    breadcrumbCurrentLinkPattern,
    breadcrumbEllipsisPattern,
    menuPattern,
    menuItemPattern,
    cardRootPattern,
    cardHeaderPattern,
    cardBodyPattern,
    cardFooterPattern,
    cardTitlePattern,
    cardDescriptionPattern,
    formPattern,
    formFieldPattern,
    submitButtonPattern,
    displayIfPattern,
    checkboxCardRootPattern,
    checkboxCardControlPattern,
    checkboxCardContentPattern,
    checkboxCardLabelPattern,
    checkboxCardDescriptionPattern,
    checkboxCardAddonPattern,
    checkboxCardIndicatorPattern,
    comboboxPattern,
    comboboxRootPattern,
    comboboxControlPattern,
    comboboxInputPattern,
    comboboxContentPattern,
    comboboxItemPattern,
    comboboxItemTextPattern,
    comboboxItemIndicatorPattern,
    popoverRootPattern,
    popoverTriggerPattern,
    popoverContentPattern,
    popoverArrowPattern,
    popoverHeaderPattern,
    popoverBodyPattern,
    popoverFooterPattern,
    popoverTitlePattern,
    popoverDescriptionPattern,
    popoverCloseTriggerPattern,
    navbarRootPattern,
    navbarContentPattern,
    navbarBrandPattern,
    navbarItemGroupPattern,
    navbarItemPattern,
    navbarLinkPattern,
    sidebarRootPattern,
    sidebarHeaderPattern,
    sidebarBodyPattern,
    sidebarFooterPattern,
    sidebarGroupPattern,
    sidebarGroupHeaderPattern,
    sidebarGroupTitlePattern,
    sidebarGroupContentPattern,
    sidebarNavItemPattern,
    sidebarNavButtonPattern,
    sidebarItemPattern,
    sidebarLinkPattern,
    sidebarTogglePattern,
    appShellPattern,
    editablePattern,
    editableAreaPattern,
    editablePreviewPattern,
    editableInputPattern,
    editableTextareaPattern,
    editableControlPattern,
    editableLabelPattern,
    editableTriggerPattern,
    listRootPattern,
    listItemPattern,
    listIndicatorPattern,
    emptyStatePattern,
    fileUploadRootPattern,
    fileUploadTriggerPattern,
    fileUploadDropzonePattern,
    fileUploadListPattern,
    fileUploadLabelPattern,
    fileUploadInputPattern,
    fileUploadClearTriggerPattern,
    gridListRootPattern,
    gridListHeaderPattern,
    gridListItemPattern,
    gridListCellPattern,
    tagPattern,
    hoverCardRootPattern,
    hoverCardTriggerPattern,
    hoverCardContentPattern,
    hoverCardArrowPattern,
    imagePattern,
    linkBoxPattern,
    linkOverlayPattern,
    numberInputPattern,
    paginationPattern,
    passwordInputPattern,
    personaRootPattern,
    personaAvatarPattern,
    personaPresenceBadgePattern,
    personaDetailsPattern,
    personaLabelPattern,
    personaSecondaryLabelPattern,
    personaTertiaryLabelPattern,
    pinInputPattern,
    progressCirclePattern,
    formatBytePattern,
    formatNumberPattern,
    localeProviderPattern,
} from "./exclude-patterns";



export const getControls = (allowedProps: string[]) => {
    return {
        exclude: genExcludePattern(allowedProps),
    };
};
