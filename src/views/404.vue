<script>
export default {
  name: 'FourOFour',
  created () {
    this.$ssrContext && this.$ssrContext.res.status(404)
  },
}
</script>

<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <p>{{ $t("pages.404.headline") }}</p>
        <v-btn
          to="/"
          color="primary"
          text
          depressed
          rounded
        >
          {{ $t("pages.404.btn") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
