<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { VCheckbox } from 'vuetify/components';
import { useAttrs } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<{
    modelValue?: boolean | null;
    label?: string;
    disabled?: boolean;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean | null): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.modelValue ?? false,
});

const attrs = useAttrs();
</script>

<template>
    <VCheckbox
        v-bind="attrs"
        v-model="modelValue"
        :label="props.label"
        color="primary"
        density="compact"
        hide-details
    >
        <template #label>
            <slot name="label">
                {{ props.label }}
            </slot>
        </template>
        <slot />
    </VCheckbox>
</template>
