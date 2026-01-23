import Checkbox from "./checkbox.svelte";
import CheckboxGroup from "./checkbox-group.svelte";

export {
	CHECKBOX_GROUP_CTX,
	type CheckboxGroupContext,
} from "./checkbox-group.svelte";

const CompoundCheckbox = Object.assign(Checkbox, {
	Group: CheckboxGroup,
});

export { CompoundCheckbox as Checkbox, CheckboxGroup };
