<template>
    <v-dialog
            v-model="tourBookingDialog"
            persistent
            max-width="590"
    >
        <v-card>
            <v-card-text class="dialog_text">
                <p style="margin-bottom: 0px;">
                    <v-icon
                            style="font-size: 30px; color: green;"
                    >
                        mdi-check-bold
                    </v-icon>
                </p>

                <p>Ваши место забронированы!</p>
                <p>Отправьте указанную сумму на Kaspi номер: +77071909009</p>
                <p>Время бронирования 15 минут!</p>
                <p>! контактные данные ответственного лица Saparline: +77071310001</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    @click="tourBookingDialog = false"
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
            'tourBookingDialog'
        ]
    }
</script>

<style scoped>

</style>