import i18n from "@/plugins/i18n";
import store from "@/store";
import AuthService from "@/services/auth.service";
import {canFunction} from "@/services/helpers";
//import store from "@/store";
//import AuthService from "@/services/auth.service";

// function defaultPage(next) {
//     if (store.getters["User/getRole"] === "admin") next("/admin")
//     else next("/")
// }

export default {
    updatePageTitleAndMeta(document, to) {
        const nearestWithTitle = to.matched
            .slice()
            .reverse()
            .find(r => r.meta && r.meta.title);
        const nearestWithMeta = to.matched
            .slice()
            .reverse()
            .find(r => r.meta && r.meta.metaTags);
        if (nearestWithTitle)
            document.title = i18n.t(nearestWithTitle.meta.title) + " | " + i18n.t("app-name");
        Array.from(document.querySelectorAll("[data-vue-router-controlled]"))
            .map(el => el.parentNode.removeChild(el));
        if (!nearestWithMeta) return;
        nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement("meta");
            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });
            tag.setAttribute("data-vue-router-controlled", "");
            return tag;
        }).forEach(tag => document.head.appendChild(tag));
    },
    
    handleUnauthorizedAccess: async function (to, next) {
        const isLoggedIn =
            store.getters["User/isLoggedIn"] ||
            !!(await AuthService.checkAccessToken());
        const isNavToAuth = to.fullPath.includes("/auth");
        if(isLoggedIn) await store.dispatch("User/init")

        if (to.meta.public) {
            if (isNavToAuth && isLoggedIn) {
                next("/")
            }
            else {
                next();
            }
        } else {
            if(isLoggedIn) {
                if (canFunction(to.meta.permission))
                    next();
                else next("/")
            }
            else next("/auth")
        }
    },
};

