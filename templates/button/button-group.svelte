<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { twMerge } from "tailwind-merge"; 

    let { 
        class: className,
        children, 
        ...rest 
    }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div 
    role="group" 
    class={twMerge("relative inline-flex justify-start items-center *:not-first:rounded-l-none *:not-last:rounded-r-none", className as string)}
    {...rest}
>
    {@render children?.()}
</div>