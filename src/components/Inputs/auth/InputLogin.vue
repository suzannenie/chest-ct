<script>
import {mdiAccount} from "@mdi/js";
import i18n from "@/plugins/i18n";
import {mapGetters} from "vuex";

export default {
  name: "InputLogin",
  props: {
    disabled: {
      type: Boolean
    },
  },
  data: function () {
    return {
      icons: {
        login: mdiAccount,
      },
      isLoginValid: false,
      messageRequired: i18n.t("pages.auth.rules.required"),
      messageFormat: i18n.t("pages.auth.rules.login-format"),
      rules: [
        value => !!value || this.messageRequired,
      ]
    };
  },
  computed: {
    ...mapGetters("User", {
      credentialsLogin: "getCredentialsLogin",
    }),
    model: {
      get() {
        return this.credentialsLogin;
      },
      set(payload) {
        this.$store.commit("User/LOGIN", payload);
      }
    }
  },
  methods: {
    onEnter() {
      this.$emit("enter");
    }
  }
}
</script>

<template>
  <v-text-field
    v-model="model"
    :rules="rules"
    flat
    outlined
    :disabled="disabled"
    name="login"
    placeholder=" "
    type="username"
    :label="$t('pages.auth.login-input-label')"
    autocomplete="username"
    @keydown.enter="onEnter"
  />
</template>