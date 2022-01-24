<template>
    <v-card style="padding: 10px;">
        <!--<v-row>
            <v-col cols="2">
                <v-select
                        :items="cities"
                        label="Выберите город"
                        :hint="`${cities.id}, ${cities.name}`"
                        item-value="id"
                        v-model="from_city_id"
                        prepend-icon="mdi-map-marker"
                        item-text="name"
                        @change="getStationsForCity(from_city_id)"
                        dense
                        solo
                ></v-select>
            </v-col>

            <v-col cols="2">
                <v-select
                        :items="stations1"
                        label="Выберите станцию"
                        :hint="`${stations1.id}, ${stations1.name}`"
                        item-value="id"
                        v-model="from_station_id"
                        prepend-icon="mdi-location"
                        item-text="name"
                        dense
                        solo
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-select
                        :items="cities"
                        label="Выберите город"
                        :hint="`${cities.id}, ${cities.name}`"
                        item-value="id"
                        v-model="to_city_id"
                        prepend-icon="mdi-flag"
                        item-text="name"
                        @change="getStationsForCity(to_city_id, true)"
                        dense
                        solo
                ></v-select>
            </v-col>

            <v-col cols="2">
                <v-select
                        :items="stations2"
                        label="Выберите станцию"
                        :hint="`${stations2.id}, ${stations2.name}`"
                        item-value="id"
                        v-model="to_station_id"
                        prepend-icon="mdi-location"
                        item-text="name"
                        dense
                        solo
                ></v-select>
            </v-col>
        </v-row>-->

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
            <v-col cols="7">
                <v-card-title>
                    Запланированные билеты
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
                        :items="items"
                        :search="search"
                        :loading="isLoaded"
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
    import Schema4 from "./Schemes/Schema4";
    import Schema6 from "./Schemes/Schema6";
    import Schema7 from "./Schemes/Schema7";
    import Schema36 from "./Schemes/Schema36";
    import Schema53 from "./Schemes/Schema53";
    import Schema62 from "./Schemes/Schema62";
    import WaitingLoader from "../../dialogs/WaitingLoader";
    export default {
        components: {
            Schema4,
            Schema6,
            Schema7,
            Schema36,
            Schema53,
            Schema62,
            WaitingLoader
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
                        text: 'Номер машины',
                        align: 'start',
                        filterable: false,
                        value: 'car.state_number',
                    },
                    { text: 'Фирмы', value: 'company_car.company.title' },
                    { text: 'Место', value: 'place' },
                    { text: 'Цена', value: 'price' },
                    { text: 'Дата отправление', value: 'departure_date' },
                    { text: 'Время', value: 'departure_time' },
                ],
                items: [],
                user: [],
                selected_item: [],
                placesForRoute: [],
                upperPlace: true,
                lowerPlace: true,
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
            getTicketsForNextDays(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/tickets/get-tickets-for-next-days`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.items = res.data;
                        this.getPlacesForRoute(this.items[0].id);
                        console.log(res.data)
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
            },
            getTravelsByFilter(){
                if (this.from_city_id !== 0 && this.to_city_id !== 0) {
                    this.items = [];
                    let formData = new FormData();
                    formData.append('from_city_id', this.from_city_id);
                    formData.append('to_city_id', this.to_city_id);
                    formData.append('filter_id', this.filter_id);
                    this.$store.commit('setOverlay', true);
                    axios.post(`${this.$apiUrl}cashier/intercity/get-travels-by-filter`, formData)
                        .then(res => {
                            this.$store.commit('setOverlay', false);
                            this.items = res.data;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        },
        created() {
            this.getCities();
            this.getTicketsForNextDays();
            this.user = this.$store.getters.getUserData;
            this.from_city_id = this.user.city_id;
        }
    }
</script>

<style scoped>

</style>