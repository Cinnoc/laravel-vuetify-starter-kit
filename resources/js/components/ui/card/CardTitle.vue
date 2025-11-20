<script setup lang="ts">
import { VCardTitle } from 'vuetify/components';
</script>

<template>
    <VCardTitle v-bind="$attrs" class="text-h6 font-semibold">
        <slot />
    </VCardTitle>
</template>
