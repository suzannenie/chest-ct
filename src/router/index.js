import Vue from "vue"
import VueRouter from "vue-router"
import functions from "@/router/functions";
import routes from "@/router/routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
});

router.beforeEach( async (to, from, next) => {
    store.commit("App/ROUTER_LOADING", true);
    functions.updatePageTitleAndMeta(document, to);
    await functions.handleUnauthorizedAccess(to, next);
    store.commit("App/ROUTER_LOADING", false)
});
//
// router.afterEach(() => {
// });

export default router
