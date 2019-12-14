<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <template v-if="logged_in">
                <add-todo></add-todo>
                <Todos :completed="false" class="mb-3">Active Todos</Todos>
                <Todos :completed="true">Completed Todos</Todos>
            </template>
            <template v-else>
                <div class="card">
                    <div class="card-body">please log in</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todos from "@/components/Todos.vue";
import AddTodo from "@/components/AddTodo.vue";
export default {
    name: "home",
    components: {
        Todos,
        AddTodo
    },
    computed: {
        ...mapGetters("auth", ["logged_in"])
    }
};
</script>
