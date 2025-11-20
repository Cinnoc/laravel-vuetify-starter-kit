<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VSpacer,
} from 'vuetify/components';

const passwordInput = ref<InstanceType<typeof Input> | null>(null);
const isDialogOpen = ref(false);
</script>

<template>
    <div class="d-flex flex-column ga-4">
        <div>
            <h2 class="text-h6 font-weight-bold text-high-emphasis mb-1">Delete account</h2>
            <p class="text-body-2 text-medium-emphasis">Delete your account and all of its resources</p>
        </div>
        <div
            class="d-flex flex-column ga-3 rounded-lg border pa-4 bg-error-lighten-5"
            style="border-color: rgb(var(--v-theme-error)) !important; border-width: 1px;"
        >
            <div class="d-flex flex-column ga-1">
                <p class="font-weight-medium text-error">Warning</p>
                <p class="text-body-2 text-error">
                    Please proceed with caution, this cannot be undone.
                </p>
            </div>

            <Button
                variant="destructive"
                data-test="delete-user-button"
                @click="isDialogOpen = true"
            >
                Delete account
            </Button>

            <VDialog v-model="isDialogOpen" max-width="500">
                <VCard rounded="xl">
                    <Form
                        v-bind="ProfileController.destroy.form()"
                        reset-on-success
                        @error="() => passwordInput?.$el?.focus()"
                        @success="isDialogOpen = false"
                        :options="{
                            preserveScroll: true,
                        }"
                        v-slot="{ errors, processing, reset, clearErrors }"
                    >
                        <VCardTitle class="text-h6 pa-6 pb-4">
                            Are you sure you want to delete your account?
                        </VCardTitle>

                        <VCardText class="px-6 pb-4">
                            <div class="d-flex flex-column ga-4">
                                <p class="text-body-2 text-medium-emphasis">
                                    Once your account is deleted, all of its
                                    resources and data will also be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </p>

                                <div class="d-flex flex-column ga-2">
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref="passwordInput"
                                        placeholder="Password"
                                        aria-label="Password"
                                        :error-messages="errors.password"
                                    />
                                </div>
                            </div>
                        </VCardText>

                        <VCardActions class="px-6 pb-6 ga-2">
                            <VSpacer />
                            <Button
                                variant="secondary"
                                @click="
                                    () => {
                                        clearErrors();
                                        reset();
                                        isDialogOpen = false;
                                    }
                                "
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="destructive"
                                :disabled="processing"
                                data-test="confirm-delete-user-button"
                            >
                                Delete account
                            </Button>
                        </VCardActions>
                    </Form>
                </VCard>
            </VDialog>
        </div>
    </div>
</template>
