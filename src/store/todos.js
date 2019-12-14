import axios from 'axios';
import { isContext } from 'vm';

export default {
  namespaced: true,
  state: {
    todos: [],
    form: {
      title: ''
    }
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
    addTodo({ commit, state }) {
      axios.post('/todos', { ...state.form }).then(response => {
        commit('ADD_TODO', response.data);
        state.form.title = '';
      });
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = state.todos.concat(todos);
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    }
  }
};
