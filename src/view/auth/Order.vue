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
                <p class="food-price">${{ food.price * qty }}</p>
                <input type="number" max="10" min="1" v-model.number="qty" class="input-responsive" required>

            </div>

        </fieldset>

        <fieldset>
            <legend>Delivery Details</legend>

            <input type="text" placeholder="Name..." v-model="name" class="input-responsive" required>
            <input type="email" placeholder="Email..." v-model="email" class="input-responsive" required>
            <input type="tel" placeholder="Number" v-model.number="phone" class="input-responsive" required>
            <textarea rows="1" placeholder="Address..." v-model="address" class="input-responsive" required></textarea>

            <input type="submit" value="Confirm Order" class="btn btn-primary">
            <RouterLink :to="{ name: 'Index' }" style="float:right;">
                Cancel Order
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

            // ### For V-Model ###
            qty: 1,
            name: '',
            email: '',
            phone: null,
            address: '',
            alert: '',
            date: new Date().toDateString(),
            status: 0
        }
    },
    methods:
    {
        async submit() {
            await axios.post("http://localhost:3000/order",
                {
                    food_id: this.$route.params.id,
                    user_id: this.userId,
                    qty: this.qty,
                    total_price: this.food.price * this.qty,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    address: this.address,
                    date: this.date,
                    status: this.status
                })
                .then(() => {
                    this.alert = 'Your Order will be Confirmed.';
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

        let user = localStorage.getItem('user-info');
        this.userId = JSON.parse(user)[0].id;
        if (!user) {
            this.$router.push({ name: 'Index' });
        }
    }
}
</script>