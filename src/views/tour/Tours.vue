<template>
    <v-container class="mt-2">
        <v-row>
            <v-col cols="6">
                <h4>Плановые туры</h4>
            </v-col>

            <v-col v-if="user.type_id === 4" cols="6" class="text-right">
                <router-link
                        class="btn green"
                        to="/tours/lists/create"
                >
                    <span class="mdc-button__label">Создать тур</span>
                </router-link>
            </v-col>
        </v-row>

        <SearchTours></SearchTours>

        <v-row>
            <v-col cols="3" v-for="(item,i) in tours" :key="i">
                <v-card
                        :loading="loading"
                        class="mx-auto"
                        max-width="374"
                >
                    <template slot="progress">
                        <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-img
                            height="100"
                            :src="`http://194.4.56.241:8888/${item.images[0].image}`"
                    ></v-img>

                    <v-card-title>
                        <v-row>
                            <v-col cols="12">
                                <div class="direction_div_car_price">
                                    <div class="direction_div_car">
                                        <span class="direction_car_number">{{ item.car.state_number }}</span>
                                    </div>
                                    <div class="direction_div_price">
                                        <span class="direction_price">&#8376; {{ item.tour_price }}</span>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <span class="direction_departure_time">
                                        {{ moment(item.departure_time).format('LLL') }}
                                    </span>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" class="text-left">
                                <div class="tour_direction" style="margin-bottom: 10px;">
                                    <div>
                                        <v-icon style="margin-right: 10px;">mdi-map-marker</v-icon>
                                    </div>

                                    <div>
                                        <strong>{{ item.city.name }}</strong>,
                                        <span>{{item.meeting_place.title}}</span>
                                    </div>
                                </div>

                                <div class="tour_direction">
                                    <div>
                                        <v-icon style="margin-right: 10px;">mdi-office-building-marker</v-icon>
                                    </div>

                                    <div>
                                        <strong>{{ item.resting_place.title }}</strong>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <span class="card_car_info_span__success">Свободно: {{ item.stats.countFreePlaces }}</span>
                            </v-col>

                            <v-col>
                                <span class="card_car_info_span__danger">Занято: {{ item.stats.countSoldPlaces }}</span>
                            </v-col>
                        </v-row>

                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="deep-purple lighten-2"
                                :to="`/tours/lists/${item.id}`" link
                        >
                            Посмотреть
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="red"
                                v-if="item.stats.countSoldPlaces === 0 && user.type_id === 4"
                                @click="deleteTour(item.id)"
                        >
                            Удалить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>



        <router-view></router-view>

        <WaitingLoader></WaitingLoader>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import SearchTours from "../../components/SearchTours";
    import moment from 'moment';
    import 'moment/locale/ru'
    export default {
        components: {
            WaitingLoader,
            SearchTours
        },
        data(){
            return {
                tours: [],
                user: [],
                loading: false,
                overlay: false,
                moment: moment
            }
        },
        methods: {
            getTours(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}tours/get-tours`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.tours = res.data;
                        console.log('tours', this.tours)
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        console.log(err)
                    })
            },
            deleteTour(tour_id){
                if(confirm("Вы действительно хотите удалить?")) {
                    this.$store.commit('setOverlay', true);
                    axios.get(`${this.$apiUrl}tours/${tour_id}/destroy`)
                        .then(res => {
                            this.$store.commit('setOverlay', false);
                            console.log(res);
                            this.$router.go(this.$router.currentRoute)
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            console.log(err);
                        })
                }
            }
        },
        created() {
            this.user = this.$store.getters.getUserData;
            this.getTours();
        }
    }
</script>

<style>
    .card_car_info_span__success {
        color: green;
        font-weight: bold;
    }
    .card_car_info_span__danger{
        color: #cc0000;
        font-weight: bold;
    }
    .tour_direction {
        display: inline-flex;
    }
</style>