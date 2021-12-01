<template>
    <v-card>
        <v-tabs
            v-model="tab"
            background-color="deep-purple accent-4"
            dark
            icons-and-text
            class="mt-2"
        >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1">
                Сегодняшние
                <v-icon>mdi-calendar-today</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                Запланированные
                <v-icon>mdi-calendar-clock</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
                Проданные билеты
                <v-icon>mdi-ticket</v-icon>
            </v-tab>

            <v-tab href="#tab-4">
                Возврат билета
                <v-icon>mdi-keyboard-return</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-1'">
                <TodayTickets></TodayTickets>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
                <PlannedTickets></PlannedTickets>
            </v-tab-item>

            <v-tab-item :value="'tab-3'">
                <SoldTickets></SoldTickets>
            </v-tab-item>

            <v-tab-item :value="'tab-4'">
                <ReturnTickets></ReturnTickets>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import TodayTickets from "./TodayTickets";
    import SoldTickets from "./SoldTickets";
    import PlannedTickets from "./PlannedTickets";
    import ReturnTickets from "./ReturnTickets";
    export default {
        components: {
            TodayTickets,
            SoldTickets,
            PlannedTickets,
            ReturnTickets
        },
        data() {
            return {
                tab: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        }
    }
</script>

<style scoped>
a:hover {
    text-underline: none !important;
}
</style>