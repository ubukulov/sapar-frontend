<template>
    <div class="mt-2">
        <v-row>
            <v-col cols="12">
                <v-data-table
                        :items="listBookingPlaces"
                        :headers="headers"
                        :search="search"
                        :loading="isLoaded"
                        ref="bookingTickets"
                        loading-text="Загружается... Пожалуйста подождите"
                >
                    <template v-slot:item.first_name = "{ item }">
                        <v-text-field
                                label="Имя"
                                v-model="item.first_name"
                        ></v-text-field>
                    </template>

                    <template v-slot:item.phone = "{ item }">
                        <v-text-field
                                label="Телефон"
                                v-model="item.phone"
                        ></v-text-field>
                    </template>

                    <template v-slot:item.iin = "{ item }">
                        <v-text-field
                                label="ИИН"
                                counter="12"
                                v-mask="'############'"
                                v-model="item.iin"
                        ></v-text-field>
                    </template>

                </v-data-table>
            </v-col>

            <v-col cols="8" class="text-right">
                <strong>Общая сумма: {{ count * tour.seat_price }}тг</strong>
            </v-col>

            <v-col cols="4">
                <v-btn
                    @click="booking()"
                >Забронировать сейчас</v-btn>
            </v-col>
        </v-row>

        <TourBookingDialog :tourBookingDialog="tourBookingDialog"></TourBookingDialog>

        <WaitingLoader></WaitingLoader>
    </div>
</template>

<script>
    import axios from "axios";
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import TourBookingDialog from "../../dialogs/TourBookingDialog";
    export default {
        components: {
            WaitingLoader,
            TourBookingDialog
        },

        data(){
            return {
                listBookingPlaces: [],
                headers: [
                    {text: 'Место', value: 'number'},
                    {text: 'Имя', value: 'first_name'},
                    {text: 'Телефон', value: 'phone'},
                    {text: 'ИИН', value: 'iin'},
                ],
                search: '',
                isLoaded: false,
                tourBookingDialog: false,
                tourId: 0,
                tour: [],
                count: 0
            }
        },
        methods: {
            getTour(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}tours/${this.tourId}/get-information-about-tour`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.tour = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                        this.$store.commit('setOverlay', false);
                    })
            },
            getFreePlacesForBooking(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}tours/${this.tourId}/get-free-places-for-booking/${this.count}`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.listBookingPlaces = res.data;
                        console.log('listBookingPlaces', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                        this.$store.commit('setOverlay', false);
                    })
            },
            booking(){
                console.log('booking', this.listBookingPlaces)
                if(confirm("Вы уверены ?")) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();

                    for(let i = 0; i<this.listBookingPlaces.length; i++) {
                        formData.append('listBookingPlaces[]', JSON.stringify(this.listBookingPlaces[i]));
                    }
                    axios.post(`${this.$apiUrl}tours/${this.tourId}/booking-by-tour-company`, formData)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.tourBookingDialog = true;
                        console.log(res)
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        console.log(err)
                    })
                }
            }
        },
        created() {
            this.tourId = this.$route.params.tourId;
            this.count = this.$route.params.count;
            this.getTour();
            this.getFreePlacesForBooking();
        }
    }
</script>

<style scoped>

</style>