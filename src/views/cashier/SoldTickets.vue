<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    Проданные билеты
                    <v-spacer></v-spacer>
                    <v-select
                            :items="filters"
                            :hint="`${filters.id}, ${filters.title}`"
                            item-value="id"
                            v-model="filter_id"
                            item-text="title"
                            @change="getTicketsByFilterId()"
                    ></v-select>
                </v-card-title>

                <v-data-table
                        :items="actualSoldTicketsForToday"
                        :headers="headers"
                        :search="search"
                        :loading="isLoaded"
                        loading-text="Загружается... Пожалуйста подождите"
                >
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

        <WaitingLoader></WaitingLoader>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="375"
        >
            <v-card>
                <v-card-text id="ticket" class="print_tickets_block">
                    <v-row>
                        <v-col cols="6">
                            <div><strong>Отправление</strong></div>
                            <div>
                                <span>Дата: {{ ticket.dep_date }}</span>
                            </div>
                            <div>
                                <span>Время: {{ ticket.dep_time }}</span>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div><strong>Прибытие</strong></div>
                            <div>
                                <span>Дата: {{ ticket.des_date }}</span>
                            </div>
                            <div>
                                <span>Время: {{ ticket.des_time }}</span>
                            </div>
                        </v-col>

                        <v-col cols="12" class="text-center">
                            <div>
                                <span>Автобус: {{ ticket.state_number }}</span>
                            </div>

                            <div>
                                <span>Место: {{ ticket.number }}</span>
                            </div>

                            <div>
                                <span>Имя: {{ ticket.first_name }}</span>
                            </div>

                            <div>
                                <span>Сумма: {{ ticket.price }}тг</span>
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

        <div id="print"></div>
    </v-row>
</template>

<script>
    import axios from 'axios'
    import WaitingLoader from "../../dialogs/WaitingLoader";
    import VueBarcode from 'vue-barcode';
    export default {
        components: {
            WaitingLoader,
            VueBarcode
        },
        data(){
            return {
                actualSoldTicketsForToday: [],
                headers: [
                    {
                        text: 'Номер машины',
                        align: 'start',
                        filterable: false,
                        value: 'state_number',
                    },
                    { text: 'Фирмы', value: 'company_name' },
                    { text: 'От станции', value: 'from_station.name' },
                    { text: 'До станции', value: 'to_station.name' },
                    { text: 'Место', value: 'number' },
                    { text: 'Цена', value: 'price' },
                    { text: 'Имя', value: 'first_name' },
                    { text: 'Телефон', value: 'phone' },
                    { text: 'ИИН', value: 'iin' },
                    { text: 'Печать', value: 'print' },
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
                filter_id: 0,
                ticket: []
            }
        },
        methods: {
            getActualSoldTicketsForToday(){
                axios.get(`${this.$apiUrl}cashier/tickets/get-sold-tickets-for-today`)
                .then(res => {
                    this.actualSoldTicketsForToday = res.data;
                    console.log('ac', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getTicketsByFilterId(){
                this.actualSoldTicketsForToday = [];
                this.$store.commit('setOverlay', true);
                axios.get(`${this.$apiUrl}cashier/tickets/${this.filter_id}/get-tickets-by-filter`)
                .then(res => {
                    this.$store.commit('setOverlay', false);
                    this.actualSoldTicketsForToday = res.data;
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
                const modal = document.getElementById("ticket")
                const cloned = modal.cloneNode(true)
                let section = document.getElementById("print")

                if (!section) {
                    section  = document.createElement("div")
                    section.id = "print"
                    document.body.appendChild(section)
                }

                section.innerHTML = "";
                section.appendChild(cloned);
                window.print();
            }
        },
        created() {
            this.getActualSoldTicketsForToday();
        }
    }
</script>

<style scoped>
.print_tickets_block {
    font-weight: bold;
    font-size: 18px;
    padding: 30px 25px !important;
}
@media screen {
    /*#print {
        display: none;
    }*/
}

@media print {
    body * {
        visibility:hidden;
    }

    #print, #print * {
        visibility:visible;
    }
    #print {
        position:relative;
        left:0;
        top:0;
    }
}
</style>