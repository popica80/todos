import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://api.todos.test/api';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user_token');
  (async () => {
    if (token) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      await axios
        .get('/user?api_token=' + token)
        .then(response => {
          store.commit('auth/SET_USER', response.data);
        })
        .catch(error => {
          localStorage.removeItem('user_token');
        });
    }
  })();
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
