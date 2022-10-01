// State initial object
import AuthService from '../../services/auth.service';
import {getProfileSelf} from "@/services/api/requests";
import {vp} from "@/services/helpers";

const initialState = () => ({
	login: null,
	role: null,
	viewPermissions: [],
	credentials: {
		login: "",
		password: "",
		newPassword: "",
		confirmationPassword: "",
		captcha: "",
		code: "",
	}
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
	getRole: (state) => state.role,
	getPermissions: (state) => state.viewPermissions,
	getLogin: (state) => state.login,
	getPassword: (state) => state.password,
	getCredentialsLogin: (state) => state.credentials.login,
	getCredentialsPassword: (state) => state.credentials.password,
	getCredentialsNewPassword: (state) => state.credentials.newPassword,
	getCredentialsConfirmationPassword: (state) => state.credentials.confirmationPassword,
	getCredentialsCode: (state) => state.credentials.code,
	isLoggedIn: (state) => !!state.login,
	hasMasterPermission : (state) =>
		state.viewPermissions.map(({id})=>id).includes(vp.MASTER),
};


// VUEX ACTIONS
const actions = {
	reset({commit}) {
		commit('RESET');
	},
	async init({ commit }) {
		commit('SET', await getProfileSelf());
	},
	async login({ state }) {
		return await AuthService.login_email(state.credentials.login, state.credentials.password)
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
	SET(state, profile) {
		state.login = profile.login;
		state.first_name = profile.last_name;
		state.last_name = profile.last_name;
		state.email = profile.email;
		state.role = profile.role;
		state.viewPermissions = profile.view_permissions;
	},
	LOGIN(state, payload) {
		state.credentials = {
			...state.credentials,
			login: payload
		};
	},
	PASSWORD(state, payload) {
		state.credentials = {
			...state.credentials,
			password: payload
		};
	},
	NEW_PASSWORD(state, payload) {
		state.credentials = {
			...state.credentials,
			newPassword: payload
		};
	},
	CONFIRMATION_PASSWORD(state, payload) {
		state.credentials = {
			...state.credentials,
			confirmationPassword: payload
		};
	},
	CODE(state, payload) {
		state.credentials = {
			...state.credentials,
			code: payload
		};
	},
};


export default {
	state,
	getters,
	actions,
	mutations
};