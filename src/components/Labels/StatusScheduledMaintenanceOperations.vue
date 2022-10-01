<script>
import {mdiArrowRight} from "@mdi/js";
import {
  acceptScheduledMaintenanceOperation, assignScheduledMaintenanceOperation,
  cancelScheduledMaintenanceOperation,
  doneScheduledMaintenanceOperation,
  impossibleToFinishScheduledMaintenanceOperation,
  lackOfTimeScheduledMaintenanceOperation,
  startScheduledMaintenanceOperation
} from "@/services/api/requests";
import {
  checkNull, getNextScheduledStatuses,
  getScheduledStatusColor,
  getScheduledStatusName,
  ruleRequired,
  scheduledStatuses, workModes
} from "@/services/helpers";
export default {
  name: "StatusScheduledMaintenanceOperations",
  props: {
    status: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: NaN,
    },
    disabled: {
      type: Boolean,
    },
    users: {
      type: Array,
      default: ()=>([])
    },
    activatorClass: {
      type: String,
      default: "",
    }
  },
  data: function () {
    return {
      ...scheduledStatuses,
      workModes,
      comment: "",
      mdiArrowRight,
      menuModel: false,
      loading: false,
      newStatusIndex: 0,
      selectedUserId: null,
      isValid: false,
      workMode: "DAY",
      ruleRequired: ruleRequired(this.$t('rules.required'))
    }
  },
  computed: {
    usersLoaded() {
      return Array.isArray(this.users) && this.users.length > 0
    },
    text() {
      return this.getScheduledStatusName(this.status)
    },
    color() {
      return this.getScheduledStatusColor(this.status)
    },
    availableStatuses() {
      return getNextScheduledStatuses(this.status)
    },
    nextStatus() {
      return this.availableStatuses[this.newStatusIndex] || null
    }
  },
  created() {
    if (!this.usersLoaded) {
      this.$emit("fetch-users")
    }
  },
  methods: {
    getScheduledStatusName,
    getScheduledStatusColor,
    newStatusSwitch() {
      this.comment = ""
      this.selectedUserId = null
      this.$refs.form.resetValidation()
      if (this.newStatusIndex + 1 === this.availableStatuses.length)
        this.newStatusIndex = 0
      else
        this.newStatusIndex += 1
    },
    async submit() {
      this.$refs.form.validate()
      if (!this.id || !this.isValid) return
      this.loading = true
      try {
        if (this.nextStatus === this.ASSIGNED) {
          await assignScheduledMaintenanceOperation(this.id, this.selectedUserId, this.workMode)
        }
        if (this.nextStatus === this.IN_PROGRESS) {
          await startScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        if (this.nextStatus === this.LACK_OF_TIME) {
          await lackOfTimeScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        if (this.nextStatus === this.IMPOSSIBLE_TO_COMPLETE) {
          await impossibleToFinishScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        if (this.nextStatus === this.DONE) {
          await doneScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        if (this.nextStatus === this.APPROVED) {
          await acceptScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        if (this.nextStatus === this.CANCELED) {
          await cancelScheduledMaintenanceOperation(this.id, {
            comment: checkNull(this.comment),
          })
        }
        this.$emit("update")
        this.menuModel = false
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
        this.newStatusIndex = 0
      }
    },
  }
}
</script>

<template>
  <v-menu
    v-model="menuModel"
    :close-on-content-click="false"
    min-width="200"
    max-width="500"
  >
    <template #activator="{on, attrs}">
      <v-chip
        v-bind="attrs"
        :color="color"
        class="status"
        :class="activatorClass"
        :disabled="disabled || availableStatuses.length === 0"
        v-on="on"
      >
        {{ text }}
      </v-chip>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <v-chip
          disabled
          :color="color"
          class="status"
        >
          {{ text }}
        </v-chip>
        <v-icon>{{ mdiArrowRight }}</v-icon>
        <v-chip
          :color="getScheduledStatusColor(nextStatus)"
          class="status"
          :disabled="availableStatuses.length === 1"
          @click="newStatusSwitch"
        >
          {{ getScheduledStatusName(nextStatus) }}
        </v-chip>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="isValid"
          autocomplete="none"
        >
          <v-text-field
            v-if="[APPROVED, CANCELED, LACK_OF_TIME, IMPOSSIBLE_TO_COMPLETE].includes(nextStatus)"
            v-model="comment"
            :label="$t('pages.scheduled-maintenance-operations.headers.comment')"
            outlined
            dense
            :rules="nextStatus === APPROVED ? [] : [ruleRequired]"
          />
          <template v-if="[ASSIGNED].includes(nextStatus)">
            <v-select
              v-model="selectedUserId"
              :items="users"
              item-value="id"
              item-text="full_name"
              :label="$t('pages.scheduled-maintenance-operations.assign.user')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
            <v-select
              v-if="false"
              v-model="workMode"
              :items="workModes"
              item-value="value"
              item-text="text"
              :label="$t('pages.scheduled-maintenance-operations.assign.work-mode')"
              outlined
              dense
            />
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          rounded
          depressed
          :loading="loading"
          @click="submit"
        >
          {{ $t("pages.scheduled-maintenance-operations.status.btn-submit") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style lang="scss" scoped>
.status.v-chip--disabled {
  opacity: 1 !important;
}
</style>
