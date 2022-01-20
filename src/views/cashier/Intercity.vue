<template>
    <div class="mt-2">
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

        <v-row>
            <v-col cols="2">
                <v-select
                        :items="cities"
                        label="Выберите город"
                        :hint="`${cities.id}, ${cities.name}`"
                        item-value="id"
                        v-model="from_city_id"
                        prepend-icon="mdi-map-marker"
                        item-text="name"
                        disabled
                        dense
                        solo
                ></v-select>
            </v-col>
            <v-col cols="2">
                <v-select
                        :items="to_cities"
                        label="Выберите город"
                        :hint="`${to_cities.id}, ${to_cities.name}`"
                        item-value="id"
                        v-model="to_city_id"
                        prepend-icon="mdi-location"
                        item-text="name"
                        dense
                        solo
                ></v-select>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="filters"
                        :hint="`${filters.id}, ${filters.title}`"
                        item-value="id"
                        v-model="filter_id"
                        solo
                        dense
                        item-text="title"
                ></v-select>
            </v-col>

            <v-col cols="2">
                <v-btn
                        @click="getTravelsByFilter()"
                >
                    Показать
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item,i) in travels" :key="i">
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
                            :src="`http://194.4.56.241:8888/${item.car.image}`"
                    ></v-img>

                    <v-card-title>
                        <v-row>
                            <v-col>
                                {{ item.car.car_type }}
                            </v-col>

                            <v-col>
                                &#8376; {{ item.min_price }} - {{ item.max_price }}
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-card-title style="justify-content: center;">{{ item.departure_time }}</v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="4" class="text-right">
                                <div><strong>{{ item.from.city }}</strong></div>
                                <div><span>{{item.from.station}}</span></div>
                            </v-col>

                            <v-col cols="4" class="text-center">
                                <v-icon size="40">
                                    mdi-chevron-right-circle-outline
                                </v-icon>
                            </v-col>

                            <v-col cols="4" class="text-left">
                                <div><strong>{{ item.to.city }}</strong></div>
                                <div><span>{{item.to.station}}</span></div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <span class="card_car_info_span__success">Свободно: {{ item.count_free_places }}</span>
                            </v-col>

                            <v-col>
                                <span class="card_car_info_span__danger">Занято: {{ item.car.car_type_count_places - item.count_free_places }}</span>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-btn
                                color="deep-purple lighten-2"
                                :to="`/cashier/intercity/${item.id}`" link
                        >
                            Посмотреть
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
    export default {
        components: {
            WaitingLoader
        },
        data(){
            return {
                travels: [],
                loading: false,
                overlay: false,
                cities: [],
                from_city_id: 0,
                to_city_id: 0,
                filters: [
                    {
                        'title': 'Сегодняшние поездки',
                        'id': 0
                    },
                    {
                        'title': 'Запланированные поезки',
                        'id': 1
                    },
                ],
                filter_id: 0,
                user: []
            }
        },
        computed: {
            to_cities(){
                return this.cities.filter((item) => {
                    return item.id !== this.from_city_id;
                })
            }
        },
        methods: {
            getTravels(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/get-travels-upcoming`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.travels = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getCities(){
                axios.get(`${this.$apiUrl}cashier/cities/list`)
                    .then(res => {
                        this.cities = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getTravelsByFilter(){
                if (this.from_city_id !== 0 && this.to_city_id !== 0) {
                    this.travels = [];
                    let formData = new FormData();
                    formData.append('from_city_id', this.from_city_id);
                    formData.append('to_city_id', this.to_city_id);
                    formData.append('filter_id', this.filter_id);
                    this.$store.commit('setOverlay', true);
                    axios.post(`${this.$apiUrl}cashier/intercity/get-travels-by-filter`, formData)
                        .then(res => {
                            this.$store.commit('setOverlay', false);
                            this.travels = res.data;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        },
        created() {
            this.getTravels();
            this.getCities();
            this.user = this.$store.getters.getUserData;
            this.from_city_id = this.user.city_id;
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