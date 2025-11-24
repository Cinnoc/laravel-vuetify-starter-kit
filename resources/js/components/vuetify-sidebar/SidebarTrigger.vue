<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';
import { mdiMenu } from '@mdi/js';

const { toggleRail, toggleMobile, mobile } = useSidebar();

const handleClick = () => {
    if (mobile.value) {
        toggleMobile();
    } else {
        toggleRail();
    }
};
</script>

<template>
    <v-btn
        icon
        variant="text"
        size="small"
        @click="handleClick"
    >
        <v-icon :icon="mdiMenu" size="20"></v-icon>
    </v-btn>
</template>

