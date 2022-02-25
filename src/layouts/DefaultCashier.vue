<template>
    <v-app>


        <v-app-bar
            color="deep-purple accent-4"
            dark
            app
        >
            <h1 v-if="user.type_id === 1">Интерфейс: Касса</h1>
            <h1 v-if="user.type_id === 3">Интерфейс: Туркомпания</h1>
            <h1 v-if="user.type_id === 4">Интерфейс: Турлидер</h1>
            <v-spacer></v-spacer>
            <h4>Пользователь: {{ user.first_name }}</h4>
        </v-app-bar>

        <v-row>
            <v-col cols="2">
                <v-navigation-drawer>
                    <LeftMenu></LeftMenu>
                </v-navigation-drawer>
            </v-col>

            <v-col cols="10">
                <!-- Sizes your content based upon application components -->
                <v-main>

                    <!-- Provides the application the proper gutter -->
                    <router-view></router-view>
                </v-main>
            </v-col>
        </v-row>



        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    import LeftMenu from "@/views/menu/LeftMenu";
    export default {
        components: {
            LeftMenu,
        },
        data(){
            return {
                user: this.$store.getters.getUserData
            }
        },
        created() {
            console.log('user', this.user)
        }
    }
</script>

<style scoped>

</style>