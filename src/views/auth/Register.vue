<template>
    <div class="card">
        <div class="card-header">Register for an account</div>
        <div class="card-body">
            <form @submit.prevent="register()">
                <div class="form-group">
                    <label for="form-login-name">your name</label>
                    <input v-model="form.name" type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="form-login-email">your email</label>
                    <input v-model="form.email" type="email" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="form-login-password">your password</label>
                    <input v-model="form.password" type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-success">register</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("auth", ["form"])
    },
    methods: {
        ...mapActions("auth", ["register"])
    }
};
</script>