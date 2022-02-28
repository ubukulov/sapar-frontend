<template>
    <v-card>

        <SearchTrips></SearchTrips>

        <v-row>
            <v-col cols="7">
                <v-card-title>
                    Билеты на сегодня
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Поиск"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="travels"
                        :search="search"
                        :loading="isLoaded"
                        :single-expand="singleExpand"
                        :expanded.sync="expanded"
                        show-expand
                        loading-text="Загружается... Пожалуйста подождите"
                        @click:row="showItemData"
                >

                    <template v-slot:item.place = "{ item }">
                        {{ item.count_free_places }} / {{ item.car.car_type_count_places }}
                    </template>

                    <template v-slot:item.price = "{ item }">
                        {{ item.min_price }} - {{ item.max_price }}
                    </template>

                    <template v-slot:item.price = "{ item }">
                        {{ item.min_price }} - {{ item.max_price }}
                    </template>

                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length" style="padding: 10px 20px;">
                            <p style="margin-bottom: 15px;"><strong>Информация по поездку: </strong> {{ item.id }}</p>
                            <table class="table table-bordered">
                                <thead>
                                <th>Компания</th>
                                <th>Номер машины</th>
                                <th>Багаж</th>
                                <th>Телевизор</th>
                                <th>Кондиционер</th>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>
                                        <span style ><strong>{{ item.company_car.company.title }}</strong></span>
                                    </td>
                                    <td>
                                        <span>{{ item.car.state_number }}</span>
                                    </td>
                                    <td>
                                        <span v-if="item.car.baggage === 1">Есть</span>
                                        <span v-else>Нет</span>
                                    </td>
                                    <td>
                                        <span v-if="item.car.tv === 1">Есть</span>
                                        <span v-else>Нет</span>
                                    </td>
                                    <td>
                                        <span v-if="item.car.conditioner === 1">Есть</span>
                                        <span v-else>Нет</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </template>
                </v-data-table>
            </v-col>

            <v-col cols="4" style="padding-bottom: 40px;">
                <v-row>
                    <v-col>
                        <v-checkbox
                                v-model="upperPlace"
                                label="Верхний"
                        ></v-checkbox>

                    </v-col>
                    <v-col>
                        <v-checkbox
                                v-model="lowerPlace"
                                label="Нижний"
                        ></v-checkbox>
                    </v-col>
                </v-row>

                <Schema4
                    v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 4"
                    :places="placesForRoute"
                    linkAfterAction="/cashier/tickets"
                ></Schema4>

                <Schema6
                        v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 6"
                        :places="placesForRoute"
                        linkAfterAction="/cashier/tickets"
                ></Schema6>

                <Schema7
                        v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 7"
                        :places="placesForRoute"
                        linkAfterAction="/cashier/tickets"
                ></Schema7>

                <Schema36
                        v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 36"
                        :places="placesForRoute"
                        linkAfterAction="/cashier/tickets"
                        :upperPlace="upperPlace"
                        :lowerPlace="lowerPlace"
                        :carTypeId="selected_item.car.car_type_id"
                ></Schema36>

                <Schema53
                        v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 53"
                        :places="placesForRoute"
                        linkAfterAction="/cashier/tickets"
                ></Schema53>

                <Schema62
                        v-if="Object.keys(selected_item).length > 0 && selected_item.car.car_type_count_places === 62"
                        :places="placesForRoute"
                        linkAfterAction="/cashier/tickets"
                ></Schema62>
            </v-col>
        </v-row>

        <WaitingLoader></WaitingLoader>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Schema4 from "../schemes/Schema4";
    import Schema6 from "../schemes/Schema6";
    import Schema7 from "../schemes/Schema7";
    import Schema36 from "../schemes/Schema36";
    import Schema53 from "../schemes/Schema53";
    import Schema62 from "../schemes/Schema62";
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import SearchTrips from "../../components/SearchTrips";
    export default {
        components: {
            WaitingLoader,
            Schema4,
            Schema6,
            Schema7,
            Schema36,
            Schema53,
            Schema62,
            SearchTrips
        },
        data(){
            return {
                cities: [],
                from_city_id: 0,
                to_city_id: 0,
                stations1: [],
                stations2: [],
                from_station_id: 0,
                to_station_id: 0,
                dialog: false,
                errors: [],
                overlay: false,
                isLoaded: false,
                search: '',
                headers: [
                    {
                        text: 'Откуда',
                        align: 'start',
                        filterable: false,
                        value: 'from.city',
                    },
                    { text: 'Куда', value: 'to.city' },
                    { text: 'Место', value: 'place' },
                    { text: 'Цена', value: 'price' },
                    { text: 'Дата отправление', value: 'departure_date' },
                    { text: 'Время', value: 'departure_time' },
                    { text: '', value: 'data-table-expand' }
                ],
                travels: [],
                selected_item: [],
                placesForRoute: [],
                upperPlace: true,
                lowerPlace: true,
                expanded: [],
                singleExpand: false,
            }
        },
        methods: {
            getCities(){
                axios.get(`${this.$apiUrl}cashier/cities/list`)
                    .then(res => {
                        this.cities = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getStationsForCity(city_id, type = false){
                axios.get(`${this.$apiUrl}cashier/cities/${city_id}/get-stations`)
                    .then(res => {
                        if (type) {
                            this.stations2 = res.data;
                        } else {
                            this.stations1 = res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            showItemData(item){
                this.selected_item = item;
                this.getPlacesForRoute(item.id);
            },
            getTicketsForToday(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/tickets/get-tickets-for-today`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.travels = res.data;
                    if(this.travels.length !== 0) {
                        this.selected_item = this.travels[0];
                        this.getPlacesForRoute(this.travels[0].id);
                    }
                })
                .catch(err => {
                    this.$store.commit('setOverlay', false);
                    console.log(err)
                })
            },
            getPlacesForRoute(car_travel_id){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/car-travel/${car_travel_id}/get-all-places-for-route`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.placesForRoute = res.data;
                })
                .catch(err => {
                    this.$store.commit('setOverlay', false);
                    console.log(err)
                })
            }
        },
        created() {
            this.getCities();
            this.getTicketsForToday();
        }
    }
</script>

<style>
.active_bg {
    background: green;
    color: #fff;
}
.place {
    width: 70px;
    height: 70px;
    background-position: center;
    background-size: contain;
    text-align: center;
    font-size: 25px;
    color: #fff;
    cursor: pointer;
}
.free_place{
    background-image: url("~@/assets/free_place70.png");
}
.taken_place{
    background-image: url("~@/assets/taken_place70.png");
}
.process_place {
    background-image: url("~@/assets/in_process_place70.png");
}

.not_place {
    height: 70px;
}
</style>