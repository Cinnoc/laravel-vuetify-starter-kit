<script setup lang="ts">
import AlertError from '@/components/AlertError.vue';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-vue-next';
import { nextTick, onMounted, ref } from 'vue';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = ref<HTMLDivElement | null>(null);

const toggleRecoveryCodesVisibility = async () => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <Card class="w-full pa-0">
        <div class="pa-6 pb-4">
            <div class="d-flex align-center gap-3 mb-2">
                <LockKeyhole class="size-4" />
                <h3 class="text-h6">2FA Recovery Codes</h3>
            </div>
            <p class="text-body-2 text-medium-emphasis">
                Recovery codes let you regain access if you lose your 2FA
                device. Store them in a secure password manager.
            </p>
        </div>
        <div class="pa-6 pt-0">
            <div class="d-flex flex-column flex-sm-row gap-3 align-sm-center justify-sm-space-between user-select-none">
                <Button @click="toggleRecoveryCodesVisibility" class="w-auto">
                    <component
                        :is="isRecoveryCodesVisible ? EyeOff : Eye"
                        class="size-4"
                    />
                    {{ isRecoveryCodesVisible ? 'Hide' : 'View' }} Recovery
                    Codes
                </Button>

                <Form
                    v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                    v-bind="regenerateRecoveryCodes.form()"
                    method="post"
                    :options="{ preserveScroll: true }"
                    @success="fetchRecoveryCodes"
                    #default="{ processing }"
                >
                    <Button
                        variant="secondary"
                        type="submit"
                        :disabled="processing"
                    >
                        <RefreshCw /> Regenerate Codes
                    </Button>
                </Form>
            </div>
            <div
                :class="[
                    'position-relative overflow-hidden',
                    isRecoveryCodesVisible
                        ? 'h-auto opacity-100'
                        : 'h-0 opacity-0',
                ]"
                style="transition: all 0.3s"
            >
                <div v-if="errors?.length" class="mt-6">
                    <AlertError :errors="errors" />
                </div>
                <div v-else class="mt-3 d-flex flex-column gap-3">
                    <div
                        ref="recoveryCodeSectionRef"
                        class="d-grid gap-1 rounded-lg bg-muted pa-4 font-mono text-body-2"
                    >
                        <div v-if="!recoveryCodesList.length" class="d-flex flex-column gap-2">
                            <div
                                v-for="n in 8"
                                :key="n"
                                class="animate-pulse rounded bg-muted-foreground"
                                style="height: 16px; opacity: 0.2"
                            ></div>
                        </div>
                        <div
                            v-else
                            v-for="(code, index) in recoveryCodesList"
                            :key="index"
                        >
                            {{ code }}
                        </div>
                    </div>
                    <p class="text-caption text-medium-emphasis user-select-none">
                        Each recovery code can be used once to access your
                        account and will be removed after use. If you need more,
                        click
                        <span class="font-weight-bold">Regenerate Codes</span> above.
                    </p>
                </div>
            </div>
        </div>
    </Card>
</template>
