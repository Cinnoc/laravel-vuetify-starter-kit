import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify, type ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Get initial theme from localStorage
function getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
        return 'light';
    }
    
    const savedAppearance = localStorage.getItem('appearance') as 'light' | 'dark' | 'system' | null;
    
    if (!savedAppearance || savedAppearance === 'system') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    
    return savedAppearance;
}

const shadcnLight: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#ffffff',
        surface: '#ffffff',
        'surface-variant': '#f5f3ff', // Subtle purple tint for better brand cohesion and visibility
        primary: '#7c3aed',
        'primary-darken-1': '#5b21b6',
        secondary: '#e4e4e7',
        'secondary-darken-1': '#d4d4d8',
        accent: '#38bdf8',
        info: '#2563eb',
        success: '#16a34a',
        warning: '#fbbf24',
        error: '#ef4444',
        muted: '#6b7280',
        border: '#e4e4e7',
    },
};

const shadcnDark: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#09090b',
        surface: '#18181b',
        'surface-variant': '#27272a',
        primary: '#a78bfa',
        'primary-darken-1': '#7c3aed',
        secondary: '#3f3f46',
        'secondary-darken-1': '#27272a',
        accent: '#38bdf8',
        info: '#93c5fd',
        success: '#4ade80',
        warning: '#facc15',
        error: '#f87171',
        muted: '#a1a1aa',
        border: '#3f3f46',
    },
};

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: getInitialTheme(),
        themes: {
            light: shadcnLight,
            dark: shadcnDark,
        },
    },
});

export default vuetify;

