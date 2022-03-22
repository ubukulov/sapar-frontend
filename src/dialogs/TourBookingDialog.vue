<template>
    <v-dialog
            v-model="tourBookingDialog"
            persistent
            max-width="590"
    >
        <v-card>
            <v-card-text class="dialog_text text-center" style="padding: 20px;">
                <p style="margin-bottom: 0px;">
                    <v-icon
                            style="font-size: 40px; color: green;"
                            class="mb-2"
                    >
                        mdi-check-bold
                    </v-icon>
                </p>

                <p>Ваши место забронированы!</p>
                <p>Отправьте указанную сумму на Kaspi номер: <strong>+77071909009</strong></p>
                <p>Время бронирования <strong>15 минут!</strong></p>
                <p>! контактные данные ответственного лица Saparline: +77071310001</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    @click="successBooking"
                >
                    Ок
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'tourBookingDialog', 'tourId'
        ],
        methods: {
            successBooking(){
                this.tourBookingDialog = false;
                this.$router.push({
                    name: 'TourDetail', params: { tourId: this.tourId }
                })
            }
        }
    }
</script>

<style scoped>
p {
    font-size: 20px;
}
</style>