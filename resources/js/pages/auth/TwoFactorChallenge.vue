<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { store } from '@/routes/two-factor/login';
import { Form, Head } from '@inertiajs/vue3';
import { mdiLoading } from '@mdi/js';
import { VBtn, VIcon, VOtpInput, VTextField } from 'vuetify/components';
import { computed, ref } from 'vue';

interface AuthConfigContent {
    title: string;
    description: string;
    toggleText: string;
}

const authConfigContent = computed<AuthConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: 'Recovery Code',
            description:
                'Please confirm access to your account by entering one of your emergency recovery codes.',
            toggleText: 'login using an authentication code',
        };
    }

    return {
        title: 'Authentication Code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        toggleText: 'login using a recovery code',
    };
});

const showRecoveryInput = ref<boolean>(false);

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = '';
};

const code = ref<string>('');
</script>

<template>
    <AuthLayout
        :title="authConfigContent.title"
        :description="authConfigContent.description"
    >
        <Head title="Two-Factor Authentication" />

        <div class="d-flex flex-column ga-6">
            <template v-if="!showRecoveryInput">
                <Form
                    v-bind="store.form()"
                    reset-on-error
                    @error="code = ''"
                    #default="{ errors, processing, clearErrors }"
                >
                    <div class="d-flex flex-column ga-4">
                        <VOtpInput
                            v-model="code"
                            name="code"
                            :length="6"
                            type="number"
                            variant="outlined"
                            :disabled="processing"
                            :error-messages="errors.code"
                            autofocus
                        />
                        
                        <VBtn
                            type="submit"
                            color="primary"
                            size="large"
                            block
                            :loading="processing"
                            :disabled="processing"
                        >
                            <VIcon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                            <span v-else>Continue</span>
                        </VBtn>
                        
                        <div class="text-center text-body-2 text-medium-emphasis">
                            <span>or you can </span>
                            <button
                                type="button"
                                class="text-foreground text-decoration-underline"
                                style="text-underline-offset: 4px; text-decoration-color: rgb(212, 212, 212); transition: all 0.3s ease-out;"
                                @click="() => toggleRecoveryMode(clearErrors)"
                            >
                                {{ authConfigContent.toggleText }}
                            </button>
                        </div>
                    </div>
                </Form>
            </template>

            <template v-else>
                <Form
                    v-bind="store.form()"
                    reset-on-error
                    #default="{ errors, processing, clearErrors }"
                >
                    <div class="d-flex flex-column ga-4">
                        <VTextField
                            name="recovery_code"
                            type="text"
                            label="Recovery code"
                            placeholder="Enter recovery code"
                            variant="outlined"
                            density="comfortable"
                            :error-messages="errors.recovery_code"
                            :autofocus="showRecoveryInput"
                            required
                        />
                        
                        <VBtn
                            type="submit"
                            color="primary"
                            size="large"
                            block
                            :loading="processing"
                            :disabled="processing"
                        >
                            <VIcon v-if="processing" :icon="mdiLoading" class="animate-spin" />
                            <span v-else>Continue</span>
                        </VBtn>

                        <div class="text-center text-body-2 text-medium-emphasis">
                            <span>or you can </span>
                            <v-btn
                                variant="text"
                                size="small"
                                class="text-none"
                                @click="() => toggleRecoveryMode(clearErrors)"
                            >
                                {{ authConfigContent.toggleText }}
                            </v-btn>
                        </div>
                    </div>
                </Form>
            </template>
        </div>
    </AuthLayout>
</template>
