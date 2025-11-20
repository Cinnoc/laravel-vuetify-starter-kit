<script setup lang="ts">
import { provideSidebar } from '@/composables/useSidebar';

interface Props {
    defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    defaultOpen: true,
});

provideSidebar(props.defaultOpen);
</script>

<template>
    <div class="d-flex" style="min-height: 100vh">
        <slot />
    </div>
</template>
