import type { ZodSchema, ZodError } from "zod";

export interface UseFormOptions<T extends Record<string, unknown>> {
	schema?: ZodSchema<T>;
	defaultValues: T;
	onSubmit: (values: T) => void | Promise<void>;
	onInvalid?: (errors: ZodError<T>) => void;
	mode?: "onChange" | "onBlur" | "onSubmit";
}

export function useForm<T extends Record<string, unknown>>({ schema, defaultValues, onSubmit, onInvalid, mode = "onBlur" }: UseFormOptions<T>) {
	let values = $state<T>({ ...defaultValues });
	let errors = $state<Partial<Record<keyof T, string>>>({});
	let touched = $state<Partial<Record<keyof T, boolean>>>({});
	let dirty = $state<Partial<Record<keyof T, boolean>>>({});
	let isSubmitting = $state(false);

	const validate = (field?: keyof T) => {
		if (!schema) return true;
		const result = schema.safeParse(values);
		if (result.success) return field ? (delete errors[field], errors = errors, true) : (errors = {}, true);
		const issueMap = Object.fromEntries(result.error.issues.map((e) => [e.path[0], e.message])) as Partial<Record<keyof T, string>>;
		if (field) { issueMap[field] ? (errors = { ...errors, [field]: issueMap[field] }) : (delete errors[field], errors = errors); return !issueMap[field]; }
		errors = issueMap; onInvalid?.(result.error); return false;
	};

	return {
		get values() { return values; }, get errors() { return errors; }, get touched() { return touched; }, get dirty() { return dirty; },
		get isSubmitting() { return isSubmitting; }, get isValid() { return !Object.keys(errors).length; }, get isDirty() { return Object.values(dirty).some(Boolean); },
		getValue: (n: string) => values[n as keyof T],
		setValue: (n: string, v: unknown) => { const k = n as keyof T; values = { ...values, [k]: v }; dirty = { ...dirty, [k]: v !== defaultValues[k] }; mode === "onChange" && validate(k); },
		getError: (n: string) => errors[n as keyof T],
		setTouched: (n: string) => { const k = n as keyof T; touched = { ...touched, [k]: true }; mode === "onBlur" && validate(k); },
		validate: () => validate(),
		reset: () => { values = { ...defaultValues }; errors = {}; touched = {}; dirty = {}; isSubmitting = false; },
		handleSubmit: async (e: SubmitEvent) => {
			e.preventDefault();
			touched = Object.fromEntries(Object.keys(defaultValues).map((k) => [k, true])) as Partial<Record<keyof T, boolean>>;
			if (!validate()) return;
			isSubmitting = true; try { await onSubmit(values); } finally { isSubmitting = false; }
		},
	};
}

export interface FormApi {
	values: Record<string, unknown>;
	errors: Record<string, string | undefined>;
	touched: Record<string, boolean | undefined>;
	dirty: Record<string, boolean | undefined>;
	isSubmitting: boolean;
	isValid: boolean;
	isDirty: boolean;
	getValue: (n: string) => unknown;
	setValue: (n: string, v: unknown) => void;
	getError: (n: string) => string | undefined;
	setTouched: (n: string) => void;
	validate: () => boolean;
	reset: () => void;
	handleSubmit: (e: SubmitEvent) => Promise<void>;
}
