<template>
    <section class="social">
        <div class="container text-center">
            <ul>
                <li>
                    <RouterLink to="#">
                        <img src="../assets/images/icons8-facebook-48.png" width="30">
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="#">
                        <img src="../assets/images/icons8-instagram-48.png" width="30">
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="#">
                        <img src="../assets/images/icons8-twitter-48.png" width="30">
                    </RouterLink>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    components: { RouterLink }
}
</script>