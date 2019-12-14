import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    user: null,
    form: {
      name: '',
      email: '',
      password: ''
    }
  },
  getters: {
    logged_in(state) {
      return !!state.user;
    },
    current_user(state) {
      return state.user;
    }
  },
  actions: {
    register({ commit, state }) {
      axios.post('/auth/register', { ...state.form }).then(response => {
        commit('SET_USER', response.data);
        router.push({ name: 'home' });
      });
    },
    login({ commit, state }) {
      axios.post('/auth/login', { ...state.form }).then(response => {
        commit('SET_USER', response.data);
        router.push({ name: 'home' });
      });
    },
    logout({ commit }) {
      commit('SET_USER', null);
      router.push({ name: 'home' });
    }
  },
  mutations: {
    SET_USER(state, user = null) {
      if (user) {
        localStorage.setItem('user_token', user.api_token);
        state.user = user;
      } else {
        localStorage.removeItem('user_token');
        state.user = null;
      }
    }
  }
};
