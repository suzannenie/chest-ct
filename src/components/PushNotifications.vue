<script>
import { mdiBellOff, mdiBellOutline, mdiBellRing } from "@mdi/js";

// states
const DEVELOPMENT = 0
const SERVICE_WORKER_NOT_AVAILABLE = 1
const NOTIFICATION_API_NOT_AVAILABLE = 2
const PERMISSION_UNKNOWN = 3
const PERMISSION_DENIED = 4
const ON = 5
const OFF = 6
const LOADING = 7

export default {
  name: "PushNotifications",
  data: function () {
    return {
      permission: null,
      isNotificationApiAvailable: ('Notification' in window),
      isPermissionAvailable: ('Notification' in window) && ('permission' in Notification),
    }
  },
  computed: {
    state() {
      if (this.loading) return LOADING
      if (process.env.NODE_ENV === "development") return DEVELOPMENT
      if (!this.isServiceWorkerAvailable) return SERVICE_WORKER_NOT_AVAILABLE
      if (!this.isNotificationApiAvailable) return NOTIFICATION_API_NOT_AVAILABLE
      if (!this.isPermissionAvailable) return PERMISSION_UNKNOWN
      switch (this.permission) {
        case "granted":
          if (this.showNotifications) return ON
          else return OFF
        case "denied":
          return PERMISSION_DENIED
        default:
          return PERMISSION_UNKNOWN
      }
    },
    message() {
      switch (this.state) {
        case LOADING:
          return this.$t("notification.message.loading")
        case DEVELOPMENT:
          return this.$t("notification.message.development")
        case SERVICE_WORKER_NOT_AVAILABLE:
          return this.$t("notification.message.service-worker-not-available")
        case NOTIFICATION_API_NOT_AVAILABLE:
          return this.$t("notification.message.notification-api-not-available")
        case PERMISSION_DENIED:
          return this.$t("notification.message.permission-denied")
        case PERMISSION_UNKNOWN:
          return this.$t("notification.message.permission-unknown")
        case ON:
          return this.$t("notification.message.on")
        case OFF:
          return this.$t("notification.message.off")
        default:
          return this.$t("notification.message.default")
      }
    },
    color() {
      switch(this.state) {
        case ON:
          return "success"
        case DEVELOPMENT:
        case SERVICE_WORKER_NOT_AVAILABLE:
        case NOTIFICATION_API_NOT_AVAILABLE:
        case PERMISSION_DENIED:
          return "warning"
        default:
          return ""
      }
    },
    disabled() {
      switch (this.state) {
        case DEVELOPMENT:
        case SERVICE_WORKER_NOT_AVAILABLE:
        case NOTIFICATION_API_NOT_AVAILABLE:
        case PERMISSION_DENIED:
          return true
        default:
          return false
      }
    },
    icon() {
      switch (this.state) {
        case ON:
          return mdiBellRing
        case OFF:
        case PERMISSION_DENIED:
          return mdiBellOff
        default:
          return mdiBellOutline
      }
    },
  },
  async created() {
    if (this.disabled) return
    this.permission = Notification.permission
    if (this.permission === "granted")
      await this.init(false)
  },
  methods: {
    async onClick() {
      switch (this.state) {
        case PERMISSION_UNKNOWN:
          await this.requestPermission()
          break
        case ON:
          await this.unsubscribe()
          break
        case OFF:
          await this.init(true)
          break
        default:
          break
      }
    },
    async requestPermission() {
      this.permission = await Notification.requestPermission()
    }
  }
}
</script>

<template>
  <v-tooltip
    bottom
    :color="color"
  >
    <template #activator="{on, attrs}">
      <div
        v-bind="attrs"
        v-on="on"
      >
        <v-btn
          :disabled="disabled"
          :loading="loading"
          text
          depressed
          style="border-radius: 4px"
          @click="onClick"
        >
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-btn>
      </div>
    </template>
    <span>{{ message }}</span>
  </v-tooltip>
</template>