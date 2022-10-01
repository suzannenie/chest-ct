import i18n from "@/plugins/i18n";
import router from "@/router";
import axios from "axios";
import AuthService from "@/services/auth.service";

export function setParamLang(config) {
    let params = config.params;
    if (params) {
        if (params.has("lang")) params.delete("lang");
        params.append("lang", i18n.locale);
    } else {
        params = new URLSearchParams({ lang: i18n.locale });
    }
    config.params = params;
    return config
}

export async function checkAuthorizationToken(config) {
    const token = await AuthService.checkAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    } else {
        await router.replace('/auth');
        return {
            ...config,
            cancelToken: new axios.CancelToken((cancel) =>
                cancel('Cancel unauthorized request'))
        }
    }
}