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
                v-model="formData.description"
                :options="snowOption"
              />
            </b-form-group>
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
import { quillEditor } from 'vue-quill-editor'
import {
  BRow,
  BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    VueSlider,
    quillEditor,
  },
  props: {
    sid: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
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
        description: '',
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
        status: '0',
      },
    }
  },
  created() {
    this.fetchSchoolData()
  },
  methods: {
    formSubmitted() {
      [this.formData.agesMin, this.formData.agesMax] = this.selectedAgeRange
      let dsp = ''
      let cmt = ''
      let ntf = ''
      let payload = null

      if (this.sid === 0) {
        dsp = 'schoolDB/addNewBasicSchool'
        cmt = 'schoolDB/ADD_BASIC_SCHOOL'
        ntf = 'added'
        payload = this.formData
      } else {
        dsp = 'schoolDB/updateBasicSchool'
        cmt = 'schoolDB/UPDATE_BASIC_SCHOOL'
        ntf = 'updated'
        payload = {
          data: this.formData,
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
        const sd = this.$store.getters['schoolDB/getBasicSchoolById'](this.sid)

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
        this.formData.description = this.decodeHtml(sd.info.description)
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
</style>
