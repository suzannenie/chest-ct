<script>
import {mdiFileTableOutline} from "@mdi/js";

export default {
  name: "FileUpload",
  props: {
    btnLabel: {
      type: String,
      default: "Upload"
    },
    accept: {
      type: Array,
      default: ()=>(["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"])
    },
    request: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
      mdiFileTableOutline,
      loading: false,
      fileInputId: "file-input-" + Math.random().toString(36).substr(2, 9),
    }
  },
  methods: {
    onChange: async function (payload) {
      try {
        this.loading = true;
        const file = payload.target.files[0];
        await this.request(file);
        this.$emit("success");
      } catch (error) {
        this.$emit("error");
      } finally {
        payload.target.value = "";
        this.loading = false;
      }
    },
  }
}
</script>

<template>
  <div>
    <input
      :id="fileInputId"
      ref="fileInput"
      type="file"
      :accept="accept"
      style="display: none"
      @change="onChange"
    >
    <v-btn 
      color="primary"
      rounded
      depressed
      small
      :loading="loading"
    >
      <label
        :for="fileInputId"
        style="cursor:pointer; height: 100%; width: 100%"
      >
        <v-icon
          small
          class="mr-1"
        >
          {{ mdiFileTableOutline }}
        </v-icon>
        {{ btnLabel }}
      </label>
    </v-btn>
  </div>
</template>