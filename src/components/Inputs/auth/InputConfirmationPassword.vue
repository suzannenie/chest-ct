<script>
import { mapGetters } from "vuex"
import {mdiEye, mdiEyeOff, mdiLock} from "@mdi/js";
import i18n from "@/plugins/i18n";

export default {
  name: "InputPassword",
  data: function () {
    return {
      icons: {
        lock: mdiLock,
        eye: mdiEye,
        eyeOff: mdiEyeOff
      },
      show: false,
      messageRequired: i18n.t("pages.auth.rules.required"),
      passwordLength: 5,
      rules: [
        value => !!value || this.messageRequired,
        value => value.length >= this.passwordLength || this.messageLength,
        value => value === this.newPassword || this.messageLength,
      ]
    };
  },
  computed: {
    ...mapGetters("User", { newPassword: "getCredentialsNewPassword"}),
    messageLength() {
      return i18n.t("pages.auth.rules.password-length",{n: this.passwordLength});
    },
    model: {
      get() {
        return this.$store.state["User"].credentials.confirmationPassword;
      },
      set(payload) {
        this.$store.commit("User/CONFIRMATION_PASSWORD", payload);
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
    ref="input"
    v-model="model"
    :rules="rules"
    outlined
    placeholder=" "
    name="confirmation-password"
    autocomplete="new-password"
    :label="$t('pages.auth.confirmation-password')"
    :prepend-inner-icon="icons.lock"
    :append-icon="show ? icons.eye : icons.eyeOff"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
    @keydown.enter="onEnter"
  />
</template>