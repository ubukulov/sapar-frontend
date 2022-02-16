<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                >
                    Направление
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                >
                    Выберите транспорт
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Укажите цены
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="2">
                    <v-card
                            class="mb-12"
                            color="lighten-1"
                            height="200px"
                    >
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
                            @click="nextStep(3)"
                    >
                        Далее
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="1">
                    <v-card
                            class="mb-12"
                            color="lighten-1"
                            height="auto"
                    >
                        <v-row>
                            <v-col cols="2">
                                <v-select
                                        :items="cities"
                                        label="Выберите город"
                                        :hint="`${cities.id}, ${cities.name}`"
                                        item-value="id"
                                        v-model="city_id"
                                        prepend-icon="mdi-map-marker"
                                        item-text="name"
                                        @change="getMeetingOrRestingPlacesForCity(city_id)"
                                        dense
                                        solo
                                ></v-select>
                            </v-col>

                            <v-col cols="3">
                                <v-select
                                        :items="meeting_places"
                                        label="Выберите место сбора"
                                        :hint="`${meeting_places.id}, ${meeting_places.title}`"
                                        item-value="id"
                                        v-model="meeting_place_id"
                                        prepend-icon="mdi-location"
                                        item-text="title"
                                        dense
                                        solo
                                ></v-select>
                            </v-col>

                            <v-col cols="2">
                                <datetime input-class="form-control" type="datetime" format="yyyy-MM-dd HH:mm" value-zone="Asia/Almaty" :phrases="{ok: 'ОК', cancel: 'Отмена'}" v-model="departure_time"></datetime>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="5">
                                <v-select
                                        :items="resting_places"
                                        label="Выберите направление"
                                        :hint="`${resting_places.id}, ${resting_places.title}`"
                                        item-value="id"
                                        v-model="resting_place_id"
                                        prepend-icon="mdi-flag"
                                        item-text="title"
                                        dense
                                        solo
                                ></v-select>
                            </v-col>

                            <v-col cols="2">
                                <datetime input-class="form-control" type="datetime" format="yyyy-MM-dd HH:mm" value-zone="Asia/Almaty" :phrases="{ok: 'ОК', cancel: 'Отмена'}" v-model="destination_time"></datetime>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                        name="input-7-1"
                                        label="Описание тура"
                                        v-model="description"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <upload-image></upload-image>
                        </v-row>
                    </v-card>

                    <v-btn
                            color="primary"
                            @click="nextStep(2)"
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
                                    <v-col cols="12">
                                        <v-alert
                                                v-if="car.length !== 0"
                                                border="bottom"
                                                colored-border
                                                type="warning"
                                                elevation="2"
                                        >
                                            Просим быть внимательно когда указываете цены за каждое место. Количество мест не должно быть больше чем полагается.
                                            <br>
                                            <strong>В этом выбранном машине количество мест - {{car.car_type.count_places}}</strong>
                                        </v-alert>
                                    </v-col>

                                    <v-col
                                            cols="2"
                                    >
                                        <v-text-field
                                                label="Цена за тур"
                                                v-model="tour_price"
                                                dense
                                                solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                            cols="2"
                                    >
                                        <v-text-field
                                                label="Цена за место"
                                                v-model="seat_price"
                                                dense
                                                solo
                                        ></v-text-field>
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

            <v-col cols="12">
                <p v-if="errors.length" style="margin-bottom: 0px !important;">
                    <b>Пожалуйста исправьте указанные ошибки:</b>
                <ul style="color: red; padding-left: 15px; list-style: circle; text-align: left;">
                    <li v-for="(error,i) in errors" :key="i">{{error}}</li>
                </ul>
                </p>
            </v-col>
        </v-stepper>

        <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
        >
            <v-card>
                <v-card-text class="dialog_text">
                    <p>Поездка успешно оформлено!</p>

                    <p style="margin-bottom: 0px;">
                        <v-icon
                                style="font-size: 30px; color: green;"
                        >
                            mdi-check-bold
                        </v-icon>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            @click="closeDialog()"
                    >
                        Ок
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <WaitingLoader></WaitingLoader>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Datetime } from 'vue-datetime'
    import 'vue-datetime/dist/vue-datetime.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import UploadImage from "../../components/UploadImage";
    export default {
        components: {
            datetime: Datetime,
            WaitingLoader,
            UploadImage
        },
        data(){
            return {
                cars: [],
                car: [],
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
                city_id: 0,
                to_city_id: 0,
                stations1: [],
                stations2: [],
                meeting_place_id: 0,
                resting_place_id: 0,
                dialog: false,
                errors: [],
                meeting_places: [],
                resting_places: [],
                tour_price: null,
                seat_price: null,
                description: "",
            }
        },
        methods: {
            addToPricePlaces(){
                this.errors = [];
                if ((this.to_place > this.car.car_type.count_places) || (this.from_place > this.car.car_type.count_places)) {
                    this.errors.push(`Максимальное количество место: ${this.car.car_type.count_places}`)
                }

                if (this.from_place === null || this.to_place === null) {
                    this.errors.push('Укажите место правильно')
                }

                if (this.price === null || this.price === '') {
                    this.errors.push('Укажите цену')
                }

                if (this.price_places.length !== 0) {
                    for(let i=0; i<this.price_places.length; i++) {
                        if (parseInt(this.from_place) >= parseInt(this.price_places[i].from) && parseInt(this.from_place) <= parseInt(this.price_places[i].to)) {
                            this.errors.push(`Место: ${this.from_place} уже указано ранее`);
                        }

                        if (parseInt(this.to_place) <= parseInt(this.price_places[i].to)) {
                            this.errors.push(`Место: ${this.to_place} уже указано ранее`);
                        }

                        if (parseInt(this.from_place) === parseInt(this.to_place)) {
                            this.errors.push(`Место - ${this.from_place} и место ${this.to_place} не должно быть равно`);
                        }
                    }
                }

                if (this.errors.length === 0) {
                    let arr = {};
                    arr.from = this.from_place;
                    arr.to   = this.to_place;
                    arr.price = this.price;
                    this.price_places.push(arr);

                    this.from_place =  null
                    this.to_place = null
                    this.price = null
                }
            },
            getMeetingOrRestingPlacesForCity(city_id){
                axios.get(`${this.$apiUrl}tours/${city_id}/get-meeting-places`)
                    .then(res => {
                        this.meeting_places = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })

                axios.get(`${this.$apiUrl}tours/${city_id}/get-resting-places`)
                    .then(res => {
                        this.resting_places = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getCompanyCarLists(){
                axios.get(`${this.$apiUrl}cashier/companies/1/get-cars-list`)
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
            createTrip(){
                if(this.errors.length === 0) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();
                    formData.append('company_id', this.company_id);
                    formData.append('car_id', this.car_id);
                    formData.append('from_city_id', this.from_city_id);
                    formData.append('to_city_id', this.to_city_id);
                    formData.append('from_station_id', this.from_station_id);
                    formData.append('to_station_id', this.to_station_id);
                    formData.append('departure_time', this.departure_time);
                    formData.append('destination_time', this.destination_time);
                    formData.append('price_places', JSON.stringify(this.price_places));

                    axios.post(`${this.$apiUrl}cashier/create-trip`, formData)
                        .then(res => {
                            console.log(res)
                            this.$store.commit('setOverlay', false);
                            this.dialog = true;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            closeDialog(){
                this.dialog = false
                this.$router.push({name: 'Intercity'})
            },
            getFieldText(item) {
                return `${item.number} (${item.car_type_name}, кол-во мест: ${item.count_places})`
            },
            nextStep(step) {
                this.errors = [];
                if (step === 3) {
                    if (this.car_id === 0) {
                        this.errors.push('Выберите машину/автобус');
                    }
                    if (this.errors.length === 0) {
                        this.$store.commit('setOverlay', true);
                        axios.get(`${this.$apiUrl}cashier/car/${this.car_id}/get-info`)
                            .then(res => {
                                this.$store.commit('setOverlay', false);
                                this.car = res.data;
                                this.e1 = 3;
                                console.log('car', this.car)
                                console.log('car_type', this.car.car_type.count_places)
                            })
                            .catch(err => {
                                console.log(err)
                                this.errors.push('Произошло ошибка во время получение информацию о машине')
                            })
                    }
                }

                if (step === 2) {
                    if (this.meeting_place_id === 0) {
                        this.errors.push('Укажите место сбора');
                    }
                    if (this.resting_place_id === 0) {
                        this.errors.push('Укажите направление');
                    }
                    if (this.city_id === 0) {
                        this.errors.push('Укажите город');
                    }

                    let departure_time = new Date(this.departure_time);
                    let destination_time = new Date(this.destination_time);

                    if(departure_time.getTime() >= destination_time.getTime()) {
                        this.errors.push('Дата отправление не может быть больше или равно чем дата прибытие');
                    }

                    if (this.errors.length === 0) {
                        this.e1 = 2;
                    }
                }

            }
        },
        created() {
            this.getCities();
            this.getCompanyCarLists();
        }
    }
</script>

<style scoped>
    .dialog_text {
        padding: 20px 10px !important;
        font-size: 30px;
        line-height: 30px;
        color: green !important;
        text-align: center;
    }
</style>