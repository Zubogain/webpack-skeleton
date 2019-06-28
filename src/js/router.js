import Main from "./components/Main.vue";
import PageNotFound from "./components/PageNotFound.vue";

export default [
    {
        path: "/",
        name: "Main",
        component: Main
    },
    {
        path: "*",
        name: "PageNotFound",
        component: PageNotFound
    }
];
