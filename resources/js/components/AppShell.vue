<script setup lang="ts">
import { SidebarProvider } from '@/components/vuetify-sidebar';
import { usePage } from '@inertiajs/vue3';

interface Props {
    variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const isOpen = usePage().props.sidebarOpen;
</script>

<template>
    <v-app>
        <v-main v-if="variant === 'header'">
            <slot />
        </v-main>
        <SidebarProvider v-else :default-open="isOpen">
            <slot />
        </SidebarProvider>
    </v-app>
</template>
