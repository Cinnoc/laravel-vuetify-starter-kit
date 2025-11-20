<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import { Form, Head, Link, usePage } from '@inertiajs/vue3';

import DeleteUser from '@/components/DeleteUser.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { type BreadcrumbItem } from '@/types';
import { VBtn, VTextField } from 'vuetify/components';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

const page = usePage();
const user = page.props.auth.user;
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="d-flex flex-column ga-4">
                <div>
                    <h2 class="text-h6 font-weight-bold text-high-emphasis mb-1">Profile information</h2>
                    <p class="text-body-2 text-medium-emphasis">Update your name and email address</p>
                </div>

                <Form
                    v-bind="ProfileController.update.form()"
                    class="d-flex flex-column ga-4"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <VTextField
                        id="name"
                        name="name"
                        label="Name"
                        :model-value="user.name"
                        variant="outlined"
                        density="comfortable"
                        required
                        autocomplete="name"
                        placeholder="Full name"
                        :error-messages="errors.name"
                    />

                    <VTextField
                        id="email"
                        type="email"
                        name="email"
                        label="Email address"
                        :model-value="user.email"
                        variant="outlined"
                        density="comfortable"
                        required
                        autocomplete="username"
                        placeholder="Email address"
                        :error-messages="errors.email"
                    />

                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="text-body-2 text-medium-emphasis">
                            Your email address is unverified.
                            <Link
                                :href="send()"
                                as="button"
                                class="text-primary text-decoration-underline"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        <div
                            v-if="status === 'verification-link-sent'"
                            class="mt-2 text-body-2 font-weight-medium text-success"
                        >
                            A new verification link has been sent to your email
                            address.
                        </div>
                    </div>

                    <div class="d-flex align-center ga-4">
                        <VBtn
                            type="submit"
                            color="primary"
                            :disabled="processing"
                            data-test="update-profile-button"
                        >
                            Save
                        </VBtn>

                        <Transition
                            enter-active-class="v-fade-transition"
                            leave-active-class="v-fade-transition"
                        >
                            <p
                                v-show="recentlySuccessful"
                                class="text-body-2 text-medium-emphasis"
                            >
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </Form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
