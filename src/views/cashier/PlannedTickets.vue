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

        <SearchTrips></SearchTrips>

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
                        :items="travels"
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
    import SearchTrips from "../../components/SearchTrips";
    export default {
        components: {
            Schema4,
            Schema6,
            Schema7,
            Schema36,
            Schema53,
            Schema62,
            WaitingLoader,
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
                travels: [],
                user: [],
                selected_item: [],
                placesForRoute: [],
                upperPlace: true,
                lowerPlace: true,
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
                        this.travels = res.data;
                        this.selected_item = this.travels[0];
                        this.getPlacesForRoute(this.travels[0].id);
                        console.log('selected_item', this.selected_item)
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
            checkPlaceForUpperOrLower(place){
                if (this.selected_item.count_free_places === 36) {
                    let upperPlaces = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
                    let lowerPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,35,36];
                    for(let i = 0; i<upperPlaces.length; i++) {
                        if (upperPlaces[i] === place) {
                            return '(верхний)';
                        }
                    }
                    for(let i = 0; i<lowerPlaces.length; i++) {
                        if (lowerPlaces[i] === place) {
                            return '(нижний)';
                        }
                    }
                } else {
                    return '';
                }
            },
            checkPlaceForUpperOrLow(place){
                if(place > 32) {
                    return 0;
                }
                if(place < 17) {
                    return place;
                }
                if (place > 16 && place < 32) {
                    let uItems = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
                    for(let i = 0; i < uItems.length; i++) {
                        if (uItems[i] === place) {
                            return uItems[i] - 16;
                        }
                    }
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