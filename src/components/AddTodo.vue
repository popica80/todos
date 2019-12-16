<template>
    <div>
        <form @submit.prevent.self="addTodo()" @keydown.enter.self="addTodo()">
            <div class="form-row">
                <div class="col-8">
                    <input
                        type="text"
                        v-model="form.title"
                        autofocus
                        class="form-control mr-2"
                        :class="{'is-invalid': errors('category')}"
                    />
                    <div class="invalid-feedback">{{ errors('category') }}</div>
                </div>
                <div class="col-3">
                    <Categories />
                </div>
                <div class="col-1">
                    <button type="submit" class="btn btn-success">add</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    components: {
        Categories
    },
    computed: {
        ...mapState("todos", ["form"]),
        ...mapGetters("todos", ["errors"])
    },
    methods: {
        ...mapActions("todos", ["addTodo"])
    }
};
</script>