<template>
    <div v-if="flash && show" class="shadow">
        <div :class="['py-4 px-6', color]">
            <div class="flex items-center text-sm font-medium">
                <icon :name="icon" class="mr-2 flex-shrink-0" />

                <div class="flex-grow">
                    {{ flash.message }}

                    <template v-if="flash.unverified">
                        <inertia-link class="text-blue-500" :href="route('verification.resend')" method="post" as="button">
                            Resend
                        </inertia-link>
                    </template>
                </div>

                <a class="flex-shrink-0 flex items-center justify-center" @click.prevent="show = false">
                    <icon name="x" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notif',
    data () {
        return {
            show: true,
        }
    },
    computed: {
        flash () {
            const { flash } = this.$page.props

            if (typeof flash === 'string') return { message: flash }
            else return flash
        },
        color () {
            if (this.flash?.type === 'warning') return 'bg-yellow-100 text-yellow-800'
            if (this.flash?.type === 'alert') return 'bg-red-100 text-red-800'
            if (this.flash?.type === 'success') return 'bg-green-100 text-green-800'

            return 'bg-blue-100 text-blue-800'
        },
        icon () {
            if (this.flash?.type === 'warning') return 'message-error'
            if (this.flash?.type === 'alert') return 'message-x'
            if (this.flash?.type === 'success') return 'message-check'

            return 'info-square'
        },
    },
    watch: {
        '$page.props.toast' (val) {
            if (!val) return
            if (typeof val === 'string') this.$toast(val)
            else this.$toast(val.message, val.type)
        },
        '$page.props.alert' (val) {
            if (!val) return
            if (typeof val === 'string') this.$alert(val)
            else this.$alert(val.message, val.type)
        },
    }
}
</script>
