<template>
    <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="3">
            <v-row>
                <v-col cols="6" v-for="(item, i) in leftItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place">{{ item.number }}</div>
                    <div v-if="item.status === 'take'" class="place taken_place">{{ item.number }}</div>
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
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place">{{ item.number }}</div>
                    <div v-if="item.status === 'take'" class="place taken_place">{{ item.number }}</div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="5"></v-col>
        <v-col cols="6">
            <v-row>
                <v-col cols="3"  v-for="(item, i) in bottomItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place">{{ item.number }}</div>
                    <div v-if="item.status === 'take'" class="place taken_place">{{ item.number }}</div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="3"></v-col>

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

                    <v-text-field
                            v-model="phone"
                            label="Телефон номер"
                            dense
                            solo
                    ></v-text-field>

                    <v-text-field
                            v-model="iin"
                            label="ИИН"
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
    </v-row>
</template>

<script>
    export default {
        props: [
            'places'
        ],
        data(){
            return {
                dialog: false,
                first_name: '',
                phone: '',
                iin: '',
                place_id: 0,
                place_number: 0,
                errors: []
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
                this.place_id = item.id;
                this.place_number = item.number;
                this.dialog = true;
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

                if (this.errors.length === 0) {
                    //
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
    }
    .free_place{
        background-image: url("~@/assets/free_place70.png");
    }
    .taken_place{
        background-image: url("~@/assets/taken_place70.png");
    }

    .not_place {
        height: 70px;
    }
    .col {
        padding: 0 !important;
    }
</style>