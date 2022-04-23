<template>
    <v-dialog
            v-model="addDialog"
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
                        @click="cancel"
                >
                    Отмена
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        @click="confirmAddCar()"
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
            'addDialog', 'tourId'
        ],
        methods: {
            confirmAddCar(){
                let formData = new FormData();
                formData.append('tour_id', this.tourId);
                formData.append('car_id', this.car_id);
                axios.post(`${this.$apiUrl}tours/${this.tourId}/add-other-car`, formData)
                    .then(res => {
                        console.log(res)
                        this.$router.go(this.$router.currentRoute);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getCompanyCarLists(){
                axios.get(`${this.$apiUrl}tours/${this.tourId}/get-list-other-cars`)
                    .then(res => {
                        this.carLists = res.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            cancel(){
                this.addDialog = false;
                this.$router.go(this.$router.currentRoute)
            }
        },
        created() {
            this.getCompanyCarLists();
        }
    }
</script>

<style scoped>

</style>