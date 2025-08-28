import axios from '@/libs/axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    examForms: [],
  },
  getters: {
    getFormById: state => id => state.examForms.find(obj => obj.id === id),
  },
  mutations: {
    SET_EXAM_FORM(state, payload) {
      state.examForms = payload
    },
    INSERT_EXAM_FORM(state, payload) {
      state.examForms.push(payload)
    },
    UPDATE_EXAM_FORM(state, payload) {
      const resultIndex = state.examForms.findIndex(x => x.id === payload.id)
      Vue.set(state.examForms, resultIndex, payload)
    },
    DELETE_EXAM_FORM(state, formID) {
      const resultIndex = state.examForms.findIndex(x => x.id === formID)
      Vue.delete(state.examForms, resultIndex)
    },
  },
  actions: {
    fetchExamForms({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.examForms.length === 0) {
          axios
            .get('/api/exam-form')
            .then(response => {
              if (response.data) {
                commit('SET_EXAM_FORM', response.data)
                resolve(response.data)
              }
            })
            .catch(error => reject(error))
        } else resolve(state.examForms)
      })
    },
    createExamForm({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/exam-form', { payload })
          .then(response => {
            if (response.data) {
              commit('INSERT_EXAM_FORM', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateExamForm({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/exam-form', { payload })
          .then(response => {
            if (response.data) {
              commit('UPDATE_EXAM_FORM', response.data)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    deleteExamForm({ commit }, formID) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/exam-form', { data: { formID } })
          .then(response => {
            if (response.data) {
              commit('DELETE_EXAM_FORM', formID)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    createFormSubject({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/exam-form/subjects', { payload })
          .then(response => {
            if (response.data) {
              commit('UPDATE_EXAM_FORM', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateFormSubject({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/exam-form/subjects', { payload })
          .then(response => {
            if (response.data) {
              commit('UPDATE_EXAM_FORM', response.data)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    toggleSubjectStatus({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/exam-form/subjects/status', { sid })
          .then(response => {
            if (response.data) {
              commit('UPDATE_EXAM_FORM', response.data)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    deleteFormSubject({ commit }, subjectID) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/exam-form/subjects', { data: { subjectID } })
          .then(response => {
            if (response.data) {
              commit('UPDATE_EXAM_FORM', response.data)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
  },
}
