<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { VTextField } from 'vuetify/components';
import { useAttrs } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        defaultValue?: string | number | null;
        modelValue?: string | number | null;
        variant?: 'outlined' | 'underlined' | 'filled' | 'plain';
        density?: 'default' | 'comfortable' | 'compact';
    }>(),
    {
        variant: 'outlined',
        density: 'comfortable',
    },
);

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number | null): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? '',
});

const attrs = useAttrs();
</script>

<template>
    <VTextField
        v-bind="attrs"
        v-model="modelValue"
        :variant="props.variant"
        :density="props.density"
        color="primary"
        hide-details="auto"
        class="text-body-2"
    />
</template>
