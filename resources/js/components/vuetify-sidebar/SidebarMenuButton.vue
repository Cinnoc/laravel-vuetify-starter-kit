<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    isActive?: boolean;
    title?: string;
    subtitle?: string;
    size?: 'default' | 'sm' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
    size: 'default',
});

const minHeight = computed(() => {
    switch (props.size) {
        case 'sm':
            return 32;
        case 'lg':
            return 56;
        default:
            return 40;
    }
});
</script>

<template>
    <v-list-item
        :active="isActive"
        :min-height="minHeight"
        :title="title"
        :subtitle="subtitle"
        class="sidebar-menu-button"
        rounded
    >
        <template v-if="$slots.prepend" #prepend>
            <slot name="prepend" />
        </template>
        <template v-if="$slots.append" #append>
            <slot name="append" />
        </template>
        <slot />
    </v-list-item>
</template>
