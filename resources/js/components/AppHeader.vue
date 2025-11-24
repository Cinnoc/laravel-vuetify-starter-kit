<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { getInitials } from '@/composables/useInitials';
import { toUrl, urlIsActive } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';
import { InertiaLinkProps, Link, usePage } from '@inertiajs/vue3';
import { mdiBookOpenPageVariant, mdiFolder, mdiViewDashboard, mdiMenu, mdiMagnify } from '@mdi/js';
import { computed, ref } from 'vue';

interface Props {
    breadcrumbs?: BreadcrumbItem[];
}

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const auth = computed(() => page.props.auth);
const isMobileNavOpen = ref(false);
const isUserMenuOpen = ref(false);

const isCurrentRoute = computed(
    () => (url: NonNullable<InertiaLinkProps['href']>) =>
        urlIsActive(url, page.url),
);

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: mdiViewDashboard,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: mdiFolder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: mdiBookOpenPageVariant,
    },
];

function handleNavigate() {
    isMobileNavOpen.value = false;
}

const avatarSrc = computed(() => auth.value.user?.avatar ?? '');
</script>

<template>
    <div>
        <v-navigation-drawer
            v-model="isMobileNavOpen"
            temporary
            width="300"
            scrim
            class="d-lg-none"
        >
            <v-sheet class="px-4 py-3 d-flex align-center ga-2">
                <AppLogoIcon style="width: 30px; height: 30px;" />
                <span class="text-body-2 font-weight-medium text-high-emphasis">Navigation</span>
            </v-sheet>
            <v-divider />
            <v-list nav density="comfortable">
                <v-list-item
                    v-for="item in mainNavItems"
                    :key="item.title"
                    @click="handleNavigate"
                >
                    <v-list-item-title>
                        <Link
                            :href="item.href"
                            class="d-flex align-center ga-3 text-body-1 w-100 py-2 text-decoration-none text-medium-emphasis"
                            :class="{
                                'text-high-emphasis font-weight-medium':
                                    isCurrentRoute(item.href),
                            }"
                        >
                            <v-icon
                                v-if="item.icon"
                                :icon="item.icon"
                                size="20"
                            ></v-icon>
                            {{ item.title }}
                        </Link>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider class="my-2" />
            <v-list density="comfortable">
                <v-list-item
                    v-for="item in rightNavItems"
                    :key="item.title"
                >
                    <a
                        :href="toUrl(item.href)"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="d-flex align-center ga-3 text-body-2 text-decoration-none text-medium-emphasis"
                    >
                        <v-icon :icon="item.icon" size="20"></v-icon>
                        {{ item.title }}
                    </a>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar flat height="64" class="border-b border-opacity-20 px-4">
            <v-btn
                icon
                variant="text"
                size="small"
                class="d-lg-none me-2"
                @click="isMobileNavOpen = true"
            >
                <v-icon :icon="mdiMenu" size="20"></v-icon>
            </v-btn>

            <Link :href="dashboard()" class="d-flex align-center ga-2 text-decoration-none">
                <AppLogo />
            </Link>
c
            <div class="d-none d-lg-flex align-center ms-8 ga-2">
                <Link
                    v-for="item in mainNavItems"
                    :key="item.title"
                    :href="item.href"
                    class="d-flex align-center ga-2 text-body-2 text-medium-emphasis px-3 py-2 rounded"
                    :class="[
                        isCurrentRoute(item.href)
                            ? 'text-primary font-weight-medium bg-surface-variant'
                            : 'hover:bg-surface-variant/50',
                    ]"
                    style="transition: all 0.2s;"
                >
                    <v-icon
                        v-if="item.icon"
                        :icon="item.icon"
                        size="16"
                    ></v-icon>
                    {{ item.title }}
                </Link>
            </div>

            <v-spacer />

            <div class="d-flex align-center ga-1">
                <v-btn icon variant="text" size="small">
                    <v-icon :icon="mdiMagnify" size="16"></v-icon>
                </v-btn>


                <div class="d-none d-lg-flex align-center ga-1">
                    <v-tooltip
                        v-for="item in rightNavItems"
                        :key="item.title"
                        :text="item.title"
                        location="bottom"
                    >
                        <template #activator="{ props: tooltipProps }">
                            <v-btn
                                v-bind="tooltipProps"
                                icon
                                variant="text"
                                size="small"
                                :href="toUrl(item.href)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <v-icon :icon="item.icon" size="16"></v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </div>


                <v-menu
                    v-model="isUserMenuOpen"
                    location="bottom end"
                    offset-y
                    min-width="260"
                >
                    <template #activator="{ props: menuActivator }">
                        <v-btn
                            v-bind="menuActivator"
                            icon
                            variant="text"
                            size="small"
                            class="border border-opacity-100 rounded-circle"
                        >
                            <v-avatar size="32">
                                <img
                                    v-if="avatarSrc"
                                    :src="avatarSrc"
                                    :alt="auth.user.name"
                                />
                                <span v-else class="text-caption font-weight-medium">
                                    {{ getInitials(auth.user?.name) }}
                                </span>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-sheet class="py-2 px-2 rounded" elevation="5">
                        <UserMenuContent :user="auth.user" />
                    </v-sheet>
                </v-menu>
            </div>
        </v-app-bar>

        <div
            v-if="props.breadcrumbs.length > 1"
            class="d-flex w-100 border-b border-sidebar-border/70"
        >
            <div
                class="mx-auto d-flex align-center justify-start px-4 w-100 text-neutral-500"
                :class="{ 'md:max-w-7xl': $vuetify.display.mdAndUp }"
                style="height: 48px; max-width: 100%;"
                :style="{ 'max-width': $vuetify.display.mdAndUp ? '1280px' : '100%' }"
            >
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>
                                    