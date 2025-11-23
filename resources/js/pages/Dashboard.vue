<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import {
    mdiTrendingUp,
    mdiAccountMultiple,
    mdiShoppingOutline,
    mdiChartLine,
    mdiCheckCircle,
    mdiClockOutline,
    mdiAlertCircle,
} from '@mdi/js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data for sparklines
const revenueData = ref([200, 450, 350, 480, 420, 550, 480, 600, 590, 650, 700, 750]);
const usersData = ref([12, 18, 15, 22, 19, 25, 30, 28, 35, 40, 38, 45]);
const ordersData = ref([5, 8, 6, 12, 9, 15, 11, 18, 14, 20, 17, 22]);
const conversionData = ref([2.5, 2.8, 2.6, 3.1, 2.9, 3.4, 3.2, 3.6, 3.5, 3.8, 4.0, 4.2]);

// Stats configuration
const stats = ref([
    {
        title: 'Total Revenue',
        value: '$45,231',
        change: '+12.5%',
        trend: 'up',
        data: revenueData.value,
        icon: mdiTrendingUp,
        color: 'primary',
        sparklineType: 'trend' as const,
        gradient: ['#1976D2', '#42A5F5'],
    },
    {
        title: 'Active Users',
        value: '2,842',
        change: '+8.2%',
        trend: 'up',
        data: usersData.value,
        icon: mdiAccountMultiple,
        color: 'success',
        sparklineType: 'trend' as const,
        gradient: ['#388E3C', '#66BB6A'],
    },
    {
        title: 'Orders',
        value: '1,234',
        change: '+5.7%',
        trend: 'up',
        data: ordersData.value,
        icon: mdiShoppingOutline,
        color: 'warning',
        sparklineType: 'bar' as const,
        gradient: ['#F57C00', '#FFA726'],
    },
    {
        title: 'Conversion Rate',
        value: '4.2%',
        change: '+1.2%',
        trend: 'up',
        data: conversionData.value,
        icon: mdiChartLine,
        color: 'info',
        sparklineType: 'trend' as const,
        gradient: ['#0288D1', '#4FC3F7'],
    },
]);

// Progress data for projects
const projects = ref([
    { name: 'Website Redesign', progress: 75, color: 'primary' },
    { name: 'Mobile App', progress: 60, color: 'success' },
    { name: 'API Integration', progress: 90, color: 'info' },
    { name: 'Database Migration', progress: 45, color: 'warning' },
]);

// Performance metrics
const metrics = ref([
    { name: 'CPU Usage', value: 65, color: 'primary' },
    { name: 'Memory', value: 78, color: 'warning' },
    { name: 'Storage', value: 42, color: 'success' },
    { name: 'Network', value: 88, color: 'error' },
]);

// Timeline activities
const activities = ref([
    {
        icon: mdiCheckCircle,
        color: 'success',
        title: 'Order #1234 completed',
        time: '2 minutes ago',
        description: 'Successfully processed payment and sent confirmation email',
    },
    {
        icon: mdiAccountMultiple,
        color: 'primary',
        title: 'New user registered',
        time: '15 minutes ago',
        description: 'John Doe joined from the marketing campaign',
    },
    {
        icon: mdiAlertCircle,
        color: 'warning',
        title: 'Server CPU spike detected',
        time: '1 hour ago',
        description: 'CPU usage reached 85% - auto-scaling triggered',
    },
    {
        icon: mdiShoppingOutline,
        color: 'info',
        title: '23 new orders received',
        time: '2 hours ago',
        description: 'Bulk orders from enterprise client',
    },
    {
        icon: mdiClockOutline,
        color: 'secondary',
        title: 'Daily backup completed',
        time: '3 hours ago',
        description: 'All databases backed up successfully',
    },
]);
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="pa-6">
            <!-- Stats Cards with Sparklines -->
            <v-row class="mb-4">
                <v-col
                    v-for="(stat, index) in stats"
                    :key="index"
                    cols="12"
                    md="6"
                    lg="3"
                >
                    <v-card class="h-100">
                        <v-card-text>
                            <div class="d-flex justify-space-between align-start mb-2">
                                <div>
                                    <div class="text-caption text-medium-emphasis mb-1">
                                        {{ stat.title }}
                                    </div>
                                    <div class="text-h5 font-weight-bold">
                                        {{ stat.value }}
                                    </div>
                                    <div :class="`text-${stat.color} text-caption font-weight-medium`">
                                        {{ stat.change }}
                                    </div>
                                </div>
                                <v-avatar :color="stat.color" size="40" variant="tonal">
                                    <v-icon :icon="stat.icon" size="20"></v-icon>
                                </v-avatar>
                            </div>
                            <v-sparkline
                                :model-value="stat.data"
                                :gradient="stat.gradient"
                                :smooth="stat.sparklineType === 'trend' ? 16 : false"
                                :type="stat.sparklineType"
                                :line-width="2"
                                :padding="8"
                                auto-draw
                                :fill="stat.sparklineType === 'trend'"
                                stroke-linecap="round"
                                gradient-direction="top"
                            ></v-sparkline>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Progress Cards -->
            <v-row class="mb-4">
                <!-- Circular Progress -->
                <v-col cols="12" md="6">
                    <v-card class="h-100">
                        <v-card-title>Project Progress</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col
                                    v-for="(project, index) in projects"
                                    :key="index"
                                    cols="6"
                                    class="text-center"
                                >
                                    <v-progress-circular
                                        :model-value="project.progress"
                                        :size="100"
                                        :width="8"
                                        :color="project.color"
                                    >
                                        <span class="text-h6 font-weight-bold">
                                            {{ project.progress }}%
                                        </span>
                                    </v-progress-circular>
                                    <div class="text-body-2 mt-2 font-weight-medium">
                                        {{ project.name }}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Linear Progress -->
                <v-col cols="12" md="6">
                    <v-card class="h-100">
                        <v-card-title>Performance Metrics</v-card-title>
                        <v-card-text>
                            <div
                                v-for="(metric, index) in metrics"
                                :key="index"
                                class="mb-4"
                            >
                                <div class="d-flex justify-space-between align-center mb-2">
                                    <span class="text-body-2 font-weight-medium">
                                        {{ metric.name }}
                                    </span>
                                    <span class="text-body-2 text-medium-emphasis">
                                        {{ metric.value }}%
                                    </span>
                                </div>
                                <v-progress-linear
                                    :model-value="metric.value"
                                    :color="metric.color"
                                    height="8"
                                    rounded
                                ></v-progress-linear>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Timeline Card -->
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Recent Activity</v-card-title>
                        <v-card-text>
                            <v-timeline side="end" density="compact">
                                <v-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :dot-color="activity.color"
                                    size="small"
                                >
                                    <template #icon>
                                        <v-icon :icon="activity.icon" size="16"></v-icon>
                                    </template>
                                    <div class="mb-4">
                                        <div class="d-flex justify-space-between align-start mb-1">
                                            <div class="font-weight-medium">
                                                {{ activity.title }}
                                            </div>
                                            <span class="text-caption text-medium-emphasis">
                                                {{ activity.time }}
                                            </span>
                                        </div>
                                        <div class="text-body-2 text-medium-emphasis">
                                            {{ activity.description }}
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </AppLayout>
</template>
