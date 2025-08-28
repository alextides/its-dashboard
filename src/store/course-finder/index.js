import axios from '@/libs/axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    resultCards: [],
    options: {
      prep: [],
      grades: [],
      needs: [],
    },
  },
  getters: { },
  mutations: {
    UPDATE_RESULT_CARDS(state, payload) {
      state.resultCards = payload
    },
    UPDATE_OPTIONS(state, payload) {
      state.options = payload
    },
    INSERT_OPTION(state, payload) {
      if (payload.type === 'grade') state.options.grades.push(payload)
      else if (payload.type === 'needs') state.options.needs.push(payload)
      else if (payload.type === 'prep') state.options.prep.push(payload)
    },
    UPDATE_OPTION(state, payload) {
      if (payload.type === 'grade') {
        const gradeIndex = state.options.grades.findIndex(x => x.value === payload.value)
        Vue.set(state.options.grades, gradeIndex, payload)
      } else if (payload.type === 'needs') {
        const needIndex = state.options.needs.findIndex(x => x.value === payload.value)
        Vue.set(state.options.needs, needIndex, payload)
      } else if (payload.type === 'prep') {
        const prepIndex = state.options.prep.findIndex(x => x.value === payload.value)
        Vue.set(state.options.prep, prepIndex, payload)
      }
    },
    REMOVE_OPTION(state, payload) {
      if (payload.type === 'grade') {
        Vue.delete(state.options.grades, payload.index)
      } else if (payload.type === 'needs') {
        Vue.delete(state.options.needs, payload.index)
      } else if (payload.type === 'prep') {
        Vue.delete(state.options.prep, payload.index)
      }
    },
    INSERT_RESULT(state, payload) {
      state.resultCards.push(payload)
    },
    SET_RESULT(state, payload) {
      const resultIndex = state.resultCards.findIndex(x => x.id === payload.id)
      Vue.set(state.resultCards, resultIndex, payload)
    },
    DELETE_RESULT(state, resultID) {
      const cardIndex = state.resultCards.findIndex(x => x.id === resultID)
      Vue.delete(state.resultCards, cardIndex)
    },
    REMOVE_RULE(state, payload) {
      const cardIndex = state.resultCards.findIndex(x => x.id === payload.cardID)
      Vue.delete(state.resultCards[cardIndex].rules, payload.ruleIndex)
    },
  },
  actions: {
    fetchResultCards({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.resultCards.length === 0) {
          axios
            .get('/api/course-finder/results')
            .then(response => {
              if (response.data) {
                commit('UPDATE_RESULT_CARDS', response.data)
                resolve(response.data)
              }
            })
            .catch(error => reject(error))
        } else resolve(state.resultCards)
      })
    },
    fetchOptions({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.options.prep.length === 0) {
          axios
            .get('/api/course-finder/options')
            .then(response => {
              if (response.data) {
                commit('UPDATE_OPTIONS', response.data)
                resolve(response.data)
              }
            })
            .catch(error => reject(error))
        } else resolve(state.options)
      })
    },
    createOption(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/course-finder/option', { payload })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteOption(ctx, optionID) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/course-finder/option', { data: { optionID } })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    createResult({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/course-finder/result', { payload })
          .then(response => {
            if (response.data) {
              commit('INSERT_RESULT', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateResult({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/course-finder/result', { payload })
          .then(response => {
            if (response.data) {
              commit('SET_RESULT', response.data)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    deleteResult({ commit }, resultID) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/course-finder/result', { data: { resultID } })
          .then(response => {
            if (response.data) {
              commit('DELETE_RESULT', resultID)
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
    createRule(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/course-finder/rule', { payload })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteRule(ctx, ruleID) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/course-finder/rule', { data: { ruleID } })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
          })
          .catch(error => reject(error))
      })
    },
  },
}
