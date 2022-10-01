<script>
export default {
  name: "LeaderBoard",
  data: function () {
    return {
      headers: [
        { text: 'Place', value: 'index', width: '10%'},
        {
          text: 'Student',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Questions Answered', value: 'questions_answered' },
        { text: '% Correct', value: 'overall_correct' },
      ],
      students: [
        {
          name: 'Rita',
          overall_correct: 86,
          questions_answered: 25,
        },
        {
          name: 'Mike',
          overall_correct: 76,
          questions_answered: 35,
        },
        {
          name: 'Clark',
          overall_correct: 32,
          questions_answered: 50,
        },
        {
          name: 'Yana',
          overall_correct: 91,
          questions_answered: 23,
        },
        {
          name: 'Suzanne',
          overall_correct: 83,
          questions_answered: 42,
        }
      ],
    }
  }
}
</script>

<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
    <v-col
      cols="12"
      class="text-center"
    >
      <p 
      class="text-h2 font-weight-bold primary--text"
      >
        Score Board
      </p>
    </v-col>
      <v-col cols="12">
        <v-data-table
        :headers="headers"
        :items="students"
        :sort-by="['questions_answered', 'overall_correct']"
        :sort-desc="[true, true]"
        multi-sort
        class="elevation-1"
        >
        
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>