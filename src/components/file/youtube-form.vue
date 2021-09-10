<template>
    <div>
        <field 
            required 
            label="Youtube URL" 
            v-model="text" 
            rows="6"
            :caption="multiple ? 'Insert multiple Youtube videos by separating lines' : null"
            :type="multiple ? 'textarea' : 'text'" 
        />

        <field v-if="videos.length" label="Preview">
            <div class="flex flex-wrap items-center">
                <div
                    v-for="(video, i) in videos"
                    :key="i"
                    class="w-24 h-24 bg-gray-200 rounded-md m-1.5 overflow-hidden relative"
                >
                    <template v-if="video.valid">
                        <div class="absolute inset-0">
                            <img :src="video.tn" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="bg-white w-4 h-4" />
                        </div>
                        <div class="absolute inset-0 flex justify-center items-center text-red-500">
                            <icon name="youtube" type="logo" size="32px" />
                        </div>
                    </template>

                    <div v-else class="w-full h-full flex justify-center items-center text-red-400">
                        <icon name="error-circle" size="64px" />
                    </div>
                </div>
            </div>
        </field>

        <btn v-if="this.videos.filter(v => (v.valid)).length" color="green" @click="submit()">
            Save Youtube Videos
        </btn>
    </div>
</template>

<script>
export default {
    name: 'YoutubeForm',
    props: {
        multiple: Boolean,
    },
    data () {
        return {
            text: null,
            videos: [],
        }
    },
    watch: {
        text (text) {
            if (!text) this.vids = []
            else {
                this.videos = this.text
                    .split("\n")
                    .filter(Boolean)
                    .map(url => {
                        const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
                        const matches = url.match(regex)
                        const vid = matches ? matches[1] : null
                        
                        return {
                            vid,
                            tn: vid ? `https://img.youtube.com/vi/${vid}/default.jpg` : null,
                            valid: vid ? true : false,
                        }
                    })
            }
        },
    },
    methods: {
        submit () {
            this.$emit('submit', { 
                youtube: this.videos
                    .filter(video => (video.valid))
                    .map(video => (video.vid))
            })
        }
    }
}
</script>
