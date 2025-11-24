<script setup lang="ts">
import { toUrl, urlIsActive } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
    },
    {
        title: 'Password',
        href: editPassword(),
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
</script>

<template>
    <div class="pa-0">
        <div class="mb-6">
            <h1 class="text-h4 font-weight-bold mb-2">Settings</h1>
            <p class="text-body-2 text-medium-emphasis">Manage your profile and account settings</p>
        </div>

        <div class="d-flex flex-column flex-lg-row ga-6">
            <aside style="width: 100%; max-width: 240px" class="flex-shrink-0">
                <nav class="d-flex flex-column ga-1">
                    <Link
                        v-for="item in sidebarNavItems"
                        :key="toUrl(item.href)"
                        :href="toUrl(item.href)"
                        class="d-flex align-center ga-2 px-3 py-2 rounded text-decoration-none text-body-2"
                        :class="[
                            urlIsActive(item.href, currentPath)
                                ? 'bg-surface-variant text-primary font-weight-medium'
                                : 'text-medium-emphasis hover:bg-surface-variant/50',
                        ]"
                        style="transition: all 0.2s;"
                    >
                        <component v-if="item.icon" :is="item.icon" style="width: 16px; height: 16px;" />
                        {{ item.title }}
                    </Link>
                </nav>
            </aside>

            <v-divider class="my-4 d-lg-none" />

            <div class="flex-grow-1" style="max-width: 600px">
                <div class="d-flex flex-column ga-8">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
