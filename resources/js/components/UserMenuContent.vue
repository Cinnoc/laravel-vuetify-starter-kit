<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';
import { router } from '@inertiajs/vue3';
import { mdiLogout, mdiCog } from '@mdi/js';

interface Props {
    user: User;
}

const handleLogout = () => {
    router.flushAll();
};

defineProps<Props>();
</script>

<template>
    <v-list density="compact" class="pa-0">
        <v-list-item class="px-2 py-2">
            <UserInfo :user="user" :show-email="true" />
        </v-list-item>

        <v-divider class="my-1" />

        <v-list-item
            link
            class="px-2"
            @click="router.visit(edit())"
        >
            <template #prepend>
                <v-icon :icon="mdiCog" size="16" class="me-2 text-medium-emphasis"></v-icon>
            </template>
            <span class="text-body-2">Settings</span>
        </v-list-item>

        <v-divider class="my-1" />

        <v-list-item
            link
            class="px-2"
            @click="() => { handleLogout(); router.visit(logout()); }"
            data-test="logout-button"
        >
            <template #prepend>
                <v-icon :icon="mdiLogout" size="16" class="me-2 text-medium-emphasis"></v-icon>
            </template>
            <span class="text-body-2">Log out</span>
        </v-list-item>
    </v-list>
</template>
