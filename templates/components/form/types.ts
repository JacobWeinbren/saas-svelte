export type FieldType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "switch";

export interface FieldOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export const FORM_CTX = Symbol("FORM_CTX");
