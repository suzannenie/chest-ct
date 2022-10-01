const initialState = () => ({
    isRouterLoading: false,
    isContentLoading: false,
    isSwitchingLanguage: false,
    showMenus: true,
    width: 0,
    height: 0,
    mobileBreakpoint: 600,
    snackbar: false,
    snackbarMessage: '',
    snackbarType: '',
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    smallScreen(state) {
        return state.width < state.mobileBreakpoint;
    },
    contentHeight(state) {
        return state.height - (state.width > 960 ? 64 : 56);
    },
    isReady(state) {
        return !state.isContentLoading && !state.isRouterLoading;
    },
    getMobileBreakpoint(state) {
        return state.mobileBreakpoint;
    },
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    router({commit}, value) {
        commit('ROUTER_LOADING', value);
    },
    setSnackbar({commit}, value) {
        if (value === false)
            commit('SNACKBAR', {
                value: false,
                message: '',
                type: ''
            });
        else
            commit('SNACKBAR', {
                value: true,
                message: value.message,
                type: value.type
            });
    }
};


// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    ROUTER_LOADING(state, value) {
        state.isRouterLoading = value;
        state.showMenus = !value;
    },
    ON_RESIZE(state) {
        if (process.server) return;
        state.width = window.innerWidth;
        state.height = window.innerHeight;
    },
    DATA_LOADING(state, value) {
        state.isContentLoading = value;
    },
    SWITCHING_LANGUAGE(state, value) {
        state.isSwitchingLanguage = value;
    },
    MENUS(state, value) {
        state.showMenus = value
    },
    SNACKBAR(state, {value, message, type}) {
        state.snackbar = value
        state.snackbarMessage = message
        state.snackbarType = type
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};