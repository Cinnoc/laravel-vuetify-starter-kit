<script setup lang="ts">
interface Props {
    title: string;
    description?: string;
}

defineProps<Props>();
</script>

<template>
    <header>
        <h3 class="mb-1 text-body-1 font-weight-medium">{{ title }}</h3>
        <p v-if="description" class="text-body-2 text-muted-foreground">
            {{ description }}
        </p>
    </header>
</template>
