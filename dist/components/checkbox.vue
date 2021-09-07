<template>
    <label class="inline-flex font-normal">
        <div
            :class="[
                'w-5 h-5 bg-white m-1 border-2 flex-shrink-0 flex items-center justify-center rounded',
                isChecked ? `border-${color}` : 'border-gray-300',
            ]"
        >
            <input
                type="checkbox"
                ref="input"
                class="opacity-0 absolute"
                :disabled="disabled"
                :checked="value"
                @change="
                    isChecked = $event.target.checked
                    $emit('input', $event.target.checked)
                "
            >

            <div :class="['w-3 h-3 shadow', `bg-${color}`]" v-if="isChecked" />
        </div>

        <div :class="['text-sm', !isEmptyContent && 'ml-1']">
            <div class="flex items-center h-full">
                <slot />
            </div>
        </div>
    </label>
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default () {
                return this.$root.$options.metaInfo?.themeColor || 'blue-500'
            },
        },
    },
    data () {
        return {
            isChecked: this.value,
        }
    },
    watch: {
        value (val) {
            this.isChecked = val
        },
    },
    computed: {
        isEmptyContent () {
            return !Object.keys(this.$slots).length
        },
    },
}
</script>
