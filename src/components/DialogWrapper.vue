<script>
import {icons} from "@/services/helpers";
export default {
  name: "DialogWrapper",
  props: {
    showStatus: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    success: {
      type: Boolean,
    },
    buttonSubmitLabel: {
      type: String,
      default: ""
    },
    buttonActivatorLabel: {
      type: String,
      default: ""
    },
    buttonActivatorIcon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    subtitleStrong: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      dialog: false,
      icons,
    }
  },
  methods: {
    close() {
      this.dialog = false
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :max-width="500"
    scrollable
    :content-class="$vuetify.breakpoint.xsOnly ? 'dialog--tile' : ''"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <template #activator="{on, attrs}">
      <template v-if="buttonActivatorIcon">
        <v-btn
          color="secondary"
          v-bind="attrs"
          small
          depressed
          icon
          v-on="on"
        >
          <v-icon small>
            {{ buttonActivatorIcon }}
          </v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          color="primary"
          v-bind="attrs"
          small
          rounded
          depressed
          v-on="on"
        >
          {{ buttonActivatorLabel }}
        </v-btn>
      </template>
    </template>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between flex-nowrap"
        style="word-break: break-word"
      >
        {{ title }}
        <template v-if="showStatus">
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="24"
            class="ml-1"
            color="secondary"
          />
          <template
            v-else
          >
            <v-icon
              v-if="success === true"
              color="success"
              class="ml-1"
            >
              {{ icons.success }}
            </v-icon>
            <v-icon
              v-if="success === false"
              color="error"
              class="ml-1"
            >
              {{ icons.error }}
            </v-icon>
          </template>
        </template>
      </v-card-title>
      <v-card-subtitle>
        {{ subtitle }}
        <strong>{{ subtitleStrong }}</strong>
      </v-card-subtitle>
      <v-card-text class="pt-1">
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-0">
          <v-col :cols="buttonSubmitLabel ? 6 : 12">
            <v-btn
              block
              rounded
              depressed
              @click="close"
            >
              {{ $t('close-btn') }}
            </v-btn>
          </v-col>
          <v-col
            v-if="buttonSubmitLabel"
            :cols="6"
          >
            <v-btn
              v-if="buttonSubmitLabel"
              block
              rounded
              depressed
              color="primary"
              :loading="loading"
              @click="$emit('submit')"
            >
              {{ buttonSubmitLabel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.dialog--tile {
  border-radius: 0 !important;
}
</style>