<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>
    <!-- fOOD sEARCH Section Starts Here -->
    <Search />
    <!-- fOOD sEARCH Section Ends Here -->

    <!-- CAtegories Section Starts Here -->
    <section class="categories">
        <div class="container">
            <h2 class="text-center">Explore Foods</h2>

            <div v-for="cat in category" :key="cat.id" v-if="category.length > 0">
                <RouterLink :to="{ name: 'CategoryFoods', params: { id: cat.id } }">
                    <div class="box-3 float-container">
                        <img :src="'src/assets/images/' + cat.image" :alt="cat.title" class="img-responsive img-curve">
                        <h3 class="float-text text-white">
                            {{ cat.title }}
                        </h3>
                    </div>
                </RouterLink>
            </div>
            <div v-else>
                <h1 style="color: #ff6b81;text-align:center">Loading...</h1>
            </div>

            <div class="clearfix"></div>
        </div>

        <p class="text-center" v-if="category.length > 0">
            <RouterLink :to="{ name: 'Category' }">See All Categories</RouterLink>
        </p>
    </section>
    <!-- Categories Section Ends Here -->

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

        <p class="text-center" v-if="food.length > 0">
            <RouterLink :to="{ name: 'Foods' }">See All Foods</RouterLink>
        </p>
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
            category: [],
            food: [],
            username: '',
            alert: ''
        }
    },
    async mounted() {
        await axios.get("http://localhost:3000/category")
            .then((res) => {
                this.category = res.data;
            })

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

<style>
.disabled {
    cursor: not-allowed;
    background: #ff6b81;
    color: white;
    padding: 3px 6px;
    border-radius: 3px;
}
</style>