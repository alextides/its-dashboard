<template>
  <div
    class="mx-auto mb-5"
    style="width: 98%"
  >
    <b-row>
      <b-col>
        <b-tabs
          justified
          pills
        >
          <b-tab class="pt-0">
            <template #title>
              <feather-icon icon="CheckSquareIcon" />
              <span>Result Cards</span>
            </template>
            <result-cards />
          </b-tab>

          <b-tab class="pt-0">
            <template #title>
              <feather-icon icon="ToolIcon" />
              <span>Options</span>
            </template>

            <wizard-options />
          </b-tab>

        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BTabs, BTab, BRow, BCol,
} from 'bootstrap-vue'
import ResultCard from './CourseFinder/ResultCards.vue'
import Options from './CourseFinder/Options.vue'

export default {
  components: {
    BTabs,
    BTab,
    BRow,
    BCol,

    'result-cards': ResultCard,
    'wizard-options': Options,
  },
  created() {
    this.fetchResultCards()
    this.fetchOptions()
  },
  methods: {
    fetchResultCards() {
      this.$store.dispatch('courseFinder/fetchResultCards')
        .catch(error => { console.log(error) })
    },
    fetchOptions() {
      this.$store.dispatch('courseFinder/fetchOptions')
        .catch(error => { console.log(error) })
    },
  },
}
</script>
