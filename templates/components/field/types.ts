import type { Writable } from "svelte/store";

export interface FieldContextValue {
	id: string;
	disabled: boolean;
	invalid: boolean;
	required: boolean;
	readOnly: boolean;
}

export type FieldContext = Writable<FieldContextValue>;
