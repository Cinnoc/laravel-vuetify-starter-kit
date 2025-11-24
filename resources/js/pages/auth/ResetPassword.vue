<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';
import { ref } from 'vue';

const props = defineProps<{
    token: string;
    email: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <AuthLayout
        title="Reset password"
        description="Please enter your new password below"
    >
        <Head title="Reset password" />

        <Form
            v-bind="update.form()"
            :transform="(data) => ({ ...data, token, email })"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
        >
            <div class="d-flex flex-column ga-6">
                <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    v-model="inputEmail"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.email"
                    autocomplete="email"
                    readonly
                />

                <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.password"
                    autocomplete="new-password"
                    autofocus
                />

                <v-text-field
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.password_confirmation"
                    autocomplete="new-password"
                />

                <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="processing"
                    :disabled="processing"
                    data-test="reset-password-button"
                >
                    <v-icon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                    <span v-else>Reset password</span>
                </v-btn>
            </div>
        </Form>
    </AuthLayout>
</template>
