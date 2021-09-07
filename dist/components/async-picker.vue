<template>
    <modal ref="modal" :title="title">
        <div class="relative w-full mb-4">
            <div class="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center">
                <icon name="search" class="text-gray-500" />
            </div>

            <input 
                type="text"
                ref="input"
                v-model="form.search"
                placeholder="Search"
                class="w-full pl-10 form-input pr-10"
                @input="search()"
            >

            <a 
                v-if="form.search !== null"
                class="absolute top-0 right-0 bottom-0 w-10 flex items-center justify-center" 
                @click="form.search = null; fetch()" 
            >
                <icon name="x" />
            </a>
        </div>

        <div class="-mx-6">
            <template v-if="options && options.data.length">
                <a
                    v-for="opt in options.data"
                    :key="opt.id"
                    class="block py-2 px-6 border-b text-sm hover:bg-gray-100"
                    @click="select(opt)"
                >
                    <slot name="option" :option="opt">
                        {{ opt.hasOwnProperty('name') ? opt.name : opt }}
                    </slot>
                </a>
            </template>

            <div v-if="form.processing" class="flex items-center justify-center">
                <div class="h-8 w-8">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        :class="['animate-spin', `text-${color}`]"
                    >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>

            <cta v-else-if="options && !options.data.length" small />

            <div v-else-if="paginate" class="px-4 pt-4 text-center">
                <btn inverted @click="form.page++">
                    Load more <icon name="down-arrow-alt" />
                </btn>
            </div>
        </div>
    </modal>
</template>

<script>
import _ from 'lodash'
import Cta from './cta'

export default {
    name: 'AsyncPicker',
    props: {
        url: String,
        placeholder: String,
    },
    components: {
        Cta,
    },
    data () {
        return {
            options: null,
            form: this.$inertia.form({
                search: null,
                page: 1,
            }),
        }
    },
    computed: {
        color () {
            return this.$root.$options.metaInfo?.themeColor || 'blue-500'
        },
        title () {
            return this.placeholder || 'Please Select'
        },
        paginate () {
            if (!this.options) return false
            return this.options.meta?.last_page > this.options.meta?.current_page
        }
    },
    methods: {
        search: _.debounce(function () {
            this.fetch()
        }, 300),

        open () {
            this.$refs.modal.open()

            this.$nextTick(() => {
                this.$refs.input.focus()
                this.fetch()
            })
        },
        close () {
            this.form.reset()
            this.$refs.modal.close()
        },
        select (opt) {
            this.$emit('input', opt)
            this.close()
        },
        fetch () {
            this.form.post(this.url, {
                onSuccess: () => {
                    this.options = this.$page.props.options
                },
            })
        }
    }
}
</script>
