<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();
</script>

<template>
    <AuthBase
        title="Log in to your account"
        description="Enter your email and password below to log in"
    >
        <Head title="Log in" />

        <v-alert
            v-if="status"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mb-4 text-center"
        >
            {{ status }}
        </v-alert>

        <Form
            v-bind="store.form()"
            :reset-on-success="['password']"
            v-slot="{ errors, processing }"
        >
            <div class="d-flex flex-column ga-6">
                <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="email@example.com"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.email"
                    :tabindex="1"
                    autocomplete="email"
                    autofocus
                    required
                />

                <div>
                    <div class="d-flex align-center justify-space-between mb-2">
                        <label for="password" class="text-body-1 font-weight-medium">Password</label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="request()"
                            class="text-caption"
                            :tabindex="5"
                        >
                            Forgot password?
                        </TextLink>
                    </div>
                    <v-text-field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        variant="outlined"
                        density="comfortable"
                        :error-messages="errors.password"
                        :tabindex="2"
                        autocomplete="current-password"
                        required
                    />
                </div>

                <div>
                    <v-checkbox
                        id="remember"
                        name="remember"
                        label="Remember me"
                        :tabindex="3"
                        density="compact"
                        hide-details
                    />
                </div>

                <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :tabindex="4"
                    :loading="processing"
                    :disabled="processing"
                    data-test="login-button"
                >
                    <v-icon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                    <span v-else>Log in</span>
                </v-btn>

                <div
                    class="text-center text-body-2 text-medium-emphasis"
                    v-if="canRegister"
                >
                    Don't have an account?
                    <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
                </div>
            </div>
        </Form>
    </AuthBase>
</template>
