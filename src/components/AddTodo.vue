<template>
    <div>
        <form @submit.prevent.self="addTodo()" @keydown.enter.self="addTodo()">
            <div class="form-group d-flex">
                <input type="text" v-model="form.title" autofocus class="form-control mr-2" />
                <button type="submit" class="btn btn-success">add</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("todos", ["form"])
    },
    methods: {
        ...mapActions("todos", ["addTodo"])
    }
};
</script>