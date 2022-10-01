<script>
import {mdiEmail} from "@mdi/js";
import i18n from "@/plugins/i18n";
import {mapGetters} from "vuex";

export default {
  name: "InputEmail",
  props: {
    disabled: {
      type: Boolean
    },
  },
  data: function () {
    return {
      icons: {
        email: mdiEmail
      },
      isEmailValid: false,
      emailRegExp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      messageRequired: i18n.t("pages.auth.rules.email-required"),
      messageFormat: i18n.t("pages.auth.rules.email-format"),
      rules: [
        value => !!value || this.messageRequired,
        value => this.emailRegExp.test(value) || this.messageFormat,
      ]
    };
  },
  computed: {
    ...mapGetters("User", {
      credentialsEmail: "getCredentialsEmail",
    }),
    model: {
      get() {
        return this.credentialsEmail;
      },
      set(payload) {
        this.$store.commit("User/EMAIL", payload);
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
    name="email"
    type="email"
    placeholder=" "
    :label="$t('pages.auth.email-input-label')"
    autocomplete="email"
    @keydown.enter="onEnter"
  />
</template>