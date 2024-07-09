<template>
    <v-container>

        <v-card class="pa-6 mt-6" elevation="2" dark>
            <div>
                <div>
                    <center>
                        <div>
                            <v-col>
                                <v-col>
                                    {{ responseDataNames.file }}
                                </v-col>
                                <v-col>
                                    {{ dateTime(responseDataNames.date) }}
                                </v-col>

                            </v-col>
                        </div>
                        <v-row class="mt-4 mb-4">
                            <v-col cols="4">
                                <v-img :src="`data:image/jpeg;base64,${responseData.input_image}`" height="300px"
                                    width="300px"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img :src="`data:image/jpeg;base64,${responseData.output_image}`" height="300px"
                                    width="300px"></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-img v-if="responseDataNames.status" src="/alerts/2.png" height="300px"
                                    width="300px"></v-img>
                                <v-img v-else src="/alerts/1.png" height="300px" width="300px"></v-img>

                            </v-col>
                        </v-row>
                    </center>
                </div>
            </div>

        </v-card>

    </v-container>
</template>

<script>
import axios from '@/service/axiosConfig';

export default {
    name: 'ProductComponent',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        responseData: null,
        responseDataNames: null,
        loading: false,
    }),

    methods: {

        async getData() {
            await axios.get(`/fabric/api/v1/getProductById/${this.id}`).then((response) => {
                if (response.status === 200) {
                    this.responseDataNames = response.data;
                    console.log(response.data);
                }
            });

            await axios.get(`/fabric/api/v1/productionhistory/${this.id}`).then((response) => {
                if (response.status === 200) {
                    this.responseData = response.data;
                    console.log(response.data);
                }
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

    created() {
        this.getData();
    }

};
</script>