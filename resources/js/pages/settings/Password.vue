<script setup lang="ts">
import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit } from '@/routes/user-password';
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];

const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Password settings" />

        <SettingsLayout>
            <div class="d-flex flex-column ga-4">
                <div>
                    <h2 class="text-h6 font-weight-bold text-high-emphasis mb-1">Update password</h2>
                    <p class="text-body-2 text-medium-emphasis">Ensure your account is using a long, random password to stay secure</p>
                </div>

                <Form
                    v-bind="PasswordController.update.form()"
                    :options="{
                        preserveScroll: true,
                    }"
                    reset-on-success
                    :reset-on-error="[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]"
                    class="d-flex flex-column ga-4"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <div class="d-flex flex-column ga-2">
                        <Label for="current_password">Current password</Label>
                        <Input
                            id="current_password"
                            ref="currentPasswordInput"
                            name="current_password"
                            type="password"
                            autocomplete="current-password"
                            placeholder="Current password"
                            :error-messages="errors.current_password"
                        />
                    </div>

                    <div class="d-flex flex-column ga-2">
                        <Label for="password">New password</Label>
                        <Input
                            id="password"
                            ref="passwordInput"
                            name="password"
                            type="password"
                            autocomplete="new-password"
                            placeholder="New password"
                            :error-messages="errors.password"
                        />
                    </div>

                    <div class="d-flex flex-column ga-2">
                        <Label for="password_confirmation"
                            >Confirm password</Label
                        >
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                            :error-messages="errors.password_confirmation"
                        />
                    </div>

                    <div class="d-flex align-center ga-4">
                        <Button
                            :disabled="processing"
                            data-test="update-password-button"
                            >Save password</Button
                        >

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
        </SettingsLayout>
    </AppLayout>
</template>
