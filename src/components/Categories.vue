<template>
    <select v-model="form.category" class="form-control">
        <option value>choose category</option>
        <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
        >{{ category.name }}</option>
    </select>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState("todos", ["categories", "form"])
    },
    methods: {
        ...mapActions("todos", ["fetchCategories"]),
        ...mapMutations("todos", ["REMOVE_ERROR"])
    },
    mounted() {
        this.fetchCategories();
    },
    watch: {
        "form.category"(value) {
            if (value) {
                this.REMOVE_ERROR("category");
            }
        }
    }
};
</script>