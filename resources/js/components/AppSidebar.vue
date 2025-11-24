<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { router, usePage } from '@inertiajs/vue3';
    import {
        mdiViewDashboard,
        mdiFolder,
        mdiBookOpenPageVariant,
        mdiUnfoldMoreHorizontal,
        mdiCog,
        mdiLogout,
    } from '@mdi/js';
    import AppLogo from './AppLogo.vue';
    import { type NavItem } from '@/types';
    import { useSidebar } from '@/composables/useSidebar';

    // Navigation Items Data
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: mdiViewDashboard,
        },
        {
            title: 'Playground',
            href: '#',
            icon: mdiFolder,
            items: [
                { title: 'History', href: '#', },
                { title: 'Starred', href: '#', },
            ],
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Github Repo',
            href: 'https://github.com/laravel/vue-starter-kit',
            icon: mdiFolder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#vue',
            icon: mdiBookOpenPageVariant,
        },
    ];

    // State
    const { rail, mobile, open, setMobile, toggleRail } = useSidebar();
    const page = usePage();
    const user = computed(() => page.props.auth.user);

    // Computed
    const isMobile = computed(() => mobile.value);

    // Methods
    const getHref = (href: any): string => {
        if (typeof href === 'string') return href;
        return href?.url || '#';
    };

    const isUrlActive = (url: any) => {
        const href = getHref(url);
        return page.url.startsWith(href);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleSettings = () => {
        router.visit('/settings');
    };
</script>

<template>
    <v-navigation-drawer v-model="open" :rail="rail && !isMobile" :permanent="!isMobile" :width="280" :rail-width="72"
        class="border-e" elevation="0" color="surface" @update:model-value="setMobile">
        <!-- Header -->
        <div class="d-flex align-center pa-4" style="min-height: 64px;">
            <div class="d-flex align-center ga-2 flex-grow-1 overflow-hidden">
                <AppLogo class="flex-shrink-0" />
                <div v-if="!rail || isMobile" class="text-h6 font-weight-bold text-truncate">
                    Laravel
                </div>
            </div>
        </div>

        <v-divider></v-divider>

        <!-- Main Navigation -->
        <v-list class="pa-2" density="compact" nav>
            <template v-for="(item, i) in mainNavItems" :key="i">
                <!-- Single Item (no dropdown) -->
                <v-list-item v-if="!item.items || item.items.length === 0" :href="getHref(item.href)"
                    :active="isUrlActive(item.href)" :variant="isUrlActive(item.href) ? 'tonal' : 'text'"
                    color="primary" rounded="md" class="mb-1" @click.prevent="$inertia.visit(getHref(item.href))">
                    <template #prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-if="!rail || isMobile" class="text-body-2 font-weight-medium">
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item>

                <!-- Dropdown Item -->
                <v-list-group v-else :value="item.title">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props" rounded="md" class="mb-1">
                            <template #prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>
                            <v-list-item-title v-if="!rail || isMobile" class="text-body-2 font-weight-medium">
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-list-item v-for="(subItem, j) in item.items" :key="j" :href="getHref(subItem.href)"
                        :active="isUrlActive(subItem.href)" :variant="isUrlActive(subItem.href) ? 'tonal' : 'text'"
                        color="primary" rounded="md" class="mb-1 ml-4">
                       
                        <v-list-item-title v-if="!rail || isMobile" class="text-body-2">
                            {{ subItem.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>

        <v-spacer></v-spacer>

        <!-- Footer Navigation & User Menu -->
        <template #append>
            <div class="pa-2">
                <!-- Footer Links -->
                <v-list density="compact" nav class="mb-2">
                    <v-list-item v-for="(item, i) in footerNavItems" :key="i" :href="getHref(item.href)" target="_blank"
                        rounded="md" class="mb-1">
                        <template #prepend>
                            <v-icon :icon="item.icon" size="20"></v-icon>
                        </template>
                        <v-list-item-title v-if="!rail || isMobile" class="text-body-2 font-weight-medium">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>

                <v-divider class="my-2"></v-divider>

                <!-- User Menu -->
                <v-menu :location="rail && !isMobile ? 'end' : 'bottom'" offset="8" min-width="224">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props" rounded="md" class="px-2" min-height="56">
                            <template #prepend>
                                <v-avatar size="40" color="primary" class="mr-2">
                                    <span class="text-button font-weight-bold text-white">
                                        {{ user.name.charAt(0).toUpperCase() }}
                                    </span>
                                </v-avatar>
                            </template>
                            <v-list-item-title v-if="!rail || isMobile" class="text-body-2 font-weight-medium">
                                {{ user.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="!rail || isMobile" class="text-caption text-medium-emphasis">
                                {{ user.email }}
                            </v-list-item-subtitle>
                            <template #append v-if="!rail || isMobile">
                                <v-icon :icon="mdiUnfoldMoreHorizontal" size="16" class="text-medium-emphasis"></v-icon>
                            </template>
                        </v-list-item>
                    </template>

                    <v-sheet class="pa-2 rounded" elevation="8">
                        <v-list density="compact" class="pa-0">
                            <!-- User Info -->
                            <v-list-item class="px-2 py-2 mb-1">
                                <v-list-item-title class="text-body-2 font-weight-medium">
                                    {{ user.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-caption text-medium-emphasis">
                                    {{ user.email }}
                                </v-list-item-subtitle>
                            </v-list-item>

                            <v-divider class="my-1"></v-divider>

                            <!-- Settings -->
                            <v-list-item link class="px-2" @click="handleSettings">
                                <template #prepend>
                                    <v-icon :icon="mdiCog" size="16" class="me-2 text-medium-emphasis"></v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">Settings</v-list-item-title>
                            </v-list-item>

                            <v-divider class="my-1"></v-divider>

                            <!-- Logout -->
                            <v-list-item link class="px-2" @click="handleLogout">
                                <template #prepend>
                                    <v-icon :icon="mdiLogout" size="16" class="me-2 text-medium-emphasis"></v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">Log out</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-menu>
            </div>
        </template>
    </v-navigation-drawer>
</template>
