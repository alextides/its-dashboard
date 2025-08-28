import axios from '@/libs/axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    basicSchools: [],
    featuredSchools: [],
  },
  getters: {
    getBasicSchoolById: state => id => state.basicSchools.find(obj => obj.id === id),
    getFeaturedSchoolById: state => id => state.featuredSchools.find(obj => obj.id === id),
  },
  mutations: {
    SET_BASIC_SCHOOL(state, payload) {
      state.basicSchools = payload
    },
    SET_FEATURED_SCHOOL(state, payload) {
      state.featuredSchools = payload
    },
    ADD_BASIC_SCHOOL(state, payload) {
      state.basicSchools.unshift(payload)
    },
    UPDATE_BASIC_SCHOOL(state, payload) {
      const schoolIndex = state.basicSchools.findIndex(x => x.id === payload.id)
      Vue.set(state.basicSchools, schoolIndex, payload)
    },
    ADD_FEATURED_SCHOOL(state, payload) {
      state.featuredSchools.unshift(payload)
    },
    UPDATE_FEATURED_SCHOOL(state, payload) {
      const schoolIndex = state.featuredSchools.findIndex(x => x.id === payload.id)
      Vue.set(state.featuredSchools, schoolIndex, payload)
    },
    DELETE_BASIC_SCHOOL(state, sid) {
      const schoolIndex = state.basicSchools.findIndex(x => x.id === sid)
      Vue.delete(state.basicSchools, schoolIndex)
    },
    DELETE_FEATURED_SCHOOL(state, payload) {
      const schoolIndex = state.featuredSchools.findIndex(x => x.id === payload.id)
      Vue.delete(state.featuredSchools, schoolIndex)
    },
  },
  actions: {
    fetchBasicSchool({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.basicSchools.length === 0) {
          axios
            .get('/api/school/basic')
            .then(response => {
              if (response.data) {
                commit('SET_BASIC_SCHOOL', response.data)
                resolve(response.data)
              }
            })
            .catch(error => reject(error))
        } else resolve(state.basicSchools)
      })
    },
    fetchFeaturedSchool({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.featuredSchools.length === 0) {
          axios
            .get('/api/school/featured')
            .then(response => {
              if (response.data) {
                commit('SET_FEATURED_SCHOOL', response.data)
                resolve(response.data)
              }
            })
            .catch(error => reject(error))
        } else resolve(state.featuredSchools)
      })
    },
    addNewBasicSchool(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/school/basic', { payload })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addNewFeaturedSchool(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/school/featured', { payload })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateBasicSchool(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/basic', { payload: payload.data, sid: payload.sid })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateFeaturedSchool(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/featured', { payload: payload.data, sid: payload.sid })
          .then(response => {
            if (response.data) {
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteBasicSchool({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .delete('/api/school/basic', { data: { sid } })
          .then(() => {
            commit('DELETE_BASIC_SCHOOL', sid)
          })
          .catch(error => reject(error))
      })
    },
    removeFeaturedSchool({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/featured/remove', { sid })
          .then(response => {
            if (response.data) {
              commit('DELETE_FEATURED_SCHOOL', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addFeaturedSchool({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/featured/add', { sid })
          .then(response => {
            if (response.data) {
              commit('DELETE_BASIC_SCHOOL', sid)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    toggleBasicStatus({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/basic/status', { sid })
          .then(response => {
            if (response.data) {
              commit('UPDATE_BASIC_SCHOOL', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    toggleFeaturedStatus({ commit }, sid) {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/school/basic/status', { sid })
          .then(response => {
            if (response.data) {
              commit('UPDATE_FEATURED_SCHOOL', response.data)
              resolve(response.data)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
