<template>
  <div>
    <form-wizard
      id="basicSchoolWizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      layout="vertical"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="wizard-vertical mb-1"
      @on-complete="formSubmitted"
    >

      <tab-content title="School Information">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              School Information
            </h5>
            <small class="text-muted">
              Enter The School Information.
            </small>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>School Name:</label>
              <b-form-input
                v-model="formData.name"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Curriculum:</label>
              <v-select
                v-model="formData.curriculum"
                :options="curriculumList != null ? curriculumList : []"
                multiple
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>School Type:</label>
              <v-select
                v-model="formData.type"
                :options="schoolTypeList != null ? schoolTypeList : []"
                multiple
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Country:</label>
              <v-select
                v-model="formData.country"
                :options="countryList != null ? countryList : []"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Location:</label>
              <v-select
                v-model="formData.location"
                :options="locationList != null ? locationList : []"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Address:</label>
              <b-form-input
                v-model="formData.address"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Principal:</label>
              <b-form-input
                v-model="formData.principal"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Founded:</label>
              <b-form-input
                v-model="formData.founded"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Gender:</label>
              <v-select
                v-model="formData.gender"
                :options="genderList != null ? genderList : []"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Students Age Range:</label>
              <vue-slider
                v-model="selectedAgeRange"
                :min-range="2"
                :max-range="100"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Telephone Number:</label>
              <b-form-input
                v-model="formData.telNos"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Fax Number:</label>
              <b-form-input
                v-model="formData.faxNos"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Website:</label>
              <b-form-input
                v-model="formData.website"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Email:</label>
              <b-form-input
                v-model="formData.email"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Debenture:</label>
              <v-select
                v-model="formData.debenture"
                :options="booleanList != null ? booleanList : []"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Application Dates:</label>
              <b-form-input
                v-model="formData.applicationDates"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Language of Instruction:</label>
              <v-select
                v-model="formData.language"
                :options="languageList != null ? languageList : []"
                multiple
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Google Map Embed Code:</label>
              <b-form-input
                v-model="formData.gmapLoc"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="School Description">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              School Description
            </h5>
            <small class="text-muted">Enter The School Description.</small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <quill-editor
                v-model="featured.description"
                :options="{theme: 'snow', placeholder: 'Add the school description here.'}"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="About The Curriculum">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              About The Curriculum
            </h5>
            <small class="text-muted">Enter About The School Curriculum.</small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <quill-editor
                v-model="featured.curriculum"
                :options="{theme: 'snow', placeholder: 'Add all about the school curriculum here.'}"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="Inside The School">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Inside The School
            </h5>
            <small class="text-muted">Enter Inside The School Details.</small>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <label>Parent Reviews:</label>
              <quill-editor
                v-model="featured.parent_reviews"
                :options="{theme: 'snow', placeholder: 'Enter description here.'}"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <label>Specialist Programmes:</label>
              <quill-editor
                v-model="featured.specialist_programmes"
                :options="{theme: 'snow', placeholder: 'Enter description here.'}"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <label>Education Philosophy:</label>
              <quill-editor
                v-model="featured.education_philosophy"
                :options="{theme: 'snow', placeholder: 'Enter description here.'}"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="School News">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              School News
            </h5>
            <small class="text-muted">Enter The School News and Open Days.</small>
          </b-col>
          <b-col class="mb-5">
            <b-form
              ref="form"
              :style="{height: trHeight}"
              class="repeater-form school-event"
              @submit.prevent="addNews"
            >

              <!-- Row Loop -->
              <b-row
                v-for="(item, index) in newsItems"
                :id="item.id"
                :key="item.id"
                ref="row"
              >

                <!-- Item Name -->
                <b-col md="9">
                  <b-form-group>
                    <quill-editor
                      v-model="item.event_description"
                      :options="{theme: 'snow', placeholder: 'Add the news here.'}"
                    />
                  </b-form-group>
                </b-col>

                <!-- Remove Button -->
                <b-col
                  md="3"
                  class="mb-50 text-center"
                >
                  <b-button
                    variant="outline-danger"
                    class="mt-0 mt-md-2"
                    @click="removeNews(index)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <b-col cols="12">
                  <hr>
                </b-col>
              </b-row>

            </b-form>
            <b-button
              variant="primary"
              @click="addNews"
            >
              <feather-icon
                icon="PlusIcon"
                class="mr-25"
              />
              <span>Add New</span>
            </b-button>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="School Videos">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              School Videos
            </h5>
            <small class="text-muted">Enter The School Videos.</small>
          </b-col>
          <b-col class="mb-5">
            <b-form
              ref="form"
              :style="{height: trHeight}"
              class="repeater-form school-event"
              @submit.prevent="addNews"
            >

              <!-- Row Loop -->
              <b-row
                v-for="(item, index) in videosItems"
                :id="item.id"
                :key="item.id"
                ref="row"
              >

                <!-- Item Name -->
                <b-col md="9">
                  <b-form-group class="mb-0 mt-0 mt-md-2">
                    <b-form-input
                      v-model="item.filename"
                      placeholder="Enter video filename here."
                      type="text"
                    />
                  </b-form-group>
                </b-col>

                <!-- Remove Button -->
                <b-col
                  md="3"
                  class="mb-50 text-center"
                >
                  <b-button
                    variant="outline-danger"
                    class="mt-0 mt-md-2"
                    @click="removeVideos(index)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <b-col cols="12">
                  <hr>
                </b-col>
              </b-row>

            </b-form>
            <b-button
              variant="primary"
              @click="addVideos"
            >
              <feather-icon
                icon="PlusIcon"
                class="mr-25"
              />
              <span>Add New</span>
            </b-button>
          </b-col>
        </b-row>
      </tab-content>

      <tab-content title="School Fees">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              School Fees
            </h5>
            <small class="text-muted">Enter The School Fees.</small>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Nursery Fee:</label>
              <b-form-input
                v-model="formData.fee_a"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>K1-K2 Fee:</label>
              <b-form-input
                v-model="formData.fee_b"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Reception Fee:</label>
              <b-form-input
                v-model="formData.fee_c"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Year 1-6 Fee:</label>
              <b-form-input
                v-model="formData.fee_d"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Years 7-8 Fee:</label>
              <b-form-input
                v-model="formData.fee_e"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Years 9-11 Fee:</label>
              <b-form-input
                v-model="formData.fee_f"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Year 12 Fee:</label>
              <b-form-input
                v-model="formData.fee_g"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <label>Year 13 Fee:</label>
              <b-form-input
                v-model="formData.fee_h"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import VueSlider from 'vue-slider-component'
import { heightTransition } from '@core/mixins/ui/transition'
import { quillEditor } from 'vue-quill-editor'
import {
  BRow, BCol, BFormGroup, BFormInput, BButton, BForm,
} from 'bootstrap-vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    vSelect,
    VueSlider,
    quillEditor,
  },
  mixins: [heightTransition],
  props: {
    sid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: [{
        id: 1,
        selected: 'male',
        selected1: 'designer',
        prevHeight: 0,
      }],
      newsItems: [],
      videosItems: [],
      nextTodoId: 2,
      selectedAgeRange: [5, 15],
      curriculumList: [
        'Advanced Placements (AP)',
        'Australian National Curriculum',
        'American Curriculum',
        'Alberta Programme',
        'A-Levels',
        'British National Curriculum',
        'BTEC',
        'CBSE',
        'Cambridge Primary Curriculum',
        'EYFS',
        'English National Curriculum',
        'French National Curriculum',
        'Forest School Programme',
        'German International Abitur',
        'Gifted Programmes',
        'Global Citizen Diploma',
        'IGCSE',
        'HKDSE',
        'HSC (High School Certificate)',
        'IB PYP',
        'IB MYP',
        'IB Diploma',
        'IBCP',
        'IEYC',
        'IPC',
        'IMYC',
        'Key Stages 1 & 2',
        'Key Stages 3 & 4',
        'Montessori Programme',
        'Ontario Programme',
        'Ontario Secondary School Diploma (OSSD)',
        'Reggio Emilia',
        'Singaporean',
        'Special Educational Needs (SEN)',
        'STEAM/STEM',
        'US Diploma',
        'US-Standards Based',
        'Waldorf Curriculum',
      ],
      schoolTypeList: [
        'Nursery',
        'Reception',
        'Kindergarten',
        'Playgroup',
        'Primary',
        'Secondary',
      ],
      countryList: [
        'Hong Kong',
        'Singapore',
      ],
      genderList: [
        'Co-Educational',
        'Boys',
        'Girls',
      ],
      booleanList: ['Yes', 'No'],
      languageList: [
        'Bilingual (English & Mandarin)',
        'Cantonese',
        'English',
        'French',
        'Japanese',
        'German',
        'Mandarin',
        'Spanish',
      ],
      locationList: [
        'Central and Western',
        'Eastern District',
        'Southern District',
        'Wan Chai',
        'Sham Shui Po',
        'Kowloon City',
        'Kwun Tong',
        'Wong Tai Sin',
        'Yau Tsim Mong',
        'Kwai Tsing',
        'North District',
        'Sai Kung',
        'Sha Tin',
        'Tai Po',
        'Tsuen Wan',
        'Tuen Mun',
        'Yuen Long',
        'Central Singapore CDC',
        'North East CDC',
        'North West CDC',
        'South East CDC',
        'South West CDC',
      ],
      snowOption: {
        theme: 'snow',
        placeholder: 'Add the school description here.',
      },
      formData: {
        name: '',
        curriculum: '',
        type: '',
        country: '',
        location: '',
        address: '',
        principal: '',
        founded: '',
        gender: '',
        agesMin: '',
        agesMax: '',
        telNos: '',
        faxNos: '',
        website: '',
        email: '',
        gmapLoc: '',
        fee_a: '',
        fee_b: '',
        fee_c: '',
        fee_d: '',
        fee_e: '',
        fee_f: '',
        fee_g: '',
        fee_h: '',
        debenture: '',
        applicationDates: '',
        language: '',
        status: '0,premier',
      },
      featured: {
        description: '',
        curriculum: '',
        parent_reviews: '',
        specialist_programmes: '',
        education_philosophy: '',
      },
    }
  },
  mounted() {
  },
  created() {
    this.fetchSchoolData()
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    formSubmitted() {
      [this.formData.agesMin, this.formData.agesMax] = this.selectedAgeRange
      let dsp = ''
      let cmt = ''
      let ntf = ''
      let payload = null

      if (this.sid === 0) {
        dsp = 'schoolDB/addNewFeaturedSchool'
        cmt = 'schoolDB/ADD_FEATURED_SCHOOL'
        ntf = 'added'
        payload = {
          basic: this.formData,
          featured: this.featured,
          news: this.newsItems,
          videos: this.videosItems,
        }
      } else {
        dsp = 'schoolDB/updateFeaturedSchool'
        cmt = 'schoolDB/UPDATE_FEATURED_SCHOOL'
        ntf = 'updated'
        payload = {
          data: {
            basic: this.formData,
            featured: this.featured,
            news: this.newsItems,
            videos: this.videosItems,
          },
          sid: this.sid,
        }
      }

      this.$store.dispatch(dsp, payload)
        .then(res => {
          this.$store.commit(cmt, res)
          this.$emit('hideModal')
          this.notify({
            text: `School has been ${ntf} successfully!`,
            variant: 'success',
          })
        }).catch(error => { console.log(error) })
    },
    fetchSchoolData() {
      if (this.sid !== 0) {
        const sd = this.$store.getters['schoolDB/getFeaturedSchoolById'](this.sid)

        this.formData.name = sd.name
        this.formData.curriculum = JSON.parse(sd.info.curriculum)
        this.formData.type = JSON.parse(sd.type)
        this.formData.country = sd.country
        this.formData.location = sd.location
        this.formData.address = sd.address
        this.formData.principal = sd.info.principal
        this.formData.founded = sd.info.founded
        this.formData.gender = sd.info.gender
        this.formData.agesMin = sd.info.agesMin
        this.formData.agesMax = sd.info.agesMax
        this.formData.telNos = sd.info.telNos
        this.formData.faxNos = sd.info.faxNos
        this.formData.website = sd.info.website
        this.formData.email = sd.info.email
        this.formData.gmapLoc = this.decodeHtml(sd.info.gmapLoc)
        this.formData.fee_a = sd.info.fee_a
        this.formData.fee_b = sd.info.fee_b
        this.formData.fee_c = sd.info.fee_c
        this.formData.fee_d = sd.info.fee_d
        this.formData.fee_e = sd.info.fee_e
        this.formData.fee_f = sd.info.fee_f
        this.formData.fee_g = sd.info.fee_g
        this.formData.fee_h = sd.info.fee_h
        this.formData.debenture = sd.info.debenture
        this.formData.applicationDates = sd.info.applicationDates
        this.formData.language = JSON.parse(sd.info.language)
        this.formData.status = sd.status

        this.selectedAgeRange = [sd.info.agesMin, sd.info.agesMax]

        if (sd.featured) {
          this.featured = sd.featured
          if (this.featured.description) this.featured.description = this.decodeHtml(this.featured.description)
        }

        this.newsItems = sd.events
        this.videosItems = sd.videos
      }
    },
    decodeHtml(str) {
      const map = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
      }
      return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, m => map[m])
    },
    addNews() {
      this.newsItems.push({
        school_id: this.sid,
        event_description: '',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeNews(index) {
      this.newsItems.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    addVideos() {
      this.videosItems.push({
        school_id: this.sid,
        filename: '',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeVideos(index) {
      this.videosItems.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-slider.scss';

#basicSchoolWizard .ql-editor{
  min-height:500px;
}

.school-event .ql-editor {
  min-height:250px !important;
}

.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
