<script setup lang="ts">
import { VTooltip } from 'vuetify/components';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        text?: string;
        location?:
            | 'top'
            | 'bottom'
            | 'start'
            | 'end'
            | 'left'
            | 'right'
            | 'top start'
            | 'top end'
            | 'bottom start'
            | 'bottom end';
        openDelay?: number;
        closeDelay?: number;
        disabled?: boolean;
    }>(),
    {
        location: 'top',
        openDelay: 0,
        closeDelay: 0,
        disabled: false,
    },
);
</script>

<template>
    <VTooltip
        v-bind="$attrs"
        :text="props.text"
        :location="props.location"
        :open-delay="props.openDelay"
        :close-delay="props.closeDelay"
        :disabled="props.disabled"
    >
        <template #activator="{ props: activatorProps }">
            <slot name="activator" :props="activatorProps" />
        </template>

        <slot>
            <span v-if="props.text" class="text-body-2">
                {{ props.text }}
            </span>
        </slot>
    </VTooltip>
</template>
