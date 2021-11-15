<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <router-link
                    class="btn btn-primary"
                    to="/cashier/intercity/create"
                >
                    <span class="mdc-button__label">Создать поездку</span>
                </router-link>

                <router-view></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Intercity"
    }
</script>

<style scoped>

</style>