<template>
    <div class="mt-2">
        <v-row>
            <v-col cols="4">
                <v-row v-if="schema==='Schema36'">
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
                        :carTypeId="carTravel.car.car_type_id"
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
                        <br>
                        <v-btn color="warning" @click="changeCar">Изменить автобус</v-btn>
                    </v-col>

                    <v-col cols="5">
                        <v-row>
                            <v-col cols="12" class="direction_from_to">
                                <div class="direction_div_from">
                                    <p><span><strong>{{ carTravel.from.city }}</strong></span></p>
                                    <p class="direction__station"><span>{{ carTravel.from.station }}</span></p>
                                </div>

                                <div class="direction_div_middle_icon">
                                    <v-icon size="20">
                                        mdi-chevron-right-circle-outline
                                    </v-icon>
                                </div>

                                <div class="direction_div_to">
                                    <p><span><strong>{{ carTravel.to.city }}</strong></span></p>
                                    <p class="direction__station"><span>{{ carTravel.to.station }}</span></p>
                                </div>
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

                        <template v-slot:item.number = "{ item }">
                            <div v-if="carTravel.car.car_type_id === 2">
                                {{ checkPlaceForUpperOrLow(item.number) }} {{ checkPlaceForUpperOrLower(item.number) }}
                            </div>

                            <div v-if="carTravel.car.car_type_id !== 2">
                                {{ item.number }}
                            </div>
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

        <PrintTicketDialog
            :ticket="ticket"
            :carTravel="carTravel"
            :dialog="dialog"
        ></PrintTicketDialog>

        <WaitingLoader></WaitingLoader>

        <ChangeCarDialog
            :changeDialog="changeDialog"
            :carTravelId="carTravelId"
        ></ChangeCarDialog>

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
                            <h4>Список пассажиров</h4>
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
                                    <td v-if="carTravel.car.car_type_id === 2">
                                        {{ checkPlaceForUpperOrLow(item.number) }} {{ checkPlaceForUpperOrLower(item.number) }}
                                    </td>

                                    <td v-if="carTravel.car.car_type_id !== 2">
                                        {{ item.number }}
                                    </td>
                                    <td>{{ item.price }}</td>
                                    <td style="text-align: left !important;">{{ item.first_name }}</td>
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
    import Schema4 from "../schemes/Schema4";
    import Schema6 from "../schemes/Schema6";
    import Schema7 from "../schemes/Schema7";
    import Schema36 from "../schemes/Schema36";
    import Schema53 from "../schemes/Schema53";
    import Schema62 from "../schemes/Schema62";
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import VueBarcode from 'vue-barcode';
    import VueHtml2pdf from 'vue-html2pdf'
    import moment from 'moment'
    import 'moment/locale/ru'
    import PrintTicketDialog from "../../dialogs/PrintTicketDialog";
    import ChangeCarDialog from "../../dialogs/ChangeCarDialog";
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
            PrintTicketDialog,
            ChangeCarDialog
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
                changeDialog: false,
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
                        console.log('ss2', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            showPrintTicketWindow(item) {
                this.ticket = item;
                this.dialog = true;
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
            createPDF(){
                this.$refs.html2Pdf.generatePdf()
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
            },
            changeCar(){
                this.changeDialog = true;
            }
        },
        created() {
            this.carTravelId = this.$route.params.carTravelId;
            this.getSchemaForCar();
        }
    }
</script>

<style scoped>
    .card_car_info_span__success {
        color: green;
        font-weight: bold;
    }
    .card_car_info_span__danger{
        color: #cc0000;
        font-weight: bold;
    }
</style>