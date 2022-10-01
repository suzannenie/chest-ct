<script>
import {mdiFilterVariant} from "@mdi/js";

export default {
  name: "FilterButton",
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  data: function () {
    return {
      mdiFilterVariant,
    }
  }
}
</script>

<template>
  <v-badge
    overlap
    :value="count > 0"
    :content="count"
    :offset-x="20"
    :offset-y="25"
  >
    <v-btn
      v-bind="$attrs"
      icon
      depressed
      rounded
      v-on="$listeners"
    >
      <v-icon>{{ mdiFilterVariant }}</v-icon>
    </v-btn>
  </v-badge>
</template>