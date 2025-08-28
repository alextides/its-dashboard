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
            New Result Card
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
        :rows="resultCards"
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
      >
        <template
          slot="table-row"
          slot-scope="props"
        >

          <!-- Column: Date Posted -->
          <span v-if="props.column.field === 'link'">
            <a
              :href="props.row.link.includes('school.itseducation') ? props.row.link : `http://itseducation.asia${props.row.link}`"
              target="_blank"
            >{{ props.row.link }}</a>
          </span>

          <!-- Column: Action -->
          <span v-else-if="props.column.field === 'action'">
            <span>
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  @click="setEditDetails(props.row.id)"
                >
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item
                  @click="updateRules(props.row.id)"
                >
                  <feather-icon
                    icon="ListIcon"
                    class="mr-50"
                  />
                  <span>Rules</span>
                </b-dropdown-item>
                <b-dropdown-item @click="deleteResult(props.row.id)">
                  <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                  />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
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
      title="Result Card Form"
      size="lg"
      ok-only
      @ok="submitResultForm"
    >
      <b-form>
        <b-form-group>
          <label for="title">Title:</label>
          <b-form-input
            id="title"
            v-model="resultForm.title"
            type="text"
          />
        </b-form-group>
        <b-form-group>
          <label for="description">Description</label>
          <b-form-textarea
            id="description"
            v-model="resultForm.description"
            rows="4"
          />
        </b-form-group>
        <b-form-group>
          <label for="link">Link:</label>
          <b-form-input
            id="link"
            v-model="resultForm.link"
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
      <set-rule :resultID="updateRuleID"></set-rule>
    </b-modal>
  </div>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BCard, BModal, VBModal, BFormTextarea, BForm,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import SetRule from './SetRule.vue'

export default {
  components: {
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BCard,
    BModal,
    BFormTextarea,
    BForm,
    'set-rule': SetRule,
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
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Link',
          field: 'link',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
      resultFormOperation: 'create',
      editID: null,
      updateRuleID: null,
      resultForm: {
        title: '',
        link: '',
        description: '',
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
    resultCards() {
      return this.$store.state.courseFinder.resultCards
    },
  },
  methods: {
    submitResultForm() {
      if (this.resultFormOperation === 'create') {
        this.$store.dispatch('courseFinder/createResult', this.resultForm)
          .then(res => {
            console.log(res)
            this.notify({
              text: 'New result card has been created successfully!',
              variant: 'success',
            })
          })
      } else if (this.resultFormOperation === 'edit') {
        const payload = this.resultForm
        payload.id = this.editID

        this.$store.dispatch('courseFinder/updateResult', payload)
          .then(res => {
            console.log(res)
            this.notify({
              text: 'Result card has been updated successfully!',
              variant: 'success',
            })
          })
      }
    },
    setEditDetails(resultID) {
      this.resultFormOperation = 'edit'
      this.editID = resultID

      const selectedCard = this.resultCards.find(obj => obj.id === resultID)

      this.resultForm.title = selectedCard.title
      this.resultForm.description = selectedCard.description
      this.resultForm.link = selectedCard.link

      this.$bvModal.show('modal-card-form')
    },
    clearForm() {
      this.resultFormOperation = 'create'

      this.resultForm.title = ''
      this.resultForm.description = ''
      this.resultForm.link = ''
    },
    deleteResult(resultID) {
      this.$store.dispatch('courseFinder/deleteResult', resultID)
        .then(() => {
          this.notify({
            text: 'Result card has been deleted successfully!',
            variant: 'success',
          })
        })
    },
    updateRules(resultID) {
      this.updateRuleID = resultID
      this.$bvModal.show('modal-result-rules')
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
