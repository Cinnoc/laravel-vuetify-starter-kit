<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import { Monitor, Moon, Sun } from 'lucide-vue-next';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', Icon: Sun, label: 'Light' },
    { value: 'dark', Icon: Moon, label: 'Dark' },
    { value: 'system', Icon: Monitor, label: 'System' },
] as const;
</script>

<template>
    <div
        class="d-inline-flex ga-1 rounded-lg bg-surface-variant pa-1"
    >
        <button
            v-for="{ value, Icon, label } in tabs"
            :key="value"
            @click="updateAppearance(value)"
            :class="[
                'appearance-tab-btn d-flex align-center ga-2 rounded px-4 py-2 transition-all text-body-2',
                appearance === value
                    ? 'bg-surface elevation-1 text-high-emphasis font-weight-medium'
                    : 'text-medium-emphasis bg-transparent',
            ]"
        >
            <component :is="Icon" class="size-4" />
            <span>{{ label }}</span>
        </button>
    </div>
</template>

<style scoped>
.appearance-tab-btn {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
}

.appearance-tab-btn:hover:not(.bg-surface) {
    background-color: rgba(var(--v-theme-surface), 0.5);
}
</style>
