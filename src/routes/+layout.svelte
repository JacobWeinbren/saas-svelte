<script lang="ts">
    import "../app.css";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { Sun, Moon } from "@lucide/svelte";

    let { children } = $props();
</script>

<ModeWatcher />

<button
    onclick={toggleMode}
    class="fixed z-50 p-2 bg-gray-200 rounded-full shadow-md top-4 right-4 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
    aria-label="Toggle theme"
>
    <Sun class="w-6 h-6 dark:hidden" />
    <Moon class="hidden w-6 h-6 dark:block" />
</button>

<div
    class="min-h-screen text-gray-900 bg-white dark:bg-gray-950 dark:text-gray-100"
>
    {@render children()}
</div>
