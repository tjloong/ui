<template>
    <div class="bg-gray-50 min-h-screen py-10 px-4">
        <div class="max-w-screen-lg mx-auto">
            <section-title>File Uploader</section-title>
            <div class="mb-4">
                <btn @click="$refs.uploader.open()">
                    Upload
                </btn>

                <file-uploader ref="uploader" />
            </div>

            <section-title>File Card</section-title>
            <div class="grid gap-4 md:grid-cols-4 mb-4">
                <file-card :file="{ id: 1, name: 'File 1', url: 'https://via.placeholder.com/500', mime: 'image/jpg', type: 'jpg' }" @edit="$toast('Edit')" />
                <file-card :file="{ id: 2, name: 'File 2', url: 'https://via.placeholder.com/500', mime: 'application/pdf', type: 'pdf' }" />
            </div>

            <section-title>Box</section-title>
            <box>
                <div class="p-5">
                    This is a box content
                </div>
            </box>

            <section-title>Badge</section-title>
            <div class="mb-4">
                <badge>
                    Badge
                </badge>
            </div>

            <section-title>Button</section-title>
            <div class="mb-4">
                <btn class="mr-2">Button</btn>
                <btn class="mr-2" inverted>Inverted</btn>
                <btn class="mr-2" outlined>Outlined</btn>
            </div>

            <section-title>Checkbox</section-title>
            <div class="mb-4">
                <checkbox>Checkbox</checkbox>
            </div>

            <section-title>CTA</section-title>
            <div class="mb-4">
                <cta />
            </div>

            <section-title>Date Picker</section-title>
            <div class="mb-4 w-60">
                <datepicker>
                    <btn>
                        <icon name="calendar" /> Pick Date
                    </btn>
                </datepicker>
            </div>

            <section-title>Alert</section-title>
            <div class="mb-4">
                <btn @click="$alert('This is an alert!', 'alert')">Alert</btn>
            </div>

            <section-title>Toast</section-title>
            <div class="mb-4">
                <btn @click="$toast('This is an toast!', 'success')">Toast</btn>
            </div>

            <section-title>Confirmation Prompt</section-title>
            <div class="mb-4">
                <btn @click="$confirm({ title: 'Confirm', message: 'Are you sure?' })">Prompt</btn>
            </div>

            <section-title>Date Format Filter</section-title>
            <div class="mb-4 w-60">
                <field label="Date" v-model="date" />
                {{ date | dateFormat('datetime') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Demo',
    data () {
        return {
            date: '2021-08-30',
        }
    }
}
</script>
