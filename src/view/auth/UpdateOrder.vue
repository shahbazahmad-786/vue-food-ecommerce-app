<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>

    <form @submit.prevent="submit" class="order">
        <fieldset>
            <legend>Selected Food</legend>

            <div class="food-menu-img">
                <img :src="'/src/assets/images/' + food.image" :alt="food.title" class="img-responsive img-curve">
            </div>

            <div class="food-menu-desc">

                <h3>{{ food.title }}</h3>
                <p class="food-price">${{ food.price * getOrder.qty }}</p>
                <input type="number" max="10" min="1" v-model.number="getOrder.qty" class="input-responsive" required>

            </div>

        </fieldset>

        <fieldset>
            <legend>Delivery Details</legend>

            <input type="text" v-model="getOrder.name" class="input-responsive" required>
            <input type="email" placeholder="Email..." v-model="getOrder.email" class="input-responsive" required>
            <input type="tel" placeholder="Number" v-model.number="getOrder.phone" class="input-responsive" required>
            <textarea rows="1" placeholder="Address..." v-model="getOrder.address" class="input-responsive"
                required></textarea>

            <input type="submit" value="Confirm Order" class="btn btn-primary">
            <RouterLink :to="{ name: 'MyOrder' }" style="float:right;">
                Go to Back
            </RouterLink>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
    components: { RouterLink },
    data() {
        return {
            food:
            {
                title: '',
                price: null,
                image: '',
            },
            userId: null,
            getOrder: [],

            // ### For V-Model ###
            qty: 1,
            name: '',
            email: '',
            phone: null,
            address: '',
            date: new Date().toDateString(),
            status: 0,
            alert: ''
        }
    },
    methods:
    {
        async submit() {
            await axios.put("http://localhost:3000/order/" + this.$route.params.oid,
                {
                    food_id: this.$route.params.id,
                    user_id: this.userId,
                    qty: this.getOrder.qty,
                    total_price: this.food.price * this.getOrder.qty,
                    name: this.getOrder.name,
                    email: this.getOrder.email,
                    phone: this.getOrder.phone,
                    address: this.getOrder.address,
                    date: this.date,
                    status: this.status
                })
                .then(() => {
                    this.alert = 'Your Order will be Updated.';
                    setTimeout(() => {
                        this.$router.push({ name: 'MyOrder' })
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    async mounted() {

        await axios.get("http://localhost:3000/food/" + this.$route.params.id)
            .then((res) => {
                this.food = res.data;
            })

        await axios.get("http://localhost:3000/order?food_id=" + this.$route.params.id)
            .then((res) => {
                this.getOrder = res.data[0];
            })

        let user = localStorage.getItem('user-info');
        this.userId = JSON.parse(user)[0].id;
        if (!user) {
            this.$router.push({ name: 'Index' });
        }
    }
}
</script>