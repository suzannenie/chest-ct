<script>
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
      ]
    };
  },
  computed: {
    messageLength() {
      return i18n.t("pages.auth.rules.password-length",{n: this.passwordLength});
    },
    model: {
      get() {
        return this.$store.state["User"].credentials.newPassword;
      },
      set(payload) {
        this.$store.commit("User/NEW_PASSWORD", payload);
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
    name="new-password"
    autocomplete="new-password"
    :label="$t('pages.auth.new-password')"
    :prepend-inner-icon="icons.lock"
    :append-icon="show ? icons.eye : icons.eyeOff"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
    @keydown.enter="onEnter"
  />
</template>