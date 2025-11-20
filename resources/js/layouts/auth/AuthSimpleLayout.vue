<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <v-app>
        <v-main>
            <v-container
                fluid
                class="d-flex flex-column align-center justify-center pa-6 pa-md-10"
                style="min-height: 100svh"
            >
                <v-sheet max-width="448" width="100%" color="transparent">
                    <div class="d-flex flex-column ga-8">
                        <div class="d-flex flex-column align-center ga-4">
                            <Link
                                :href="home()"
                                class="d-flex flex-column align-center ga-2 text-decoration-none font-weight-medium"
                            >
                                <div
                                    class="d-flex align-center justify-center rounded mb-1"
                                    style="height: 36px; width: 36px"
                                >
                                    <AppLogoIcon
                                        style="width: 36px; height: 36px"
                                    />
                                </div>
                                <span class="sr-only">{{ title }}</span>
                            </Link>
                            <div class="d-flex flex-column ga-2 text-center">
                                <h1 class="text-h5 font-weight-medium">{{ title }}</h1>
                                <p class="text-body-2 text-center text-medium-emphasis">
                                    {{ description }}
                                </p>
                            </div>
                        </div>
                        <slot />
                    </div>
                </v-sheet>
            </v-container>
        </v-main>
    </v-app>
</template>
