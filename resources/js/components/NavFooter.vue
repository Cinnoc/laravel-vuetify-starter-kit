<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/vuetify-sidebar';
import { toUrl } from '@/lib/utils';
import { type NavItem } from '@/types';

interface Props {
    items: NavItem[];
    class?: string;
}

defineProps<Props>();
</script>

<template>
    <SidebarGroup :class="$props.class">
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                    <a
                        :href="toUrl(item.href)"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-decoration-none"
                    >
                        <SidebarMenuButton :title="item.title">
                            <template #prepend>
                                <component :is="item.icon" :size="20" />
                            </template>
                        </SidebarMenuButton>
                    </a>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>
