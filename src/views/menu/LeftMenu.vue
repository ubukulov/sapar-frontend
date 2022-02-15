<template>
    <v-card
        class="mx-auto"
        width="400"
        style="margin-top: 60px;"
    >
        <v-list>
            <!--<v-list-item
                to="/cashier" link
            >
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Главная</v-list-item-title>
            </v-list-item>-->

            <v-list-group
                    :value="true"
                    prepend-icon="mdi-bus-multiple"
            >
                <template v-slot:activator>
                    <v-list-item-title>Межгород</v-list-item-title>
                </template>

                <v-list-item
                        v-for="(item, i) in intercity"
                        :key="i"
                        :to="item.link" link
                >
                    <v-list-item-title v-text="item.text"></v-list-item-title>

                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-group>

            <v-list-group
                    :value="true"
                    prepend-icon="mdi-wallet-travel"
            >
                <template v-slot:activator>
                    <v-list-item-title>Туры</v-list-item-title>
                </template>

                <v-list-item
                        v-for="(item, i) in tours"
                        :key="i"
                        :to="item.link" link
                >
                    <v-list-item-title v-text="item.text"></v-list-item-title>

                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-group>

            <v-list-item
                to="/logout" link
            >
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            intercity: [
                {
                    icon: 'mdi-bus-clock',
                    text: 'Плановые поездки',
                    link: '/cashier/intercity'
                },
                {
                    icon: 'mdi-tag-multiple',
                    text: 'Продажа билетов',
                    link: '/cashier/tickets'
                }
            ],
            tours: [
                {
                    icon: 'mdi-wallet-travel',
                    text: 'Плановые туры',
                    link: '/tours/lists'
                },
            ],
        }),
    }
</script>

<style scoped>

</style>