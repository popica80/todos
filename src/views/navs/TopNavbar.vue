<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light shadow-sm">
        <div class="container">
            <router-link :to="{name: 'home'}" class="navbar-brand">Todos</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <template v-if="!logged_in">
                        <li class="nav-item">
                            <router-link :to="{name:'login'}" class="nav-link">log in</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'register'}" class="nav-link">register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >{{ current_user.name }}</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a @click.prevent="logout()" class="dropdown-item">log out</a>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters("auth", ["logged_in", "current_user"])
    },
    methods: {
        ...mapActions("auth", ["logout"])
    }
};
</script>