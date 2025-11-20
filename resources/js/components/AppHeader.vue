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
            <VSheet class="pa-4 d-flex align-center gap-3">
                <AppLogoIcon class="size-6" />
                <span class="text-subtitle-1 font-semibold">Navigation</span>
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
                            class="d-flex align-center gap-3 text-body-1 w-100 py-2"
                            :class="{
                                'text-high-emphasis font-medium':
                                    isCurrentRoute(item.href),
                            }"
                        >
                            <component
                                v-if="item.icon"
                                :is="item.icon"
                                class="size-4"
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
                        class="d-flex align-center gap-2 text-body-2"
                    >
                        <component :is="item.icon" class="size-4" />
                        {{ item.title }}
                    </a>
                </VListItem>
            </VList>
        </VNavigationDrawer>

        <VAppBar flat height="64" class="border-b border-opacity-20 px-4">
            <VBtn
                icon
                variant="text"
                class="d-lg-none me-2"
                @click="isMobileNavOpen = true"
            >
                <Menu />
            </VBtn>

            <Link :href="dashboard()" class="d-flex align-center gap-2">
                <AppLogo />
            </Link>

            <div class="d-none d-lg-flex align-center ms-8 gap-2">
                <Link
                    v-for="item in mainNavItems"
                    :key="item.title"
                    :href="item.href"
                    class="text-body-2 text-medium-emphasis px-3 py-2 rounded"
                    :class="[
                        isCurrentRoute(item.href)
                            ? 'text-high-emphasis font-medium bg-primary/10'
                            : '',
                    ]"
                >
                    <component
                        v-if="item.icon"
                        :is="item.icon"
                        class="me-2 size-4"
                    />
                    {{ item.title }}
                </Link>
            </div>

            <VSpacer />

            <div class="d-flex align-center gap-2">
                <VBtn icon variant="text">
                    <Search class="size-5" />
                </VBtn>

                <div class="d-none d-lg-flex align-center gap-1">
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
                                :href="toUrl(item.href)"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <component :is="item.icon" class="size-5" />
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
                            class="border rounded-circle"
                        >
                            <VAvatar size="36">
                                <img
                                    v-if="avatarSrc"
                                    :src="avatarSrc"
                                    :alt="auth.user.name"
                                />
                                <span v-else class="text-button">
                                    {{ getInitials(auth.user?.name) }}
                                </span>
                            </VAvatar>
                        </VBtn>
                    </template>
                    <VSheet class="py-2 px-2" elevation="0">
                        <UserMenuContent :user="auth.user" />
                    </VSheet>
                </VMenu>
            </div>
        </VAppBar>

        <div
            v-if="props.breadcrumbs.length > 1"
            class="flex w-full border-b border-sidebar-border/70"
        >
            <div
                class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl"
            >
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>
                                    :class="[
                                        navigationMenuTriggerStyle(),
                                        activeItemStyles(item.href),
                                        'h-9 cursor-pointer px-3',
                                    ]"
                                    :href="item.href"
                                >
                                    <component
                                        v-if="item.icon"
                                        :is="item.icon"
                                        class="mr-2 h-4 w-4"
                                    />
                                    {{ item.title }}
                                </Link>
                                <div
                                    v-if="isCurrentRoute(item.href)"
                                    class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"
                                ></div>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div class="ml-auto flex items-center space-x-2">
                    <div class="relative flex items-center space-x-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            class="group h-9 w-9 cursor-pointer"
                        >
                            <Search
                                class="size-5 opacity-80 group-hover:opacity-100"
                            />
                        </Button>

                        <div class="hidden space-x-1 lg:flex">
                            <template
                                v-for="item in rightNavItems"
                                :key="item.title"
                            >
                                <Tooltip>
                                    <template #activator="{ props: tooltipProps }">
                                        <Button
                                            v-bind="tooltipProps"
                                            variant="ghost"
                                            size="icon"
                                            class="group h-9 w-9 cursor-pointer"
                                            :href="toUrl(item.href)"
                                            external
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span class="sr-only">{{
                                                item.title
                                            }}</span>
                                            <component
                                                :is="item.icon"
                                                class="size-5 opacity-80 group-hover:opacity-100"
                                            />
                                        </Button>
                                    </template>
                                    <p>{{ item.title }}</p>
                                </Tooltip>
                            </template>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger :as-child="true">
                            <Button
                                variant="ghost"
                                size="icon"
                                class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                            >
                                <Avatar
                                    class="size-8 overflow-hidden rounded-full"
                                >
                                    <AvatarImage
                                        v-if="auth.user.avatar"
                                        :src="auth.user.avatar"
                                        :alt="auth.user.name"
                                    />
                                    <AvatarFallback
                                        class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                                    >
                                        {{ getInitials(auth.user?.name) }}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <UserMenuContent :user="auth.user" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

        <div
            v-if="props.breadcrumbs.length > 1"
            class="flex w-full border-b border-sidebar-border/70"
        >
            <div
                class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl"
            >
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>
