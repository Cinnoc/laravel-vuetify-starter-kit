<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <AuthLayout
        title="Forgot password"
        description="Enter your email to receive a password reset link"
    >
        <Head title="Forgot password" />

        <v-alert
            v-if="status"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mb-4 text-center"
        >
            {{ status }}
        </v-alert>

        <div class="d-flex flex-column ga-6">
            <Form v-bind="email.form()" v-slot="{ errors, processing }">
                <div class="d-flex flex-column ga-4">
                    <v-text-field
                        id="email"
                        name="email"
                        type="email"
                        label="Email address"
                        placeholder="email@example.com"
                        variant="outlined"
                        density="comfortable"
                        :error-messages="errors.email"
                        autocomplete="off"
                        autofocus
                    />

                    <v-btn
                        type="submit"
                        color="primary"
                        size="large"
                        block
                        :loading="processing"
                        :disabled="processing"
                        data-test="email-password-reset-link-button"
                    >
                        <v-icon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                        <span v-else>Email password reset link</span>
                    </v-btn>
                </div>
            </Form>

            <div class="text-center text-body-2 text-medium-emphasis">
                <span>Or, return to</span>
                <TextLink :href="login()">log in</TextLink>
            </div>
        </div>
    </AuthLayout>
</template>
