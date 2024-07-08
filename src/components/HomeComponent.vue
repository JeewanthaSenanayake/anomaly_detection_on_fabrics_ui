<template>
    <v-container>
        <H1 class="text-center">Fabric Defect Detector</H1>
        <v-card class="my-5 mx-5" elevation="2" dark>
            <v-card-title>
                <h3>Upload Image</h3>
            </v-card-title>

            <div justify="center" align="center">
                <v-img v-if="selectedImage" :src="imgeUrl" height="300px" width="300px"></v-img>
                <div v-if="responseData">
                    <v-col>
                        <v-col>
                            {{ responseData.file }}
                        </v-col>
                        <v-col>
                            {{ dateTime(responseData.date) }}
                        </v-col>
                        <v-col>
                            <v-chip v-if="responseData.status" color="error" class="ma-1 pa-2" dark>
                                Defective
                            </v-chip>
                            <v-chip v-else color="success" class="ma-1 pa-2" dark>
                                Not Defective
                            </v-chip>
                        </v-col>
                    </v-col>
                </div>
                <div v-else>
                    <v-progress-linear v-if="loading" class="mt-4" indeterminate
                        color="yellow darken-2"></v-progress-linear>
                </div>
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
import axios from '@/service/axiosConfig';
export default {
    name: 'HomeComponent',

    data: () => ({
        selectedImage: null,
        responseData: null,
        loading: false,
        rules: [
            value => !!value || "File required",
        ],
    }),

    methods: {
        // Add your methods here

        async submit() {
            this.loading = true;
            const formData = new FormData()
            formData.append('file', this.selectedImage);
            await axios.post('/fabric/api/v1/isdefective', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                this.responseData = response.data;
                this.loading = false;
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                this.loading = false;
            });
        },

        dateTime(d) {

            const date = new Date(d);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };

            return date.toLocaleDateString('en-US', options);

        },
    },


    computed: {
        // Add your computed properties here
        imgeUrl() {
            return URL.createObjectURL(this.selectedImage);
        },
    },

    watch: {
        selectedImage() {
            this.responseData = null;
            this.loading = false;
        }
    },
};
</script>