<script setup lang="ts">
import { LinkComponentBaseProps, Method } from '@inertiajs/core';
import { Link } from '@inertiajs/vue3';

interface Props {
    href: LinkComponentBaseProps['href'];
    tabindex?: number;
    method?: Method;
    as?: string;
}

defineProps<Props>();
</script>

<template>
    <Link
        :href="href"
        :tabindex="tabindex"
        :method="method"
        :as="as"
        class="text-foreground text-decoration-underline"
        style="text-underline-offset: 4px; text-decoration-color: rgb(212, 212, 212); transition: all 0.3s ease-out;"
    >
        <slot />
    </Link>
</template>
