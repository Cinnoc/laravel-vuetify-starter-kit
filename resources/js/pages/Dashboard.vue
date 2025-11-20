<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="d-flex flex-column ga-4 my-4">
            <v-row>
                <v-col cols="12" md="4" v-for="i in 3" :key="i">
                    <div
                        class="position-relative overflow-hidden rounded elevation-1 border"
                        
                    >
                        <PlaceholderPattern />
                    </div>
                </v-col>
            </v-row>
            <div class="position-relative rounded elevation-1 border" style="min-height: 400px">
                <PlaceholderPattern />
            </div>
        </div>
    </AppLayout>
</template>
