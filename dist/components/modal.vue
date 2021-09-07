<template>
    <div
        :class="[
            'fixed inset-0 z-20',
            !active && 'hidden',
            fullscreen && 'bg-white',
        ]"
    >
        <div
            class="fixed inset-0 bg-gray-800 opacity-75 z-30"
            @click="bgClose && close()"
            v-if="!fullscreen"
        />

        <div class="relative w-full h-full overflow-auto">
            <div class="absolute z-30 w-full px-4 py-6 md:py-20">
                <slot name="container">
                    <div 
                        :class="[
                            'bg-white rounded mx-auto w-full',
                            contentWidth,
                        ]"
                    >
                        <div class="flex items-center justify-between pt-5 px-6">
                            <div class="text-xl font-bold flex-grow">
                                <slot name="title">
                                    {{ title }}
                                </slot>
                            </div>

                            <a class="text-xl" @click="close()">
                                <icon name="x" size="md" />
                            </a>
                        </div>

                        <div class="p-6">
                            <slot />
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: null,
        },
        size: {
            type: String,
            default: 'md',
        },
        bgClose: {
            type: Boolean,
            default: false,
        },
        fullscreen: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            active: false,
        }
    },
    computed: {
        contentWidth () {
            if (this.size === 'sm') return 'max-w-sm'
            if (this.size === 'md') return 'max-w-md'
            if (this.size === 'lg') return 'max-w-lg'
            if (this.size === 'xl') return 'max-w-xl'
            if (this.size === '2xl') return 'max-w-2xl'
            if (this.size === '3xl') return 'max-w-3xl'
            if (this.size === '4xl') return 'max-w-4xl'
            if (this.size === '5xl') return 'max-w-5xl'
        },
    },
    methods: {
        open () {
            document.querySelector('html').classList.add('overflow-hidden')
            this.active = true
        },
        close () {
            document.querySelector('html').classList.remove('overflow-hidden')
            this.active = false
            this.$emit('close')
        },
    }
}
</script>