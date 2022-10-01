<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Snackbar",
  data() {
    return {
    };
  },
  computed: {
    ...mapState("App", {
      snackbar: "snackbar",
      snackbarType: "snackbarType",
      snackbarMessage: "snackbarMessage",
    }),
    model: {
      get() {
        return this.snackbar;
      },
      set(value) {
        this.$store.dispatch("setSnackbar", value);
      },
    },
  },
  methods: {
    ...mapActions("App", {setSnackbar: "setSnackbar"}),
  }
}
</script>

<template>
  <v-snackbar
    :value="snackbar"
    :timeout="4000"
    :top="true"
    :color="snackbarType"
    :multi-line="true"
  >
    {{ snackbarMessage }}
    <template #action="{attrs}">
      <v-btn
        text
        rounded
        depressed
        v-bind="attrs"
        @click="setSnackbar(false)"
      >
        {{ $t("snackbar.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>