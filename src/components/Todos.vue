<template>
    <div class="card">
        <div class="card-header">
            <slot></slot>
        </div>
        <div class="list-group list-group-flush">
            <div v-for="todo in todos" :key="`todo-${todo.id}`" class="list-group-item">
                <div class="d-flex align-items-center">
                    <span class="flex-grow-1">{{todo.title}}</span>
                    <div class="d-flex flex-column mr-3">
                        <small>{{ todo.created_at }}</small>
                        <small>{{ todo.category.name }}</small>
                    </div>

                    <img
                        @click.prevent="deleteTodo(todo.id)"
                        src="@/assets/icons/delete.svg"
                        width="16px"
                        class="mr-3"
                    />
                    <input
                        type="checkbox"
                        @
                        v-model="todo.completed"
                        @change="toggleCompleted(todo.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Todos",
    props: {
        completed: {
            required: true
        }
    },
    data: () => ({}),
    computed: {
        todos() {
            return this.completed
                ? this.$store.getters["todos/completedTodos"]
                : this.$store.getters["todos/activeTodos"];
        }
    },
    methods: {
        ...mapActions("todos", ["fetchTodos", "toggleCompleted", "deleteTodo"])
    },
    mounted() {
        this.fetchTodos({ completed: Number(this.completed) });
    }
};
</script>

<style scoped>
</style>
