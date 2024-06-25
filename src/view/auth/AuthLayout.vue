<template>
    <section class="food-search" style="height:70.7vh;">
        <div class="container">

            <RouterLink :to="{ name: 'Index' }">
                <h2 class="text-center text-white"
                    style="background-color:white;width: 150px;padding: 5px 2px;margin: auto;border-radius: 5px;">
                    <img src="/src/assets/images/logo.png" alt="Logo" width="100">
                </h2>
            </RouterLink>

            <RouterView />

        </div>
    </section>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
    components: { RouterView, RouterLink }
}
</script>