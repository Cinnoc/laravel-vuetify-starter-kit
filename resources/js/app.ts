import '../css/app.scss';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeThemeDOM } from './composables/useAppearance';
import vuetify from './plugins/vuetify';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize theme on DOM before app mount (without Vuetify)
const savedAppearance = (typeof localStorage !== 'undefined' 
    ? localStorage.getItem('appearance') 
    : null) as 'light' | 'dark' | 'system' | null;
initializeThemeDOM(savedAppearance || 'system');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(vuetify)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

