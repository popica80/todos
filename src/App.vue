<template>
    <div id="app">
        <TopNavbar />
        <div class="container py-4">
            <router-view />
        </div>
    </div>
</template>

<script>
import TopNavbar from "./views/navs/TopNavbar";
export default {
    components: {
        TopNavbar
    }
};
</script>
