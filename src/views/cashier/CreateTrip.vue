<template>
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
                Name of step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
                Name of step 3
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
                                    class="form-control"
                                    :hint="`${companies.id}, ${companies.title}`"
                                    item-value="id"
                                    label="Выберите фирму"
                                    v-model="company_id"
                                    @change="getCompanyCarLists()"
                                    item-text="title"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="2">
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
                    </v-row>

                    <v-row>
                        <v-col cols="2">

                        </v-col>
                    </v-row>
                </v-card>

                <v-btn
                        color="primary"
                        @click="e1 = 2"
                >
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                ></v-card>

                <v-btn
                        color="primary"
                        @click="e1 = 3"
                >
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                ></v-card>

                <v-btn
                        color="primary"
                        @click="e1 = 1"
                >
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>

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
    export default {
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
                from_date: this.currentDateTime(),
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
        },
        created() {
            this.getCompanies();
        }
    }
</script>

<style scoped>

</style>