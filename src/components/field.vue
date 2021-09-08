<template>
    <div class="field w-full text-sm mb-5">
        <label class="block text-xs font-medium leading-5 text-gray-400 uppercase mb-1.5">
            {{ label }} <icon v-if="required" name="health" size="8px" class="text-red-400" />
        </label>

        <slot>
            <template v-if="['text', 'number', 'email'].includes(type)">
                <input class="w-full form-input" v-bind="$props" @input="$emit('input', $event.target.value)">
            </template>

            <template v-if="type === 'textarea'">
                <textarea class="w-full form-input" v-bind="$props" @input="$emit('input', $event.target.value)" />
            </template>

            <template v-if="type === 'password'">
                <div class="relative w-full">
                    <input :type="showPw ? 'text' : 'password'" class="w-full pr-10 form-input" v-bind="$props" @input="$emit('input', $event.target.value)">
                    <a class="absolute top-0 right-0 bottom-0 flex items-center justify-center w-12" @click.prevent="showPw = !showPw">
                        <icon :name="showPw ? 'hide' : 'show'" />
                    </a>
                </div>
            </template>

            <template v-if="type === 'date'">
                <datepicker :value="value" :config="config" @input="$emit('input', $event)" />
            </template>

            <template v-if="type === 'select'">
                <select class="w-full form-input" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)">
                    <option v-for="opt in options" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>
            </template>

            <template v-if="error">
                <div class="mt-1 text-red-500 font-medium text-xs">
                    {{ error }}
                </div>
            </template>
        </slot>
    </div>
</template>

<script>
import Datepicker from './datepicker'

export default {
    name: 'Field',
    props: {
        label: String,
        error: String,
        config: Object,
        options: Array,
        required: Boolean,
        placeholder: String,
        type: {
            type: String,
            default: 'text',
        },
        value: [String, Number, Boolean, Array, Object],
    },
    components: {
        Datepicker,
    },
    data () {
        return {
            showPw: false,
        }
    },
}
</script>

<style>
.box .field:last-child {
    margin-bottom: 0;
}

input.form-input,
select.form-input,
textarea.form-input {
    @apply appearance-none py-1.5 px-3 border border-gray-300 rounded-md leading-normal bg-white text-sm;
}

input.form-input:hover,
select.form-input:hover,
textarea.form-input:hover {
    @apply border border-gray-400;
}

input.form-input:focus,
select.form-input:focus,
textarea.form-input:focus {
    @apply border-2 border-gray-700;
}

/* required */
.required::after {
    @apply text-red-500;
    content: " ∗";
}
</style>


