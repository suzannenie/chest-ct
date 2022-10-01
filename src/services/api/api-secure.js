import axios from 'axios';
//import i18n from "@/plugins/i18n";
import {checkAuthorizationToken} from "./functions";
import store from "@/store";
import i18n from "@/plugins/i18n";

const ApiSecure = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    //params: new URLSearchParams({ lang: i18n.locale })
});

ApiSecure.interceptors.request.use(async function (config) {
    return checkAuthorizationToken(config);
}, function (error) {
    console.error("request rejected", error)
});

ApiSecure.interceptors.response.use(async function (response) {
    if (response.status === 200 || response.status === 201)
        return response.data;
    return null;
}, async function (payload) {
    if (payload?.config?.SILENT) return
    let snackbarMessage = i18n.t("snackbar.message");
    if (payload?.response?.data?.errors) {
        const errors = payload.response.data.errors
        snackbarMessage = errors.map(({message}) => message).join("; ")
    }
    await store.dispatch('App/setSnackbar', {  message: snackbarMessage, type: 'error' });
});

export default ApiSecure;
