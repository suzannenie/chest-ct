<script>
export default {
  name: "String",
  props: {
    value: {
      type: String,
      default: "",
    }
  }
}
</script>

<template>
  <span style="word-break: break-word">{{ value ? value : "--" }}</span>
</template>