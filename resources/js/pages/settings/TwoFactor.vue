<script setup lang="ts">
import HeadingSmall from '@/components/HeadingSmall.vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { disable, enable, show } from '@/routes/two-factor';
import { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/vue3';
import { ShieldBan, ShieldCheck } from 'lucide-vue-next';
import { VBtn, VChip } from 'vuetify/components';
import { onUnmounted, ref } from 'vue';

interface Props {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

withDefaults(defineProps<Props>(), {
    requiresConfirmation: false,
    twoFactorEnabled: false,
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Two-Factor Authentication',
        href: show.url(),
    },
];

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => {
    clearTwoFactorAuthData();
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Two-Factor Authentication" />
        <SettingsLayout>
            <div class="d-flex flex-column ga-4">
                <div>
                    <h2 class="text-h6 font-weight-bold text-high-emphasis mb-1">Two-Factor Authentication</h2>
                    <p class="text-body-2 text-medium-emphasis">Manage your two-factor authentication settings</p>
                </div>

                <div
                    v-if="!twoFactorEnabled"
                    class="d-flex flex-column align-start ga-4"
                >
                    <VChip
                        color="error"
                        variant="flat"
                        size="small"
                        class="text-caption font-weight-bold text-uppercase"
                    >
                        Disabled
                    </VChip>

                    <p class="text-body-2 text-medium-emphasis">
                        When you enable two-factor authentication, you will be
                        prompted for a secure pin during login. This pin can be
                        retrieved from a TOTP-supported application on your
                        phone.
                    </p>

                    <div>
                        <VBtn
                            v-if="hasSetupData"
                            color="primary"
                            @click="showSetupModal = true"
                        >
                            <ShieldCheck style="width: 16px; height: 16px;" />Continue Setup
                        </VBtn>
                        <Form
                            v-else
                            v-bind="enable.form()"
                            @success="showSetupModal = true"
                            #default="{ processing }"
                        >
                            <VBtn
                                type="submit"
                                color="primary"
                                :disabled="processing"
                            >
                                <ShieldCheck style="width: 16px; height: 16px;" />Enable 2FA
                            </VBtn>
                        </Form>
                    </div>
                </div>

                <div
                    v-else
                    class="d-flex flex-column align-start ga-4"
                >
                    <VChip
                        color="primary"
                        variant="flat"
                        size="small"
                        class="text-caption font-weight-bold text-uppercase"
                    >
                        Enabled
                    </VChip>

                    <p class="text-body-2 text-medium-emphasis">
                        With two-factor authentication enabled, you will be
                        prompted for a secure, random pin during login, which
                        you can retrieve from the TOTP-supported application on
                        your phone.
                    </p>

                    <TwoFactorRecoveryCodes />

                    <div>
                        <Form v-bind="disable.form()" #default="{ processing }">
                            <VBtn
                                color="error"
                                type="submit"
                                :disabled="processing"
                            >
                                <ShieldBan style="width: 16px; height: 16px;" />
                                Disable 2FA
                            </VBtn>
                        </Form>
                    </div>
                </div>

                <TwoFactorSetupModal
                    v-model:isOpen="showSetupModal"
                    :requiresConfirmation="requiresConfirmation"
                    :twoFactorEnabled="twoFactorEnabled"
                />
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
