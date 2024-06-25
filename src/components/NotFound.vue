<template>
    <div>
        <span>404 | Page Not Found</span>
        <RouterLink :to="{ name: 'Index' }" class="button">Go to Home Page</RouterLink>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    components: { RouterLink }
}
</script>

<style scoped>
div {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

span {
    color: gray;
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
    font-size: 30px;
}

.button {
    background-color: gray;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 15px;
    margin-top: 5px;
}
</style>