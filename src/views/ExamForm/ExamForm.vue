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
            New Exam Form
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
        :columns="columns"
        :rows="examForms"
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
            <strong><router-link :to="`/form-subjects/${props.row.id}`">View Subjects</router-link></strong>
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
                  @click="editExamForm(props.row.id)"
                />

                <feather-icon
                  :id="`delete-exam-${props.row.id}-icon`"
                  icon="TrashIcon"
                  size="16"
                  class="mx-1 cursor-pointer  text-danger"
                  @click="deleteExamForm(props.row.id)"
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
      title="Exam Form Modal"
      size="lg"
      ok-only
      @ok="submitForm"
    >
      <b-form>
        <b-form-group>
          <label for="title">Title:</label>
          <b-form-input
            id="title"
            v-model="formData.title"
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
  BPagination, BFormGroup, BFormInput, BFormSelect, BCard, BModal, VBModal, BForm,
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
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Subjects',
          field: 'subjects',
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
      resultForm: {
        title: '',
        link: '',
        description: '',
      },
      formData: {
        title: '',
        subjects: [],
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
    examForms() {
      return this.$store.state.examForm.examForms
    },
  },
  created() {
    this.fetchExamForms()
  },
  methods: {
    fetchExamForms() {
      this.$store.dispatch('examForm/fetchExamForms')
        .catch(error => { console.log(error) })
    },
    submitForm() {
      if (this.formOperation === 'create') {
        this.$store.dispatch('examForm/createExamForm', this.formData)
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

        this.$store.dispatch('examForm/updateExamForm', payload)
          .then(res => {
            console.log(res)
            this.notify({
              text: 'Exam form has been updated successfully!',
              variant: 'success',
            })
          })
      }
    },
    editExamForm(editID) {
      this.formOperation = 'edit'
      this.editID = editID

      const examForm = this.examForms.find(obj => obj.id === editID)

      this.formData.title = examForm.title

      this.$bvModal.show('modal-card-form')
    },
    clearForm() {
      this.formOperation = 'create'
      this.formData.title = ''
    },
    deleteExamForm(formID) {
      this.$store.dispatch('examForm/deleteExamForm', formID)
        .then(() => {
          this.notify({
            text: 'Exam form has been deleted successfully!',
            variant: 'success',
          })
        })
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

  .action-td {
    width: 12rem;
  }
}
</style>
