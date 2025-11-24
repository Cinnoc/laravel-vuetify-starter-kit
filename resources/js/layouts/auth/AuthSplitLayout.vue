<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const name = page.props.name;
const quote = page.props.quote;

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <v-app>
        <v-main>
            <v-row
                no-gutters
                class="position-relative align-center justify-center px-8 px-sm-0 px-lg-0"
                style="height: 100dvh"
            >
                <v-col
                    cols="12"
                    lg="6"
                    class="position-relative d-none d-lg-flex flex-column bg-surface-variant pa-10 text-white h-100"
                    style="border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity))"
                >
                    <div
                        class="position-absolute"
                        style="inset: 0; background-color: rgb(24, 24, 27)"
                    />
                    <Link
                        :href="home()"
                        class="position-relative d-flex align-center text-h6 text-decoration-none font-weight-medium text-white"
                        style="z-index: 20"
                    >
                        <AppLogoIcon class="mr-2 text-white" style="width: 32px; height: 32px" />
                        {{ name }}
                    </Link>
                    <div v-if="quote" class="position-relative mt-auto" style="z-index: 20">
                        <blockquote class="d-flex flex-column ga-2">
                            <p class="text-h6">&ldquo;{{ quote.message }}&rdquo;</p>
                            <footer class="text-body-2" style="color: rgb(212, 212, 212)">
                                {{ quote.author }}
                            </footer>
                        </blockquote>
                    </div>
                </v-col>
                <v-col cols="12" lg="6" class="pa-lg-8">
                    <div
                        class="mx-auto d-flex flex-column justify-center ga-6"
                        style="width: 100%; max-width: 350px"
                    >
                        <div class="d-flex flex-column ga-2 text-center">
                            <h1 class="text-h5 font-weight-medium" v-if="title" style="letter-spacing: -0.025em">
                                {{ title }}
                            </h1>
                            <p class="text-body-2 text-medium-emphasis" v-if="description">
                                {{ description }}
                            </p>
                        </div>
                        <slot />
                    </div>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>
