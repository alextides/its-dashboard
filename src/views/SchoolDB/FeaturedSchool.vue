<template>
  <div>
    <b-card>
      <!-- search input -->
      <div class="zindex-1 position-relative">
        <div class="float-left">
          <button
            v-b-modal.modal-card-form
            class="btn btn-primary mr-1"
            @click="addSchool()"
          >
            New Featured School
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
        :rows="schools"
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

          <span v-if="props.column.field === 'name'">
            <a
              :href="`https://school.itseducation.asia/school-profile/${props.row.slug}`"
              target="_blank"
            >{{ props.row.name }}</a>
          </span>

          <span v-else-if="props.column.field === 'type'">
            <small v-if="props.row.type.includes('[')">
              <b-badge
                v-for="item in JSON.parse(props.row.type)"
                :key="item"
                variant="primary"
                class="mrc-1"
              >
                {{ item }}
              </b-badge>
            </small>
          </span>

          <span v-else-if="props.column.field === 'status'">
            <b-form-checkbox
              :checked="!!props.row.status.includes('0')"
              name="check-button"
              class="custom-control-success"
              switch
              inline
              @change="toggleStatus(props.row.id)"
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
                  @click="editSchool(props.row.id)"
                >
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item @click="removeSchool(props.row.id)">
                  <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                  />
                  <span>Remove</span>
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
      id="modal-add-basic"
      ok-title="Submit"
      centered
      title="New Featured School"
      size="xl"
      ok-only
      hide-footer
    >
      <create-school-wizard
        :sid="selectedID"
        @hideModal="hideAddModal()"
      />
    </b-modal>

    <b-modal
      id="modal-import-basic"
      centered
      title="Import Basic School"
      size="lg"
      hide-footer
    >
      <import-basic-school />
    </b-modal>
  </div>
</template>

<script>
import {
  BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown,
  BDropdownItem, BCard, BModal, VBModal, BBadge, BFormCheckbox,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import CreateFeaturedSchool from './CreateFeaturedSchool.vue'
import ImportBasicSchool from './ImportBasicSchool.vue'

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
    BBadge,
    BFormCheckbox,
    'create-school-wizard': CreateFeaturedSchool,
    'import-basic-school': ImportBasicSchool,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      selectedID: 0,
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Location',
          field: 'location',
        },
        {
          label: 'Country',
          field: 'country',
        },
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Status',
          field: 'status',
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
    schools() {
      return this.$store.state.schoolDB.featuredSchools
    },
  },
  created() {
    this.fetchFeaturedSchool()
  },
  methods: {
    fetchFeaturedSchool() {
      this.$store.dispatch('schoolDB/fetchFeaturedSchool')
        .catch(error => { console.log(error) })
    },
    editSchool(sid) {
      this.selectedID = sid
      this.$bvModal.show('modal-add-basic')
    },
    addSchool() {
      this.selectedID = 0
      this.$bvModal.show('modal-add-basic')
    },
    removeSchool(sid) {
      this.$store.dispatch('schoolDB/removeFeaturedSchool', sid)
        .then(res => {
          this.$store.dispatch('schoolDB/fetchBasicSchool')
            .then(() => {
              this.$store.commit('schoolDB/ADD_BASIC_SCHOOL', res)
            })

          this.notify({
            text: `School ${sid} has been removed in the featured lists!`,
            variant: 'success',
          })
        })
        .catch(error => { console.log(error) })
    },
    hideAddModal() {
      this.$bvModal.hide('modal-add-basic')
    },
    hideImportModal() {
      this.$bvModal.hide('modal-import-basic')
    },
    updateRules(resultID) {
      this.updateRuleID = resultID
      this.$bvModal.show('modal-result-rules')
    },
    toggleStatus(sid) {
      this.$store.dispatch('schoolDB/toggleFeaturedStatus', sid)
        .then(() => {
          this.notify({
            text: `School ${sid} status has been updated successfully!`,
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
</style>

<style lang="scss" scoped>
.mrc-1 {
  margin-right: 5px;
  margin-bottom: 5px;
}

</style>
