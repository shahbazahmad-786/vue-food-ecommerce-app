<template>
    <section class="food-search text-center">
        <div class="container">

            <div class="main">
                <div class="foods">

                    <div @click="clickFun1" class="button" v-show="cf1">
                        Select Foods...
                        <span class="arraow arrow1">></span>
                    </div>
                    <div @click="clickFun2" class="button" v-show="cf2">
                        Select Foods...
                        <span class="arraow arrow2">></span>
                    </div>

                    <div v-for="food in food" :key="food.id" v-show="fooditems">
                        <RouterLink :to="{ name: 'FoodSearch', params: { id: food.id } }" class="roterlink">
                            {{ food.title }}
                        </RouterLink>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from "axios";
export default {
    components: { RouterLink },
    data() {
        return {
            fooditems: false,
            cf1: true,
            cf2: false,
            food: []
        }
    },
    methods: {
        clickFun1() {
            this.fooditems = true;
            this.cf1 = false;
            this.cf2 = true;
        },

        clickFun2() {
            this.fooditems = false;
            this.cf1 = true;
            this.cf2 = false;
        }
    },
    async mounted() {
        await axios.get("http://localhost:3000/food")
            .then((res) => {
                this.food = res.data;
            })
    }
}
</script>

<style scoped>
.food-search {
    position: relative;
}

.main {
    position: absolute;
    top: 45%;
    left: 25%;
    width: 50%;
}

.foods {
    background-color: white;
    text-align: start;
    font-size: 15px;
    border-radius: 5px;
}

.arraow {
    float: right;
    font-family: monospace !important;
    font-size: 25px;
}

.arrow1 {
    transform: rotate(90deg);
    padding: 0px 5px 0px 0px;
}

.arrow2 {
    transform: rotate(-90deg);
    padding: 0px 0px 0px 5px;
}

.foods div {
    padding: 2px 5px;
}

.foods div:hover {
    background-color: skyblue;
    cursor: pointer;
}

.button {
    font-weight: bold;
    padding: 10px !important;
    border-bottom: 1px solid black;
    border-radius: 5px;
    cursor: default !important;
}

.button:hover {
    padding: 10px !important;
    border-bottom: 1px solid black;
    background-color: transparent !important;
}

.roterlink {
    color: black !important;
    display: block;
}
</style>