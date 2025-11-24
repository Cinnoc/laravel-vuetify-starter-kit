<script setup lang="ts">

import { VMain } from 'vuetify/components';
import { computed } from 'vue';

interface Props {
    variant?: 'header' | 'sidebar';
    class?: string;
}

const props = defineProps<Props>();
const className = computed(() => props.class);
</script>

<template>
    <VMain v-if="props.variant === 'sidebar'" class="flex-grow-1">
        <div class="pa-4" :class="className">
            <slot />
        </div>
    </VMain>
    <VMain v-else>
        <div class="pa-4">
            <div class="mx-auto" :class="className" style="max-width: 1280px">
                <slot />
            </div>
        </div>
    </VMain>
</template>
