<script setup lang="ts">
import { computed } from 'vue';
import { VAlert } from 'vuetify/components';

type AlertVariant = 'default' | 'destructive';

const props = withDefaults(
    defineProps<{
        variant?: AlertVariant;
    }>(),
    {
        variant: 'default',
    },
);

const alertProps = computed(() => {
    if (props.variant === 'destructive') {
        return { type: 'error', color: 'error', variant: 'tonal' as const };
    }

    return { type: 'info', color: 'primary', variant: 'tonal' as const };
});
</script>

<template>
    <VAlert
        v-bind="$attrs"
        :type="alertProps.type"
        :color="alertProps.color"
        :variant="alertProps.variant"
        border="start"
        density="comfortable"
        class="text-body-2"
        role="alert"
    >
        <slot />
    </VAlert>
</template>
