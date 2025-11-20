<script setup lang="ts">
import { VImg } from 'vuetify/components';

interface Props {
    src?: string;
    alt?: string;
}

defineProps<Props>();
</script>

<template>
    <VImg v-bind="$props" cover style="width: 100%; height: 100%">
        <slot />
    </VImg>
</template>
