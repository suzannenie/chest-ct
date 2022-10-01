<script>
import { mdiDelete} from "@mdi/js";

export default {
  name: "DeleteBtn",
  props: {
    entity: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      mdiDelete,
      dialogInternal: false,
    }
  },
  computed: {
    dialog: {
      get() {
        return this.dialogInternal
      },
      set(value) {
        this.dialogInternal = value
      }
    }
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :max-width="500"
    scrollable
  >
    <template #activator="{on, attrs}">
      <v-btn
        color="secondary"
        v-bind="attrs"
        small
        depressed
        icon
        v-on="on"
      >
        <v-icon small>
          {{ mdiDelete }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ 
          entity 
            ? $t("dialog-delete.title", {entity: entity}) 
            : $t("dialog-delete.title-default") 
        }}
      </v-card-title>
      <v-card-actions class="justify-space-between">
        <v-btn
          text
          depressed
          rounded
          color="secondary"
          @click="$emit('delete');dialog = false"
        >
          {{ $t("dialog-delete.delete-btn") }}
        </v-btn>
        <v-btn
          color="primary"
          rounded
          depressed
          @click="dialog = false"
        >
          {{ $t("dialog-delete.cancel-btn") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>