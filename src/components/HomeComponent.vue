<template>
    <v-container class="ma-3">
        <H1 class="text-center">Fabric Defect Detector</H1>
        <v-card class="my-5 mx-5" elevation="2" dark>
            <v-card-title>
                <h3>Upload Image</h3>
            </v-card-title>

            <div justify="center" align="center">
                <v-img v-if="selectedImage" :src="imgeUrl" height="300px" width="300px"></v-img>
            </div>

            <v-card-text>
                <v-file-input class="mx-5" :rules="rules" accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick Image" prepend-icon="mdi-camera" label="Image"
                    v-model="selectedImage"></v-file-input>
            </v-card-text>
            <div justify="center" align="center">
                <v-btn class="ma-3 mb-5" color="primary" :disabled="!selectedImage" @click="submit">
                    Scaech Defects
                </v-btn>
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'HomeComponent',

    data: () => ({
        selectedImage: null,
        rules: [
            value => !!value || "File required",
        ],
    }),

    methods: {
        // Add your methods here
        submit() {
            console.log("Image submitted");
        },
    },

    computed: {
        // Add your computed properties here
        imgeUrl() {
            return URL.createObjectURL(this.selectedImage);
        },
    },
};
</script>