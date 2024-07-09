<template>
    <v-container>
        <H1 class="text-center mb-3">Production History</H1>
        
        <v-card v-if="historyData">
            <v-card-title>
                <H2 class="my-3">Production Line Accuracy {{ historyData.accuracy }}%</H2>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" item-key="id">

                <template v-slot:[`item.status`]="{ item }">
                    <v-chip :color="item.status ? `red` : `green`" dark>
                        {{ item.status ? 'Defective' : 'Not Defective' }}
                    </v-chip>
                </template>
                <template v-slot:[`item.date`]="{ item }">
                    {{ dateTime(item.date) }}
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-btn color="orange" small @click="procuts(item.id)">Action</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import axios from '@/service/axiosConfig';

export default {
    name: 'HistoryComponent',
    data: () => ({
        historyData: true,
        loading: false,
        search: '',
        headers: [
            {
                text: 'Name',
                align: 'start',
                value: 'file',
            },
            { text: 'Date', value: 'date',align: 'start', },
            { text: 'Status', value: 'status',align: 'start', },
            { text: 'Action', value: 'action',align: 'start', }
        ],
        desserts: [],
    }),
    methods: {
        procuts(id) {
            this.$router.push({ name: 'ProductView' , params: { id }} );
        },
        async getHistory() {
            this.loading = true;
            await axios.get('/fabric/api/v1/productionhistory').then((response) => {
                if (response.status === 200) {
                    this.historyData = response.data;
                    this.desserts = this.historyData.history;
                    this.loading = false;
                    console.log(response.data);
                } else {
                    this.historyData = null;
                    this.loading = false;
                }
            }).catch((error) => {
                this.historyData = null;
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
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            };
            return date.toLocaleDateString(undefined, options);
        },
    },


    mounted() {
        this.getHistory();
    }
}
</script>