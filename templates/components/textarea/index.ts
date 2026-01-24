import Root from "./textarea.svelte";
import Autoresize from "./textarea-autoresize.svelte";

export { default as TextareaAutoresize } from "./textarea-autoresize.svelte";

export const Textarea = Object.assign(Root, {
	Root,
	Autoresize,
});
