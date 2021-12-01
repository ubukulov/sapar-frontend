<template>
    <v-row class="mt-2">
        <v-col cols="3"></v-col>
        <v-col cols="3">
            <v-row>
                <v-col cols="6" v-for="(item, i) in leftItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="3">

        </v-col>

        <v-col cols="3">
            <v-row>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col cols="6"  v-for="(item, i) in rightItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="5"></v-col>
        <v-col cols="6" class="mt-7">
            <v-row>
                <v-col cols="3"  v-for="(item, i) in bottomItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="1"></v-col>

        <v-dialog
                v-model="dialog"
                persistent
                max-width="340"
        >
            <v-card>
                <v-card-title>Место: {{ place_number }} - укажите данные</v-card-title>
                <v-card-text class="dialog_text">
                    <v-text-field
                        v-model="first_name"
                        label="Имя"
                        dense
                        solo
                    ></v-text-field>

                    <VuePhoneNumberInput
                        default-country-code="KZ"
                        :only-countries="['KZ']"
                        error-color="red"
                        v-model="phone" />

                    <v-text-field
                            v-model="iin"
                            label="ИИН"
                            class="mt-5"
                            counter="12"
                            dense
                            solo
                    ></v-text-field>

                    <p v-if="errors.length" style="margin-bottom: 0px !important;">
                        <b>Пожалуйста исправьте указанные ошибки:</b>
                        <ul style="color: red; padding-left: 15px; list-style: circle; text-align: left;">
                            <li v-for="(error,i) in errors" :key="i">{{error}}</li>
                        </ul>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="gray"
                        @click="dialog = false"
                    >Отмена</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        @click="orderPlace()"
                    >
                        Продать билет
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialog2"
                persistent
                max-width="340"
        >
            <v-card>
                <v-card-title>Место: {{ place_number }} - укажите данные</v-card-title>
                <v-card-text class="dialog_text">
                    <v-textarea
                            solo
                            name="input-7-4"
                            label="Причина возврата"
                            v-model="return_cause"
                    ></v-textarea>

                    <p v-if="errors.length" style="margin-bottom: 0px !important;">
                        <b>Пожалуйста исправьте указанные ошибки:</b>
                    <ul style="color: red; padding-left: 15px; list-style: circle; text-align: left;">
                        <li v-for="(error,i) in errors" :key="i">{{error}}</li>
                    </ul>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="gray"
                            @click="dialog2 = false"
                    >Отмена</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            @click="returnPlace()"
                    >
                        Возврат билет
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <WaitingLoader></WaitingLoader>
    </v-row>
</template>

<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import axios from 'axios';
    import WaitingLoader from "../../dialogs/WaitingLoader";
    export default {
        components: {
            VuePhoneNumberInput,
            WaitingLoader
        },
        props: [
            'places'
        ],
        data(){
            return {
                dialog: false,
                dialog2: false,
                first_name: '',
                phone: '',
                iin: '',
                place_id: 0,
                car_travel_id: 0,
                place_number: 0,
                errors: [],
                return_cause: ''
            }
        },
        computed: {
            leftItems(){
                let leftItems = [];
                let places = [1,17,3,5,7,9,11,19,21,23,25,27,33,34,35,36];
                leftItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return leftItems;
            },
            rightItems(){
                let rightItems = [];
                let places = [2,4,6,8,10,12,18,20,22,24,26,28];
                rightItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return rightItems;
            },
            bottomItems(){
                let bottomItems = [];
                let places = [13,14,15,16,29,30,31,32];
                bottomItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return bottomItems;
            }
        },
        methods: {
            showOrderPlace(item){
                this.car_travel_id = item.car_travel_id;
                this.place_id = item.id;
                this.place_number = item.number;
                this.dialog = true;
            },
            showReturnPlace(item){
                this.car_travel_id = item.car_travel_id;
                this.place_id = item.id;
                this.place_number = item.number;
                this.dialog2 = true;
            },
            orderPlace(){
                this.errors = [];
                if(this.first_name === '') {
                    this.errors.push('Имя обязательно');
                }
                if(this.phone === '') {
                    this.errors.push('Телефон обязательно');
                }
                if(this.iin === '') {
                    this.errors.push('ИИН обязательно');
                }
                if(this.iin.length > 12 || this.iin.length < 12) {
                    this.errors.push('ИИН должен состоит из 12 цифров');
                }

                if (this.errors.length === 0) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();
                    formData.append('car_travel_id', this.car_travel_id);
                    formData.append('first_name', this.first_name);
                    formData.append('place_id', this.place_id);
                    formData.append('place_number', this.place_number);

                    axios.post(`${this.$apiUrl}cashier/car-travel/${this.car_travel_id}/selling`, formData)
                    .then(res => {
                        console.log(res);
                        this.$store.commit('setOverlay', false);
                        this.dialog = false;
                        this.first_name = '';
                        this.phone = '';
                        this.place_id = 0;
                        //this.$parent.getTicketsForToday();
                        //this.$emit('get-tickets-for-today')
                        //this.$router.push({name: 'Ticket'}).catch(()=>{});
                        window.location.href = '/cashier/tickets';
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        if(err.response.status === 409){
                            this.errors.push(err.response.data)
                        }
                    })
                }
            },
            returnPlace(){
                this.errors = [];
                if(this.return_cause === '') {
                    this.errors.push('Укажите причину возврата');
                }

                if (this.errors.length === 0) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();
                    formData.append('car_travel_id', this.car_travel_id);
                    formData.append('reason_for_return', this.return_cause);
                    formData.append('place_id', this.place_id);
                    formData.append('place_number', this.place_number);

                    axios.post(`${this.$apiUrl}cashier/tickets/return-sold-tickets`, formData)
                        .then(res => {
                            console.log(res);
                            this.$store.commit('setOverlay', false);
                            this.dialog2 = false;
                            this.reason_for_return = '';
                            window.location.href = '/cashier/tickets';
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            if(err.response.status === 409){
                                this.errors.push(err.response.data)
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .place {
        width: 70px;
        height: 70px;
        background-position: center;
        background-size: contain;
        text-align: center;
        font-size: 25px;
        color: #fff;
        cursor: pointer;
    }
    .free_place{
        background-image: url("~@/assets/free_place70.png");
    }
    .taken_place{
        background-image: url("~@/assets/taken_place70.png");
    }
    .process_place {
        background-image: url("~@/assets/in_process_place70.png");
    }

    .not_place {
        height: 70px;
    }
    .col {
        padding: 0 !important;
    }
</style>