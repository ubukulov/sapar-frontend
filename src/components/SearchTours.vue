<template>
    <v-row>
        <v-col cols="3">
            <v-select
                    :items="cities"
                    label="Выберите город"
                    :hint="`${cities.id}, ${cities.name}`"
                    item-value="id"
                    v-model="city_id"
                    prepend-icon="mdi-map-marker"
                    item-text="name"
                    dense
                    solo
                    @change="getRestingPlaces"
            ></v-select>
        </v-col>
        <v-col cols="5">
            <v-select
                    :items="resting_places"
                    label="Выберите тур"
                    :hint="`${resting_places.id}, ${resting_places.title}`"
                    item-value="id"
                    v-model="resting_place_id"
                    prepend-icon="mdi-location"
                    item-text="title"
                    dense
                    solo
            ></v-select>
        </v-col>

        <v-col cols="2">
            <datetime
                    input-class="form-control"
                    type="date"
                    format="yyyy-MM-dd"
                    value-zone="Asia/Almaty"
                    :phrases="{ok: 'ОК', cancel: 'Отмена'}"
                    v-model="departure_time"
            ></datetime>
        </v-col>

        <v-col cols="2">
            <v-btn
                    @click="getTravelsByFilter()"
            >
                Показать
            </v-btn>
        </v-col>

        <v-col cols="12">
            <v-alert
                    v-if="info_html !== ''"
                    border="bottom"
                    colored-border
                    type="warning"
                    elevation="2"
            >
                <strong v-html="info_html"></strong>
            </v-alert>
        </v-col>
    </v-row>
</template>

<script>
    import { Datetime } from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import axios from "axios";
    export default {
        components: {
            datetime: Datetime,
        },
        data(){
            return {
                departure_time: this.currentDateTime(),
                cities: [],
                resting_places: [],
                city_id: 0,
                resting_place_id: 0,
                user: [],
                tours: [],
                info_html: ''
            }
        },
        computed: {
            to_cities(){
                return this.cities.filter((item) => {
                    return item.id !== this.city_id;
                })
            }
        },
        methods: {
            currentDateTime(){
                let d = new Date();
                return d.getFullYear()+ "-" + (((d.getMonth()+1) < 10)?"0":"") + (d.getMonth()+1) + "-" + ((d.getDate() < 10)?"0":"") + d.getDate() +"T"+ ((d.getHours() < 10)?"0":"") + d.getHours() + ":"+ ((d.getMinutes() < 10)?"0":"") + d.getMinutes();
            },
            getTravelsByFilter(){
                if (this.city_id !== 0 && this.resting_place_id !== 0) {
                    this.$parent.tours = [];
                    let formData = new FormData();
                    formData.append('city_id', this.city_id);
                    formData.append('resting_place_id', this.resting_place_id);
                    formData.append('departure_time', this.departure_time);
                    this.$store.commit('setOverlay', true);
                    axios.post(`${this.$apiUrl}tours/searching`, formData)
                        .then(res => {
                            this.info_html = '';
                            this.$store.commit('setOverlay', false);
                            this.tours = res.data;
                            this.$parent.tours = res.data;
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            console.log(err)
                            if(err.response.status === 400) {
                                this.info_html = err.response.data;
                            }
                        })
                }
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
            getRestingPlaces(){
                axios.get(`${this.$apiUrl}tours/${this.city_id}/get-resting-places`)
                    .then(res => {
                        this.resting_places = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        },
        created(){
            this.getCities();
            this.user = this.$store.getters.getUserData;
            this.from_city_id = this.user.city_id;
        }
    }
</script>

<style scoped>

</style>