import { onMounted, ref } from 'vue';
import { useTheme } from "vuetify";

type Appearance = 'light' | 'dark' | 'system';

// Get the actual theme to apply (resolves 'system' to 'light' or 'dark')
function resolveTheme(value: Appearance): 'light' | 'dark' {
    if (value === 'system') {
        if (typeof window === 'undefined') {
            return 'light';
        }
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        return mediaQueryList.matches ? 'dark' : 'light';
    }
    return value;
}

// Note: Theme initialization now happens in the Vuetify plugin (plugins/vuetify.ts)
// This ensures Vuetify starts with the correct theme from the beginning

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// Get stored appearance preference
const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }
    return (localStorage.getItem('appearance') as Appearance) || 'system';
};

// Shared appearance state and initialization flag
const appearance = ref<Appearance>(getStoredAppearance());
let isInitialized = false;
let globalMediaQueryList: MediaQueryList | null = null;

export function useAppearance() {
    const theme = useTheme();

    // Apply theme changes to Vuetify
    const applyTheme = (value: Appearance) => {
        const resolvedTheme = resolveTheme(value);
        
        // Update Vuetify theme using the change method (non-deprecated API)
        theme.change(resolvedTheme);
    };

    // Handle system theme changes
    const handleSystemThemeChange = () => {
        if (appearance.value === 'system') {
            applyTheme('system');
        }
    };

    onMounted(() => {
        // Only initialize once, not on every component mount
        if (isInitialized) {
            return;
        }
        
        isInitialized = true;

        // Set up system theme change listener
        if (typeof window !== 'undefined') {
            globalMediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
            globalMediaQueryList.addEventListener('change', handleSystemThemeChange);
        }
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;

        // Store in localStorage for client-side persistence
        localStorage.setItem('appearance', value);

        // Store in cookie for SSR
        setCookie('appearance', value);

        // Apply theme immediately
        applyTheme(value);
    }

    return {
        appearance,
        updateAppearance,
        vuetifyTheme: theme,
    };
}
