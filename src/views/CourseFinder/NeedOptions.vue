<template>
  <b-card class="px-5 pb-3">
    <div>
      <h2 class="mt-2 mb-2">
        Needs Option (Extra)
      </h2>
      <b-form
        ref="needsForm"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="addNeedsOpt"
      >

        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in needsOpt"
          :id="item.id"
          :key="item.id"
          ref="needsRow"
        >

          <!-- Option Name -->
          <b-col md="6">
            <b-form-group
              label="Option Name"
            >
              <b-form-input
                v-model="item.label"
                type="text"
                placeholder="Enter Option Name"
                :disabled="item.id"
              />
            </b-form-group>
          </b-col>

          <!-- Type -->
          <b-col md="3">
            <b-form-group
              label="Type"
            >
              <b-form-input
                type="text"
                :value="item.type"
                disabled
              />
            </b-form-group>
          </b-col>

          <!-- Remove Button -->
          <b-col
            lg="3"
            md="3"
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
              @click="removeItem({index, type: item.type, id: item.id})"
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
      @click="addNeedsOpt"
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
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BCard,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCard,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      initFormHeight: false,
    }
  },
  computed: {
    needsOpt() {
      return this.$store.state.courseFinder.options.needs
    },
  },
  mounted() { },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    addNeedsOpt() {
      const tIndex = this.needsOpt.length - 1

      const payload = {
        type: 'needs',
        value: !(tIndex < 0) ? this.needsOpt[tIndex].value + 1 : 10001,
        label: '',
      }

      this.$store.commit('courseFinder/INSERT_OPTION', payload)

      if (!this.initFormHeight) {
        this.trSetHeight(this.$refs.needsForm.scrollHeight)
        this.initFormHeight = true
      }

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.needsRow[0].offsetHeight)
      })
    },
    removeItem(payload) {
      const { id, type, index } = payload
      if (id) this.$store.dispatch('courseFinder/deleteOption', id)

      this.$store.commit('courseFinder/REMOVE_OPTION', { index, type })

      this.notify({
        text: 'Removed Successfully!',
        variant: 'success',
      })

      if (!this.initFormHeight) {
        this.trSetHeight(this.$refs.needsForm.scrollHeight)
        this.initFormHeight = true
      }
      this.trTrimHeight(this.$refs.needsRow[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.needsForm.scrollHeight)
      })
    },
    saveOption(index) {
      this.$store.dispatch('courseFinder/createOption', this.needsOpt[index])
        .then(res => {
          this.$store.commit('courseFinder/UPDATE_OPTION', res)
          this.notify({
            text: 'New Option has been saved!',
            variant: 'success',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
