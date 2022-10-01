<script>
export default {
  name: "Bool",
  props: {
    value: {
      type: Boolean,
    }
  }
}
</script>

<template>
  <span>{{ value ? $t("true") : $t("false") }}</span>
</template>