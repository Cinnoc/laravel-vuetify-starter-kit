<script setup lang="ts">
import { SidebarInset } from '@/components/vuetify-sidebar';
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
    <SidebarInset v-if="props.variant === 'sidebar'" :class="className">
        <slot />
    </SidebarInset>
    <VMain
        v-else
        :class="className"
    >
        <div class="d-flex flex-column ga-4 mx-auto rounded-xl" style="height: 100%; width: 100%; max-width: 1280px; flex: 1">
            <slot />
        </div>
    </VMain>
</template>
