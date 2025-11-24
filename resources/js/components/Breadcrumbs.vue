<script setup lang="ts">
import type { BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        breadcrumbs: BreadcrumbItemType[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const breadcrumbItems = computed(() =>
    props.breadcrumbs.map((item, index) => ({
        title: item.title,
        value: item.href ?? item.title ?? index,
        href: item.href,
        disabled: index === props.breadcrumbs.length - 1 || !item.href,
    })),
);

const lastIndex = computed(() => props.breadcrumbs.length - 1);
</script>

<template>
    <v-breadcrumbs
        v-if="breadcrumbItems.length"
        :items="breadcrumbItems"
        divider="›"
        density="compact"
        class="text-sm text-medium-emphasis"
    >
        <template #item="{ item, index }">
            <Link
                v-if="item.href && index !== lastIndex"
                :href="item.href"
                class="text-primary text-decoration-none"
            >
                {{ item.title }}
            </Link>
            <span v-else class="text-high-emphasis">
                {{ item.title }}
            </span>
        </template>
    </v-breadcrumbs>
</template>
