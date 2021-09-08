<template>
    <div class="relative">
        <a ref="trigger" class="flex items-center bg-gray-200 py-1.5 px-3 rounded-md w-full" @click="show = true">
            <icon name="calendar" class="mr-1" />

            <div class="flex-grow flex items-center text-sm mx-1">
                <template v-if="from || to">
                    <span class="mr-2">{{ from || '--' | dateFormat }}</span>
                    <icon name="right-arrow-alt" />
                    <span class="ml-2">{{ to || '--' | dateFormat }}</span>
                </template>

                <template v-else>
                    Lifetime
                </template>
            </div>

            <icon name="chevron-down" />
        </a>

        <div class="w-72" ref="form" v-if="show">
            <box>
                <div class="p-5">
                    <field label="From" type="date" v-model="from" :config="{ maxDate: to }" />
                    <field label="To" type="date" v-model="to" :config="{ minDate: from }" />
                </div>

                <template #buttons>
                    <btn submit color="green-500" class="w-full" @click="submit()">
                        Apply
                    </btn>
                </template>
            </box>
        </div>
    </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
    name: 'DashboardDateRange',
    props: {
        value: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            show: false,
            popper: null,
            from: this.value?.from,
            to: this.value?.to,
        }
    },
    watch: {
        show (show) {
            if (show) {
                this.$nextTick(() => {
                    this.popper = createPopper(this.$refs.trigger, this.$refs.form, {
                        placement: 'bottom-end',
                    })

                    window.addEventListener('click', this.dismiss)
                })
            }
            else if (this.popper) setTimeout(() => this.popper.destroy(), 100)
        },
        from () {
            if (this.popper) this.popper.update()
        },
        to () {
            if (this.popper) this.popper.update()
        },
    },
    methods: {
        dismiss (e) {
            if (this.$el.contains(e.target)) return
            this.show = false
        },
        submit () {
            const range = { from: this.from, to: this.to }

            this.$emit('input', range)

            this.show = false
        }
    }
}
</script>