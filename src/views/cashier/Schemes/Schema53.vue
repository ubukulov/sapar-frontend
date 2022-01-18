<template>
    <v-row class="mt-2">
        <v-row v-if="firstBlocks.length > 0">
            <v-col cols="3" v-for="(item, i) in firstBlocks" :key="i" :class="'schema53_div'+i">
                <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
            </v-col>

            <v-col cols="5" class="text-right" style="padding-top: 25px; padding-right: 0px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row v-if="secondBlocks.length > 0">
            <v-col cols="3" v-for="(item, i) in secondBlocks" :key="i" :class="'schema53_div'+i">
                <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
            </v-col>

            <v-col cols="5" class="text-right" style="padding-top: 25px; padding-right: 0px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row v-if="thirdBlocks.length > 0">
            <v-col cols="3" v-for="(item, i) in thirdBlocks" :key="i" :class="'schema53_div'+i">
                <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
            </v-col>
        </v-row>

        <v-row v-if="fourthBlocks.length > 0">
            <v-col cols="3" v-for="(item, i) in fourthBlocks" :key="i" :class="'schema53_2div'+i">
                <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
            </v-col>
        </v-row>

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
                            v-mask="'############'"
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
    import WaitingLoader from "../../../dialogs/WaitingLoader";
    export default {
        components: {
            VuePhoneNumberInput,
            WaitingLoader
        },
        props: [
            'places',
            'linkAfterAction',
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
                    formData.append('phone', this.phone);
                    formData.append('iin', this.iin);

                    axios.post(`${this.$apiUrl}cashier/car-travel/${this.car_travel_id}/selling`, formData)
                        .then(res => {
                            console.log(res);
                            this.$store.commit('setOverlay', false);
                            this.dialog = false;
                            this.first_name = '';
                            this.phone = '';
                            this.place_id = 0;
                            window.location.href = this.linkAfterAction;
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
                            window.location.href = this.linkAfterAction;
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            if(err.response.status === 409){
                                this.errors.push(err.response.data)
                            }
                        })
                }
            }
        },
        computed: {
            firstBlocks(){
                let items = [];
                let places = [1,2,3,4,5,6];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            secondBlocks(){
                let items = [];
                let places = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            thirdBlocks(){
                let items = [];
                let places = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks(){
                let items = [];
                let places = [49,50,51,52,53];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
        }
    }
</script>

<style scoped>
    .schema53_div1,.schema53_div5,.schema53_div9,.schema53_div13,.schema53_div17,.schema53_div21,.schema53_div25,.schema53_div29,.schema53_div33,.schema53_div37,.schema53_div41,.schema53_div45,.schema53_div49,
    .schema53_div53,.schema53_div57,.schema53_div61{
        margin-left: -60px;
    }

    .schema53_div2,.schema53_div6,.schema53_div10,.schema53_div14,.schema53_div18,.schema53_div22,.schema53_div26,.schema53_div30,.schema53_div34,
    .schema53_div38,.schema53_div42,.schema53_div46,.schema53_div50,.schema53_div54,.schema53_div58 {
        margin-left: 70px;
    }

    .schema53_div3,.schema53_div7,.schema53_div11,.schema53_div15,.schema53_div19,.schema53_div23,.schema53_div27,.schema53_div31,.schema53_div35,
    .schema53_div39,.schema53_div43,.schema53_div47,.schema53_div51,.schema53_div55,.schema53_div59{
        margin-left: -60px;
    }
    .schema53_2div1 {
        margin-left: -60px;
    }
    .schema53_2div2,.schema53_2div3,.schema53_2div4 {
        margin-left: -70px;
    }
</style>