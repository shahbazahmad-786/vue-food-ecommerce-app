<template>
    <body>
        <!-- Navbar Section Starts Here -->
        <Header />
        <!-- Navbar Section Ends Here -->

        <RouterView />

        <!-- social Section Starts Here -->
        <SocialLinks />
        <!-- social Section Ends Here -->

        <!-- footer Section Starts Here -->
        <Footer />
        <!-- footer Section Ends Here -->
    </body>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from "./Header.vue";
import SocialLinks from "./SocialLinks.vue";
import Footer from "./Footer.vue";

export default {
    components: { RouterView, Header, SocialLinks, Footer }
}
</script>