<template>
    <v-row class="mt-2">
        <v-row>
            <v-col cols="3" v-for="(item, i) in firstBlocks" :key="i" :class="'schema53_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>

            <v-col cols="5" class="text-right" style="padding-top: 25px; padding-right: 0px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item, i) in secondBlocks" :key="i" :class="'schema53_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>

            <v-col cols="5" class="text-right" style="padding-top: 25px; padding-right: 0px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item, i) in thirdBlocks" :key="i" :class="'schema53_div'+i">
                <div class="place free_place"><span>{{ item.number }}</span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" v-for="(item, i) in fourthBlocks" :key="i" :class="'schema53_2div'+i">
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
                let places = [1,2,3,4,5,6];
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
                let places = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
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
                let places = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
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
                let places = [49,50,51,52,53];
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
    .schema53_div1,.schema53_div5,.schema53_div9,.schema53_div13,.schema53_div17,.schema53_div21,.schema53_div25,.schema53_div29,.schema53_div33,.schema53_div37,.schema53_div41,.schema53_div45,.schema53_div49,
    .schema53_div53,.schema53_div57,.schema53_div61{
        margin-left: -60px;
    }

    .schema53_div2,.schema53_div6,.schema53_div10,.schema53_div14,.schema53_div18,.schema53_div22,.schema53_div26,.schema53_div30,.schema53_div34,
    .schema53_div38,.schema53_div42,.schema53_div46,.schema53_div50,.schema53_div54,.schema53_div58 {
        margin-left: 70px;
    }

    .schema53_div3,.schema53_div7,.schema53_div11,.schema53_div15,.schema53_div19,.schema53_div23,.schema53_div27,.schema53_div31,.schema53_div35,
    .schema53_div39,.schema53_div43,.schema53_div47,.schema53_div51,.schema53_div55,.schema53_div59{
        margin-left: -60px;
    }
    .schema53_2div1 {
        margin-left: -60px;
    }
    .schema53_2div2,.schema53_2div3,.schema53_2div4 {
        margin-left: -70px;
    }
</style>