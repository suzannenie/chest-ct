<script>
import StringD from "@/components/DisplayValues/String";
import {getDate, getDateTime} from "@/services/helpers";
export default {
  name: "Date",
  components: { StringD },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    datetime: {
      type: Boolean,
    }
  },
  computed: {
    text() {
      const date = this.datetime ? getDateTime(this.value) : getDate(this.value)
      return date === "Invalid date" ? null : date
    }
  },
}
</script>

<template>
  <StringD :value="text" />
</template>