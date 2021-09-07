<template>
    <div :class="style" v-if="disabled">
        <slot />
    </div>

    <div :class="[style, 'cursor-not-allowed']" v-else-if="loading">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            :class="[
                'animate-spin -ml-1 mr-3 h-5 w-5',
                inverted || outlined ? `text-${color}` : 'text-white',
            ]" 
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <slot />
    </div>        

    <inertia-link 
        v-else-if="href"
        :class="[style, 'cursor-pointer']" 
        :href="href" 
        :target="target" 
        :method="method"
        :as="['put', 'post', 'delete', 'patch'].includes(method) ? 'div' : 'a'"
        @click="$emit('click')" 
    >
        <slot />
    </inertia-link>

    <button 
        v-else
        :type="submit ? 'submit' : 'button'" 
        :class="style" 
        @click="$emit('click')" 
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'Btn',
    props: {
        submit: Boolean,
        href: String,
        target: String,
        method: String,
        icon: Boolean,
        outlined: Boolean,
        inverted: Boolean,
        loading: Boolean,
        disabled: Boolean,
        color: {
            type: String,
            default () {
                return this.$root.$options.metaInfo.themeColor
            },
        },
        size: {
            type: String,
            default: 'sm',
        },
    },
    computed: {
        style () {
            const sizes = {
                'xs': this.icon ? 'text-xs pl-1 pr-0.5 py-1' : 'text-xs py-1 px-2',
                'sm': this.icon ? 'text-sm pl-1 pr-0.5 py-1' : 'text-sm py-1.5 px-4',
                'md': this.icon ? 'text-base pl-1 pr-0.5 py-1' : 'text-base py-1.5 px-4',
                'lg': this.icon ? 'text-lg pl-1 pr-0.5 py-1' : 'text-lg py-2 px-5',
            }

            let style = [
                'inline-flex items-center justify-center rounded-md font-medium',
                this.disabled && 'opacity-80',
                sizes[this.size],
            ]

            if (this.outlined) {
                style.push('bg-white border-2 shadow hover:shadow-md')
                style.push(this.color === 'white' ? 'border-gray-400 text-gray-500' : `text-${this.color} border-${this.color}`)
            }
            else if (this.inverted) {
                const name = this.color.split('-')[0]
                style.push(this.color === 'white' ? 'text-gray-500 hover:bg-gray-500' : `text-${this.color} hover:bg-${name}-100`)
            }
            else {
                style.push(this.color === 'white' ? 'bg-white text-gray-800' : `bg-${this.color} text-white`)
            }

            return style
        },
    },
}
</script>