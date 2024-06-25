<template>
    <div class="alert">
        <span v-if="alert">{{ alert }}</span>
    </div>
    <section class="navbar">
        <div class="container">
            <div class="logo">
                <RouterLink to="/" title="Logo">
                    <img src="../assets/images/logo.png" alt="Restaurant Logo" class="img-responsive">
                </RouterLink>
            </div>

            <div class="menu text-right">
                <ul>
                    <li>
                        <RouterLink :to="{ name: 'Index' }">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'Category' }">Categories</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'Foods' }">Foods</RouterLink>
                    </li>
                    <li v-if="username">
                        <RouterLink :to="{ name: 'MyOrder' }">My Order</RouterLink>
                    </li>
                    <li v-if="!username">
                        <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
                    </li>
                    <li v-if="username" class="username">

                        <a @click="logoutFun1" style="cursor:pointer" v-show="cf1">
                            Hello, {{ username }}
                        </a>

                        <a @click="logoutFun2" style="cursor:pointer" v-show="cf2">
                            Hello, {{ username }}
                        </a>

                        <div class="logout" v-show="logoutShow">
                            <span @click="logout">Logout</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="clearfix"></div>
        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: { RouterLink },
    data() {
        return {
            alert: '',
            username: '',
            logoutShow: false,
            cf1: true,
            cf2: false,
        }
    },
    methods:
    {
        logoutFun1() {
            this.logoutShow = true;
            this.cf1 = false;
            this.cf2 = true;
        },
        logoutFun2() {
            this.logoutShow = false;
            this.cf1 = true;
            this.cf2 = false;
        },
        logout() {
            localStorage.clear();
            this.username = '';
            this.alert = 'You Logged Out Successfully';
            setTimeout(() => {
                this.alert = '';
            }, 2000);
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.username = JSON.parse(user)[0].name;
        }

    }
}
</script>

<style>
li.username {
    position: relative;
    text-align: center;
}

.alert {
    position: absolute;
    top: 35px;
    left: 10%;
    right: 10%;
    text-align: center;
    z-index: 10000;
}

.alert span {
    background-color: black;
    color: white;
    padding: 5px 15px;
    font-size: 20px;
    border-radius: 5px;
}

.logout {
    position: absolute;
    top: 15px;
    left: 1%;
    right: 1%;
}

.logout span {
    background-color: #f1f3f4;
    padding: 3px 30px;
    font-weight: 100;
    letter-spacing: 0.5px;
    border-radius: 3px;
    cursor: pointer;
}

.logout span:hover {
    background-color: #bbe8ff;
}
</style>