<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="375"
        v-if="Object.keys(carTravel).length > 0"
    >
        <v-card>
            <v-card-text id="ticket" class="print_tickets_block">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <img src="/img/logo2.png" height="83" alt="Logo">
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <div><strong>Отправление</strong></div>
                        <div><strong>{{ carTravel.from.city }}</strong></div>
                        <div><span>{{carTravel.from.station}}</span></div>
                        <div>
                            <span>Дата: {{ ticket.dep_date }}</span>
                        </div>
                        <div>
                            <span>Время: {{ ticket.dep_time }}</span>
                        </div>
                        <div>
                            <span>Автобус:</span>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div><strong>Прибытие</strong></div>
                        <div><strong>{{ carTravel.to.city }}</strong></div>
                        <div><span>{{carTravel.to.station}}</span></div>
                        <div>
                            <span>Дата: {{ ticket.des_date }}</span>
                        </div>
                        <div>
                            <span>Время: {{ ticket.des_time }}</span>
                        </div>
                        <div>
                            <span>{{ ticket.state_number }}</span>
                        </div>
                    </v-col>

                    <v-col cols="12" class="text-center">
                        <div v-if="carTravel.car.car_type_id === 2">
                            <span>Место: {{ checkPlaceForUpperOrLow(ticket.number) }} {{ checkPlaceForUpperOrLower(ticket.number) }}</span>
                        </div>

                        <div v-if="this.carTravel.car.car_type_id !== 2">
                            <span>Место: {{ ticket.number }}</span>
                        </div>

                        <div>
                            <span>Имя: {{ ticket.first_name }}</span>
                        </div>
                        <div>
                            <span>ИИН: {{ ticket.iin }}</span>
                        </div>

                        <div>
                            <span>Сумма: {{ ticket.price }}тг</span>
                        </div>
                    </v-col>

                    <br>

                    <v-col cols="4" class="text-right">
                        <img src="/img/QRCode.png" height="83" alt="QRCode">
                    </v-col>

                    <v-col cols="7" class="text-center">
                            <span style="font-size: 12px; line-height: 15px; font-weight: normal;">
                                отсканируя этот <strong>QR-код</strong>, вы можете
купить билет онлайн. Скачайте
приложение <strong>Saparline</strong>
с Playmarket или AppStore.
Подробнее на сайте www.saparline.kz

                            </span>
                    </v-col>

                    <v-col cols="1">

                    </v-col>

                    <v-col cols="12" class="text-center">
                        <div>
                                <span>
                                Телефон для  экстренной связи: <br>
                                    +7707 190 90 09
                            </span>
                        </div>

                        <div>
                            <VueBarcode
                                    :value="ticket.id"
                                    height="50"
                                    display-value="false"
                            ></VueBarcode>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="btn gray"
                        @click="dialog = false"
                >
                    Отмена
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        @click="printTicket()"
                >
                    Печать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import VueBarcode from 'vue-barcode';
    export default {
        components: {
            VueBarcode
        },
        data(){
            return {
                //dialog: false,
            }
        },
        props: [
            'ticket', 'carTravel', 'dialog'
        ],
        methods: {
            printTicket(){
                this.$htmlToPaper('ticket');
                this.dialog = false;
            },
            checkPlaceForUpperOrLower(place){
                if (this.carTravel.car.car_type_id === 2) {
                    let upperPlaces = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
                    let lowerPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,35,36];
                    for(let i = 0; i<upperPlaces.length; i++) {
                        if (upperPlaces[i] === place) {
                            return '(верхний)';
                        }
                    }
                    for(let i = 0; i<lowerPlaces.length; i++) {
                        if (lowerPlaces[i] === place) {
                            return '(нижний)';
                        }
                    }
                } else {
                    return '';
                }
            },
            checkPlaceForUpperOrLow(place){
                if(place > 32) {
                    return 0;
                }
                if(place < 17) {
                    return place;
                }
                if (place > 16 && place < 32) {
                    let uItems = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
                    for(let i = 0; i < uItems.length; i++) {
                        if (uItems[i] === place) {
                            return uItems[i] - 16;
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .print_tickets_block {
        font-weight: bold;
        font-size: 18px;
        padding: 30px 25px !important;
    }
</style>