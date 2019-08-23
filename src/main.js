import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/scss/bootstrap.scss'
import $ from 'jquery/dist/jquery'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap'
import 'todomvc-app-css/index.css'

new Vue({
  el: '#app',
  render: h => h(App)
});
