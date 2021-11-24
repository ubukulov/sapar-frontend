<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                >
                    Выберите фирму и машину
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                >
                    Укажите направление
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Укажите цены
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                            class="mb-12"
                            color="lighten-1"
                            height="200px"
                    >
                        <v-row>
                            <v-col cols="2">
                                <v-select
                                        :items="companies"
                                        :hint="`${companies.id}, ${companies.title}`"
                                        item-value="id"
                                        label="Выберите фирму"
                                        v-model="company_id"
                                        @change="getCompanyCarLists()"
                                        item-text="title"
                                        dense
                                        solo
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-select
                                        :items="cars"
                                        label="Выберите автобус/машину"
                                        :hint="`${cars.id}, ${cars.number}`"
                                        item-value="id"
                                        v-model="car_id"
                                        :item-text="getFieldText"
                                        dense
                                        solo
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 2"
                    >
                        Далее
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                            class="mb-12"
                            color="lighten-1"
                            height="200px"
                    >
                        <v-row>
                            <v-col cols="2">
                                <v-select
                                        :items="cities"
                                        label="Выберите город"
                                        :hint="`${cities.id}, ${cities.name}`"
                                        item-value="id"
                                        v-model="city_id1"
                                        prepend-icon="mdi-location"
                                        item-text="name"
                                        @change="getStationsForCity(city_id1)"
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

                            <v-col cols="2">
                                <datetime input-class="form-control" type="datetime" format="yyyy-MM-dd HH:mm" value-zone="Asia/Almaty" :phrases="{ok: 'ОК', cancel: 'Отмена'}" v-model="departure_time"></datetime>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="2">
                                <v-select
                                        :items="cities"
                                        label="Выберите город"
                                        :hint="`${cities.id}, ${cities.name}`"
                                        item-value="id"
                                        v-model="city_id2"
                                        prepend-icon="mdi-location"
                                        item-text="name"
                                        @change="getStationsForCity(city_id2, true)"
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

                            <v-col cols="2">
                                <datetime input-class="form-control" type="datetime" format="yyyy-MM-dd HH:mm" value-zone="Asia/Almaty" :phrases="{ok: 'ОК', cancel: 'Отмена'}" v-model="destination_time"></datetime>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 3"
                    >
                        Далее
                    </v-btn>

                    <v-btn
                            text
                            @click="e1 = 1"
                    >
                        Назад
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-12"
                            color="lighten-1"
                            height="200px"
                            style="height: auto; padding: 10px;"
                    >
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col
                                            cols="2"
                                    >
                                        <v-text-field
                                                label="От"
                                                v-model="from_place"
                                                solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                            cols="2"
                                    >
                                        <v-text-field
                                                label="До"
                                                v-model="to_place"
                                                solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                            cols="2"
                                    >
                                        <v-text-field
                                                label="Цена билета"
                                                v-model="price"
                                                solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                            cols="2"
                                    >
                                        <v-btn
                                                class="btn indigo"
                                                @click="addToPricePlaces"
                                        >Готово</v-btn>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="6">
                                        <v-alert
                                                v-for="(item, i) in price_places" :key="i"
                                                dense
                                                text
                                                type="success"
                                        >
                                            <p>От {{ item.from}} до {{ item.to }}  -&#45;&#45; <strong>{{ item.price }} &#8376;</strong></p>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-btn
                            class="green btn btn-success"
                            @click="createTrip()"
                    >
                        Опубликовать поездку!
                    </v-btn>

                    <v-btn
                            text
                            @click="e1 = 2"
                    >
                        Назад
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-text>Поездка успешно оформлено!</v-card-text>
                <v-card-actions>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="closeDialog()"
                    >
                        Ок
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <!--<v-container>
        <v-row>
            <v-col cols="3">
                <v-select
                        :items="companies"
                        class="form-control"
                        :hint="`${companies.id}, ${companies.title}`"
                        item-value="id"
                        label="Выберите фирму"
                        v-model="company_id"
                        @change="getCompanyCarLists()"
                        item-text="title"
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                        :items="cars"
                        class="form-control"
                        label="Выберите автобус/машину"
                        :hint="`${cars.id}, ${cars.number}`"
                        item-value="id"
                        v-model="car_id"
                        item-text="number"
                ></v-select>
            </v-col>

            <v-col
                    cols="3"
            >
                <v-date-picker
                        v-model="dates"
                        multiple
                ></v-date-picker>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col
                            cols="2"
                    >
                        <v-text-field
                                label="От"
                                v-model="from_place"
                                solo
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="2"
                    >
                        <v-text-field
                                label="До"
                                v-model="to_place"
                                solo
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="2"
                    >
                        <v-text-field
                                label="Цена билета"
                                v-model="price"
                                solo
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="2"
                    >
                        <v-btn
                                @click="addToPricePlaces"
                        >Готово</v-btn>
                    </v-col>

                    <v-col
                        cols="3"
                    >
                        <v-btn
                                class="btn btn-success"
                        >
                            Опубликовать поездку!
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-alert
                                v-for="(item, i) in price_places" :key="i"
                                dense
                                text
                                type="success"
                        >
                            <p>От {{ item.from}} до {{ item.to }}  -&#45;&#45; <strong>{{ item.price }} т</strong></p>
                        </v-alert>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="4">

            </v-col>
        </v-row>
    </v-container>-->
</template>

<script>
    import axios from 'axios'
    import { Datetime } from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        components: {
            datetime: Datetime
        },
        data(){
            return {
                cars: [],
                companies: [],
                car_id: 0,
                company_id: 0,
                dates: [],
                menu: false,
                from_place: null,
                to_place: null,
                price: null,
                price_places: [],
                e1: 1,
                departure_time: this.currentDateTime(),
                destination_time: this.currentDateTime(),
                cities: [],
                city_id1: 0,
                city_id2: 0,
                stations1: [],
                stations2: [],
                from_station_id: 0,
                to_station_id: 0,
                dialog: false,
            }
        },
        methods: {
            addToPricePlaces(){
                let arr = {};
                arr.from = this.from_place;
                arr.to   = this.to_place;
                arr.price = this.price;
                this.price_places.push(arr);

                this.from_place =  null
                this.to_place = null
                this.price = null
            },
            getCompanies(){
                axios.get('http://localhost/api/v1/cashier/companies/list')
                .then(res => {
                    this.companies = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getCompanyCarLists(){
                axios.get('http://localhost/api/v1/cashier/companies/' + this.company_id + '/get-cars-list')
                    .then(res => {
                        this.cars = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            currentDateTime(){
                let d = new Date();
                return d.getFullYear()+ "-" + (((d.getMonth()+1) < 10)?"0":"") + (d.getMonth()+1) + "-" + ((d.getDate() < 10)?"0":"") + d.getDate() +"T"+ ((d.getHours() < 10)?"0":"") + d.getHours() + ":"+ ((d.getMinutes() < 10)?"0":"") + d.getMinutes();
            },
            getCities(){
                axios.get('http://localhost/api/v1/cashier/cities/list')
                    .then(res => {
                        this.cities = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getStationsForCity(city_id, type = false){
                axios.get('http://localhost/api/v1/cashier/cities/' + city_id + '/get-stations')
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
            createTrip(){
                let formData = new FormData();
                formData.append('company_id', this.company_id);
                formData.append('car_id', this.car_id);
                formData.append('city_id1', this.city_id1);
                formData.append('city_id2', this.city_id2);
                formData.append('from_station_id', this.from_station_id);
                formData.append('to_station_id', this.to_station_id);
                formData.append('departure_time', this.departure_time);
                formData.append('destination_time', this.destination_time);
                formData.append('price_places', JSON.stringify(this.price_places));

                axios.post('http://localhost/api/v1/cashier/create-trip', formData)
                .then(res => {
                    console.log(res)
                    this.dialog = true
                })
                .catch(err => {
                    console.log(err)
                })
            },
            closeDialog(){
                this.dialog = false
                this.$router.push({name: 'Intercity'})
            },
            getFieldText(item) {
                return `${item.number} (${item.car_type_name}, кол-во мест: ${item.count_places})`
            }
        },
        created() {
            this.getCompanies();
            this.getCities();
        }
    }
</script>

<style scoped>

</style>