<script setup lang="ts">
import { SidebarProvider } from '@/components/vuetify-sidebar';
import { usePage } from '@inertiajs/vue3';
import { VApp, VMain } from 'vuetify/components';

interface Props {
    variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const isOpen = usePage().props.sidebarOpen;
</script>

<template>
    <VApp>
        <VMain v-if="variant === 'header'">
            <slot />
        </VMain>
        <SidebarProvider v-else :default-open="isOpen">
            <slot />
        </SidebarProvider>
    </VApp>
</template>
