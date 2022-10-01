<script>
import {mdiAccountHardHatOutline, mdiAccountOutline} from "@mdi/js";

export default {
  name: "LabelUser",
  props: {
    user: {
      type: Object,
      required: true,
    },
    canDelete: {
      type: Boolean,
    },
    implementer: {
      type: Boolean,
    }
  },
  data: function () {
    return {
      mdiAccountHardHatOutline,
      mdiAccountOutline
    }
  }
}
</script>

<template>
  <v-hover :disabled="!canDelete">
    <template #default="{hover}">
      <v-chip
        outlined
        pill
        class="chip"
        :close="hover"
        @click:close="$emit('delete')"
      >
        {{ user.full_name }}
        <v-icon
          v-show="!hover"
          right
          :size="20"
        >
          {{ implementer ? mdiAccountHardHatOutline : mdiAccountOutline }}
        </v-icon>
      </v-chip>
    </template>
  </v-hover>
</template>

<style scoped lang="scss">
.chip::v-deep {
  .v-chip__content {
    overflow: visible;
  }
}
</style>