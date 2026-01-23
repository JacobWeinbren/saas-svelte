<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const presenceBadge = tv({
		base: [
			"absolute",
			"bottom-0",
			"right-0",
			"translate-x-[12%]",
			"translate-y-[12%]",
			"rounded-full",
			"border-2",
			"border-bg-default",
			"flex",
			"items-center",
			"justify-center",
		],
		variants: {
			size: {
				"2xs": "w-1.5 h-1.5",
				xs: "w-2 h-2",
				sm: "w-2.5 h-2.5",
				md: "w-3 h-3",
				lg: "w-3.5 h-3.5",
				xl: "w-4 h-4",
				"2xl": "w-5 h-5",
			},
			presence: {
				online: "bg-green-solid",
				offline: "bg-gray-solid",
				busy: "bg-red-solid",
				dnd: "bg-red-solid",
				away: "bg-yellow-solid",
			},
		},
		defaultVariants: {
			size: "md",
			presence: "online",
		},
	});

	export type PresenceBadgeVariants = VariantProps<typeof presenceBadge>;
	export type PresenceStatus = NonNullable<PresenceBadgeVariants["presence"]>;
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import { PERSONA_CTX, type PersonaContext } from "./persona.svelte";

	interface Props {
		/**
		 * The presence status to display.
		 * @default "online"
		 */
		presence?: PresenceStatus;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
	}

	let { presence = "online", class: className }: Props = $props();

	const personaContext = getContext<PersonaContext>(PERSONA_CTX);
	const size = $derived(personaContext?.size ?? "md");

	const styles = $derived(presenceBadge({ size, presence, class: className }));
</script>

<span class={styles} aria-label={`Status: ${presence}`}></span>
