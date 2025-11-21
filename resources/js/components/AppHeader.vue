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
import {
    VAppBar,
    VAvatar,
    VBtn,
    VDivider,
    VList,
    VListItem,
    VListItemTitle,
    VMenu,
    VNavigationDrawer,
    VSheet,
    VSpacer,
    VTooltip,
} from 'vuetify/components';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-vue-next';
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
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: BookOpen,
    },
];

function handleNavigate() {
    isMobileNavOpen.value = false;
}

const avatarSrc = computed(() => auth.value.user?.avatar ?? '');
</script>

<template>
    <div>
        <VNavigationDrawer
            v-model="isMobileNavOpen"
            temporary
            width="300"
            scrim
            class="d-lg-none"
        >
            <VSheet class="px-4 py-3 d-flex align-center ga-2">
                <AppLogoIcon style="width: 30px; height: 30px;" />
                <span class="text-body-2 font-weight-medium text-high-emphasis">Navigation</span>
            </VSheet>
            <VDivider />
            <VList nav density="comfortable">
                <VListItem
                    v-for="item in mainNavItems"
                    :key="item.title"
                    @click="handleNavigate"
                >
                    <VListItemTitle>
                        <Link
                            :href="item.href"
                            class="d-flex align-center ga-3 text-body-1 w-100 py-2 text-decoration-none text-medium-emphasis"
                            :class="{
                                'text-high-emphasis font-weight-medium':
                                    isCurrentRoute(item.href),
                            }"
                        >
                            <component
                                v-if="item.icon"
                                :is="item.icon"
                                style="width: 20px; height: 20px;"
                            />
                            {{ item.title }}
                        </Link>
                    </VListItemTitle>
                </VListItem>
            </VList>
            <VDivider class="my-2" />
            <VList density="comfortable">
                <VListItem
                    v-for="item in rightNavItems"
                    :key="item.title"
                >
                    <a
                        :href="toUrl(item.href)"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="d-flex align-center ga-3 text-body-2 text-decoration-none text-medium-emphasis"
                    >
                        <component :is="item.icon" style="width: 20px; height: 20px;" />
                        {{ item.title }}
                    </a>
                </VListItem>
            </VList>
        </VNavigationDrawer>

        <VAppBar flat height="64" class="border-b border-opacity-20 px-4">
            <VBtn
                icon
                variant="text"
                size="small"
                class="d-lg-none me-2"
                @click="isMobileNavOpen = true"
            >
                <Menu style="width: 20px; height: 20px;" />
            </VBtn>

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
                    <component
                        v-if="item.icon"
                        :is="item.icon"
                        style="width: 16px; height: 16px;"
                    />
                    {{ item.title }}
                </Link>
            </div>

            <VSpacer />

            <div class="d-flex align-center ga-1">
                <VBtn icon variant="text" size="small">
                    <Search style="width: 16px; height: 16px;" />
                </VBtn>


                <div class="d-none d-lg-flex align-center ga-1">
                    <VTooltip
                        v-for="item in rightNavItems"
                        :key="item.title"
                        :text="item.title"
                        location="bottom"
                    >
                        <template #activator="{ props: tooltipProps }">
                            <VBtn
                                v-bind="tooltipProps"
                                icon
                                variant="text"
                                size="small"
                                :href="toUrl(item.href)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <component :is="item.icon" style="width: 16px; height: 16px;" />
                            </VBtn>
                        </template>
                    </VTooltip>
                </div>


                <VMenu
                    v-model="isUserMenuOpen"
                    location="bottom end"
                    offset-y
                    min-width="260"
                >
                    <template #activator="{ props: menuActivator }">
                        <VBtn
                            v-bind="menuActivator"
                            icon
                            variant="text"
                            size="small"
                            class="border border-opacity-100 rounded-circle"
                        >
                            <VAvatar size="32">
                                <img
                                    v-if="avatarSrc"
                                    :src="avatarSrc"
                                    :alt="auth.user.name"
                                />
                                <span v-else class="text-caption font-weight-medium">
                                    {{ getInitials(auth.user?.name) }}
                                </span>
                            </VAvatar>
                        </VBtn>
                    </template>
                    <VSheet class="py-2 px-2 rounded" elevation="5">
                        <UserMenuContent :user="auth.user" />
                    </VSheet>
                </VMenu>
            </div>
        </VAppBar>

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
                                    