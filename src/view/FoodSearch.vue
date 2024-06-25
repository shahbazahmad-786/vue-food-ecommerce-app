<template>
    <!-- fOOD sEARCH Section Starts Here -->
    <section class="food-search text-center">
        <div class="container">
            <h2>Food on Your Select
                <RouterLink :to="{ name: 'Foods' }" class="text-white">"
                    {{ food.title }}"
                </RouterLink>
            </h2>
        </div>
    </section>
    <!-- fOOD sEARCH Section Ends Here -->

    <!-- fOOD MEnu Section Starts Here -->
    <section class="food-menu">
        <div class="container">
            <h2 class="text-center">Food Menu</h2>

            <div class="food-menu-box" style="width: 100%;">
                <div class="food-menu-img" style="width: 11%;">
                    <img :src="'/src/assets/images/' + food.image" :alt="food.title" class="img-responsive img-curve">
                </div>
                <div class="food-menu-desc">
                    <h4>{{ food.title }}</h4>
                    <p class="food-price">${{ food.price }}</p>
                    <p class="food-detail">{{ food.detail }}</p>
                    <br>
                    <RouterLink v-if="username" :to="{ name: 'Order', params: { id: food.id } }" class="btn btn-primary">
                        Order Now
                    </RouterLink>
                    <span v-else class="disabled">Order Now</span>
                </div>
            </div>

            <div class="clearfix"></div>
        </div>
    </section>
    <!-- fOOD Menu Section Ends Here -->
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
export default {

    components: { RouterLink },
    data() {
        return {
            food: {
                title: "",
                price: "",
                detail: "",
                image: "",
            },
            username: ''
        };
    },
    async mounted() {
        await axios.get("http://localhost:3000/food/" + this.$route.params.id)
            .then((res) => {
                this.food = res.data;
            });

        // ### For Authentication ###
        let user = localStorage.getItem('user-info');
        if (user) {
            this.username = true;
        }
    }
}
</script>