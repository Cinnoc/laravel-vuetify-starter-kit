<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit } from '@/routes/appearance';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: edit().url,
    },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Appearance settings" />

        <SettingsLayout>
            <div class="d-flex flex-column ga-4">
                <div>
                    <h2 class="text-h6 font-weight-bold text-high-emphasis mb-1">Appearance settings</h2>
                    <p class="text-body-2 text-medium-emphasis">Update your account's appearance settings</p>
                </div>
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
