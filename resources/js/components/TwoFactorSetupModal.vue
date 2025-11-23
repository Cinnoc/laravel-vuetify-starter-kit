<script setup lang="ts">
import AlertError from '@/components/AlertError.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { useClipboard } from '@vueuse/core';
import { mdiCheck, mdiContentCopy, mdiLoading, mdiQrcodeScan } from '@mdi/js';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import {
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VBtn,
    VDivider,
    VOtpInput,
} from 'vuetify/components';

interface Props {
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
}

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('isOpen');

const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } =
    useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<number[]>([]);
const codeValue = computed<string>(() => code.value.join(''));

// Computed property to bridge VOtpInput (string) with code (number[])
const otpValue = computed({
    get: () => codeValue.value,
    set: (value: string) => {
        code.value = value.split('').map(Number);
    }
});

const otpInputContainerRef = useTemplateRef('otpInputContainerRef');

const modalConfig = computed<{
    title: string;
    description: string;
    buttonText: string;
}>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-Factor Authentication Enabled',
            description:
                'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify Authentication Code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable Two-Factor Authentication',
        description:
            'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const handleModalNextStep = () => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(() => {
            otpInputContainerRef.value?.querySelector('input')?.focus();
        });

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = () => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = [];
};

watch(
    () => isOpen.value,
    async (isOpen) => {
        if (!isOpen) {
            resetModalState();
            return;
        }

        if (!qrCodeSvg.value) {
            await fetchSetupData();
        }
    },
);
</script>

<template>
    <VDialog v-model="isOpen" max-width="500" persistent scrollable>
        <VCard rounded>
            <VCardTitle class="d-flex flex-column align-center justify-center pa-6 pb-0">
                <div
                    class="mb-3 w-auto rounded-full border border-border bg-card pa-1 elevation-1"
                >
                    <div
                        class="relative overflow-hidden rounded-full border border-border bg-muted pa-2"
                    >
                        <v-icon :icon="mdiQrcodeScan" size="24" class="position-relative text-foreground" style="z-index: 20;"></v-icon>
                    </div>
                </div>
                <div class="text-body-1 text-center mt-2">{{ modalConfig.title }}</div>
            </VCardTitle>
            <VCardSubtitle class="text-body-2 text-medium-emphasis text-center px-6 pt-0 pb-4 text-wrap">
                {{ modalConfig.description }}
            </VCardSubtitle>

            <VCardText class="px-6 pb-4">
                <div class="d-flex flex-column align-center justify-center ga-5">
                    <!-- Step 1: QR Code View -->
                    <template v-if="!showVerificationStep">
                        <AlertError v-if="errors?.length" :errors="errors" />
                        <template v-else>
                            <div class="d-flex justify-center align-center overflow-hidden mx-auto" style="max-width: 400px">
                                <div
                                    class="position-relative overflow-hidden rounded-lg border border-border"
                                    style="aspect-ratio: 1; width: 256px"
                                >
                                    <div
                                        v-if="!qrCodeSvg"
                                        class="position-absolute inset-0 d-flex align-center justify-center bg-background animate-pulse"
                                        style="z-index: 10; aspect-ratio: 1; width: 100%"
                                    >
                                        <v-icon :icon="mdiLoading" size="24" class="animate-spin"></v-icon>
                                    </div>
                                    <div
                                        v-else
                                        class="position-relative overflow-hidden border pa-5"
                                        style="z-index: 10"
                                    >
                                        <div
                                            v-html="qrCodeSvg"
                                            class="d-flex align-center justify-center"
                                            style="aspect-ratio: 1; width: 100%"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex w-100 align-center ga-5">
                                <VBtn
                                    color="primary"
                                    block
                                    @click="handleModalNextStep"
                                >
                                    {{ modalConfig.buttonText }}
                                </VBtn>
                            </div>

                            <VDivider class="my-1" />

                            <div class="text-body-2 text-center text-medium-emphasis mb-2">
                                or, enter the code manually
                            </div>

                            <div class="d-flex align-center justify-center w-100">
                                <div
                                    class="d-flex align-stretch overflow-hidden rounded-xl border border-border w-100"
                                >
                                    <div
                                        v-if="!manualSetupKey"
                                        class="d-flex align-center justify-center bg-muted pa-3 w-100"
                                    >
                                        <v-icon :icon="mdiLoading" size="16" class="animate-spin"></v-icon>
                                    </div>
                                    <template v-else>
                                        <input
                                            type="text"
                                            readonly
                                            :value="manualSetupKey"
                                            class="h-100 w-100 bg-background pa-3 text-foreground"
                                            style="border: none; outline: none"
                                        />
                                        <VBtn
                                            icon
                                            variant="text"
                                            @click="copy(manualSetupKey || '')"
                                            class="border-s border-border"
                                            style="border-radius: 0"
                                        >
                                            <v-icon
                                                v-if="copied"
                                                :icon="mdiCheck"
                                                size="16"
                                                class="text-success"
                                            ></v-icon>
                                            <v-icon v-else :icon="mdiContentCopy" size="16"></v-icon>
                                        </VBtn>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </template>

                    <!-- Step 2: OTP Verification -->
                    <template v-else>
                        <Form
                            v-bind="confirm.form()"
                            reset-on-error
                            @finish="code = []"
                            @success="isOpen = false"
                            v-slot="{ errors, processing }"
                        >
                            <input type="hidden" name="code" :value="codeValue" />
                            <div
                                ref="otpInputContainerRef"
                                class="position-relative w-100 d-flex flex-column ga-3"
                            >
                                <div class="d-flex w-100 flex-column align-center justify-center ga-3 py-2">
                                    <VOtpInput
                                        id="otp"
                                        v-model="otpValue"
                                        :length="6"
                                        type="number"
                                        variant="outlined"
                                        :disabled="processing"
                                        :error-messages="errors?.confirmTwoFactorAuthentication?.code"
                                        autofocus
                                    />
                                </div>

                                <div class="d-flex w-100 align-center ga-3">
                                    <VBtn
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        class="flex-1-1"
                                        @click="showVerificationStep = false"
                                        :disabled="processing"
                                    >
                                        Back
                                    </VBtn>
                                    <VBtn
                                        type="submit"
                                        color="primary"
                                        class="flex-1-1"
                                        :disabled="
                                            processing || codeValue.length < 6
                                        "
                                    >
                                        Confirm
                                    </VBtn>
                                </div>
                            </div>
                        </Form>
                    </template>
                </div>
            </VCardText>
        </VCard>
    </VDialog>
</template>
