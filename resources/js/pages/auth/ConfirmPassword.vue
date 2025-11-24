<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';
</script>

<template>
    <AuthLayout
        title="Confirm your password"
        description="This is a secure area of the application. Please confirm your password before continuing."
    >
        <Head title="Confirm password" />

        <Form
            v-bind="store.form()"
            reset-on-success
            v-slot="{ errors, processing }"
        >
            <div class="d-flex flex-column ga-6">
                <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.password"
                    autocomplete="current-password"
                    autofocus
                    required
                />

                <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="processing"
                    :disabled="processing"
                    data-test="confirm-password-button"
                >
                    <v-icon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                    <span v-else>Confirm Password</span>
                </v-btn>
            </div>
        </Form>
    </AuthLayout>
</template>

