<script>
export default {
  name: "List",
  props: {
    value: {
      type: Array,
      default: ()=>([]),
    }
  }
}
</script>

<template>
  <span>{{ Array.isArray(value) ? value.length : "--" }}</span>
</template>