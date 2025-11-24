<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref<any>(null);
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

            <v-btn
                color="error"
                data-test="delete-user-button"
                @click="isDialogOpen = true"
            >
                Delete account
            </v-btn>

            <v-dialog v-model="isDialogOpen" max-width="500">
                <v-card rounded="">
                    <Form
                        v-bind="ProfileController.destroy.form()"
                        reset-on-success
                        @error="() => passwordInput?.focus()"
                        @success="isDialogOpen = false"
                        :options="{
                            preserveScroll: true,
                        }"
                        v-slot="{ errors, processing, reset, clearErrors }"
                    >
                        <v-card-title class="text-h6 pa-6 pb-4">
                            Are you sure you want to delete your account?
                        </v-card-title>

                        <v-card-text class="px-6 pb-4">
                            <div class="d-flex flex-column ga-4">
                                <p class="text-body-2 text-medium-emphasis">
                                    Once your account is deleted, all of its
                                    resources and data will also be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </p>

                                <v-text-field
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref="passwordInput"
                                    label="Password"
                                    variant="outlined"
                                    density="comfortable"
                                    placeholder="Password"
                                    aria-label="Password"
                                    :error-messages="errors.password"
                                />
                            </div>
                        </v-card-text>

                        <v-card-actions class="px-6 pb-6 ga-2">
                            <v-spacer />
                            <v-btn
                                variant="text"
                                @click="
                                    () => {
                                        clearErrors();
                                        reset();
                                        isDialogOpen = false;
                                    }
                                "
                            >
                                Cancel
                            </v-btn>

                            <v-btn
                                type="submit"
                                color="error"
                                :loading="processing"
                                data-test="confirm-delete-user-button"
                            >
                                Delete account
                            </v-btn>
                        </v-card-actions>
                    </Form>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
