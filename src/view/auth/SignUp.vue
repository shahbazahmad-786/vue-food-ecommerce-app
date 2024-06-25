<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>
    <form @submit.prevent="submit" class="order">
        <fieldset>
            <legend>Sign Up Page</legend>
            <div class="order-label">Name</div>
            <input type="text" placeholder="Name..." v-model="name" class="input-responsive" required>

            <div class="order-label">Email</div>
            <input type="email" placeholder="Email..." v-model="email" class="input-responsive" required>

            <div class="order-label">Password</div>
            <input type="password" placeholder="Password..." v-model.number="password" class="input-responsive" required>

            <input type="submit" value="Sign Up" class="btn btn-primary">
            <span style="float:right;">
                <RouterLink :to="{ name: 'Login' }">
                    Go to Login Page
                </RouterLink>
            </span>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: '',
            email: '',
            password: null,
            alert: ''
        }
    },
    methods:
    {
        async submit() {
            await axios.post("http://localhost:3000/user",
                {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    localStorage.setItem("user-info", JSON.stringify(res.data));

                    this.alert = 'Your Registiration successfully.';
                    setTimeout(() => {
                        this.$router.push({ name: 'Index' })
                    }, 2000);
                })
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({ name: 'Index' });
        }
    }
}
</script>