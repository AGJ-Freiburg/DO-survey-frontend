import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './ml'



history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};


Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
