<script>
export default {
  name: "Start",
  data: function () {
    return {
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
      Diseases: [
        {
          text: "Cancer",
          value: "cancer"
        },
        {
          text: "Diabetes",
          value: "diabetes"
        },
        {
          text: "Heart Disease",
          value: "heart"
        },
        {
          text: "HIV",
          value: "hiv"
        },
        {
          text: "Malaria",
          value: "malaria"
        },
        {
          text: "Tuberculosis",
          value: "tuberculosis"
        }
      ]
    }
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-img src="@/assets/logo.png" />
      <v-card-title>
        Computer tomography copilot training
      </v-card-title>
      <v-card-text>
        Please select the game mode, the number of questions and which diseases yoy want to master.
        <v-row>
          <v-col cols="6">
            <span>Game mode</span>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="gameMode"
              :items="gameModes"
              item-text="text"
              item-value="value"
              solo
              flat
            />
          </v-col>
          <v-col cols="6">
            <span>I will practice to detect</span>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedDiseases"
              :items="diseases"
              item-text="text"
              item-value="value"
              solo
              flat
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          to="/question"
          x-large
        >
          Start
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>