<template>
    <v-dialog
            v-model="changeDialog"
            persistent
            max-width="375"
    >
        <v-card>
            <v-card-text id="changeCarDialog">
                <v-row>
                    <v-col cols="12" class="text-center mt-4">
                        <v-select
                                :items="carLists"
                                label="Выберите машину"
                                solo
                                :hint="`${carLists.id}, ${carLists.state_number}`"
                                item-value="id"
                                item-text="state_number"
                                v-model="car_id"
                        ></v-select>
                    </v-col>

                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="btn gray"
                        @click="changeDialog = false"
                >
                    Отмена
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        @click="confirmChangeCar()"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";

    export default {
        data(){
            return {
                carLists: [],
                car_id: 0,
            }
        },
        props: [
            'changeDialog', 'carTravelId'
        ],
        methods: {
            confirmChangeCar(){
                alert("Скоро будет!!!");
            },
            getOtherCarLists(){
                axios.get(`${this.$apiUrl}cashier/intercity/${this.carTravelId}/get-list-other-cars`)
                .then(res => {
                    console.log('res', res.data)
                    this.carLists = res.data;
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            this.getOtherCarLists();
        }
    }
</script>

<style scoped>

</style>