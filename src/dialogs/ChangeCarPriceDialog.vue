<template>
    <v-dialog
            v-model="changeCarPriceDialog"
            persistent
            max-width="775"
    >
        <v-card>
            <v-card-text id="changeCarDialog">
                <v-row>
                    <v-col cols="12">
                        <h4 style="text-align: center;">Редактировать данные о поездки</h4>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox
                                    v-model="changeDepartureTime"
                                    label="Изменить дата отправление"
                                ></v-checkbox>
                                <div v-if="changeDepartureTime">
                                    <span><strong>Сейчас:</strong> {{ departure_time }}</span><br>
                                    <span><strong>Будет:</strong></span>&nbsp;<input id="departure_time" style="border: 2px solid #000; border-radius: 6px;" type="datetime-local" v-model="departure_time">
                                </div>

                            </v-col>

                            <v-col cols="6">
                                <v-checkbox
                                        v-model="changeDestinationTime"
                                        label="Изменить дата прибытие"
                                ></v-checkbox>
                                <div v-if="changeDestinationTime">
                                    <span><strong>Сейчас:</strong> {{ destination_time }}</span><br>
                                    <span><strong>Будет:</strong></span>&nbsp;<input id="destination_time" style="border: 2px solid #000; border-radius: 6px;" type="datetime-local" v-model="destination_time">
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12" class="text-center mt-4">
                        <h4>Изменить цены </h4>
                        <v-data-table
                                :items="places"
                                :headers="headers"
                                :search="search"
                                :loading="isLoaded"
                                ref="bookingTickets"
                                loading-text="Загружается... Пожалуйста подождите"
                        >
                            <template v-slot:item.number = "{ item }">
                                <div v-if="carTravel.car.car_type_id === 2">
                                    {{ checkPlaceForUpperOrLow(item.number) }} {{ checkPlaceForUpperOrLower(item.number) }}
                                </div>

                                <div v-if="carTravel.car.car_type_id !== 2">
                                    {{ item.number }}
                                </div>
                            </template>

                            <template v-slot:item.new_price = "{ item }">
                                <v-text-field
                                    label="Новая цена"
                                    v-model="item.new_price"
                                    v-mask="'#####'"
                                ></v-text-field>
                            </template>
                        </v-data-table>
                    </v-col>

                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="btn gray"
                        @click="cancel"
                >
                    Отмена
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        @click="changeCarPrice()"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>
        </v-card>

        <SuccessDialog :successDialog="successDialog"></SuccessDialog>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import SuccessDialog from "./SuccessDialog";
    import moment from 'moment'
    export default {
        components: {
            SuccessDialog
        },
        data(){
            return {
                carLists: [],
                car_id: 0,
                places: [],
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Место', value: 'number'},
                    {text: 'Текущая цена', value: 'price'},
                    {text: 'Новая цена', value: 'new_price'},
                ],
                search: '',
                isLoaded: false,
                successDialog: false,
                changeDepartureTime: false,
                changeDestinationTime: false,
                moment: moment,
                departure_time: this.carTravel.departure_time,
                destination_time: this.carTravel.destination_time,
            }
        },
        props: [
            'changeCarPriceDialog', 'carTravelId', 'carTravel'
        ],
        methods: {
            getFreePlacesForTravel(){
                axios.get(`${this.$apiUrl}cashier/intercity/${this.carTravelId}/get-list-places-for-change-prices`)
                    .then(res => {
                        console.log('res', res.data)
                        this.places = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            changeCarPrice(){
                console.log('places', this.places)
                if(confirm("Вы уверены ?")) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();

                    formData.append('carTravelId', this.carTravelId);

                    for(let i = 0; i<this.places.length; i++) {
                        formData.append('places[]', JSON.stringify(this.places[i]));
                    }
                    if(this.changeDepartureTime) {
                        formData.append('departure_time', this.departure_time);
                    }
                    if(this.changeDestinationTime) {
                        formData.append('destination_time', this.destination_time);
                    }

                    axios.post(`${this.$apiUrl}cashier/intercity/changing-prices-for-current-travel`, formData)
                        .then(res => {
                            this.$store.commit('setOverlay', false);
                            console.log('changing_prices',res);
                            this.changeCarPriceDialog = false;
                            this.successDialog = true;

                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            console.log(err)
                        })
                }
            },
            cancel(){
                this.changeCarPriceDialog = false;
                this.$router.go(this.$router.currentRoute)
            },
            checkPlaceForUpperOrLower(place){
                if (this.carTravel.car.car_type_id === 2) {
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
        },
        created() {
            this.getFreePlacesForTravel();
        }
    }
</script>

<style scoped>

</style>