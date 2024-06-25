<template>
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
    </section>
    <!-- Categories Section Ends Here -->
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
export default {
    data() {
        return {
            category: []
        };
    },
    async mounted() {
        await axios.get("http://localhost:3000/category")
            .then((res) => {
                this.category = res.data;
            });
    },
    components: { RouterLink }
}
</script>