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
            <v-col cols="6">
                <v-card-title>
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

            <v-col cols="2"></v-col>

            <v-col cols="4">
                <Schema36
                    :places="placesForRoute"
                ></Schema36>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import Schema36 from "./Schema36";
    export default {
        components: {
            Schema36
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
                    { text: 'Время', value: 'departure_time' },
                ],
                items: [],
                placesForRoute: []
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
                this.getPlacesForRoute(item.id);
            },
            getTicketsForToday(){
                axios.get(`${this.$apiUrl}cashier/tickets/get-tickets-for-today`)
                .then(res => {
                    this.items = res.data;
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getPlacesForRoute(car_travel_id){
                axios.get(`${this.$apiUrl}cashier/car-travel/${car_travel_id}/get-all-places-for-route`)
                .then(res => {
                    this.placesForRoute = res.data;
                })
                .catch(err => {
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

<style scoped>

</style>