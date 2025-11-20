<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';
import { Link, router } from '@inertiajs/vue3';
import { LogOut, Settings } from 'lucide-vue-next';
import { VDivider, VList, VListItem } from 'vuetify/components';

interface Props {
    user: User;
}

const handleLogout = () => {
    router.flushAll();
};

defineProps<Props>();
</script>

<template>
    <VList density="compact" class="pa-0">
        <VListItem class="px-2 py-2">
            <UserInfo :user="user" :show-email="true" />
        </VListItem>

        <VDivider class="my-1" />

        <VListItem
            link
            class="px-2"
            @click="router.visit(edit())"
            prepend-icon="mdi-cog"
        >
            <template #prepend>
                <Settings :size="16" class="me-2 text-medium-emphasis" />
            </template>
            <span class="text-body-2">Settings</span>
        </VListItem>

        <VDivider class="my-1" />

        <VListItem
            link
            class="px-2"
            @click="() => { handleLogout(); router.visit(logout()); }"
            data-test="logout-button"
        >
            <template #prepend>
                <LogOut :size="16" class="me-2 text-medium-emphasis" />
            </template>
            <span class="text-body-2">Log out</span>
        </VListItem>
    </VList>
</template>
