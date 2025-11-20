<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';
import { VNavigationDrawer } from 'vuetify/components';
import { computed } from 'vue';

interface Props {
    collapsible?: 'icon' | 'offcanvas' | 'none';
    variant?: 'sidebar' | 'inset' | 'floating';
    side?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
    collapsible: 'icon',
    variant: 'sidebar',
    side: 'left',
});

const { rail, open, mobile, setMobile } = useSidebar();

const shouldRail = computed(() => {
    if (props.collapsible === 'none') return false;
    if (mobile.value) return false;
    return rail.value;
});

const width = computed(() => {
    if (props.variant === 'inset' || props.variant === 'floating') {
        return 280;
    }
    return 256;
});

const railWidth = computed(() => 72);

const drawerClass = computed(() => {
    const classes = [];
    if (props.variant === 'inset') {
        classes.push('ma-2', 'rounded');
    } else if (props.variant === 'floating') {
        classes.push('ma-2', 'rounded', 'elevation-2');
    }
    return classes.join(' ');
});
</script>

<template>
    <VNavigationDrawer
        v-model="open"
        :rail="shouldRail"
        :rail-width="railWidth"
        :width="width"
        :permanent="!mobile"
        :location="side"
        :class="drawerClass"
        expand-on-hover
        @update:model-value="setMobile"
    >
        <slot />
    </VNavigationDrawer>
</template>
