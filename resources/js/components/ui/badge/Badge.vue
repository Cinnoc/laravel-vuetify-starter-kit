<script setup lang="ts">
import { computed } from 'vue';
import { VChip } from 'vuetify/components';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

const props = withDefaults(
    defineProps<{
        variant?: BadgeVariant;
    }>(),
    {
        variant: 'default',
    },
);

const variantProps = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return { color: 'secondary', variant: 'tonal' as const };
        case 'outline':
            return { color: 'primary', variant: 'outlined' as const };
        case 'destructive':
            return { color: 'error', variant: 'flat' as const };
        default:
            return { color: 'primary', variant: 'flat' as const };
    }
});
</script>

<template>
    <VChip
        v-bind="$attrs"
        :color="variantProps.color"
        :variant="variantProps.variant"
        density="comfortable"
        size="small"
        class="text-caption font-semibold text-uppercase"
    >
        <slot />
    </VChip>
</template>
