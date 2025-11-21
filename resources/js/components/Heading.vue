<script setup lang="ts">
interface Props {
    title: string;
    description?: string;
}

defineProps<Props>();
</script>

<template>
    <div class="mb-8 d-flex flex-column" style="gap: 2px;">
        <h2 class="text-h5 font-weight-semibold" style="letter-spacing: -0.025em;">{{ title }}</h2>
        <p v-if="description" class="text-body-2 text-muted-foreground">
            {{ description }}
        </p>
    </div>
</template>
