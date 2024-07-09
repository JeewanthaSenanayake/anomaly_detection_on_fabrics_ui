<template>
    <v-container>

        <H1 class="text-center">Fabric Defect Detector</H1>
        <v-card class="my-5 mx-5" elevation="2" dark>
            <v-card-title>
                <h3>Upload Image</h3>
            </v-card-title>
            <div>
                <div v-if="!responseData" justify="center" align="center">
                    <v-img v-if="selectedImage" :src="imgeUrl" height="300px" width="300px"></v-img>
                </div>
                <div v-else >
                    <center>
                        <v-row class="mt-3">
                            <v-col cols="4">
                                <v-img :src="imgeUrl" height="300px" width="300px"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img :src="`data:image/jpeg;base64,${responseData.reconstruct_image}`" height="300px"
                                    width="300px"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img v-if="responseData.status" src="/alerts/2.png" height="300px"
                                    width="300px"></v-img>
                                <v-img v-else src="/alerts/1.png" height="300px" width="300px"></v-img>

                            </v-col>
                        </v-row>
                    </center>
                </div>


                <div justify="center" align="center">
                    <div v-if="responseData">
                        <v-col>
                            <v-col>
                                {{ responseData.file }}
                            </v-col>
                            <v-col>
                                {{ dateTime(responseData.date) }}
                            </v-col>
                            
                        </v-col>
                    </div>
                    <div v-else>
                        <v-progress-linear v-if="loading" class="mt-4" indeterminate
                            color="yellow darken-2"></v-progress-linear>
                    </div>
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


        async submit() {
            this.loading = true;
            const formData = new FormData()
            formData.append('file', this.selectedImage);
            
            
            await axios.post('/fabric/api/v1/isdefective', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.responseData = response.data;
                    // this.responseData.input_image = `data:image/jpeg;base64,${this.responseData.input_image}`;
                    // this.responseData.reconstruct_image = `data:image/jpeg;base64,${this.responseData.reconstruct_image}`;
                    this.loading = false;
                    console.log(response.data);
                } else {
                    this.responseData = null;
                    this.loading = false;
                }

            }).catch((error) => {
                this.responseData = null;
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

        getImageUrl() {
            const x = `data:image/jpeg;base64,${this.responseData.input_image}`
            console.log(x);
            return x;
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