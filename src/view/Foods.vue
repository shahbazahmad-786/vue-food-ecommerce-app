<template>
    <!-- fOOD sEARCH Section Starts Here -->
    <Search />
    <!-- fOOD sEARCH Section Ends Here -->

    <!-- fOOD MEnu Section Starts Here -->
    <section class="food-menu">
        <div class="container">
            <h2 class="text-center">Food Menu</h2>

            <div v-for="food in food" :key="food.id" v-if="food.length > 0">
                <div class="food-menu-box">
                    <div class="food-menu-img">
                        <img :src="'src/assets/images/' + food.image" :alt="food.title" class="img-responsive img-curve">
                    </div>
                    <div class="food-menu-desc">
                        <h4>{{ food.title }}</h4>
                        <p class="food-price">${{ food.price }}</p>
                        <p class="food-detail">{{ food.detail }}</p>
                        <br>
                        <RouterLink v-if="username" :to="{ name: 'Order', params: { id: food.id } }"
                            class="btn btn-primary">
                            Order Now
                        </RouterLink>
                        <span v-else class="disabled">Order Now</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 style="color: #ff6b81;text-align:center">Loading...</h1>
            </div>

            <div class="clearfix"></div>
        </div>

    </section>
    <!-- fOOD Menu Section Ends Here -->
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import Search from "../components/Search.vue";

export default {
    components: { Search, RouterLink },
    data() {
        return {
            food: [],
            username: ''
        }
    },
    async mounted() {
        await axios.get("http://localhost:3000/food")
            .then((res) => {
                this.food = res.data;
            })

        // ### For Authentication ###
        let user = localStorage.getItem('user-info');
        if (user) {
            this.username = JSON.parse(user)[0].name;
        }
    }
}
</script>