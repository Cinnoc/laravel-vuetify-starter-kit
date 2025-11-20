<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';
import { VBtn, VIcon, VTextField } from 'vuetify/components';
</script>

<template>
    <AuthBase
        title="Create an account"
        description="Enter your details below to create your account"
    >
        <Head title="Register" />

        <Form
            v-bind="store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
        >
            <div class="d-flex flex-column ga-6">
                <VTextField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    placeholder="Full name"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.name"
                    :tabindex="1"
                    autocomplete="name"
                    autofocus
                    required
                />

                <VTextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    placeholder="email@example.com"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.email"
                    :tabindex="2"
                    autocomplete="email"
                    required
                />

                <VTextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.password"
                    :tabindex="3"
                    autocomplete="new-password"
                    required
                />

                <VTextField
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    label="Confirm password"
                    placeholder="Confirm password"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="errors.password_confirmation"
                    :tabindex="4"
                    autocomplete="new-password"
                    required
                />

                <VBtn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :tabindex="5"
                    :loading="processing"
                    :disabled="processing"
                    data-test="register-user-button"
                >
                    <VIcon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                    <span v-else>Create account</span>
                </VBtn>

                <div class="text-center text-body-2 text-medium-emphasis">
                    Already have an account?
                    <TextLink :href="login()" :tabindex="6">Log in</TextLink>
                </div>
            </div>
        </Form>
    </AuthBase>
</template>
