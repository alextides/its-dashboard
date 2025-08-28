<template>
  <b-card class="px-5 pb-3">
    <div>
      <h2 class="mt-2 mb-2">
        Rules for '{{ card.title }}' Card
      </h2>
      <b-form
        ref="setRuleForm"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="addRule"
      >

        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in ruleSet"
          :id="item.id"
          :key="item.id"
          ref="setRuleRow"
        >

          <!-- Option Grades -->
          <b-col md="4">
            <b-form-group
              label="Current Grade / Level:"
            >
              <v-select
                v-model="item.gradeOpt"
                :options="gradeOption"
                label="label"
                :disabled="item.id"
              />
            </b-form-group>
          </b-col>

          <!-- Prep -->
          <b-col md="4">
            <b-form-group
              label="Preparing For:"
            >
              <v-select
                v-model="item.prepOpt"
                :options="prepOption"
                label="label"
                :disabled="item.id"
              />
            </b-form-group>
          </b-col>

          <!-- Remove Button -->
          <b-col
            lg="4"
            md="4"
            class="mb-50 text-right"
          >
            <b-button
              v-if="!item.id"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-success"
              class="mt-0 mt-md-2 mr-1"
              @click="saveOption(index)"
            >
              <feather-icon
                icon="CheckIcon"
                class="mr-25"
              />
              <span>Save {{ item.id }}</span>
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mt-0 mt-md-2"
              @click="removeItem({ruleIndex: index, ruleID: item.id})"
            >
              <feather-icon
                icon="XIcon"
                class="mr-25"
              />
              <span>Remove</span>
            </b-button>
          </b-col>

          <b-col cols="12">
            <hr>
          </b-col>

        </b-row>

      </b-form>
    </div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="addRule"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Add New</span>
    </b-button>
  </b-card>
</template>

<script>
import {
  BForm, BFormGroup, BRow, BCol, BButton, BCard,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import Vue from 'vue'

export default {
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BCard,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  props: {
    resultID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initFormHeight: false,
      ruleSet: [],
      card: {},
    }
  },
  computed: {
    gradeOpt() {
      return this.$store.state.courseFinder.options.grades
    },
    gradeOption() {
      return this.$store.state.courseFinder.options.grades
    },
    prepOption() {
      return this.$store.state.courseFinder.options.prep
    },
  },
  mounted() {
    this.initResultCar()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    removeItem(payload) {
      const { ruleID, ruleIndex } = payload
      if (ruleID) {
        this.$store.dispatch('courseFinder/deleteRule', ruleID)
        this.$store.commit('courseFinder/REMOVE_RULE', { cardID: this.card.id, ruleIndex })
      } else Vue.delete(this.ruleSet, ruleIndex)

      this.notify({
        text: 'Removed Successfully!',
        variant: 'success',
      })

      if (!this.initFormHeight) {
        this.trSetHeight(this.$refs.setRuleForm.scrollHeight)
        this.initFormHeight = true
      }
      this.trTrimHeight(this.$refs.setRuleRow[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.setRuleForm.scrollHeight)
      })
    },
    saveOption(index) {
      const payload = {
        result_id: this.card.id,
        rule: `${this.ruleSet[index].gradeOpt.value}-${this.ruleSet[index].prepOpt.value}`,
      }

      this.$store.dispatch('courseFinder/createRule', payload)
        .then(res => {
          this.$store.commit('courseFinder/SET_RESULT', res.card)

          this.ruleSet[index].id = res.rule.id
          Vue.set(this.ruleSet, index, this.ruleSet[index])

          this.notify({
            text: 'New rule has been added!',
            variant: 'success',
          })
        })
    },
    addRule() {
      const payload = {
        gradeOpt: '',
        prepOpt: '',
      }

      this.ruleSet.push(payload)

      if (!this.initFormHeight) {
        this.trSetHeight(this.$refs.setRuleForm.scrollHeight)
        this.initFormHeight = true
      }

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.setRuleRow[0].offsetHeight)
      })
    },
    initResultCar() {
      this.card = this.$store.state.courseFinder.resultCards.find(obj => obj.id === this.resultID)
      this.ruleSet = this.card.rules

      this.ruleSet.forEach((item, index) => {
        // eslint-disable-next-line radix
        this.ruleSet[index].gradeOpt = this.gradeOption.find(obj => obj.value === parseInt(item.rule.split('-')[0]))
        // eslint-disable-next-line radix
        this.ruleSet[index].prepOpt = this.prepOption.find(obj => obj.value === parseInt(item.rule.split('-')[1]))
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.vs__dropdown-menu {z-index: 9999 !important;position: absolute;}
</style>

<style lang="scss" scoped>
.repeater-form {
  overflow: unset;
  transition: .35s height;
}
</style>
