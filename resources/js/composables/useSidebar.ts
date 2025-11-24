import { computed, inject, provide, ref, type InjectionKey, type Ref } from 'vue';
import { useDisplay } from 'vuetify';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export interface SidebarContext {
    rail: Ref<boolean>;
    open: Ref<boolean>;
    mobile: Ref<boolean>;
    toggleRail: () => void;
    toggleMobile: () => void;
    setRail: (value: boolean) => void;
    setMobile: (value: boolean) => void;
}

const SidebarKey: InjectionKey<SidebarContext> = Symbol('sidebar');

export function provideSidebar(defaultOpen = true) {
    const { mobile } = useDisplay();
    const rail = ref(!defaultOpen);
    const mobileOpen = ref(false);

    const toggleRail = () => {
        rail.value = !rail.value;
        // Save state to cookie
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${!rail.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    };

    const toggleMobile = () => {
        mobileOpen.value = !mobileOpen.value;
    };

    const setRail = (value: boolean) => {
        rail.value = value;
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${!value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    };

    const setMobile = (value: boolean) => {
        mobileOpen.value = value;
    };

    // On desktop, sidebar is always "open", on mobile it's controlled by mobileOpen
    const open = computed(() => !mobile.value || mobileOpen.value);

    const context: SidebarContext = {
        rail,
        open: open as unknown as Ref<boolean>,
        mobile,
        toggleRail,
        toggleMobile,
        setRail,
        setMobile,
    };

    provide(SidebarKey, context);

    return context;
}

export function useSidebar() {
    const context = inject(SidebarKey);
    
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }

    return context;
}

