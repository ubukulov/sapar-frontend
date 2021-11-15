<template>
    <v-app>
        <v-navigation-drawer app>
            <LeftMenu></LeftMenu>
        </v-navigation-drawer>

        <v-app-bar app>
            <h1>Интерфейс: Касса</h1>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    import LeftMenu from "@/views/cashier/LeftMenu";
    export default {
        components: {
            LeftMenu,
        }
    }
</script>

<style scoped>

</style>