<script>
import {mdiArrowRight} from "@mdi/js";
import {
  assignUnscheduledMaintenance,
  closeUnscheduledMaintenance, doneUnscheduledMaintenance,
  postponeUnscheduledMaintenance
} from "@/services/api/requests";
import {
  checkNull,
  getLocalISO,
  getNextUnscheduledStatus,
  getUnscheduledStatusColor,
  getUnscheduledStatusName,
  ruleRequired,
  unscheduledStatuses
} from "@/services/helpers";
export default {
  name: "StatusUnscheduledMaintenance",
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
    }
  },
  data: function () {
    return {
      ...unscheduledStatuses,
      workStartDatetime: "",
      postponedUntil: "",
      reasonForNotClosing: "",
      doneDatetime: "",
      doneComments: "",
      fixingMethod: "",
      reasonOfDefect: "",
      closedDatetime: "",
      closedComments: "",
      mdiArrowRight,
      menuModel: false,
      loading: false,
      newStatusIndex: 0,
      isValid: false,
      ruleRequired: ruleRequired(this.$t('rules.required'))
    }
  },
  computed: {
    text() {
      return this.getUnscheduledStatusName(this.status)
    },
    color() {
      return this.getUnscheduledStatusColor(this.status)
    },
    availableStatuses() {
      return getNextUnscheduledStatus(this.status)
    },
    nextStatus() {
      return this.availableStatuses[this.newStatusIndex] || null
    }
  },
  mounted() {
    this.setToday()
  },
  methods: {
    getUnscheduledStatusColor,
    getUnscheduledStatusName,
    setToday() {
      const now = getLocalISO()
      this.closedDatetime = now
      this.doneDatetime = now
      this.workStartDatetime = now
    },
    newStatusSwitch() {
      this.$refs.form.resetValidation()
      if (this.newStatusIndex + 1 === this.availableStatuses.length)
        this.newStatusIndex = 0
      else
        this.newStatusIndex += 1
      this.setToday()
    },
    async submit() {
      this.$refs.form.validate()
      if (!this.id || !this.isValid) return
      this.loading = true
      try {
        if (this.nextStatus === this.IN_PROGRESS) {
          await assignUnscheduledMaintenance(this.id, {
            work_start_datetime: checkNull(this.workStartDatetime),
          })
        }
        if (this.nextStatus === this.POSTPONED) {
          await postponeUnscheduledMaintenance(this.id, {
            postponed_until: checkNull(this.postponedUntil),
            reason_for_not_closing: checkNull(this.reasonForNotClosing),
          })
        }
        if (this.nextStatus === this.DONE) {
          await doneUnscheduledMaintenance(this.id, {
            done_comments: checkNull(this.doneComments),
            fixing_method: checkNull(this.fixingMethod),
            done_datetime: checkNull(this.doneDatetime),
            reason_of_defect: checkNull(this.reasonOfDefect),
          })
        }
        if (this.nextStatus === this.CLOSED) {
          await closeUnscheduledMaintenance(this.id, {
            closed_comments: checkNull(this.closedComments),
            closed_datetime: checkNull(this.closedDatetime),
          })
        }
        this.$emit("update")
        this.menuModel = false
        this.newStatusIndex = 0
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
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
          class="status"
          :color="color"
        >
          {{ text }}
        </v-chip>
        <v-icon>{{ mdiArrowRight }}</v-icon>
        <v-chip
          class="status"
          :color="getUnscheduledStatusColor(nextStatus)"
          :disabled="availableStatuses.length === 1"
          @click="newStatusSwitch"
        >
          {{ getUnscheduledStatusName(nextStatus) }}
        </v-chip>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="isValid"
          autocomplete="none"
        >
          <template v-if="nextStatus === IN_PROGRESS">
            <v-text-field
              v-model="workStartDatetime"
              type="datetime-local"
              :label="$t('pages.unscheduled-maintenance.headers.work-start-datetime')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
          </template>
          <template v-if="nextStatus === POSTPONED">
            <v-text-field
              v-model="reasonForNotClosing"
              :label="$t('pages.unscheduled-maintenance.headers.reason-for-not-closing')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
            <v-text-field
              v-model="postponedUntil"
              type="date"
              :label="$t('pages.unscheduled-maintenance.headers.postponed-until')"
              outlined
              dense
            />
          </template>
          <template v-if="nextStatus === DONE">
            <v-text-field
              v-model="reasonOfDefect"
              :label="$t('pages.unscheduled-maintenance.headers.reason-of-defect')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
            <v-text-field
              v-model="fixingMethod"
              :label="$t('pages.unscheduled-maintenance.headers.fixing-method')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
            <v-text-field
              v-model="doneComments"
              :label="$t('pages.unscheduled-maintenance.headers.done-comments')"
              outlined
              dense
            />
            <v-text-field
              v-model="doneDatetime"
              type="datetime-local"
              :label="$t('pages.unscheduled-maintenance.headers.done-datetime')"
              outlined
              dense
              :rules="[ruleRequired]"
            />
          </template>
          <template v-if="nextStatus === CLOSED">
            <v-text-field
              v-model="closedComments"
              :label="$t('pages.unscheduled-maintenance.headers.closed-comments')"
              outlined
              dense
            />
            <v-text-field
              v-model="closedDatetime"
              type="datetime-local"
              :label="$t('pages.unscheduled-maintenance.headers.closed-datetime')"
              outlined
              dense
              :rules="[ruleRequired]"
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
          {{ $t("pages.unscheduled-maintenance.status.btn-submit") }}
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
