<template>
    <div class="mt-2">
        <v-row>
            <v-col cols="4">
                <v-row>
                    <v-col>
                        <v-checkbox
                            v-model="upperPlace"
                            label="Верхний"
                        ></v-checkbox>

                    </v-col>
                    <v-col>
                        <v-checkbox
                                v-model="lowerPlace"
                                label="Нижний"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <component
                        :is="schema"
                        :places="placesForRoute"
                        :linkAfterAction="`/cashier/intercity/${carTravelId}`"
                        :upperPlace="upperPlace"
                        :lowerPlace="lowerPlace"
                ></component>
            </v-col>

            <v-col v-if="Object.keys(carTravel).length > 0" cols="8">
                <v-row>
                    <v-col cols="3">
                        <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                max-height="250"
                                :src="`http://194.4.56.241:8888/${carTravel.car.image}`"
                        ></v-img>
                    </v-col>

                    <v-col cols="4">
                        <p>Номер машины: {{ carTravel.car.state_number }}</p>
                        <p>Дата отправление: <br>{{ moment(carTravel.departure_time).format('LLL') }}</p>
                        <p>Дата прибытие: <br>{{ moment(carTravel.destination_time).format('LLL') }}</p>
                    </v-col>

                    <v-col cols="5">
                        <v-row>
                            <v-col cols="4" class="text-right">
                                <div><strong>{{ carTravel.from.city }}</strong></div>
                                <div><span>{{carTravel.from.station}}</span></div>
                            </v-col>

                            <v-col cols="4" class="text-center">
                                <v-icon size="40">
                                    mdi-chevron-right-circle-outline
                                </v-icon>
                            </v-col>

                            <v-col cols="4" class="text-left">
                                <div><strong>{{ carTravel.to.city }}</strong></div>
                                <div><span>{{carTravel.to.station}}</span></div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <span class="card_car_info_span__success">Свободно: {{ carTravel.count_free_places }}</span>
                            </v-col>

                            <v-col>
                                <span class="card_car_info_span__danger">Занято: {{ carTravel.car.car_type_count_places - carTravel.count_free_places }}</span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-card>
                    <v-card-title>
                        Проданные билеты
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="createPDF()"
                            class="primary"
                        >
                            <v-icon>mdi-file-pdf-box</v-icon>&nbsp;
                            Скачать
                        </v-btn>
                    </v-card-title>

                    <v-data-table
                            :items="soldTicketsForCurrentCarTravel"
                            :headers="headers"
                            :search="search"
                            :loading="isLoaded"
                            ref="soldTickets"
                            loading-text="Загружается... Пожалуйста подождите"
                    >
                        <template v-slot:item.dt = "{ item }">
                            {{ item.dep_date }} / {{ item.dep_time }}
                        </template>

                        <template v-slot:item.print="{ item }">
                            <v-icon
                                    title="Распечатать билет"
                                    middle
                                    @click="showPrintTicketWindow(item)"
                            >
                                mdi-printer
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

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
                            <div>
                                <span>Место: {{ ticket.number }} {{ checkPlaceForUpperOrLower(ticket.number) }}</span>
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

        <WaitingLoader></WaitingLoader>

        <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="false"
                :paginate-elements-by-height="1400"
                :filename="carTravel.car.state_number"
                :pdf-quality="2"
                :manual-pagination="false"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="800px"

                @progress="onProgress($event)"
                @hasStartedGeneration="hasStartedGeneration()"
                @hasGenerated="hasGenerated($event)"
                ref="html2Pdf"
        >
            <section slot="pdf-content" style="padding: 10px;">
                <section class="pdf-item">
                    <div class="row">
                        <div class="col-md-12" style="text-align: center;">
                            <img src="/img/logo2.png" height="40" alt="Logo">
                        </div>

                        <div class="col-md-6">
                            <p>Номер машины: <strong>{{ carTravel.car.state_number }}</strong></p>
                            <p>Дата отправление: <strong>{{ moment(carTravel.departure_time).format('LLL') }}</strong></p>
                        </div>

                        <div class="col-md-6">
                            <p><strong>{{ carTravel.from.city }}</strong> ({{carTravel.from.station}}) - <strong>{{ carTravel.to.city }}</strong> ({{carTravel.to.station}})</p>
                            <p>Дата прибытие: <strong>{{ moment(carTravel.destination_time).format('LLL') }}</strong></p>
                        </div>
                    </div>
                </section>

                <section class="pdf-item">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h4>Список проданных билетов</h4>
                            <table class="table table-border">
                                <thead>
                                <tr>
                                    <th>Место</th>
                                    <th>Цена</th>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>ИИН</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr v-for="(item, i) in soldTicketsForCurrentCarTravel" :key="i">
                                    <td>{{ item.number }}</td>
                                    <td>{{ item.price }}</td>
                                    <td>{{ item.first_name }}</td>
                                    <td>{{ item.phone }}</td>
                                    <td>{{ item.iin }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
    import axios from 'axios'
    import Schema4 from "./Schemes/Schema4";
    import Schema6 from "./Schemes/Schema6";
    import Schema7 from "./Schemes/Schema7";
    import Schema36 from "./Schemes/Schema36";
    import Schema53 from "./Schemes/Schema53";
    import Schema62 from "./Schemes/Schema62";
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import VueBarcode from 'vue-barcode';
    import VueHtml2pdf from 'vue-html2pdf'
    import moment from 'moment'
    import 'moment/locale/ru'
    export default {
        components: {
            WaitingLoader,
            Schema4,
            Schema6,
            Schema7,
            Schema36,
            Schema53,
            Schema62,
            VueBarcode,
            VueHtml2pdf,
        },
        data(){
            return {
                schema: '',
                placesForRoute: [],
                soldTicketsForCurrentCarTravel: [],
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Место', value: 'number'},
                    {text: 'Цена', value: 'price'},
                    {text: 'Имя', value: 'first_name'},
                    {text: 'Телефон', value: 'phone'},
                    {text: 'ИИН', value: 'iin'},
                    {text: 'Печать', value: 'print'},
                ],
                isLoaded: false,
                dialog: false,
                search: '',
                filters: [
                    {
                        'title': 'Актуальные билеты',
                        'id': 0
                    },
                    {
                        'title': 'Запланированные билеты',
                        'id': 1
                    },
                    {
                        'title': 'История',
                        'id': 2
                    },
                ],
                carTravelId: 0,
                ticket: [],
                carTravel: [],
                upperPlace: true,
                lowerPlace: true,
                moment: moment
            }
        },
        methods: {
            getSchemaForCar(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/car-travel/${this.carTravelId}/get-information-about-car-travel`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.carTravel = res.data[0];
                    console.log('carTravel', this.carTravel)
                    switch (this.carTravel.car.car_type_id) {
                        case 1:
                            this.schema = 'Schema53'
                            break;
                        case 2:
                            this.schema = 'Schema36'
                            break;
                        case 3:
                            this.schema = 'Schema6'
                            break;
                        case 5:
                            this.schema = 'Schema4'
                            break;
                        case 6:
                            this.schema = 'Schema7'
                            break;
                        case 7:
                            this.schema = 'Schema62'
                            break;
                    }
                    this.getPlacesForRoute();
                    this.getSoldTicketsForCurrentCarTravel();
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getPlacesForRoute(){
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/car-travel/${this.carTravelId}/get-all-places-for-route`)
                    .then(res => {
                        this.$store.commit('setOverlay', false);
                        this.placesForRoute = res.data;
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        console.log(err)
                    })
            },
            getSoldTicketsForCurrentCarTravel(){
                axios.get(`${this.$apiUrl}cashier/car-travel/${this.carTravelId}/get-sold-tickets-for-current-route`)
                    .then(res => {
                        this.soldTicketsForCurrentCarTravel = res.data;
                        console.log('ss', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            showPrintTicketWindow(item) {
                this.ticket = item;
                this.dialog = true;
            },
            printTicket(){
                this.$htmlToPaper('ticket');
				this.dialog = false;
            },
            checkPlaceForUpperOrLower(place){
                if (this.carTravel.car.car_type_id === 2) {
                    let upperPlaces = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36];
                    let lowerPlaces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,33,34];
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
            createPDF(){
                this.$refs.html2Pdf.generatePdf()
            }
        },
        created() {
            this.carTravelId = this.$route.params.carTravelId;
            this.getSchemaForCar();
        }
    }
</script>

<style scoped>
    .print_tickets_block {
        font-weight: bold;
        font-size: 18px;
        padding: 30px 25px !important;
    }
    .card_car_info_span__success {
        color: green;
        font-weight: bold;
    }
    .card_car_info_span__danger{
        color: #cc0000;
        font-weight: bold;
    }
</style>