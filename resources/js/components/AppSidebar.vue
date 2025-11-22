<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/vuetify-sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { mdiViewDashboard, mdiFolder, mdiBookOpenPageVariant } from '@mdi/js';
import AppLogo from './AppLogo.vue';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: mdiViewDashboard,
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
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <div class="d-flex flex-column h-100">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link :href="dashboard()" class="text-decoration-none">
                            <SidebarMenuButton size="lg" title="Laravel Starter Kit">
                                <template #prepend>
                                    <AppLogo />
                                </template>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain :items="mainNavItems" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter :items="footerNavItems" />
                <NavUser />
            </SidebarFooter>
        </div>
    </Sidebar>
</template>
