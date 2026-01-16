import Checkbox from "./checkbox.svelte";
import CheckboxGroup from "./checkbox-group.svelte";

const CompoundCheckbox = Object.assign(Checkbox, {
	Group: CheckboxGroup,
});

export { CompoundCheckbox as Checkbox, CheckboxGroup };
export const CheckboxRoot = Checkbox;
