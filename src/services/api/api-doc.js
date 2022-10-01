import axios from 'axios';
//import i18n from "@/plugins/i18n";
import {checkAuthorizationToken} from "./functions";

const ApiDoc = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    //params: new URLSearchParams({ lang: i18n.locale })
});

ApiDoc.interceptors.request.use(async function (config) {
    config.responseType = "blob"
    return checkAuthorizationToken(config);
});

ApiDoc.interceptors.response.use(function(response) {
    if (response.status === 200) {
        const bp = response.data;
        const blob = new Blob([bp], {
            type: response.headers["content-type"]
        });
        const link = document.createElement("a");
        const URL = window.URL || window.webkitURL;
        const downloadUrl = URL.createObjectURL(blob);
        link.href = downloadUrl;
        link.style.display = "none";
        setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        }, 100);
        return link;
    } else {
        return undefined;
    }
});

export default ApiDoc;
