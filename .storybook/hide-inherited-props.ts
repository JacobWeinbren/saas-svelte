// Helper to hide inherited HTML props from Storybook ArgTypes
export const hideInheritedProps = () => {
	const propsToHide = [
		// HTML attributes
		'accesskey', 'autocapitalize', 'autofocus', 'contenteditable', 'contextmenu',
		'dir', 'draggable', 'elementtiming', 'enterkeyhint', 'hidden', 'id', 'lang',
		'part', 'placeholder', 'slot', 'spellcheck', 'style', 'tabindex', 'title',
		'translate', 'inert', 'popover', 'writingsuggestions', 'radiogroup', 'role',
		'about', 'datatype', 'inlist', 'prefix', 'property', 'resource', 'typeof',
		'vocab', 'autosave', 'color', 'itemprop', 'itemscope', 'itemtype', 'itemid',
		'itemref', 'results', 'security', 'unselectable', 'inputmode', 'is',
		'xmlns',
		// Bindings
		'bind:innerHTML', 'bind:textContent', 'bind:innerText', 'bind:focused',
		'bind:offsetWidth', 'bind:offsetHeight', 'bind:contentRect', 'bind:contentBoxSize',
		'bind:borderBoxSize', 'bind:devicePixelContentBoxSize', 'bind:clientWidth',
		'bind:clientHeight', 'bind:value', 'bind:checked', 'bind:group', 'bind:files',
		'bind:indeterminate',
	];

	// Add aria- attributes
	const ariaAttrs = Array.from({ length: 100 }, (_, i) => `aria-${i}`);

	// Add on: event handlers
	const eventHandlers = [
		'copy', 'cut', 'paste', 'compositionend', 'compositionstart', 'compositionupdate',
		'focus', 'focusin', 'focusout', 'blur', 'change', 'beforeinput', 'input', 'reset',
		'submit', 'invalid', 'formdata', 'load', 'error', 'beforetoggle', 'toggle',
		'contentvisibilityautostatechange', 'keydown', 'keypress', 'keyup', 'abort',
		'canplay', 'canplaythrough', 'cuechange', 'durationchange', 'emptied', 'encrypted',
		'ended', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing',
		'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate',
		'volumechange', 'waiting', 'auxclick', 'click', 'contextmenu', 'dblclick', 'drag',
		'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop',
		'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover',
		'mouseup', 'select', 'selectionchange', 'selectstart', 'touchcancel', 'touchend',
		'touchmove', 'touchstart', 'gotpointercapture', 'pointercancel', 'pointerdown',
		'pointerenter', 'pointerleave', 'pointermove', 'pointerout', 'pointerover',
		'pointerup', 'lostpointercapture', 'gamepadconnected', 'gamepaddisconnected',
		'scroll', 'scrollend', 'resize', 'wheel', 'animationstart', 'animationend',
		'animationiteration', 'transitionstart', 'transitionrun', 'transitionend',
		'transitioncancel', 'outrostart', 'outroend', 'introstart', 'introend',
		'message', 'messageerror', 'visibilitychange', 'beforematch', 'cancel', 'close',
		'fullscreenchange', 'fullscreenerror',
	];

	eventHandlers.forEach(event => {
		propsToHide.push(`on:${event}`);
		propsToHide.push(`on${event}`);
		propsToHide.push(`on${event}capture`);
	});

	const result: Record<string, { table: { disable: boolean } }> = {};
	propsToHide.forEach(prop => {
		result[prop] = { table: { disable: true } };
	});

	// Add dynamic aria- patterns
	const ariaProps = [
		'activedescendant', 'atomic', 'autocomplete', 'busy', 'checked', 'colcount',
		'colindex', 'colspan', 'controls', 'current', 'describedby', 'details',
		'disabled', 'dropeffect', 'errormessage', 'expanded', 'flowto', 'grabbed',
		'haspopup', 'hidden', 'invalid', 'keyshortcuts', 'label', 'labelledby',
		'level', 'live', 'modal', 'multiline', 'multiselectable', 'orientation',
		'owns', 'placeholder', 'posinset', 'pressed', 'readonly', 'relevant',
		'required', 'roledescription', 'rowcount', 'rowindex', 'rowspan', 'selected',
		'setsize', 'sort', 'valuemax', 'valuemin', 'valuenow', 'valuetext',
	];
	ariaProps.forEach(prop => {
		result[`aria-${prop}`] = { table: { disable: true } };
	});

	return result;
};
