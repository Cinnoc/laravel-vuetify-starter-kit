<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';

// Components
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <div class="space-y-6">
        <HeadingSmall
            title="Delete account"
            description="Delete your account and all of its resources"
        />
        <div
            class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
        >
            <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
                <p class="font-medium">Warning</p>
                <p class="text-sm">
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
                            <div class="space-y-4">
                                <p class="text-body-2 text-medium-emphasis">
                                    Once your account is deleted, all of its
                                    resources and data will also be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </p>

                                <div class="grid gap-2">
                                    <Label for="password" class="sr-only">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref="passwordInput"
                                        placeholder="Password"
                                        :error-messages="errors.password"
                                    />
                                </div>
                            </div>
                        </VCardText>

                        <VCardActions class="px-6 pb-6 gap-2">
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
