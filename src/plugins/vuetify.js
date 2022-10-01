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
                primary: "#09CEDB",
                secondary: "#424874",
                accent: "#DCD6F7",
                error: "#FF5714",
                info: "#DCD6F7",
                success: "#84C318",
                warning: "#FF5714",
            },
        },
    },
});