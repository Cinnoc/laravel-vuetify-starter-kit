import { onMounted, ref } from 'vue';
import { useTheme } from "vuetify";

type Appearance = 'light' | 'dark' | 'system';

// Initialize theme without Vuetify (called before app mount)
export function initializeThemeDOM(value: Appearance) {
    if (typeof window === 'undefined') {
        return;
    }
    
    let themeToApply = value;
    
    if (value === 'system') {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        themeToApply = mediaQueryList.matches ? 'dark' : 'light';
    }
    
    document.documentElement.classList.toggle('dark', themeToApply === 'dark');
}

// Update theme with Vuetify (called inside Vue app)
export function updateTheme(value: Appearance) {
    if (typeof window === 'undefined') {
        return;
    }

    const theme = useTheme();
    
    if (value === 'system') {
        const mediaQueryList = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );
        const systemTheme = mediaQueryList.matches ? 'dark' : 'light';

        document.documentElement.classList.toggle(
            'dark',
            systemTheme === 'dark',
        );
        theme.global.name.value = systemTheme;
    } else {
        document.documentElement.classList.toggle('dark', value === 'dark');
        theme.global.name.value = value;
    }
}

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('appearance') as Appearance | null;
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();

    updateTheme(currentAppearance || 'system');
};

const appearance = ref<Appearance>('system');

export function useAppearance() {
    const theme = useTheme();

    onMounted(() => {
        const savedAppearance = localStorage.getItem(
            'appearance',
        ) as Appearance | null;

        if (savedAppearance) {
            appearance.value = savedAppearance;
            updateTheme(savedAppearance);
        } else {
            // Initialize with system preference
            updateTheme('system');
        }

        // Set up system theme change listener
        mediaQuery()?.addEventListener('change', handleSystemThemeChange);
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', value);

        // Store in cookie for SSR...
        setCookie('appearance', value);

        // Update both DOM and Vuetify theme
        updateTheme(value);
    }

    return {
        appearance,
        updateAppearance,
        vuetifyTheme: theme,
    };
}
