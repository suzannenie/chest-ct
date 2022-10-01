<script>
import {mapGetters, mapState} from "vuex";
import {mdiLogout, mdiAccount, mdiTable} from "@mdi/js";
import {vp} from "@/services/helpers";
export default {
  name: "App",
  components: {
    Snackbar: () => import("@/components/Snackbar"),
  },
  data: function () {
    return {
      vp,
      mdiLogout,
      mdiAccount,
      mdiTable
    };
  },
  computed: {
    ...mapState("App", { isRouterLoading: 'isRouterLoading' }),
    ...mapGetters("App", { isScreenSmall: 'isScreenSmall' }),
    ...mapGetters("User", {
      isLoggedIn: 'isLoggedIn',
      userRole: 'getRole'
    }),
  },
  created () {
    this.onResize();
  },
  methods: {
    onResize () {
      this.$store.commit("App/MENUS", false);
      setImmediate(() => {
        this.$store.commit("App/ON_RESIZE");
        this.$store.commit("App/MENUS", true);
      });
    },
    logout() {
      this.$auth.logout()
    }
  },
}
</script>

<template>
  <v-app v-resize="onResize">
    <v-app-bar
      v-if="$route.fullPath !== '/auth' && isLoggedIn"
      app
      absolute
      flat
      min-height="56px"
      max-height="64px"
      style="border-bottom: #d2d2d7 solid 2px !important;"
    >
      <router-link to="/">
        <v-img
          alt="Avanta"
          src="@/assets/logo.png"
          width="50"
          height="50"
          contain
        />
      </router-link>
      <v-spacer />
      <template v-if="!$route.fullPath.includes('/auth')">
        <v-btn
          v-if="isLoggedIn"
          icon
          depressed
          @click="logout"
        >
          <v-icon>
            {{ mdiLogout }}
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          depressed
          @click="$router.push('/auth')"
        >
          <v-icon>
            {{ mdiAccount }}
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <template  
      v-if="isRouterLoading"
    >
      <v-main>
        <v-overlay>
          <v-progress-circular
            indeterminate
            size="64"
          />
        </v-overlay>
      </v-main>
    </template>
    <template v-else>
      <Snackbar />
      <v-main>
        <router-view
          :key="$route.fullPath"
          name="content"
        />
      </v-main>
    </template>
  </v-app>
</template>