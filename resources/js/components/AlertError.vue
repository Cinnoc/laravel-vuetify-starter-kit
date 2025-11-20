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
            <AlertCircle class="size-5" />
        </template>
        <div class="text-body-1 font-medium mb-1">{{ title }}</div>
        <ul class="list-disc list-inside text-body-2">
            <li v-for="(error, index) in uniqueErrors" :key="index">
                {{ error }}
            </li>
        </ul>
    </VAlert>
</template>
