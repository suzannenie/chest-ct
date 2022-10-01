<script>
import { mdiTranslate } from "@mdi/js";
export default {
  props: {
    dark: {
      type: Boolean,
    },
    text: {
      type: Boolean,
    }
  },
  data: function() {
    return {
      icons: {
        translate: mdiTranslate,
      },
      languages: [
        {
          locale: "en",
          img:
            "https://nuxeo.mac-siemens.ru/nuxeo/nxfile/default/b8ff039d-5980-4fa0-bbe0-91d402f8d79d?inline=true"
        },
        {
          locale: "ru",
          img:
            "https://nuxeo.mac-siemens.ru/nuxeo/nxfile/default/08b33f6e-6983-4aec-8a20-a18c9bb3927e?inline=true"
        }
      ]
    }
  },
  computed: {
    selected() {
      return this.languages.findIndex((lang) => {
        return lang.locale === this.$root.$i18n.locale;
      });
    }
  },
  methods: {
    async onClick(locale) {
      this.$root.$i18n.locale = locale;
      this.$vuetify.lang.current = locale;
      this.$root.$emit("language-changed")
    }
  }
}
</script>

<template>
  <v-menu
    v-if="$store.state.App.menus || !$refs.menu || !$refs.menu.isActive"
    ref="menu"
    offset-y
    :dark="dark"
    @input="
      $refs.menu.absoluteX = 0;
      $refs.menu.absoluteY = 0;
    "
  >
    <template #activator="{on, attrs}">
      <v-btn
        :icon="!text"
        :text="text"
        rounded
        depressed
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ icons.translate }}</v-icon>
        <span
          v-if="text"
          class="ml-1"
        >Language</span>
      </v-btn>
    </template>
    <v-list class="py-0">
      <v-list-item-group
        mandatory
        :value="selected"
      >
        <v-list-item
          v-for="(l, i) in languages"
          :key="i"
          @click="onClick(l.locale)"
        >
          <v-list-item-avatar tile>
            <v-img
              :src="l.img"
              contain
              max-width="25px"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ $t(l.locale) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>