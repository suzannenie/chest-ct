<script>
import {mapActions, mapGetters} from "vuex";
import InputLogin from "@/components/Inputs/auth/InputLogin";
import InputPassword from "@/components/Inputs/auth/InputPassword";
import InputNewPassword from "@/components/Inputs/auth/InputNewPassword";
import InputConfirmationPassword from "@/components/Inputs/auth/InputConfirmationPassword";
import Api from "@/services/api/api";
import InputCode from "@/components/Inputs/auth/InputCode";

export default {
  name: "Auth",
  components: {
    InputCode,
    InputPassword,
    InputConfirmationPassword,
    InputNewPassword,
    InputLogin
  },
  data: function() {
    return {
      isValidAuth: false,
      isValidPasswords: false,
      isValidLogin: false,
      isValidCode: false,
      loading: false,
      codeInput: false,
      showAuth: true,
      showGetCode: false,
      showCheckCode: false,
      showChangePassword: false,
      recoveryId: null,
      passwordsMatch: false,
    };
  },
  computed: {
    ...mapGetters("User", {
      credentialsLogin: "getCredentialsLogin",
      credentialsPassword: "getCredentialsPassword",
      credentialsNewPassword: "getCredentialsNewPassword",
      credentialsConfirmationPassword: "getCredentialsConfirmationPassword",
      credentialsCode: "getCredentialsCode"
    }),
  },
  methods: {
    ...mapActions("Task", {
      taskSecure: "taskSecure",
    }),
    ...mapActions("User", {
      login: "login",
      init: "init",
    }),
    async forward() {
      if (!this.isValidAuth) return
      this.loading = true
      try {
        await this.login()
        await this.init()
        await this.$router.push("/")
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    toSignin() {
      this.showAuth = true
      this.showGetCode = false
      this.showCheckCode = false
      this.showChangePassword = false
    },
    toRecovery1() {
      this.showAuth = false
      this.showGetCode = true
      this.showCheckCode = false
      this.showChangePassword = false
    },
    toRecovery2() {
      this.showAuth = false
      this.showGetCode = false
      this.showCheckCode = true
      this.showChangePassword = false
    },
    toRecovery3() {
      this.showAuth = false
      this.showGetCode = false
      this.showCheckCode = false
      this.showChangePassword = true
    },
    async getRecoveryEmail() {
      this.loading = true
      try {
        const data = await Api.post("auth/password_recovery/", {login: this.credentialsLogin })
        this.recoveryId = data.recovery_id
        this.$store.commit("User/CODE", "")
        this.toRecovery2()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async submitRecoveryCode() {
      this.loading = true
      try {
        await Api.post("auth/password_recovery_check/", {
          login: this.credentialsLogin,
          recovery_id: this.recoveryId,
          code: this.credentialsCode
        })
        this.$store.commit("User/PASSWORD", "")
        this.toRecovery3()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async changePassword() {
      this.loading = true
      try {
        await Api.post("auth/password_change/", {
          login: this.credentialsLogin,
          recovery_id: this.recoveryId,
          code: this.credentialsCode,
          password: this.credentialsNewPassword
        })
        this.toSignin()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col
          v-if="showAuth"
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
        >
          <v-img
            alt="Avanta"
            src="@/assets/logo.png"
            width="100"
            height="100"
            contain
            class="mx-auto my-15"
          />
          <v-form
            v-model="isValidAuth"
            @submit.prevent
          >
            <InputLogin />
            <InputPassword />
          </v-form>
          <p
            class="name text-center"
            style="cursor: pointer"
            @click="toRecovery1"
          >
            Забыли пароль?
          </p>
          <v-btn
            depressed
            rounded
            large
            block
            class="text-center"
            :loading="loading"
            :disabled="!isValidAuth"
            color="primary"
            @click="forward"
          >
            Войти
          </v-btn>
          <p
            class="name"
          >
            {{ $t("pages.auth.terms-text") }}
            <a
              href="https://new.siemens.com/global/en/general/privacy-notice.html"
              target="_blank"
            >
              {{ $t("pages.auth.terms-link") }}
            </a>
          </p>
        </v-col>
        <v-col
          v-if="showGetCode"
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
        >
          <p class="description">
            Восстановление пароля
          </p>
          <v-form
            v-model="isValidLogin"
            @submit.prevent
          >
            <InputLogin />
          </v-form>
          <v-btn
            depressed
            rounded
            large
            :loading="loading"
            :disabled="!isValidLogin"
            color="primary"
            @click="getRecoveryEmail"
          >
            Получить код
          </v-btn>
        </v-col>
        <v-col
          v-if="showCheckCode"
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
        >
          <p class="description">
            Восстановление пароля
          </p>
          <v-form
            v-model="isValidCode"
            @submit.prevent
          >
            <InputCode />
          </v-form>
          <v-btn
            depressed
            rounded
            large
            :loading="loading"
            :disabled="!isValidCode"
            color="primary"
            @click="submitRecoveryCode"
          >
            Отправить
          </v-btn>
        </v-col>
        <v-col
          v-if="showChangePassword"
          cols="12"
          sm="10"
          md="8"
          lg="6"
          xl="4"
        >
          <v-form
            v-model="isValidPasswords"
            @submit.prevent
          >
            <InputNewPassword />
            <InputConfirmationPassword />
          </v-form>
          <v-btn
            depressed
            rounded
            large
            :loading="loading"
            :disabled="!isValidPasswords"
            color="primary"
            @click="changePassword"
          >
            Отправить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>