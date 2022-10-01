<script>
import i18n from "@/plugins/i18n";
import {mapGetters} from "vuex";
import {mdiEyeOff, mdiEye} from "@mdi/js";

export default {
  name: "InputCode",
  data: function () {
    return {
      mdiEye,
      mdiEyeOff,
      showCode: false,
      codeLength: 4,
      messageRequired: i18n.t("pages.auth.rules.code-required"),
      rules: [
        value => !!value || this.messageRequired,
        value => !!value && value.length === this.codeLength ||  this.messageLength,
      ]
    };
  },
  computed: {
    messageLength() {
      return i18n.t("pages.auth.rules.code-length",{n: this.codeLength});
    },
    model: {
      ...mapGetters("User", {
        credentialsCode: "getCredentialsCode",
      }),
      get() {
        return this.credentialsCode;
      },
      set(payload) {
        this.$store.commit("User/CODE", payload);
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
    :label="$t('pages.auth.code-input-label')"
    name="code"
    outlined
    flat
    pattern="\d*"
    type="number"
    :class="{'codeInput': !showCode}"
    :append-icon="showCode ? mdiEye : mdiEyeOff"
    autocomplete="off"
    :rules="rules"
    @click:append="showCode = !showCode"
    @keydown.enter="onEnter"
  />
</template>

<style>
.codeInput > .v-input__control > .v-input__slot > .v-text-field__slot > input {
  -webkit-text-security: disc;
}
</style>