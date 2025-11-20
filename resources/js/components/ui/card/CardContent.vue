<script setup lang="ts">
import { VCardText } from 'vuetify/components';
</script>

<template>
    <VCardText v-bind="$attrs" class="px-6 pb-6 pt-0">
        <slot />
    </VCardText>
</template>
