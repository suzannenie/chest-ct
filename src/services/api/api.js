import axios from 'axios';
//import i18n from "@/plugins/i18n";

const Api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    //params: new URLSearchParams({ lang: i18n.locale })
});

Api.interceptors.request.use(async function (config) {
    return config
});

Api.interceptors.response.use(async function (response) {
    if (response.status === 200)
        return response.data;
    return null;
});

export default Api;
