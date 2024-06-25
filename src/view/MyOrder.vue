<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>
    <section class="food-menu">
        <div class="container">
            <h2 class="text-center">My Order</h2>

            <div class="food-menu-box" style="width: 100%;">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Qty</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in order" :key="order.id" class="row" v-if="order.length > 0">
                            <td>{{ order.qty }}</td>
                            <td>${{ order.total_price.toFixed(1) }}</td>
                            <td>{{ order.name }}</td>
                            <td>{{ order.email }}</td>
                            <td>{{ order.phone }}</td>
                            <td>{{ order.address }}</td>
                            <td :style="{ color: order.status === 0 ? 'red' : 'green' }">
                                {{ order.status === 0 ? 'pending' : 'completed' }}
                            </td>
                            <td>{{ order.date }}</td>
                            <td>
                                <RouterLink :to="{ name: 'UpdateOrder', params: { id: order.food_id, oid: order.id } }"
                                    class="btn btn-primary" style="padding:5px 10px;">
                                    Edit
                                </RouterLink>
                                <a @click="cancel(order.id)" class="btn btn-primary"
                                    style="padding:5px 10px;margin-left: 3px;">
                                    Cancel
                                </a>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="9" style="color: #ff6b81;">
                                <h3>No Order Available.</h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="clearfix"></div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            userId: null,
            order: [],
            alert: ''
        }
    },
    methods: {
        async cancel(orderId) {
            await axios.delete("http://localhost:3000/order/" + orderId)
                .then(() => {
                    this.alert = 'The order will be cancelled';
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                })
        }
    },
    async mounted() {

        // ### For Authentication ###
        let user = localStorage.getItem('user-info');
        if (user) {
            this.userId = JSON.parse(user)[0].id;
        }
        if (!user) {
            this.$router.push({ name: 'Index' });
        }

        // ### My Orders ###
        await axios.get("http://localhost:3000/order?user_id=" + this.userId)
            .then((res) => {
                this.order = res.data;
            })
    }
}
</script>

<style scoped>
.table {
    width: 80%;
    margin: auto;
    text-align: center;
}

td {
    padding: 10px;
}
</style>