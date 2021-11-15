<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-select
                        :items="companies"
                        class="form-control"
                        :hint="`${companies.id}, ${companies.title}`"
                        item-value="id"
                        label="Выберите фирму"
                        v-model="company_id"
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
                            <p>От {{ item.from}} до {{ item.to }}  --- <strong>{{ item.price }} т</strong></p>
                        </v-alert>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="4">

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data(){
            return {
                cars: [
                    {
                        id: 1, number: '482FHF05'
                    },
                    {
                        id: 2, number: '786FHF05'
                    },
                    {
                        id: 3, number: '125FHF05'
                    },
                    {
                        id: 4, number: '536FHF05'
                    }
                ],
                companies: [
                    { id: 1, title: 'Перевозчик1'},
                    { id: 2, title: 'Перевозчик2'},
                    { id: 3, title: 'Перевозчик3'},
                    { id: 4, title: 'Перевозчик4'},
                ],
                car_id: 0,
                company_id: 0,
                dates: [],
                menu: false,
                from_place: null,
                to_place: null,
                price: null,
                price_places: []
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
            }
        }
    }
</script>

<style scoped>

</style>