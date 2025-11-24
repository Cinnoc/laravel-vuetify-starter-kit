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
                class="d-flex flex-column align-center justify-center ga-6 bg-surface-variant pa-6 pa-md-10"
                style="min-height: 100svh"
            >
                <div class="d-flex flex-column ga-6" style="width: 100%; max-width: 448px">
                    <Link
                        :href="home()"
                        class="d-flex align-center ga-2 align-self-center text-decoration-none font-weight-medium"
                    >
                        <div class="d-flex align-center justify-center" style="height: 36px; width: 36px">
                            <AppLogoIcon
                                style="width: 36px; height: 36px"
                            />
                        </div>
                    </Link>

                    <div class="d-flex flex-column ga-6">
                        <v-card
                            variant="outlined"
                            rounded
                            elevation="0"
                            class="pa-0"
                        >
                            <div class="px-10 pt-8 pb-0 text-center">
                                <h2 class="text-h6 mb-2">{{ title }}</h2>
                                <p class="text-body-2 text-medium-emphasis">
                                    {{ description }}
                                </p>
                            </div>
                            <div class="px-10 py-8">
                                <slot />
                            </div>
                        </v-card>
                    </div>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
