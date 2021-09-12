<template>
    <modal ref="modal" :title="title">
        <div class="relative w-full mb-4">
            <div class="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center">
                <icon name="search" class="text-gray-500" />
            </div>

            <input 
                type="text"
                ref="input"
                v-model="text"
                placeholder="Search"
                class="w-full pl-10 form-input pr-10"
                @input="search()"
            >

            <a 
                v-if="text !== null"
                class="absolute top-0 right-0 bottom-0 w-10 flex items-center justify-center" 
                @click="text = null; fetch()" 
            >
                <icon name="x" />
            </a>
        </div>

        <div class="-mx-6">
            <template v-if="options.length">
                <a
                    v-for="opt in options"
                    :key="opt.id"
                    class="block py-2 px-6 border-b text-sm hover:bg-gray-100"
                    @click="select(opt)"
                >
                    <slot name="option" :option="opt">
                        {{ opt.prototype.hasOwnProperty('name') ? opt.name : opt }}
                    </slot>
                </a>
            </template>

            <div v-if="form.processing" class="flex items-center justify-center text-theme">
                <icon name="radio-circle" size="32px" animation="burst" />
            </div>

            <cta v-else-if="!options.length" small />

            <div v-else-if="paginate" class="px-4 pt-4 text-center">
                <btn inverted @click="page++; fetch()">
                    Load more <icon name="down-arrow-alt" />
                </btn>
            </div>
        </div>
    </modal>
</template>

<script>
import Cta from './cta'
import debounce from 'lodash/debounce'

export default {
    name: 'AsyncPicker',
    props: {
        url: String,
        payload: Object,
        placeholder: String,
    },
    components: {
        Cta,
    },
    data () {
        return {
            page: 1,
            form: {},
            text: null,
            options: [],
            results: null,
        }
    },
    computed: {
        title () {
            return this.placeholder || 'Please Select'
        },
        paginate () {
            if (!this.options) return false
            return this.options.meta?.last_page > this.options.meta?.current_page
        }
    },
    methods: {
        search: debounce(function () {
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
            this.form = this.$inertia.form({
                search: this.text || null,
                page: this.page,
                ...this.payload,
            })

            this.form.post(this.url, {
                onSuccess: () => {
                    this.results = this.$page.props.options
                    this.options = this.page === 1
                        ? this.results.data
                        : this.options.concat(this.results.data)
                }
            })
        }
    }
}
</script>
