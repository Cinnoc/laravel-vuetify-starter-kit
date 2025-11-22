<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/vuetify-sidebar';
import { useSidebar } from '@/composables/useSidebar';
import { usePage } from '@inertiajs/vue3';
import { mdiUnfoldMoreHorizontal } from '@mdi/js';
import UserMenuContent from './UserMenuContent.vue';
import { VAvatar, VMenu, VSheet } from 'vuetify/components';
import { computed, ref } from 'vue';

const page = usePage();
const user = page.props.auth.user;
const { mobile, rail } = useSidebar();
const isMenuOpen = ref(false);

const menuLocation = computed(() => {
    if (mobile.value) {
        return 'bottom';
    }
    return rail.value ? 'end' : 'bottom';
});
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <VMenu
                v-model="isMenuOpen"
                :location="menuLocation"
                offset="8"
                min-width="224"
            >
                <template #activator="{ props: menuActivatorProps }">
                    <SidebarMenuButton
                        v-bind="menuActivatorProps"
                        size="lg"
                        :title="user.name"
                        :subtitle="user.email"
                    >
                        <template #prepend>
                            <v-avatar
                                rounded
                                size="40"
                                color="primary"
                                class="text-on-primary font-weight-bold text-button"
                            >
                                <img
                                    v-if="user.avatar && user.avatar.trim().length > 0"
                                    :src="user.avatar"
                                    :alt="user.name"
                                    class="w-100 h-100"
                                />
                                <span v-else>{{ user.name.charAt(0).toUpperCase() }}</span>
                            </v-avatar>
                        </template>
                        <template #append>
                            <v-icon :icon="mdiUnfoldMoreHorizontal" size="16"></v-icon>
                        </template>
                    </SidebarMenuButton>
                </template>

                <VSheet class="pa-2 rounded" elevation="8">
                    <UserMenuContent :user="user" />
                </VSheet>
            </VMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
