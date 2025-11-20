<script setup lang="ts">
import { VCard } from 'vuetify/components';
</script>

<template>
    <VCard
        v-bind="$attrs"
        variant="outlined"
        rounded="xl"
        elevation="0"
        class="d-flex flex-column"
    >
        <slot />
    </VCard>
</template>
