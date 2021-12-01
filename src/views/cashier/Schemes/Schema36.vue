<template>
    <v-row class="mt-2">
        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-col cols="6" v-for="(item, i) in firstBlocks" :key="i" :class="'schema36_2div'+i">
                        <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place">
                            <span v-if="item.number > 32 && item.number < 35">0 <v-icon>mdi-arrow-down</v-icon></span>
                            <span v-if="item.number > 34 && item.number < 37">0 <v-icon>mdi-arrow-up</v-icon></span>
                        </div>
                        <div v-if="item.status === 'take'" title="Место уже продано" @click="showReturnPlace(item)" class="place taken_place">
                            <span v-if="item.number > 32 && item.number < 35">0 <v-icon>mdi-arrow-down</v-icon></span>
                            <span v-if="item.number > 34 && item.number < 37">0 <v-icon>mdi-arrow-up</v-icon></span>
                        </div>
                        <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place">
                            <span v-if="item.number > 32 && item.number < 35">0 <v-icon>mdi-arrow-down</v-icon></span>
                            <span v-if="item.number > 34 && item.number < 37">0 <v-icon>mdi-arrow-up</v-icon></span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="4" class="text-right" style="padding-top: 65px;">
                <div>Выход</div>
                <div><v-icon>mdi-arrow-right</v-icon></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks[0].status === 'free'" @click="showOrderPlace(fourthBlocks[0])" class="place free_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks[0].status === 'take'" @click="showReturnPlace(fourthBlocks[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks[2].status === 'free'" @click="showOrderPlace(fourthBlocks[2])" class="place free_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks[2].status === 'take'" @click="showReturnPlace(fourthBlocks[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks[1].status === 'free'" @click="showOrderPlace(fourthBlocks[1])" class="place free_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks[1].status === 'take'" @click="showReturnPlace(fourthBlocks[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks[3].status === 'free'" @click="showOrderPlace(fourthBlocks[3])" class="place free_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks[3].status === 'take'" @click="showReturnPlace(fourthBlocks[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks2[0].status === 'free'" @click="showOrderPlace(fourthBlocks2[0])" class="place free_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks2[0].status === 'take'" @click="showReturnPlace(fourthBlocks2[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks2[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks2[2].status === 'free'" @click="showOrderPlace(fourthBlocks2[2])" class="place free_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks2[2].status === 'take'" @click="showReturnPlace(fourthBlocks2[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks2[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks2[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks2[1].status === 'free'" @click="showOrderPlace(fourthBlocks2[1])" class="place free_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks2[1].status === 'take'" @click="showReturnPlace(fourthBlocks2[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks2[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks2[3].status === 'free'" @click="showOrderPlace(fourthBlocks2[3])" class="place free_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks2[3].status === 'take'" @click="showReturnPlace(fourthBlocks2[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks2[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks2[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks3[0].status === 'free'" @click="showOrderPlace(fourthBlocks3[0])" class="place free_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks3[0].status === 'take'" @click="showReturnPlace(fourthBlocks3[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks3[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks3[2].status === 'free'" @click="showOrderPlace(fourthBlocks3[2])" class="place free_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks3[2].status === 'take'" @click="showReturnPlace(fourthBlocks3[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks3[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks3[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks3[1].status === 'free'" @click="showOrderPlace(fourthBlocks3[1])" class="place free_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks3[1].status === 'take'" @click="showReturnPlace(fourthBlocks3[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks3[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks3[3].status === 'free'" @click="showOrderPlace(fourthBlocks3[3])" class="place free_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks3[3].status === 'take'" @click="showReturnPlace(fourthBlocks3[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks3[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks3[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks4[0].status === 'free'" @click="showOrderPlace(fourthBlocks4[0])" class="place free_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks4[0].status === 'take'" @click="showReturnPlace(fourthBlocks4[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks4[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks4[2].status === 'free'" @click="showOrderPlace(fourthBlocks4[2])" class="place free_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks4[2].status === 'take'" @click="showReturnPlace(fourthBlocks4[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks4[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks4[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks4[1].status === 'free'" @click="showOrderPlace(fourthBlocks4[1])" class="place free_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks4[1].status === 'take'" @click="showReturnPlace(fourthBlocks4[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks4[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks4[3].status === 'free'" @click="showOrderPlace(fourthBlocks4[3])" class="place free_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks4[3].status === 'take'" @click="showReturnPlace(fourthBlocks4[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks4[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks4[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks5[0].status === 'free'" @click="showOrderPlace(fourthBlocks5[0])" class="place free_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks5[0].status === 'take'" @click="showReturnPlace(fourthBlocks5[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks5[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks5[2].status === 'free'" @click="showOrderPlace(fourthBlocks5[2])" class="place free_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks5[2].status === 'take'" @click="showReturnPlace(fourthBlocks5[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks5[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks5[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks5[1].status === 'free'" @click="showOrderPlace(fourthBlocks5[1])" class="place free_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks5[1].status === 'take'" @click="showReturnPlace(fourthBlocks5[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks5[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks5[3].status === 'free'" @click="showOrderPlace(fourthBlocks5[3])" class="place free_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks5[3].status === 'take'" @click="showReturnPlace(fourthBlocks5[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks5[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks5[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_div0">
                <div v-if="fourthBlocks6[0].status === 'free'" @click="showOrderPlace(fourthBlocks6[0])" class="place free_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks6[0].status === 'take'" @click="showReturnPlace(fourthBlocks6[0])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks6[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks6[2].status === 'free'" @click="showOrderPlace(fourthBlocks6[2])" class="place free_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks6[2].status === 'take'" @click="showReturnPlace(fourthBlocks6[2])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks6[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks6[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div3">
                <div v-if="fourthBlocks6[1].status === 'free'" @click="showOrderPlace(fourthBlocks6[1])" class="place free_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks6[1].status === 'take'" @click="showReturnPlace(fourthBlocks6[1])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="fourthBlocks6[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_div2">
                <div v-if="fourthBlocks6[3].status === 'free'" @click="showOrderPlace(fourthBlocks6[3])" class="place free_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks6[3].status === 'take'" @click="showReturnPlace(fourthBlocks6[3])" title="Место уже продано" class="place taken_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="fourthBlocks6[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ fourthBlocks6[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="schema36_3div">
                <div v-if="thirdBlocks[0].status === 'free'" @click="showOrderPlace(thirdBlocks[0])" class="place free_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[0].status === 'take'" @click="showReturnPlace(thirdBlocks[0])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[0].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[4].status === 'free'" @click="showOrderPlace(thirdBlocks[4])" class="place free_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[4].status === 'take'" @click="showReturnPlace(thirdBlocks[4])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[4].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[0].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[1].status === 'free'" @click="showOrderPlace(thirdBlocks[1])" class="place free_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[1].status === 'take'" @click="showReturnPlace(thirdBlocks[1])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[1].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[5].status === 'free'" @click="showOrderPlace(thirdBlocks[5])" class="place free_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[5].status === 'take'" @click="showReturnPlace(thirdBlocks[5])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[5].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[1].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>

            <v-col cols="3" class="schema36_3div">
                <div v-if="thirdBlocks[2].status === 'free'" @click="showOrderPlace(thirdBlocks[2])" class="place free_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[2].status === 'take'" @click="showReturnPlace(thirdBlocks[2])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[2].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[6].status === 'free'" @click="showOrderPlace(thirdBlocks[6])" class="place free_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[6].status === 'take'" @click="showReturnPlace(thirdBlocks[6])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[6].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[2].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[3].status === 'free'" @click="showOrderPlace(thirdBlocks[3])" class="place free_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[3].status === 'take'" @click="showReturnPlace(thirdBlocks[3])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
                <div v-if="thirdBlocks[3].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-down</v-icon></span></div>
            </v-col>
            <v-col cols="3" class="schema36_8div0">
                <div v-if="thirdBlocks[7].status === 'free'" @click="showOrderPlace(thirdBlocks[7])" class="place free_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[7].status === 'take'" @click="showReturnPlace(thirdBlocks[7])" title="Место уже продано" class="place taken_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
                <div v-if="thirdBlocks[7].status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ thirdBlocks[3].number }}<v-icon>mdi-arrow-up</v-icon></span></div>
            </v-col>
        </v-row>





        <v-col cols="3"></v-col>
        <v-col cols="3">
            <v-row>
                <v-col cols="6" v-for="(item, i) in leftItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="3">

        </v-col>

        <v-col cols="3">
            <v-row>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col class="not_place" cols="6"></v-col>
                <v-col cols="6"  v-for="(item, i) in rightItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="5"></v-col>
        <v-col cols="6" class="mt-7">
            <v-row>
                <v-col cols="3"  v-for="(item, i) in bottomItems" :key="i">
                    <div v-if="item.status === 'free'" @click="showOrderPlace(item)" class="place free_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'take'" @click="showReturnPlace(item)" title="Место уже продано" class="place taken_place"><span>{{ item.number }}</span></div>
                    <div v-if="item.status === 'in_process'" title="Место уже на броне" class="place process_place"><span>{{ item.number }}</span></div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="1"></v-col>

        <v-dialog
                v-model="dialog"
                persistent
                max-width="340"
        >
            <v-card>
                <v-card-title>Место: {{ place_number }} - укажите данные</v-card-title>
                <v-card-text class="dialog_text">
                    <v-text-field
                        v-model="first_name"
                        label="Имя"
                        dense
                        solo
                    ></v-text-field>

                    <VuePhoneNumberInput
                        default-country-code="KZ"
                        :only-countries="['KZ']"
                        error-color="red"
                        v-model="phone" />

                    <v-text-field
                            v-model="iin"
                            label="ИИН"
                            class="mt-5"
                            counter="12"
                            dense
                            solo
                    ></v-text-field>

                    <p v-if="errors.length" style="margin-bottom: 0px !important;">
                        <b>Пожалуйста исправьте указанные ошибки:</b>
                        <ul style="color: red; padding-left: 15px; list-style: circle; text-align: left;">
                            <li v-for="(error,i) in errors" :key="i">{{error}}</li>
                        </ul>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="gray"
                        @click="dialog = false"
                    >Отмена</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        @click="orderPlace()"
                    >
                        Продать билет
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="dialog2"
                persistent
                max-width="340"
        >
            <v-card>
                <v-card-title>Место: {{ place_number }} - укажите данные</v-card-title>
                <v-card-text class="dialog_text">
                    <v-textarea
                            solo
                            name="input-7-4"
                            label="Причина возврата"
                            v-model="return_cause"
                    ></v-textarea>

                    <p v-if="errors.length" style="margin-bottom: 0px !important;">
                        <b>Пожалуйста исправьте указанные ошибки:</b>
                    <ul style="color: red; padding-left: 15px; list-style: circle; text-align: left;">
                        <li v-for="(error,i) in errors" :key="i">{{error}}</li>
                    </ul>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="gray"
                            @click="dialog2 = false"
                    >Отмена</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            @click="returnPlace()"
                    >
                        Возврат билет
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <WaitingLoader></WaitingLoader>
    </v-row>
</template>

<script>
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import axios from 'axios';
    import WaitingLoader from "../../../dialogs/WaitingLoader";
    export default {
        components: {
            VuePhoneNumberInput,
            WaitingLoader
        },
        props: [
            'places'
        ],
        data(){
            return {
                dialog: false,
                dialog2: false,
                first_name: '',
                phone: '',
                iin: '',
                place_id: 0,
                car_travel_id: 0,
                place_number: 0,
                errors: [],
                return_cause: ''
            }
        },
        computed: {
            firstBlocks(){
                let items = [];
                let places = [33,34,35,36];
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
                let places = [1,17,2,3,4,5,6,7,8,9,10,11,12,17,18,19,20,21,22,23,24,25,26,27,28];
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
                let places = [13,29,14,30,15,31,16,32];
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
                let places = [1,17,2,18];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks2(){
                let items = [];
                let places = [3,19,4,20];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks3(){
                let items = [];
                let places = [5,21,6,22];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks4(){
                let items = [];
                let places = [7,23,8,24];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks5(){
                let items = [];
                let places = [9,25,10,26];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            fourthBlocks6(){
                let items = [];
                let places = [11,27,12,28];
                items = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return items;
            },
            /*leftItems(){
                let leftItems = [];
                let places = [1,17,3,5,7,9,11,19,21,23,25,27,33,34,35,36];
                leftItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return leftItems;
            },
            rightItems(){
                let rightItems = [];
                let places = [2,4,6,8,10,12,18,20,22,24,26,28];
                rightItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return rightItems;
            },
            bottomItems(){
                let bottomItems = [];
                let places = [13,14,15,16,29,30,31,32];
                bottomItems = this.places.filter(function(item){
                    for(let i = 0; i<places.length; i++) {
                        if (places[i] === item.number) {
                            return item.number;
                        }
                    }
                })
                return bottomItems;
            }*/
        },
        methods: {
            showOrderPlace(item){
                this.car_travel_id = item.car_travel_id;
                this.place_id = item.id;
                this.place_number = item.number;
                this.dialog = true;
            },
            showReturnPlace(item){
                this.car_travel_id = item.car_travel_id;
                this.place_id = item.id;
                this.place_number = item.number;
                this.dialog2 = true;
            },
            orderPlace(){
                this.errors = [];
                if(this.first_name === '') {
                    this.errors.push('Имя обязательно');
                }
                if(this.phone === '') {
                    this.errors.push('Телефон обязательно');
                }
                if(this.iin === '') {
                    this.errors.push('ИИН обязательно');
                }
                if(this.iin.length > 12 || this.iin.length < 12) {
                    this.errors.push('ИИН должен состоит из 12 цифров');
                }

                if (this.errors.length === 0) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();
                    formData.append('car_travel_id', this.car_travel_id);
                    formData.append('first_name', this.first_name);
                    formData.append('place_id', this.place_id);
                    formData.append('place_number', this.place_number);

                    axios.post(`${this.$apiUrl}cashier/car-travel/${this.car_travel_id}/selling`, formData)
                    .then(res => {
                        console.log(res);
                        this.$store.commit('setOverlay', false);
                        this.dialog = false;
                        this.first_name = '';
                        this.phone = '';
                        this.place_id = 0;
                        //this.$parent.getTicketsForToday();
                        //this.$emit('get-tickets-for-today')
                        //this.$router.push({name: 'Ticket'}).catch(()=>{});
                        window.location.href = '/cashier/tickets';
                    })
                    .catch(err => {
                        this.$store.commit('setOverlay', false);
                        if(err.response.status === 409){
                            this.errors.push(err.response.data)
                        }
                    })
                }
            },
            returnPlace(){
                this.errors = [];
                if(this.return_cause === '') {
                    this.errors.push('Укажите причину возврата');
                }

                if (this.errors.length === 0) {
                    this.$store.commit('setOverlay', true);
                    let formData = new FormData();
                    formData.append('car_travel_id', this.car_travel_id);
                    formData.append('reason_for_return', this.return_cause);
                    formData.append('place_id', this.place_id);
                    formData.append('place_number', this.place_number);

                    axios.post(`${this.$apiUrl}cashier/tickets/return-sold-tickets`, formData)
                        .then(res => {
                            console.log(res);
                            this.$store.commit('setOverlay', false);
                            this.dialog2 = false;
                            this.reason_for_return = '';
                            window.location.href = '/cashier/tickets';
                        })
                        .catch(err => {
                            this.$store.commit('setOverlay', false);
                            if(err.response.status === 409){
                                this.errors.push(err.response.data)
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .schema36_div1,.schema36_div5,.schema36_div9,.schema36_div13,.schema36_div17,.schema36_div21,.schema36_div25,.schema36_div29,.schema36_div33,.schema36_div37,.schema36_div41,.schema36_div45,.schema36_div49,
    .schema36_div53,.schema36_div57,.schema36_div61{
        margin-left: -60px;
    }
    .schema36_div2{
        margin-left: -60px;
    }
    .schema36_div6,.schema36_div10,.schema36_div14,.schema36_div18,.schema36_div22,.schema36_div26,.schema36_div30,.schema36_div34,
    .schema36_div38,.schema36_div42,.schema36_div46,.schema36_div50,.schema36_div54,.schema36_div58 {
        margin-left: 70px;
    }

    .schema36_div7,.schema36_div11,.schema36_div15,.schema36_div19,.schema36_div23,.schema36_div27,.schema36_div31,.schema36_div35,
    .schema36_div39,.schema36_div43,.schema36_div47,.schema36_div51,.schema36_div55,.schema36_div59{
        margin-left: -60px;
    }
    .schema36_2div1,.schema36_2div3{
        margin-left: -60px;
    }
    .schema36_div3{
        margin-left: 70px;
    }
    .schema36_3div {
        margin-left: 80px;
    }
    .schema36_8div0 {
        margin-left: -70px;
    }
</style>