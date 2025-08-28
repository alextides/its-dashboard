import axios from '@/libs/axios'
import useJwt from '@/auth/jwt/useJwt'
import ability from '@/libs/acl/ability'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    userData: {
      id: '',
      name: '',
      avatar: '',
      email: '',
      userRole: '',
      ability: [],
    },
  },
  getters: { },
  mutations: {
    UPDATE_USER_DATA(state, payload) {
      const {
        userRole, email, id, name, avatar,
      } = payload
      state.userData.userRole = userRole
      state.userData.email = email
      state.userData.id = id
      state.userData.name = name
      state.userData.avatar = avatar
    },
    UPDATE_USER_ABILITY(state) {
      if (state.userData.userRole === 'Super Admin') {
        const ab = [
          { action: 'read', subject: 'Auth' },
          { action: 'manage', subject: 'Home' },
          { action: 'manage', subject: 'CourseFinder' },
          { action: 'manage', subject: 'SchoolDB' },
          { action: 'manage', subject: 'ExamForms' },
        ]

        state.userData.ability = ab
      } else if (state.userData.userRole === 'Admin') {
        const ab = [
          { action: 'read', subject: 'Auth' },
          { action: 'manage', subject: 'Home' },
          { action: 'manage', subject: 'CourseFinder' },
          { action: 'manage', subject: 'SchoolDB' },
          { action: 'manage', subject: 'ExamForms' },
        ]

        state.userData.ability = ab
      } else if (state.userData.userRole === 'Manager') {
        const ab = [
          { action: 'read', subject: 'Auth' },
          { action: 'manage', subject: 'Home' },
          { action: 'manage', subject: 'ExamForms' },
        ]

        state.userData.ability = ab
      }
    },
    CLEAR_USER_DATA(state) {
      state.userData = {
        id: '',
        name: '',
        avatar: '',
        email: '',
        userRole: '',
        ability: [],
      }
    },
  },
  actions: {
    login({ commit, state }, payload) {
      const { email, password } = payload
      return new Promise((resolve, reject) => {
        axios
          .post('/api/auth/login', { email, password })
          .then(res => {
            if (res.data) {
              commit('UPDATE_USER_DATA', res.data.userData)
              commit('UPDATE_USER_ABILITY')

              localStorage.clear()
              localStorage.setItem('userData', JSON.stringify(state.userData))
              useJwt.setToken(res.data.accessToken)

              ability.update(state.userData.ability)

              resolve(res.data)
            }
          })
          .catch(err => { reject(err) })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/auth/logout')
          .then(res => {
            if (res.data) {
              commit('CLEAR_USER_DATA')
              localStorage.clear()
              ability.update([])

              resolve(res.data)
            }
          })
          .catch(err => {
            commit('CLEAR_USER_DATA')
            localStorage.clear()
            ability.update([])

            reject(err)
          })
      })
    },
    validate({ commit, state }, token) {
      useJwt.setToken(token)
      return new Promise((resolve, reject) => {
        axios
          .get('/api/user/me')
          .then(res => {
            if (res.data) {
              commit('UPDATE_USER_DATA', res.data.userData)
              commit('UPDATE_USER_ABILITY')

              localStorage.clear()
              localStorage.setItem('userData', JSON.stringify(state.userData))
              useJwt.setToken(res.data.accessToken)

              ability.update(state.userData.ability)

              resolve(res.data)
            }
          })
          .catch(err => { reject(err) })
      })
    },
    attempt({ dispatch }) {
      const token = localStorage.getItem('accessToken')
      dispatch('validate', token)
        .catch(() => {
          router.push('/login')
        })
    },
  },
}
