<script setup lang="ts">
import { SidebarTrigger } from '@/components/vuetify-sidebar';
import type { BreadcrumbItemType } from '@/types';

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);
</script>

<template>
    <header
        class="d-flex align-center ga-2 pa-6 pa-md-4"
        style="height: 64px; border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity))"
    >
        <div class="d-flex align-center ga-2">
            <SidebarTrigger />
            <h1 class="text-h6 font-weight-medium" v-if="breadcrumbs && breadcrumbs.length > 0">
                {{ breadcrumbs[breadcrumbs.length - 1].title }}
            </h1>
        </div>
    </header>
</template>
