<template>
    <div class="card">
        <div class="card-header">Log in to your account</div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label for="form-login-email">your email</label>
                    <input v-model="form.email" type="email" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="form-login-password">your password</label>
                    <input v-model="form.password" type="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">log in</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("auth", ["form"])
    }
};
</script>