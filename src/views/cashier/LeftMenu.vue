<template>
    <v-card
            class="mx-auto"
            max-width="400"
    >
        <v-list>
            <v-list-item-group
                    v-model="model"
                    mandatory
                    color="indigo"
            >
                <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.link" link
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {
                    icon: 'mdi-home',
                    text: 'Главная',
                    link: '/cashier'
                },
                {
                    icon: 'mdi-bus-multiple',
                    text: 'Межгород',
                    link: '/cashier/intercity',
                    items: [
                        {
                            icon: 'mdi-party-popper',
                            text: 'Создать поездку',
                            link: '/cashier/tours'
                        }
                    ]
                },
                {
                    icon: 'mdi-party-popper',
                    text: 'Туры',
                    link: '/cashier/tours'
                },
                {
                    icon: 'mdi-bunk-bed',
                    text: 'Отели',
                    link: '/cashier/hotels'
                },
            ],
            model: 1,
        }),
    }
</script>

<style scoped>

</style>