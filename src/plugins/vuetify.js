import Vue from "vue";
import Vuetify from "vuetify/lib";
import minifyTheme from "minify-css-string";

Vue.use(Vuetify);

import ru from "vuetify/es5/locale/ru";
import en from "vuetify/lib/locale/en";

export default new Vuetify({
    icons: {
        iconfont: "mdiSvg",
    },
    lang: {
        current: process.env.VUE_APP_I18N_LOCALE
            || process.env.VUE_APP_I18N_LOCAL,
        locales: { ru, en }
    },
    theme: {
        options: {
            minifyTheme,
            customProperties: true,
            variations: false,
            themeCache: {
                get: () => localStorage.getItem(`${process.env.VUE_APP_NAME}-${process.env.VUE_APP_VERSION}`),
                set: (_, value) =>
                    localStorage.setItem(`${process.env.VUE_APP_NAME}-${process.env.VUE_APP_VERSION}`, value)
            },
        },
        dark: false,
        themes: {
            light: {
                primary: "#CF0A2C",
                secondary: "#333333",
                accent: "#CF0A2C",
                error: "#E28413",
                info: "#00A5CF",
                success: "#226F54",
                warning: "#E28413",
            },
        },
    },
});