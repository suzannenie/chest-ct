<script>
import LabelUser from "@/components/Labels/LabelUser"
export default {
  name: "LabelUserGroup",
  components: {LabelUser},
  props: {
    canDelete: {
      type: Boolean
    },
    implementers: {
      type: Boolean
    },
    justifyEnd: {
      type: Boolean
    },
    users: {
      type: Array,
      default: ()=>[]
    }
  }
}
</script>

<template>
  <div
    class="d-flex flex-wrap"
    :class="{
      'justify-end': justifyEnd
    }"
    style="gap: 4px"
  >
    <template v-for="user in users">
      <LabelUser
        :key="'implementer-' + user.id"
        :user="user"
        :implementer="implementers"
        :can-delete="canDelete"
        @delete="$emit('delete', user.id)"
      />
    </template>
  </div>
</template>