<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>
    <form @submit.prevent="submit" class="order">
        <fieldset>
            <legend>Login Page</legend>

            <div class="order-label">Email</div>
            <input type="email" placeholder="Email..." v-model="email" class="input-responsive" required
                autocomplete="email">

            <div class="order-label">Password</div>
            <input type="password" placeholder="Password..." v-model.number="password" autocomplete="password"
                class="input-responsive" required>

            <input type="submit" name="submit" value="Login" class="btn btn-primary">
            <span style="float:right;">
                <RouterLink :to="{ name: 'SignUp' }">
                    Go to Sign Up Page
                </RouterLink>
            </span>
        </fieldset>
    </form>
</template>

<script>
import axios from "axios";
import { RouterLink } from 'vue-router';
export default {
    components: { RouterLink },
    data() {
        return {
            email: '',
            password: null,
            alert: ''
        }
    },
    methods:
    {
        async submit() {
            await axios.get("http://localhost:3000/user?email=" + this.email + "&password=" + this.password)
                .then((res) => {
                    localStorage.setItem("user-info", JSON.stringify(res.data));

                    this.alert = 'You Logged In Successfully';
                    setTimeout(() => {
                        this.$router.push({ name: 'Index' });
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