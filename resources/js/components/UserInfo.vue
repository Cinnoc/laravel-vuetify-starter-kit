<script setup lang="ts">
import { useInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { computed } from 'vue';

interface Props {
    user: User;
    showEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showEmail: false,
});

const { getInitials } = useInitials();

const initials = computed(() => getInitials(props.user.name));
const hasAvatar = computed(
    () => props.user.avatar && props.user.avatar.trim().length > 0,
);
</script>

<template>
    <div class="d-flex align-center ga-3 w-100">
        <v-avatar
            rounded
            size="40"
            color="primary"
            class="text-on-primary font-weight-bold text-button"
        >
            <img
                v-if="hasAvatar"
                :src="user.avatar!"
                :alt="user.name"
                class="w-100 h-100"
            />
            <span v-else>{{ initials }}</span>
        </v-avatar>

        <div class="d-flex flex-column flex-grow-1 text-start">
            <span class="text-body-2 font-weight-medium text-truncate">{{
                user.name
            }}</span>
            <span
                v-if="showEmail"
                class="text-caption text-medium-emphasis text-truncate"
            >
                {{ user.email }}
            </span>
        </div>
    </div>
</template>
