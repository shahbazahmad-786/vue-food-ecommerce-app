<template>
    <section class="footer">
        <div class="container text-center">
            <p>
                All rights reserved. Designed By
                <RouterLink :to="{ name: 'Index' }">Shahbaz Ahmad</RouterLink>
            </p>
        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    components: { RouterLink }
}
</script>