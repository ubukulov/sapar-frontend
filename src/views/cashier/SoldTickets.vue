<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Проданные билеты
                    <v-spacer></v-spacer>
                    <v-select
                            :items="filters"
                            :hint="`${filters.id}, ${filters.title}`"
                            item-value="id"
                            v-model="filter_id"
                            item-text="title"
                            @change="getTicketsByFilterId()"
                    ></v-select>
                </v-card-title>

                <v-data-table
                        :items="actualSoldTicketsForToday"
                        :headers="headers"
                        :search="search"
                        :loading="isLoaded"
                        loading-text="Загружается... Пожалуйста подождите"
                >
                    <template v-slot:item.number = "{ item }">
                        <div v-if="item.car_type_id === 2">
                            {{ checkPlaceForUpperOrLow(item.number) }} {{ checkPlaceForUpperOrLower(item.number, item.car_type_id) }}
                        </div>

                        <div v-if="item.car_type_id !== 2">
                            {{ item.number }}
                        </div>
                    </template>

                    <template v-slot:item.dt = "{ item }">
                        {{ item.dep_date }} / {{ item.dep_time }}
                    </template>

                    <template v-slot:item.print="{ item }">
                        <v-icon
                            title="Распечатать билет"
                            middle
                            @click="showPrintTicketWindow(item)"
                        >
                            mdi-printer
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <WaitingLoader></WaitingLoader>

        <PrintTicketDialog
            :ticket="ticket"
            :carTravel="carTravel"
            :dialog="dialog"
        ></PrintTicketDialog>

    </v-row>
</template>

<script>
    import axios from 'axios'
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import PrintTicketDialog from "../../dialogs/PrintTicketDialog";

    export default {
        components: {
            WaitingLoader,
            PrintTicketDialog,
        },
        data(){
            return {
                actualSoldTicketsForToday: [],
                headers: [
                    {
                        text: 'Номер машины',
                        align: 'start',
                        filterable: false,
                        value: 'state_number',
                    },
                    {text: 'От станции', value: 'from_station.name'},
                    {text: 'До станции', value: 'to_station.name'},
                    {text: 'Дата/время отправление', value: 'dt'},
                    {text: 'Место', value: 'number'},
                    {text: 'Цена', value: 'price'},
                    {text: 'Имя', value: 'first_name'},
                    {text: 'Телефон', value: 'phone'},
                    {text: 'ИИН', value: 'iin'},
                    {text: 'Печать', value: 'print'},
                ],
                isLoaded: false,
                dialog: false,
                search: '',
                filters: [
                    {
                        'title': 'Актуальные билеты',
                        'id': 0
                    },
                    {
                        'title': 'Запланированные билеты',
                        'id': 1
                    },
                    {
                        'title': 'История',
                        'id': 2
                    },
                ],
                filter_id: 0,
                carTravelId: 0,
                ticket: [],
                carTravel: [],
            }
        },
        methods: {
            getActualSoldTicketsForToday(){
                axios.get(`${this.$apiUrl}cashier/tickets/get-sold-tickets-for-today`)
                .then(res => {
                    this.actualSoldTicketsForToday = res.data;
                    console.log('ac', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getTicketsByFilterId(){
                this.actualSoldTicketsForToday = [];
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/tickets/${this.filter_id}/get-tickets-by-filter`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.actualSoldTicketsForToday = res.data;
                })
                .catch(err => {
                    this.$store.commit('setOverlay', false);
                    console.log(err)
                })
            },
            showPrintTicketWindow(item) {
                this.ticket = item;
                this.dialog = true;
                this.carTravelId = item.car_travel_id;
                this.getCarTravel();
            },
            getCarTravel(){
                axios.get(`${this.$apiUrl}cashier/car-travel/${this.carTravelId}/get-information-about-car-travel`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.carTravel = res.data[0];
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        console.log(err)
                    })
            },
            checkPlaceForUpperOrLow(place){
                if(place > 32) {
                    return 0;
                }
                if(place < 17) {
                    return place;
                }
                if (place > 16 && place < 32) {
                    let uItems = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
                    for(let i = 0; i < uItems.length; i++) {
                        if (uItems[i] === place) {
                            return uItems[i] - 16;
                        }
                    }
                }
            },
            checkPlaceForUpperOrLower(place, car_type_id){
                if (car_type_id === 2) {
                    let upperPlaces = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
                    let lowerPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,35,36];
                    for(let i = 0; i<upperPlaces.length; i++) {
                        if (upperPlaces[i] === place) {
                            return '(верхний)';
                        }
                    }
                    for(let i = 0; i<lowerPlaces.length; i++) {
                        if (lowerPlaces[i] === place) {
                            return '(нижний)';
                        }
                    }
                } else {
                    return '';
                }
            },
        },
        created() {
            this.getActualSoldTicketsForToday();
        }
    }
</script>

<style scoped>

</style>