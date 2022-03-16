<template>
    <v-dialog
            v-model="changeCarPriceDialog"
            persistent
            max-width="775"
    >
        <v-card>
            <v-card-text id="changeCarDialog">
                <v-row>
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
                successDialog: false
            }
        },
        props: [
            'changeCarPriceDialog', 'carTravelId'
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

                    for(let i = 0; i<this.places.length; i++) {
                        formData.append('places[]', JSON.stringify(this.places[i]));
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
            }
        },
        created() {
            this.getFreePlacesForTravel();
        }
    }
</script>

<style scoped>

</style>