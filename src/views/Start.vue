<script>
import {mdiCheckboxBlankOutline, mdiCloseBox, mdiMinusBox} from "@mdi/js";

export default {
  name: "Start",
  data: function () {
    return {
      numberOfQuestions: 10,
      gameMode: "first",
      gameModes: [
        {
          text: "multiple choice",
          value: "first"
        },
        {
          text: "single choice",
          value: "second"
        }
      ],
      selectedDiseases: [],
      diseases: [
        {
          text: "No Finding",
          value: "no_finding"
        },
        {
          text: "Enlarged Cardiomediastinum",
          value: "enlarged_cardiomediastinum"
        },
        {
          text: "Cardiomegaly",
          value: "cardiomegaly"
        },
        {
          text: "Lung Lesion",
          value: "lung_lesion"
        },
        {
          text: "Lung Opacity",
          value: "lung_opacity"
        },
        {
          text: "Edema",
          value: "edema"
        },
        {
          text: "Consolidation",
          value: "consolidation"
        },
        {
          text: "Pneumonia",
          value: "pneumonia"
        },
        {
          text: "Atelectasis",
          value: "atelectasis"
        },
        {
          text: "Pneumothorax",
          value: "pneumothorax"
        },
        {
          text: "Pleural Effusion",
          value: "pleural_effusion"
        },
        {
          text: "Pleural Other",
          value: "pleural_other"
        },
        {
          text: "Fracture",
          value: "fracture"
        },
        {
          text: "Support Devices",
          value: "support_devices"
        }
      ]
    }
  },
  computed: {
    allDiseasesSelected () {
      return this.selectedDiseases.length === this.diseases.length
    },
    someDiseasesSelected () {
      return this.selectedDiseases.length > 0 && !this.allDiseasesSelected
    },
    icon() {
      if (this.allDiseasesSelected) return mdiCloseBox
      if (this.someDiseasesSelected) return mdiMinusBox
      return mdiCheckboxBlankOutline
    },
    color() {
      if (this.allDiseasesSelected) return "primary"
      if (this.someDiseasesSelected) return "secondary"
      return null
    },
  },
  methods: {
    toggle () {
      this.$nextTick(() => {
        if (this.selectedDiseases.length > 0) {
          this.selectedDiseases = []
        } else {
          this.selectedDiseases = this.diseases.map(({value}) => value)
        }
      })
    },
  }
}
</script>

<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col cols="12">
        <v-img
          max-width="500px"
          src="@/assets/logo.png"
          class="mx-auto"
        />
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <p class="text-h2 font-weight-bold">
          Computer tomography copilot training
        </p>
        <p class="text-h5">
          Please select the game mode, the number of questions and which diseases yoy want to master.
        </p>
      </v-col>
      <v-col
        cols="12"
        class="d-flex align-center justify-space-around"
      >
        <span class="pr-2 select-label">Game mode</span>
        <v-select
          v-model="gameMode"
          :items="gameModes"
          item-text="text"
          item-value="value"
          solo
          class="select-field"
          flat
          outlined
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex align-center justify-space-around"
      >
        <span class="pr-2 select-label">Diseases</span>
        <v-select
          v-model="selectedDiseases"
          :items="diseases"
          item-text="text"
          item-value="value"
          class="select-field"
          multiple
          solo
          flat
          outlined
          hide-details
        >
          <template #prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggle"
            >
              <v-list-item-action>
                <v-icon :color="color">
                  {{ icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Select All
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2" />
          </template>
          <template v-if="selectedDiseases.length > 1" #selection="{index}">
            <span v-if="index === 0">
              {{ selectedDiseases.length }} selected
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        class="d-flex align-center justify-space-around"
      >
        <span class="pr-2 select-label">Number of questions</span>
        <v-text-field
          v-model="numberOfQuestions"
          class="select-field"
          solo
          flat
          outlined
          hide-details
          type="number"
          pattern="\d*"
        />
      </v-col>
      <v-col cols="6">
        <v-btn
          color="primary"
          to="/question"
          x-large
          block
        >
          Start
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.select-label {
  width: 100px;
}
.select-field {
  max-width: 300px;
}
</style>