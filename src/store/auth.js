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
    logout({ commit }) {
      commit('SET_USER', null);
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
