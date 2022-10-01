<script>
export default {
  name: "FilterCard",
}
</script>

<template>
  <v-card>
    <v-card-title>{{ $t("filters.title") }}</v-card-title>
    <v-card-text class="pt-5">
      <v-form>
        <slot />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        rounded
        text
        depressed
        @click="$emit('reset')"
      >
        {{ $t('filters.reset') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>