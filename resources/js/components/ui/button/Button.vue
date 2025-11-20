<script setup lang="ts">
import type { Method } from '@inertiajs/core';
import { router } from '@inertiajs/vue3';
import { computed, useAttrs } from 'vue';
import { VBtn } from 'vuetify/components';

import type { ButtonSize, ButtonVariant } from '.';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    external?: boolean;
    method?: Method;
    data?: Record<string, unknown> | FormData;
    replace?: boolean;
    preserveScroll?: boolean;
    preserveState?: boolean | string;
    only?: string[];
    headers?: Record<string, string>;
    queryStringArrayFormat?: 'brackets' | 'indices';
    loading?: boolean | string;
    ripple?: boolean | Record<string, unknown>;
    block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'default',
    method: 'get',
    external: false,
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

const attrs = useAttrs();

type VariantConfig = {
    color: string;
    variant: 'flat' | 'text' | 'outlined';
    class?: string;
    style?: Record<string, string>;
};

type SizeConfig = {
    size: 'default' | 'small' | 'large';
    height: number;
    class?: string;
};

const variantProps = computed<VariantConfig>(() => {
    switch (props.variant) {
        case 'destructive':
            return { color: 'error', variant: 'flat' };
        case 'outline':
            return { color: 'primary', variant: 'outlined' };
        case 'secondary':
            return { color: 'secondary', variant: 'flat' };
        case 'ghost':
            return {
                color: 'primary',
                variant: 'text',
                style: {
                    color: 'rgb(var(--v-theme-primary))',
                },
            };
        case 'link':
            return {
                color: 'primary',
                variant: 'text',
                style: {
                    textDecoration: 'underline',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '0.2em',
                },
            };
        default:
            return { color: 'primary', variant: 'flat' };
    }
});

const sizeProps = computed<SizeConfig>(() => {
    switch (props.size) {
        case 'sm':
            return { size: 'small', height: 36 };
        case 'lg':
            return { size: 'large', height: 48 };
        case 'icon':
            return {
                size: 'small',
                height: 40,
                class: 'v-btn--icon-only',
            };
        default:
            return { size: 'default', height: 40 };
    }
});

const shouldUseRouter = computed(() => {
    if (!props.href || props.external) {
        return false;
    }

    const target = attrs.target as string | undefined;
    return !(target && target === '_blank');
});

function handleClick(event: MouseEvent) {
    if (shouldUseRouter.value) {
        event.preventDefault();
        router.visit(props.href!, {
            method: props.method,
            data: props.data,
            replace: props.replace,
            preserveScroll: props.preserveScroll,
            preserveState: props.preserveState,
            only: props.only,
            headers: props.headers,
            queryStringArrayFormat: props.queryStringArrayFormat,
        });
    }

    emit('click', event);
}
</script>

<template>
    <VBtn
        v-bind="attrs"
        :variant="variantProps.variant"
        :color="variantProps.color"
        :class="[variantProps.class, sizeProps.class]"
        :style="variantProps.style"
        :size="sizeProps.size"
        :height="sizeProps.height"
        :width="props.size === 'icon' ? sizeProps.height : undefined"
        :rounded="props.size === 'icon' ? 'pill' : undefined"
        :icon="props.size === 'icon' || undefined"
        :href="props.href"
        :loading="props.loading"
        :ripple="props.ripple"
        :block="props.block"
        @click="handleClick"
    >
        <slot />
    </VBtn>
</template>
