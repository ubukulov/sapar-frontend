<template>
    <div class="mt-2">
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
                        class="mx-auto my-12"
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
                            height="250"
                            :src="`http://194.4.56.241:8888/${item.images[0].image}`"
                    ></v-img>

                    <v-card-title>
                        <v-row>
                            <v-col>
                                {{ item.car.state_number }}
                            </v-col>

                            <v-col>
                                &#8376; {{ item.tour_price }}
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-card-title style="justify-content: center;">{{ item.departure_time }}</v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" class="text-left">
                                <div><strong>{{ item.city.name }}</strong></div>
                                <div><span>{{item.meeting_place.title}}</span></div>

                                <div><strong>{{ item.resting_place.title }}</strong></div>
                                <div><span></span></div>
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
                        <!--<v-btn
                                color="red"
                        >
                            Удалить
                        </v-btn>-->
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>



        <router-view></router-view>

        <WaitingLoader></WaitingLoader>
    </div>
</template>

<script>
    import axios from 'axios'
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import SearchTours from "../../components/SearchTours";
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
            }
        },
        methods: {
            getTours(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}tours/get-tours`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.tours = res.data;
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        console.log(err)
                    })
            },
            destroyTravel(car_travel_id){
                if(confirm("Вы действительно хотите удалить?")) {
                    this.$store.commit('setOverlay', true);
                    axios.get(`${this.$apiUrl}cashier/intercity/${car_travel_id}/destroy`)
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

<style scoped>
    .card_car_info_span__success {
        color: green;
        font-weight: bold;
    }
    .card_car_info_span__danger{
        color: #cc0000;
        font-weight: bold;
    }
</style>