import axios from "axios";
import router from "@/router";
import storage from "@/services/web-storage";
import store from "@/store";

const API_URL = process.env.VUE_APP_API_BASE_URL + "auth/";

class AuthService {
    #refreshingToken=false;

    async checkAccessToken() {
        if (this.#refreshingToken) {
            return new Promise(resolve => {
                setTimeout(async () => {
                    resolve(await this.checkAccessToken())
                }, 100);
            });
        }
        if (await this.isAccessValid())
            return storage.getAccessToken();
        else
            return null;
    }
    async isAccessValid() {
        return storage.getAccessToken()
            && storage.getAccessExpiry()
            && (Date.now() < storage.getAccessExpiry())
            || await this.token_refresh();
    }
    async token_refresh() {
        if (this.isRefreshValid()) {
            this.#refreshingToken = true;
            const res = await this.authentication({
                url: API_URL + "refresh/",
                data: {
                    refresh: storage.getRefreshToken()
                }
            });
            this.#refreshingToken = false
            return res;
        }
        else return false;
    }
    isRefreshValid() {
        return storage.getRefreshToken()
            && storage.getRefreshExpiry()
            && (Date.now() < storage.getRefreshExpiry());
    }
    async authentication({url, data, config}) {
        try {
            const response = await axios.post(url, data, config);
            if (response.status === 200) {
                await this.onLoginSuccess(response.data);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    async onLoginSuccess({auth, profile, access, refresh}) {
        const accessToken = access ?? auth.access
        const refreshToken = refresh ?? auth.refresh
        if (accessToken) {
            storage.setAccessToken(accessToken);
            const lifespan = 60 * 60 * 1000; // 60 min
            storage.setAccessExpiry(Date.now() + lifespan);
        }
        if (refreshToken) {
            storage.setRefreshToken(refreshToken);
            const lifespan = 2 * 24 * 60 * 60 * 1000; // 2 days
            storage.setRefreshExpiry(Date.now() + lifespan);
        }
        if (profile)
            await store.commit("User/SET", profile)
    }
    async login_email(login, password) {
        return await this.authentication({
            url: API_URL + "sign_in/",
            data: { login, password }
        });
    }
    async logout() {
        await storage.clear(); // web-storage
        await store.dispatch("reset", null, { root: true }); //vuex
        try {
            await router.push("/auth");
        } catch (e) {
            await router.go(0)
        }
    }
}
export default new AuthService();