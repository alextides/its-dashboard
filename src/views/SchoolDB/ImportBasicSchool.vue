<template>
  <div>
    <b-overlay
      :show="showOverlay"
      rounded="sm"
      no-fade
      opacity="0.50"
    >
      <div class="mb-8 my-2">
        <h6
          class="text-center mb-2"
        >
          To import multiple schools, please insert the school information in this <a
            href="https://docs.google.com/spreadsheets/d/1e26xjNu2IPcEKewHHo7j1X9y4pWrlCujTc1NJ5NGaks/edit?usp=sharing"
            target="_blank"
          >Google Sheet</a>, download it in XLSX format, and then drag the file to the upload area below.
        </h6>
        <import-excel :on-success="loadDataInTable" />
      </div>
      <b-row>
        <b-col
          v-if="tableData.length"
          class="mx-auto py-2"
          sm="8"
        >
          <b-card>
            <table
              style="width:100%"
              class="border-collapse text-center"
            >
              <tr>
                <td class="p-2 border border-solid d-theme-border-grey-light font-weight-bolder">
                  Sheet Name :
                </td>
                <td class="p-2 border border-solid d-theme-border-grey-light">
                  {{ sheetName }}
                </td>
              </tr>
              <tr>
                <td class="p-2 border border-solid d-theme-border-grey-light font-weight-bolder">
                  Number Of Records :
                </td>
                <td class="p-2 border border-solid d-theme-border-grey-light">
                  {{ tableData.length }}
                </td>
              </tr>
            </table>

            <div class="text-center mt-2">
              <button
                v-b-modal.modal-import-basic
                class="btn btn-primary"
                @click="generate"
              >
                Generate
              </button>
            </div>

          </b-card>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
import ImportExcel from '@core/components/excel/ImportExcel.vue'
import {
  BCard, BRow, BCol, BOverlay,
} from 'bootstrap-vue'
import axios from 'axios'

axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }

export default {
  components: {
    ImportExcel,
    BCard,
    BRow,
    BCol,
    BOverlay,
  },
  data() {
    return {
      tableData: [],
      sheetName: '',
      showOverlay: false,
    }
  },
  methods: {
    loadDataInTable({ results, meta }) {
      this.tableData = results
      this.sheetName = meta.sheetName

      console.log(results)
      console.log(meta.sheetName)
    },
    convertSerialDate(serial) {
      const daysSinceEpoch = serial - 25569
      const millisecondsSinceEpoch = daysSinceEpoch * 86400 * 1000
      return new Date(millisecondsSinceEpoch).toISOString().split('T')[0]
    },
    generate() {
      this.showOverlay = true
      if (this.tableData.length > 0) {
        this.tableData.forEach((item, index) => {
          const applicationDate = item['Application Dates'] ? this.convertSerialDate(item['Application Dates']) : ''

          const obj = {
            name: item['School Name'] || '',
            address: item['School Address'] || '',
            location: item.Location || '',
            country: item.Country || '',
            type: item['School Type'] ? item['School Type'].split(',').map(i => i.trim()) : [],
            status: '1',
            principal: item.Principal || '',
            founded: item.Founded || '',
            gender: item.Gender || '',
            agesMin: item['Minimum Age'] || '',
            agesMax: item['Maximum Age'] || '',
            telNos: item['Tel Number'] || '',
            faxNos: item['Fax Number'] || '',
            website: item.Website || '',
            email: item.Email || '',
            curriculum: item.Curriculum ? item.Curriculum.split(',').map(i => i.trim()) : [],
            gmapLoc: item['Google Map Embed Code'] || '',
            fee_a: item['Nursery Fee'] || '',
            fee_b: item['K1 - K2 Fee'] || '',
            fee_c: item['Reception Fee'] || '',
            fee_d: item['Year 1 - 6 Fee'] || '',
            fee_e: item['Year 7 - 8 Fee'] || '',
            fee_f: item['Year 9 - 11 Fee'] || '',
            fee_g: item['Year 12 Fee'] || '',
            fee_h: item['Year 13 Fee'] || '',
            debenture: item.Debenture || '',
            applicationDates: applicationDate,
            language: item['Language Of Instruction'] ? item['Language Of Instruction'].split(',').map(i => i.trim()) : [],
            description: item.Description || '',
          }

          console.log(obj)

          // Dispatch the data to the Vuex store
          this.$store.dispatch('schoolDB/addNewBasicSchool', obj)
            .then(res => {
              this.$store.commit('schoolDB/ADD_BASIC_SCHOOL', res)
              this.$emit('hideModal')
              this.notify({
                text: `${index + 1} out of ${this.tableData.length} has been added successfully!`,
                variant: 'success',
              })
            })
            .catch(error => {
              console.log(error)
            })

          console.log(obj)
        })

        setTimeout(() => { this.showOverlay = false }, 1000)
      }
    },
  },
}
</script>