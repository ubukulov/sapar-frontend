<template>
    <div class="container">
        <v-row>
            <v-col cols="6">
                <h4>Плановые поездки</h4>
            </v-col>

            <v-col cols="6" class="text-right">
                <router-link
                        class="btn green"
                        to="/cashier/intercity/create"
                >
                    <span class="mdc-button__label">Создать поездку</span>
                </router-link>
            </v-col>
        </v-row>

        <SearchTrips></SearchTrips>

        <v-row>
            <v-col cols="3" v-for="(item,i) in travels" :key="i">
                <v-card
                    :loading="loading"
                    class="mx-auto intercity"
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
                            :src="`http://194.4.56.241:8888/${item.car.image}`"
                    ></v-img>

                    <v-card-title>
                        <v-row>
                            <v-col cols="12">
                                <div class="direction_div_car_price">
                                    <div class="direction_div_car">
                                        <span class="direction_car_number">{{ item.car.state_number }}</span>
                                    </div>
                                    <div class="direction_div_price">
                                        <span class="direction_price">&#8376; {{ item.min_price }} - {{ item.max_price }}</span>
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
                            <v-col cols="12" class="direction_from_to">
                                <div class="direction_div_from">
                                    <p><span><strong>{{ item.from.city }}</strong></span></p>
                                    <p class="direction__station"><span>{{ item.from.station }}</span></p>
                                </div>

                                <div class="direction_div_middle_icon">
                                    <v-icon size="20">
                                        mdi-chevron-right-circle-outline
                                    </v-icon>
                                </div>

                                <div class="direction_div_to">
                                    <p><span><strong>{{ item.to.city }}</strong></span></p>
                                    <p class="direction__station"><span>{{ item.to.station }}</span></p>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="text-right">
                                <span class="card_car_info_span__success">Свободно: {{ item.count_free_places }}</span>
                            </v-col>

                            <v-col>
                                <span class="card_car_info_span__danger">Занято: {{ item.car.car_type_count_places - item.count_free_places }}</span>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="deep-purple lighten-2"
                                :to="`/cashier/intercity/${item.id}`" link
                                class="direction_detail_button"
                        >
                            Посмотреть
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                v-if="item.car.car_type_count_places - item.count_free_places == 0"
                                color="red"
                                @click="destroyTravel(item.id)"
                                class="direction_destroy"
                        >
                            Удалить
                        </v-btn>
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
    import SearchTrips from "../../components/SearchTrips";
    import moment from 'moment';
    import 'moment/locale/ru'
    export default {
        components: {
            WaitingLoader,
            SearchTrips
        },
        data(){
            return {
                travels: [],
                user: [],
                loading: false,
                overlay: false,
                moment: moment
            }
        },
        methods: {
            getTravels(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/${this.user.id}/get-travels-upcoming`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.travels = res.data;
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
            this.getTravels();
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
    .direction span {
        font-size: 12px;
    }
    .direction_price,.direction_car_number,.direction_departure_time {
        font-size: 14px;
    }
    .direction_div_car_price div {
        display: inline-flex;
        width: calc(100%/2);
    }
    .direction_div_car_price div:last-child {
        text-align: right;
    }
    .direction_from_to {
        display: inline-flex;
    }
    .direction_div_from,.direction_div_to {
        width: calc(100%/2);
    }
    .direction_div_to {
        text-align: right;
    }
    p{
        margin-bottom: 0px !important;
        font-size: 13px;
    }
    .direction__station {
        font-size: 11px;
    }
    .direction_div_middle_icon {
        display: flex;
    }
    .mdc-button__label {
        color: #fff;
    }
</style>