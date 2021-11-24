<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <router-link
                    class="btn btn-primary"
                    to="/cashier/intercity/create"
                >
                    <span class="mdc-button__label">Создать поездку</span>
                </router-link>

                <v-row>
                    <v-card
                            :loading="loading"
                            class="mx-auto my-12"
                            max-width="374"
                            v-for="(item,i) in travels"
                            :key="i"
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
                            src="http://localhost/car_images/1604063280FeLD9.jpg"
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

                            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>

                        <v-card-title>Дата и время отправление</v-card-title>

                        <v-card-text>
                            <v-chip-group
                                active-class="deep-purple accent-4 white--text"
                                column
                            >
                                <v-chip>{{ item.departure_time }}</v-chip>
                            </v-chip-group>
                        </v-card-text>

                        <v-card-actions>
                            <!--<v-btn
                                    color="deep-purple lighten-2"
                                    text
                                    @click="reserve"
                            >
                                Reserve
                            </v-btn>-->
                        </v-card-actions>
                    </v-card>
                </v-row>

                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                travels: [],
                loading: false,
            }
        },
        methods: {
            getTravels(){
                axios.get('http://localhost/api/v1/cashier/get-travels-upcoming')
                .then(res => {
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

</style>