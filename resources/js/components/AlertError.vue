<script setup lang="ts">
import { VAlert } from 'vuetify/components';
import { AlertCircle } from 'lucide-vue-next';
import { computed } from 'vue';

interface Props {
    errors: string[];
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Something went wrong.',
});

const uniqueErrors = computed(() => Array.from(new Set(props.errors)));
</script>

<template>
    <VAlert type="error" variant="tonal" border="start" prominent>
        <template #prepend>
            <AlertCircle style="width: 20px; height: 20px;" />
        </template>
        <div class="text-body-1 font-weight-medium mb-1">{{ title }}</div>
        <ul class="text-body-2" style="list-style-type: disc; list-style-position: inside;">
            <li v-for="(error, index) in uniqueErrors" :key="index">
                {{ error }}
            </li>
        </ul>
    </VAlert>
</template>
