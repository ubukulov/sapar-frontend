<template>
    <v-card>
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
        </v-row>

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
                        :items="desserts"
                        :search="search"
                        :loading="isLoaded"
                        loading-text="Загружается... Пожалуйста подождите"
                        @click:row="showItemData"
                ></v-data-table>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import axios from 'axios'
    export default {
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
                        value: 'name',
                    },
                    { text: 'Фирмы', value: 'calories' },
                    { text: 'Место', value: 'fat' },
                    { text: 'Цена', value: 'carbs' },
                    { text: 'Время', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%',
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%',
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%',
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%',
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%',
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%',
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%',
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%',
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%',
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%',
                    },
                ],
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
            showItemData(value){
                console.log('item', value)
            },
            getTicketsForToday(){

            }
        },
        created() {
            this.getCities();
        }
    }
</script>

<style scoped>

</style>