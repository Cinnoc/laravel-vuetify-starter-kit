<script setup lang="ts">
import { VAvatar } from 'vuetify/components';
</script>

<template>
    <VAvatar v-bind="$attrs">
        <slot />
    </VAvatar>
</template>
