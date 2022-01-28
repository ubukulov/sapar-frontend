<template>
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
                from_city_id: 0,
                to_city_id: 0,
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
            currentDateTime(){
                let d = new Date();
                return d.getFullYear()+ "-" + (((d.getMonth()+1) < 10)?"0":"") + (d.getMonth()+1) + "-" + ((d.getDate() < 10)?"0":"") + d.getDate() +"T"+ ((d.getHours() < 10)?"0":"") + d.getHours() + ":"+ ((d.getMinutes() < 10)?"0":"") + d.getMinutes();
            },
            getTravelsByFilter(){
                if (this.from_city_id !== 0 && this.to_city_id !== 0) {
                    this.$parent.travels = [];
                    let formData = new FormData();
                    formData.append('from_city_id', this.from_city_id);
                    formData.append('to_city_id', this.to_city_id);
                    formData.append('departure_time', this.departure_time);
                    this.$store.commit('setOverlay', true);
                    axios.post(`${this.$apiUrl}cashier/intercity/get-travels-by-filter`, formData)
                        .then(res => {
                            this.$store.commit('setOverlay', false);
                            this.$parent.travels = res.data;
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            console.log(err)
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