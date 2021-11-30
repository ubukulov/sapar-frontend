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

                    <v-card-title>{{ item.car.car_type }}</v-card-title>

                    <v-card-text>
                        <v-row
                                align="center"
                                class="mx-0"
                        >
                            <v-rating
                                    :value="4.5"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                            ></v-rating>

                            <div class="grey--text ms-4">
                                4.5 (413)
                            </div>
                        </v-row>

                        <div class="my-4 text-subtitle-1">
                            &#8376; {{ item.min_price }} - {{ item.max_price }}
                        </div>

                        <div>
                            <p v-if="item.car.tv === 1">• Телевизор - <span style="font-weight: bold; color: green;">есть</span></p>
                            <p v-if="item.car.conditioner === 1">• Кондиционер - <span style="font-weight: bold; color: green;">есть</span></p>
                            <p v-if="item.car.baggage === 1">• Багажник - <span style="font-weight: bold; color: green;">есть</span></p>
                        </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

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
                        <v-btn
                                color="red lighten-2"
                        >
                            Удалить
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="deep-purple lighten-2"
                        >
                            Посмотреть
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <router-view></router-view>

            <WaitingLoader></WaitingLoader>

        </v-row>
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
            }
        },
        methods: {
            getTravels(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/get-travels-upcoming`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.travels = res.data;
                    console.log(this.travels)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            this.getTravels();
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