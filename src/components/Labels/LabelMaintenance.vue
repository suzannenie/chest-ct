<script>
import {mdiCogRefresh} from "@mdi/js";
import {getDate} from "@/services/helpers";

export default {
  name: "LabelMaintenance",
  props: {
    type: {
      default: "",
      type: String
    },
    date: {
      default: "",
      type: String
    }
  },
  data: function () {
    return {
      mdiCogRefresh,
    }
  },
  methods: {
    getDate,
  }
}
</script>

<template>
  <v-chip
    class="chip"
    label
    small
  >
    <v-icon>
      {{ mdiCogRefresh }}
    </v-icon>
    <strong class="mr-1">{{ type }}</strong>
    {{ getDate(date) }}
  </v-chip>
</template>

<style lang="scss" scoped>
.chip {
  &:before {
    content: none;
  }
}
</style>