<template>
    <div :class="['w-10/12 mx-auto flex flex-col justify-center items-center', small ? 'my-8' : 'my-12']">
        <div :class="small ? 'w-20' : 'w-40'">
            <slot name="img">
                <img src="../assets/icons/empty.svg" v-if="type === 'search'">
            </slot>
        </div>

        <div class="mt-4 mb-4">
            <div :class="['font-bold text-gray-600 text-center', small ? 'text-md' : 'text-lg']">
                {{ title }}
            </div>
            <div :class="['text-md text-center text-gray-500', small ? 'text-sm' : 'text-md']">
                {{ subtitle }}
            </div>
        </div>

        <slot />
    </div>
</template>

<script>
export default {
    name: 'Cta',
    props: {
        type: {
            type: String,
            default: 'search',
        },
        title: {
            type: String,
            default: 'Sorry, we couldn\'t find any matches',
        },
        subtitle: {
            type: String,
            default: 'Please try with another search criteria',
        },
        small: {
            type: Boolean,
            default: false,
        }
    }
}
</script>