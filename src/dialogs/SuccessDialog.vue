<template>
    <v-dialog
            v-model="successDialog"
            persistent
            max-width="290"
    >
        <v-card>
            <v-card-text class="dialog_text text-center" style="padding-top: 20px">
                <p>Успешно!</p>

                <p style="margin-bottom: 0px; margin-top: 20px;">
                    <v-icon
                            style="font-size: 50px; color: green;"
                    >
                        mdi-check-bold
                    </v-icon>
                </p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        @click="success"
                >
                    Хорошо
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'successDialog'
        ],
        methods: {
            success(){
                this.successDialog = false;
                this.$router.go(this.$router.currentRoute)
            }
        }
    }
</script>

<style scoped>

</style>