<script setup lang="ts">

import { computed } from 'vue';

interface Props {
    variant?: 'header' | 'sidebar';
    class?: string;
}

const props = defineProps<Props>();
const className = computed(() => props.class);
</script>

<template>
    <v-main v-if="props.variant === 'sidebar'" class="flex-grow-1">
        <div class="pa-4" :class="className">
            <slot />
        </div>
    </v-main>
    <v-main v-else>
        <div class="pa-4">
            <div class="mx-auto" :class="className" style="max-width: 1280px">
                <slot />
            </div>
        </div>
    </v-main>
</template>
