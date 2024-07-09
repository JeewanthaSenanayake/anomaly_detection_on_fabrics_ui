<template>
    <v-container>

        <H1 class="text-center">Testing Queue</H1>

        <v-card class="my-5 mx-5 pb-2" elevation="2" dark>
            <v-card-title>
                <H4 v-if="loading">Predicting Image :- {{ getImgName(queImgId) }}</H4>
            </v-card-title>
            <center v-if="loading1"><v-btn color="green" class="mt-2 mb-3" @click="callAllImg(0)">Start</v-btn></center>
            <div>
                <v-progress-linear v-if="loading" class="mt-4 mb-4" indeterminate
                    color="yellow darken-2"></v-progress-linear>
                <div v-if="!responseData" justify="center" align="center">
                    <!-- <v-img v-if="selectedImage" :src="imgeUrl" height="300px" width="300px"></v-img> -->
                </div>
                <div v-else>
                    <center>
                        <v-row class="mt-3">
                            <v-col cols="4">
                                <v-img :src="`data:image/jpeg;base64,${responseData.input_image}`" height="300px"
                                    width="300px"></v-img>
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
                            <v-col>
                                <v-btn v-if="responseData.status" color="green" class="mt-2 mb-3" @click="()=>{queImgId++;loading = true}">Continue</v-btn>
                            </v-col>
                        </v-col>
                    </div>

                </div>
            </div>

        </v-card>

    </v-container>
</template>

<script>
import axios from '@/service/axiosConfig';

export default {
    name: 'TestComponent',

    data: () => ({
        selectedImage: null,
        responseData: null,
        
        loading: false,
        loading1: true,
        queImgId: 0,
        imagePaths: [
            '/images/000.png',
            '/images/001.png',
            '/images/002.png',
            '/images/003.png',
            '/images/004.png',
            '/images/005.png',
            '/images/006.png',
            '/images/007.png'
        ]
    }),

    methods: {

        getImgName(i) {
            return this.imagePaths[i].split('/').pop();
        },

        async fetchImageAsBlob(url) {
            const response = await fetch(url);
            const blob = await response.blob();
            return blob;
        },

        async callAllImg(i) {
            this.loading1 = false;
            if (i == 0) {
                this.queImgId=0;
                this.loading = true;
            }
            console.log(this.imagePaths.length)
            var img = await this.fetchImageAsBlob(this.imagePaths[i])
            if (img) {
                const fileName = this.imagePaths[i].split('/').pop();
                this.submit(img, fileName);
            } else {
                console.log("Error in fetching image");
            }
        },

        async submit(img, fileName) {

            console.log("&&&&&&&&&&&&&&", img, fileName);
            const formData = new FormData()

            formData.append('file', img);


            await axios.post('/fabric/api/v1/isdefective', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.responseData = response.data;
                    this.responseData.file = fileName;
                    console.log(response.data);
                    if(!this.responseData.status){
                        this.queImgId++;
                    }else{
                        this.loading = false;
                    }
                } else {
                    this.responseData = null;
                }     

            }).catch((error) => {
                this.responseData = null;
                console.log(error);
                this.queImgId++;
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
        imgeUrl() {
            return URL.createObjectURL(this.selectedImage);
        },
    },

    watch: {
        queImgId() {
            if (this.queImgId < this.imagePaths.length) {
                this.callAllImg(this.queImgId);
            } else {
                this.loading1= true;
                this.loading = false;
                
            }

        }
    },

};
</script>