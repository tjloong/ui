<template>
    <div>
        <div v-if="title" class="text-lg font-semibold mb-4">
            <a class="inline-flex items-center md:hidden" @click="open()">
                {{ title }} <icon name="chevron-down" />
            </a>

            <div class="hidden md:block">
                {{ title }}
            </div>
        </div>

        <div 
            ref="dropdown" 
            class="
                bg-white shadow-lg rounded-md border py-1 w-60 hidden
                md:bg-transparent md:shadow-none md:border-0 md:block md:w-auto
            "
        >
            <div
                v-for="(items, group) in menus"
                :key="group"
                class="md:mb-8"
            >
                <p class="hidden text-xs text-gray-400 font-medium uppercase mb-1 px-2 md:block">
                    {{ group | titlecase }}
                </p>

                <div class="flex flex-col">
                    <inertia-link
                        v-for="item in items"
                        :key="item.label"
                        :class="[
                            'py-1.5 px-4 text-sm font-medium text-gray-500 rounded-l md:px-2', 
                            item.active
                                ? 'font-bold text-gray-800 bg-gray-200 md:border-r-4 md:border-theme' 
                                : 'hover:text-gray-800',
                        ]"
                        :href="item.href"
                        replace
                    >
                        {{ item.label }}
                    </inertia-link>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
    name: 'SideMenu',
    props: {
        menus: Object,
        title: String,
    },
    data () {
        return {
            show: false,
            popper: null,
        }
    },
    methods: {
        open () {
            this.$refs.dropdown.classList.remove('hidden')

            this.popper = createPopper(this.$el, this.$refs.dropdown, {
                placement: 'bottom-start',
            })

            window.addEventListener('click', this.dismiss)
        },
        dismiss (e) {
            if (this.$el.contains(e.target)) return
			this.$refs.dropdown.classList.add('hidden')
            setTimeout(() => this.popper.destroy(), 100)
        },
    }
}
</script>
