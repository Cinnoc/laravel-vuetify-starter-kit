<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';
import { VBtn } from 'vuetify/components';
import { Menu } from 'lucide-vue-next';

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
    <VBtn
        icon
        variant="text"
        size="small"
        @click="handleClick"
    >
        <Menu :size="20" />
    </VBtn>
</template>

