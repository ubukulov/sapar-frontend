<template>
    <v-row class="mt-2">
        <v-col cols="8">
            <v-row>
                <v-col cols="7" class="mb-10">
                    <img src="~@/assets/rul.png" alt="">
                </v-col>

                <v-col cols="3" v-for="(item, i) in places" :key="i" :class="'schema6_div'+i">
                    <div class="place free_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: [
            'places'
        ],
    }
</script>

<style>
    .schema6_div0 {
        margin-left: -25px;
    }
    .schema6_div2 {
        margin-left: 90px;
    }
</style>