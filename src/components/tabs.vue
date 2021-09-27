<template>
    <div class="tabs">
        <div
            :class="[
                'inline-flex items-center flex-wrap text-sm', 
                !inverted && 'p-1 font-medium bg-gray-100 rounded-md',
            ]"
        >
            <template v-for="(tab, i) in allTabs">
                <dropdown 
                    v-if="tab.children && tab.children.length"
                    :key="`${tab.value}-dd`" 
                    :class="['flex-shrink-0', i > 0 && 'ml-1']"
                >
                    <div
                        :class="[
                            'py-1.5 px-3 flex items-center',

                            isActive(tab) && inverted && 'text-theme border-b-2 border-theme font-medium',
                            !isActive(tab) && inverted && 'text-gray-400 border-b-2 border-transparent hover:text-gray-600',
                            
                            isActive(tab) && !inverted && 'bg-white text-theme font-bold shadow rounded-md',
                            !isActive(tab) && !inverted && 'text-gray-600 rounded hover:text-gray-800',
                        ]"
                    >
                        <template v-if="isActive(tab)">
                            {{ (tab.children.find(child => (child.value === (value || active))) || {}).label }}
                        </template>

                        <template v-else>
                            {{ tab.label }}
                        </template>

                        <icon name="chevron-down" class="ml-1" />
                    </div>

                    <template #items>
                        <a 
                            v-for="child in tab.children"
                            :key="child.value"
                            class="flex justify-between" 
                            @click="select(child.value)"
                        >
                            {{ child.label }}
                            <div>
                                <badge size="xs" v-if="child.badge">
                                    {{ child.badge }}
                                </badge>
                            </div>
                        </a>
                    </template>
                </dropdown>

                <a
                    :key="tab.value"
                    :class="[
                        'flex-shrink-0 py-1.5 px-3',

                        isActive(tab) && inverted && 'text-theme border-b-2 border-theme font-medium',
                        !isActive(tab) && inverted && 'text-gray-400 border-b-2 border-transparent hover:text-gray-600',
                        
                        isActive(tab) && !inverted && 'bg-white text-theme font-bold shadow rounded-md',
                        !isActive(tab) && !inverted && 'text-gray-600 rounded hover:text-gray-800',

                        i > 0 && 'ml-1'
                    ]"
                    @click="select(tab.value)"
                    v-else
                >
                    <div class="flex items-center">
                        <div>{{ tab.label }}</div>
                        <badge 
                            size="xs" 
                            class="ml-2" 
                            :color="isActive(tab) ? 'yellow' : 'gray'"
                            v-if="tab.badge"
                        >
                            {{ tab.badge }}
                        </badge>
                    </div>
                </a>
            </template>
        </div>
    </div>
</template>

<script>
import Dropdown from './dropdown'

export default {
    name: 'Tabs',
    props: {
        value: [String, Number],
        tabs: {
            type: Array,
            default () {
                return []
            }
        },
        active: {
            type: [String, Array],
            default: null
        },
        inverted: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Dropdown,
    },
    computed: {
        allTabs () {
            return this.tabs.filter(Boolean).map(tab => {
                if (typeof tab === 'string') return { value: tab, label: tab }
                else return tab
            })
        }
    },
    methods: {
        isActive (tab) {
            if (this.active) {
                if (typeof this.active === 'string') {
                    return tab.value === this.active ||
                        (tab.children && tab.children.some(child => child.value === this.active))
                }
                if (Array.isArray(this.active)) {
                    return this.active.includes(tab.value) ||
                        (tab.chilren && tab.children.some(child => (this.active.includes(child.value))))
                }
            }
            else if (tab.children && tab.children.length) {
                return tab.children.some(child => (child.value === this.value))
            }
            else return tab.value === this.value
        },
        select (val) {
            if (this.value !== val) this.$emit('input', val)
        },
    }
}
</script>