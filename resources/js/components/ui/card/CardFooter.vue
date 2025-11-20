<script setup lang="ts">
import { VCardActions } from 'vuetify/components';
</script>

<template>
    <VCardActions v-bind="$attrs" class="px-6 pb-6 pt-0">
        <slot />
    </VCardActions>
</template>
