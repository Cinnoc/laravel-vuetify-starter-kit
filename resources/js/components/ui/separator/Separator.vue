<script setup lang="ts">
import { VDivider } from 'vuetify/components';

const props = withDefaults(
    defineProps<{
        orientation?: 'horizontal' | 'vertical';
    }>(),
    {
        orientation: 'horizontal',
    },
);
</script>

<template>
    <VDivider
        v-bind="$attrs"
        :vertical="props.orientation === 'vertical'"
        :thickness="props.orientation === 'vertical' ? 1 : undefined"
    />
</template>
