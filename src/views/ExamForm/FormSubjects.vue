<template>
  <div>
    <b-card>
      <!-- search input -->
      <div class="zindex-1 position-relative">
        <div class="float-left">
          <button
            v-b-modal.modal-card-form
            class="btn btn-primary"
            @click="clearForm"
          >
            New Subject
          </button>
        </div>

        <!-- search input -->
        <div class="custom-search d-flex float-right">
          <b-form-group>
            <div class="d-flex align-items-center">
              <b-form-input
                v-model="searchTerm"
                placeholder="Search"
                type="text"
                class="d-inline-block st-input"
              />
            </div>
          </b-form-group>
        </div>
      </div>

      <!-- table -->
      <vue-good-table
        v-if="examForm"
        :columns="columns"
        :rows="examForm.subjects"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
        style-class="vgt-table bordered exam-form-table"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >

          <!-- Column: Date Posted -->
          <span v-if="props.column.field === 'subjects'">
            <strong><router-link to="/home">View Subjects</router-link></strong>
          </span>

          <span v-else-if="props.column.field === 'status'">
            <b-form-checkbox
              :checked="props.row.status !== 0"
              name="check-button"
              class="custom-control-success"
              switch
              inline
              @change="toggleSubjectStatus(props.row.id)"
            >
              <span class="switch-icon-left">
                <feather-icon icon="EyeIcon" />
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="EyeOffIcon" />
              </span>
            </b-form-checkbox>
          </span>

          <!-- Column: Action -->
          <span v-else-if="props.column.field === 'action'">
            <span>
              <div class="text-nowrap">
                <feather-icon
                  :id="`edit-exam-${props.row.id}-icon`"
                  icon="EditIcon"
                  class="cursor-pointer"
                  size="16"
                  @click="editFormSubject(props.row)"
                />

                <feather-icon
                  :id="`delete-exam-${props.row.id}-icon`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1 cursor-pointer  text-danger"
                  @click="deleteFormSubject(props.row.id)"
                />
              </div>
            </span>
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- pagination -->
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap ">
                Showing 1 to
              </span>
              <b-form-select
                v-model="pageLength"
                :options="['20','30','40']"
                class="mx-1"
                @input="(value)=>props.perPageChanged({currentPerPage:value})"
              />
              <span class="text-nowrap"> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
    </b-card>

    <b-modal
      id="modal-card-form"
      ok-title="Submit"
      centered
      title="Subject Modal"
      size="lg"
      ok-only
      @ok="submitForm"
    >
      <b-form>
        <b-form-group>
          <label for="name">Subject Name:</label>
          <b-form-input
            id="name"
            v-model="formData.subject_name"
            type="text"
          />
        </b-form-group>
        <b-form-group>
          <label for="unit">Unit:</label>
          <b-form-input
            id="link"
            v-model="formData.unit"
            type="text"
          />
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal
      id="modal-result-rules"
      centered
      title="Result Card Rule Form"
      size="xl"
      hide-footer
    >
      <set-rule :result-i-d="updateRuleID" />
    </b-modal>
  </div>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BModal, VBModal, BForm, BFormCheckbox,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store'

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BCard,
    BModal,
    BForm,
    BFormCheckbox,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Subject',
          field: 'subject_name',
        },
        {
          label: 'Unit',
          field: 'unit',
        },
        {
          label: 'Status',
          field: 'status',
          tdClass: 'status-td',
        },
        {
          label: 'Action',
          field: 'action',
          tdClass: 'action-td',
        },
      ],
      rows: [],
      searchTerm: '',
      formOperation: 'create',
      editID: null,
      updateRuleID: null,
      formData: {
        exam_form_id: '',
        subject_name: '',
        unit: '',
        status: 0,
      },
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
    examForm() {
      // eslint-disable-next-line radix
      return this.$store.getters['examForm/getFormById'](parseInt(this.$route.params.fid))
    },
  },
  created() {
    this.fetchExamForms()
    console.log(this.$route.params.fid)
  },
  methods: {
    fetchExamForms() {
      this.$store.dispatch('examForm/fetchExamForms')
        .catch(error => { console.log(error) })
    },
    submitForm() {
      if (this.formOperation === 'create') {
        this.formData.exam_form_id = this.$route.params.fid
        this.$store.dispatch('examForm/createFormSubject', this.formData)
          .then(res => {
            console.log(res)
            this.notify({
              text: 'New exam form has been created successfully!',
              variant: 'success',
            })
          })
      } else if (this.formOperation === 'edit') {
        const payload = this.formData
        payload.id = this.editID

        this.$store.dispatch('examForm/updateFormSubject', this.formData)
          .then(res => {
            console.log(res)
            this.notify({
              text: 'Exam form has been updated successfully!',
              variant: 'success',
            })
          })
      }
    },
    editFormSubject(row) {
      this.formOperation = 'edit'
      this.editID = row.id
      this.formData.subject_name = row.subject_name
      this.formData.unit = row.unit
      this.$bvModal.show('modal-card-form')
    },
    clearForm() {
      this.formOperation = 'create'
      this.formData.subject_name = ''
      this.formData.unit = ''
      this.formData.status = 0
    },
    deleteFormSubject(subjectID) {
      this.$store.dispatch('examForm/deleteFormSubject', subjectID)
        .then(() => {
          this.notify({
            text: 'Subject has been deleted successfully!',
            variant: 'success',
          })
        })
    },
    toggleSubjectStatus(sid) {
      this.$store.dispatch('examForm/toggleSubjectStatus', sid)
        .then(() => {
          this.notify({
            text: `Subject ${sid} status has been updated successfully!`,
            variant: 'success',
          })
        })
        .catch(error => { console.log(error) })
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';

.exam-form-table{
  th, td {
    text-align: center !important;
  }

  .status-td {
    width: 12rem;
  }

  .action-td {
    width: 12rem;
  }
}
</style>
