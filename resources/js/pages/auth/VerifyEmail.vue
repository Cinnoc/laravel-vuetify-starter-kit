<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';
import { VAlert, VBtn, VIcon } from 'vuetify/components';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <AuthLayout
        title="Verify email"
        description="Please verify your email address by clicking on the link we just emailed to you."
    >
        <Head title="Email verification" />

        <VAlert
            v-if="status === 'verification-link-sent'"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mb-4 text-center"
        >
            A new verification link has been sent to the email address you
            provided during registration.
        </VAlert>

        <Form
            v-bind="send.form()"
            class="d-flex flex-column ga-6 text-center"
            v-slot="{ processing }"
        >
            <VBtn
                type="submit"
                color="secondary"
                size="large"
                :loading="processing"
                :disabled="processing"
            >
                <VIcon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                <span v-else>Resend verification email</span>
            </VBtn>

            <TextLink :href="logout()" as="button" class="mx-auto text-body-2">
                Log out
            </TextLink>
        </Form>
    </AuthLayout>
</template>
