import axios from 'axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    todos: [],
    categories: [],
    form: {
      title: '',
      category: ''
    },
    errors: {}
  },
  getters: {
    activeTodos(state) {
      return state.todos.filter(todo => {
        return !todo.completed;
      });
    },
    completedTodos(state) {
      return state.todos.filter(todo => {
        return todo.completed;
      });
    },
    errors: state => field => {
      return state.errors[field];
    }
  },
  actions: {
    fetchTodos({ commit }, { completed = true }) {
      axios
        .get('/todos', {
          params: {
            completed
          }
        })
        .then(response => {
          commit('SET_TODOS', response.data);
        });
    },
    fetchCategories({ commit }) {
      axios.get('/categories').then(response => {
        commit('SET_CATEGORIES', response.data);
      });
    },
    addTodo({ commit, state }) {
      if (!state.form.category) {
        return commit('SET_ERRORS', { category: 'please select a category' });
      }
      axios.post('/todos', { ...state.form }).then(response => {
        commit('ADD_TODO', response.data);
        state.form.title = '';
        state.form.category = '';
      });
    },
    toggleCompleted({ commit }, id) {
      axios.put('/todos/' + id).then(response => {
        console.log(response.data);
      });
    },
    deleteTodo({ commit }, id) {
      axios.delete('/todos/' + id).then(response => {
        if (response.status == 204) {
          commit('REMOVE_TODO', id);
        }
      });
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = state.todos.concat(todos);
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    REMOVE_TODO(state, id) {
      let index = state.todos.map(todo => todo.id).indexOf(id);
      Vue.delete(state.todos, index);
    },
    SET_ERRORS(state, errors) {
      let data = {};
      for (let [key, value] of Object.entries(errors)) {
        data[key] = value.toString();
      }
      state.errors = data;
    },
    REMOVE_ERROR(state, field) {
      state.errors[field] = null;
    }
  }
};
