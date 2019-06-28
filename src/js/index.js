import "../assets/scss/styles.scss";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    el: "#app",
    render: h => h(App),
    store,
    router
});
