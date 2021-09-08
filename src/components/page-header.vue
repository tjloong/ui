<template>
    <div class="flex w-full mb-6">
        <div class="flex-shrink-0">
            <a 
                class="bg-gray-300 text-gray-800 rounded p-1.5 inline-flex items-center justify-center" 
                @click="goBack()"
                v-if="back"
            >
                <icon name="left-arrow-alt" />
            </a>
        </div>

        <div :class="['flex-grow flex items-center flex-wrap', back && 'pl-3']">
            <div class="flex-grow mb-2 md:mb-0">
                <div class="text-gray-800 text-xl font-bold">
                    <slot name="title">
                        {{ title }}
                    </slot>
                </div>

                <div class="text-gray-600 font-light text-sm">
                    <slot name="subtitle">
                        {{ subtitle }}
                    </slot>
                </div>
            </div>

            <div class="flex-shrink-0 self-center">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        back: {
            type: [Function, Boolean, String],
            default: false,
        },
    },
    methods: {
        goBack () {
            const type = typeof this.back

            if (type === 'boolean') this.$back()
            else if (type === 'string') this.$inertia.get(this.back)
            else if (type === 'function') this.back()
        }
    }
}
</script>
