<template>
    <div class="card">
        <div class="card-header">
            <slot></slot>
        </div>
        <ul class="list-group">
            <li v-for="todo in todos" :key="`todo-${todo.id}`" class="list-group-item">
                {{todo.title}}
                <input type="checkbox" v-model="todo.completed" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "ActiveTodos",
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
        ...mapActions("todos", ["fetchTodos"])
    },
    mounted() {
        this.fetchTodos({ completed: Number(this.completed) });
    }
};
</script>

<style scoped>
</style>
