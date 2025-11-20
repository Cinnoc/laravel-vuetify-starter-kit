<script setup lang="ts">
import { VCardItem } from 'vuetify/components';
</script>

<template>
    <VCardItem v-bind="$attrs" class="py-4 px-6">
        <slot />
    </VCardItem>
</template>
