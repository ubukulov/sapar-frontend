<template>
    <v-row class="mt-2">
        <v-row>
            <v-col cols="3" v-for="(item, i) in firstBlocks" :key="i" :class="'schema62_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>

            <v-col cols="5" class="text-right" style="padding-top: 25px; padding-right: 0px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item, i) in secondBlocks" :key="i" :class="'schema62_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-col cols="6" v-for="(item, i) in thirdBlocks" :key="i" :class="'schema62_2div'+i">
                        <div class="place free_place"><span>{{ item.number }}</span></div>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="4" class="text-right" style="padding-top: 65px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item, i) in fourthBlocks" :key="i" :class="'schema62_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>
        </v-row>

    </v-row>
</template>

<script>
    export default {
        props: [
            'places'
        ],
        computed: {
            firstBlocks(){
                let items = [];
                let places = [1,2,3,4,5,6,7,8,9,10];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            secondBlocks(){
                let items = [];
                let places = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            thirdBlocks(){
                let items = [];
                let places = [35,36,37,38];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks(){
                let items = [];
                let places = [39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
        }
    }
</script>

<style scoped>
    .schema62_div1,.schema62_div5,.schema62_div9,.schema62_div13,.schema62_div17,.schema62_div21,.schema62_div25,.schema62_div29,.schema62_div33,.schema62_div37,.schema62_div41,.schema62_div45,.schema62_div49,
    .schema62_div53,.schema62_div57,.schema62_div61{
        margin-left: -60px;
    }

    .schema62_div2,.schema62_div6,.schema62_div10,.schema62_div14,.schema62_div18,.schema62_div22,.schema62_div26,.schema62_div30,.schema62_div34,
    .schema62_div38,.schema62_div42,.schema62_div46,.schema62_div50,.schema62_div54,.schema62_div58 {
        margin-left: 70px;
    }

    .schema62_div3,.schema62_div7,.schema62_div11,.schema62_div15,.schema62_div19,.schema62_div23,.schema62_div27,.schema62_div31,.schema62_div35,
    .schema62_div39,.schema62_div43,.schema62_div47,.schema62_div51,.schema62_div55,.schema62_div59{
        margin-left: -60px;
    }
    .schema62_2div1,.schema62_2div3{
        margin-left: -60px;
    }
</style>